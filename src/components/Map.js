import React from 'react';
import ReactDOM from 'react-dom';
import { Query } from 'react-apollo';
import { Bar, BarChart, Tooltip } from 'recharts';
import { ClipLoader } from 'react-spinners';
import GoogleMapReact from 'google-map-react';

import QueryWithGlobalVariables from '../components/QueryWithGlobalVariables';
import { GET_LOCAL_REGION, GET_MAP_DATA } from '../apollo/Query';

class MapData extends React.Component {
  componentDidUpdate(prevProps) {
    const { activeRegion, map, data } = this.props;

    map.data.forEach((feature) => map.data.remove(feature));
    map.data.addGeoJson(data);

    map.data.setStyle((feature) => ({
      strokeColor: feature.getProperty('color'),
      strokeWeight: feature.getProperty('name') === activeRegion ? 1 : 0.1,
      fillColor: feature.getProperty('color'),
      fillOpacity: feature.getProperty('name') === activeRegion ? 1 : 0.5,
    }));
  }

  render() {
    return '';
  }
}

class MarkerExample extends React.Component {
  render() {
    const histogram = this.props.region.getProperty('histogram');
    const chartData = histogram.values.map((val, index) => ({
      index,
      count: val,
    }));

    const total = histogram.values.reduce((a, b) => a + b, 0);

    const formatter = (value, name, props) => {
      const { index } = props.payload;
      const fromVal = histogram.bin_limits[0] + histogram.bin_width * index;
      const toVal = histogram.bin_limits[0] + histogram.bin_width * (index + 1);

      return `${(fromVal < 0 ? 0 : fromVal).toFixed(2)}€ - ${toVal.toFixed(
        2,
      )}€`;
    };

    const labelFormatter = (index) => {
      const percent = ((histogram.values[index] / total) * 100).toFixed(2);
      return `${percent}%`;
    };

    return (
      <BarChart width={400} height={200} data={chartData} barCategoryGap={1}>
        <Tooltip formatter={formatter} labelFormatter={labelFormatter} />
        <Bar dataKey="count" fill="#8884d8" name="Price m2" />
      </BarChart>
    );
  }
}

class Map extends React.Component {
  state = {};
  static defaultProps = {
    center: {
      lat: 56.98,
      lng: 24.105078,
    },
    zoom: 11,
    styles: [
      {
        featureType: 'all',
        elementType: 'all',
        stylers: [
          {
            invert_lightness: true,
          },
          {
            saturation: 10,
          },
          {
            lightness: 30,
          },
          {
            gamma: 0.5,
          },
          {
            hue: '#435158',
          },
        ],
      },
    ],
  };

  handleApiLoaded({ map, maps }) {
    this.setState({ map });

    let infoWindow = new maps.InfoWindow();

    map.data.addListener('click', (event) => {
      const regionName = event.feature.getProperty('name');

      let region;

      map.data.forEach((row) => {
        if (row.getProperty('name') === regionName) {
          region = row;
        }
      });

      infoWindow.setContent(`
        <div id="infowindow-chart"></div>
      `);

      infoWindow.setPosition(event.latLng);
      infoWindow.open(map);

      setTimeout(() => {
        ReactDOM.render(
          <MarkerExample region={region} />,
          document.getElementById('infowindow-chart'),
        );
      });
    });
  }

  render() {
    return (
      <QueryWithGlobalVariables query={GET_MAP_DATA}>
        {({ loading, data }) => (
          <div style={{ height: '100%', width: '100%' }}>
            <div className="map-loader">
              <ClipLoader color={'#fd6c6c'} loading={loading} />
            </div>

            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GMAPS_KEY }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              options={{ styles: this.props.styles }}
              onGoogleApiLoaded={(event) => this.handleApiLoaded(event)}
              yesIWantToUseGoogleMapApiInternals={true}
            >
              {this.state.map && data ? (
                <Query query={GET_LOCAL_REGION}>
                  {({ data: { region } }) => (
                    <MapData
                      map={this.state.map}
                      data={data.getMapData}
                      activeRegion={region}
                    />
                  )}
                </Query>
              ) : (
                ''
              )}
            </GoogleMapReact>
          </div>
        )}
      </QueryWithGlobalVariables>
    );
  }
}

export default Map;
