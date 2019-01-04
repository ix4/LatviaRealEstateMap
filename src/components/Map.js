import React from 'react';
import GoogleMapReact from 'google-map-react';

import QueryWithGlobalVariables from '../components/QueryWithGlobalVariables';
import { GET_MAP_DATA } from '../apollo/Query';

class MapData extends React.Component {
  componentDidMount() {
    this.props.map.data.addGeoJson(this.props.data);
  }

  componentDidUpdate() {
    this.props.map.data.setStyle((feature) => ({
      strokeColor: feature.getProperty('color'),
      strokeWeight: 0.1,
      fillColor: feature.getProperty('color'),
      fillOpacity: 0.5,
      zIndex: feature.getProperty('Level') || 1,
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

      // @todo: make this beautiful
      infoWindow.setContent(`
        Mediānā cena:<br>
        <strong>${region.getProperty('price')} EUR</strong><br>
        Mediānā cena par m2:<br>
        <strong>${region.getProperty('pricePerSqm')} EUR</strong><br>
        (${region.getProperty('name')})
      `);
      infoWindow.setPosition(event.latLng);
      infoWindow.open(map);
    });
  }

  render() {
    const handleApiLoaded = this.handleApiLoaded.bind(this);
    return (
      <QueryWithGlobalVariables query={GET_MAP_DATA}>
        {({
          data: {
            getMapData: { geojson: data },
          },
        }) => (
          <div style={{ height: '100%', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GMAPS_KEY }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              options={{ styles: this.props.styles }}
              onGoogleApiLoaded={(event) => handleApiLoaded(event)}
              yesIWantToUseGoogleMapApiInternals={true}
            >
              {this.state.map ? (
                <MapData map={this.state.map} data={JSON.parse(data)} />
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
