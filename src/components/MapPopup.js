import React from 'react';
import { withNamespaces } from 'react-i18next';
import { Bar, BarChart, Tooltip, ResponsiveContainer, XAxis } from 'recharts';

class Histogram extends React.Component {
  render() {
    const { t, histogram } = this.props;

    if (!histogram) {
      return '';
    }

    const chartData = histogram.values.map((val, index) => ({
      index,
      count: val,
    }));

    const total = histogram.values.reduce((a, b) => a + b, 0);

    const formatter = (value, name, props) => {
      const { index } = props.payload;
      const fromVal = histogram.bin_limits[0] + histogram.bin_width * index;
      const toVal = histogram.bin_limits[0] + histogram.bin_width * (index + 1);

      return `${(fromVal < 0 ? 0 : fromVal).toFixed(0)}€ - ${toVal.toFixed(
        0,
      )}€`;
    };

    const labelFormatter = (index) => {
      const percent = ((histogram.values[index] / total) * 100).toFixed(2);
      return `${percent}%`;
    };

    return (
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} barCategoryGap={1}>
          <Tooltip formatter={formatter} labelFormatter={labelFormatter} />
          <Bar
            dataKey="count"
            fill="#8884d8"
            name={t('map_popup.histogram.bar.label')}
          />
          <XAxis dataKey="index" interval={0} tickFormatter={labelFormatter} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

class MapPopup extends React.Component {
  render() {
    const { t, region } = this.props;

    const name = region.getProperty('name');

    return (
      <div style={{ minWidth: 200, width: 500 }}>
        <h2>{name}</h2>

        {/*<h3>Cenu diapazons</h3>
        <div>@todo: diapozona chart</div>*/}

        <h3>{t('map_popup.histogram.title')}</h3>
        <Histogram t={t} histogram={region.getProperty('histogram')} />
      </div>
    );
  }
}

export default withNamespaces()(MapPopup);
