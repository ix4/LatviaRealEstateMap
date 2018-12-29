import React from 'react';
import { Query } from 'react-apollo';
import GoogleMapReact from 'google-map-react';

import { GET_MAP_DATA } from '../apollo/Query';

class Map extends React.Component {
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

  handleApiLoaded(map, geojson) {
    map.data.addGeoJson(geojson);

    map.data.setStyle((feature) => ({
      strokeColor: feature.getProperty('color'),
      strokeWeight: 0.1,
      fillColor: feature.getProperty('color'),
      fillOpacity: 0.5,
      zIndex: feature.getProperty('Level') || 1,
    }));

    // @todo: add click events with tooltips of data
  }

  render() {
    const handleApiLoaded = this.handleApiLoaded;
    return (
      <Query query={GET_MAP_DATA}>
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
              onGoogleApiLoaded={({ map }) =>
                handleApiLoaded(map, JSON.parse(data))
              }
              yesIWantToUseGoogleMapApiInternals={true}
            />
          </div>
        )}
      </Query>
    );
  }
}

export default Map;
