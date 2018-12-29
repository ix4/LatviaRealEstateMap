import React from 'react';
import GoogleMapReact from 'google-map-react';
import colormap from 'colormap';

const styles = [
  {
    featureType: 'all',
    elementType: 'all',
    stylers: [{
      invert_lightness: true,
    }, {
      saturation: 10,
    }, {
      lightness: 30,
    }, {
       gamma: 0.5,
    }, {
      hue: '#435158',
    }],
  },
];

class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: 56.98,
      lng: 24.105078,
    },
    zoom: 11,
  };

  handleApiLoaded(map) {
    const colors = colormap({
      colormap: 'autumn',
      nshades: 30,
      format: 'hex',
    });
    let colorIndex = 0;

    map.data.loadGeoJson('https://raw.githubusercontent.com/brokalys/sls-data-extraction/master/data/riga-geojson.json');

    map.data.setStyle((feature) => {
      const regionName = feature.getProperty('apkaime');

      if (feature.getProperty('Level') < 2 && regionName !== 'Rīga') {
        return {
          visible: false,
        };
      }

      const color = colors[colorIndex];
      colorIndex += 1;

      if (!color) {
        colorIndex = 0;
      }

      return {
        strokeColor: color,
        strokeWeight: 0.1,
        fillColor: color,
        fillOpacity: 0.5,
        zIndex: feature.getProperty('Level') || 1,
      };
    });
  }

  render() {
    const handleApiLoaded = this.handleApiLoaded;
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GMAPS_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={{ styles }}
          onGoogleApiLoaded={({ map }) => handleApiLoaded(map)}
          yesIWantToUseGoogleMapApiInternals={true}
        >
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
