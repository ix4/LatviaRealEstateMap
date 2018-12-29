import React from 'react';
import { Query } from 'react-apollo';
import {
  Bar,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { GET_CHART_DATA } from '../apollo/Query';

class BelowMap extends React.Component {
  render() {
    return (
      <Query query={GET_CHART_DATA}>
        {({ data: { getChartData: data } }) => (
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={data}>
              <Line
                type="monotone"
                dataKey="pricePerSqm"
                name="Price per sqm"
              />
              <Bar dataKey="count" fill="#413ea0" name="Classified count" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </Query>
    );
  }
}

export default BelowMap;
