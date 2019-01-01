import React from 'react';
import { withNamespaces } from 'react-i18next';
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
import QueryWithGlobalVariables from '../components/QueryWithGlobalVariables';

class Chart extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <QueryWithGlobalVariables query={GET_CHART_DATA}>
        {({ data: { getChartData: data } }) => (
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={data}>
              <Line
                type="monotone"
                dataKey="pricePerSqm"
                name={t('chart.price')}
              />
              <Bar dataKey="count" fill="#413ea0" name={t('chart.count')} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </QueryWithGlobalVariables>
    );
  }
}

export default withNamespaces()(Chart);
