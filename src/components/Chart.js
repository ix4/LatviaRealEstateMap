import React from 'react';
import { ClipLoader } from 'react-spinners';
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
  dateTickFormatter(data) {
    const [year, month] = data.split('-');
    return `${month}-'${year.substr(2)}`;
  }

  render() {
    const { t } = this.props;

    return (
      <QueryWithGlobalVariables query={GET_CHART_DATA}>
        {({ loading, error, data }) => (
          <div>
            <div className="chart-loader">
              <ClipLoader color={'#fd6c6c'} loading={loading} />
            </div>

            {data && !error ? (
              <ResponsiveContainer width="100%" height={200}>
                <ComposedChart data={data.getChartData}>
                  <Bar
                    yAxisId="1"
                    dataKey="count"
                    fill="#413ea0"
                    name={t('chart.count')}
                  />
                  <Line
                    yAxisId="2"
                    type="monotone"
                    dataKey="pricePerSqm"
                    name={t('chart.price')}
                    unit="€"
                  />
                  <XAxis
                    dataKey="date"
                    tickFormatter={this.dateTickFormatter}
                  />
                  <YAxis yAxisId="1" orientation="right" />
                  <YAxis yAxisId="2" />
                  <Tooltip />
                </ComposedChart>
              </ResponsiveContainer>
            ) : (
              ''
            )}
          </div>
        )}
      </QueryWithGlobalVariables>
    );
  }
}

export default withNamespaces()(Chart);
