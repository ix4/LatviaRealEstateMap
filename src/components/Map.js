import React from 'react';
import ReactDOM from 'react-dom';
import { Query } from 'react-apollo';
import { ClipLoader } from 'react-spinners';
import GoogleMapReact from 'google-map-react';

import { GET_LOCAL_REGION, GET_MAP_DATA } from '../apollo/Query';
import MapPopup from './MapPopup';
import QueryWithGlobalVariables from './QueryWithGlobalVariables';

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
          <MapPopup region={region} />,
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
