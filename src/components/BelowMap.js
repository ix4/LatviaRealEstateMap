import React from 'react';
import {
  Bar,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

class BelowMap extends React.Component {
  data = [
    {
      x: new Date(Date.UTC(2018, 0, 1)).toISOString().substr(0, 10),
      y: 8290,
      bar: 829,
    },
    {
      x: new Date(Date.UTC(2018, 1, 1)).toISOString().substr(0, 10),
      y: 6895,
      bar: 689,
    },
    {
      x: new Date(Date.UTC(2018, 2, 1)).toISOString().substr(0, 10),
      y: 6292,
      bar: 629,
    },
    {
      x: new Date(Date.UTC(2018, 3, 1)).toISOString().substr(0, 10),
      y: 6120,
      bar: 612,
    },
    {
      x: new Date(Date.UTC(2018, 4, 1)).toISOString().substr(0, 10),
      y: 6100,
      bar: 610,
    },
    {
      x: new Date(Date.UTC(2018, 5, 1)).toISOString().substr(0, 10),
      y: 6090,
      bar: 609,
    },
    {
      x: new Date(Date.UTC(2018, 6, 1)).toISOString().substr(0, 10),
      y: 6400,
      bar: 640,
    },
    {
      x: new Date(Date.UTC(2018, 7, 1)).toISOString().substr(0, 10),
      y: 6494,
      bar: 649,
    },
    {
      x: new Date(Date.UTC(2018, 8, 1)).toISOString().substr(0, 10),
      y: 7470,
      bar: 747,
    },
    {
      x: new Date(Date.UTC(2018, 9, 1)).toISOString().substr(0, 10),
      y: 7100,
      bar: 710,
    },
    {
      x: new Date(Date.UTC(2018, 10, 1)).toISOString().substr(0, 10),
      y: 7900,
      bar: 790,
    },
  ];

  render() {
    return (
      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart data={this.data}>
          <Line type="monotone" dataKey="y" name="Price per sqm" />
          <Bar dataKey="bar" fill="#413ea0" name="Classified count" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

export default BelowMap;
