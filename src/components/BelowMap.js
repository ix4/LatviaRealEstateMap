import React from 'react';
import {
  Crosshair,
  LineSeries,
  XAxis,
  FlexibleXYPlot,
  DiscreteColorLegend,
  VerticalBarSeries,
  YAxis,
} from 'react-vis';

class BelowMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      crosshairValues: []
    };

    this.data = [
      {x: new Date(Date.UTC(2018, 0, 1)), y: 8290},
      {x: new Date(Date.UTC(2018, 1, 1)), y: 6895},
      {x: new Date(Date.UTC(2018, 2, 1)), y: 6292},
      {x: new Date(Date.UTC(2018, 3, 1)), y: 6120},
      {x: new Date(Date.UTC(2018, 4, 1)), y: 6100},
      {x: new Date(Date.UTC(2018, 5, 1)), y: 6090},
      {x: new Date(Date.UTC(2018, 6, 1)), y: 6400},
      {x: new Date(Date.UTC(2018, 7, 1)), y: 6494},
      {x: new Date(Date.UTC(2018, 8, 1)), y: 7470},
      {x: new Date(Date.UTC(2018, 9, 1)), y: 7100},
      {x: new Date(Date.UTC(2018, 10, 1)), y: 7900},
    ];

    this.barData = [
      {x: new Date(Date.UTC(2018, 0, 1)), y: 829},
      {x: new Date(Date.UTC(2018, 1, 1)), y: 689},
      {x: new Date(Date.UTC(2018, 2, 1)), y: 629},
      {x: new Date(Date.UTC(2018, 3, 1)), y: 612},
      {x: new Date(Date.UTC(2018, 4, 1)), y: 610},
      {x: new Date(Date.UTC(2018, 5, 1)), y: 609},
      {x: new Date(Date.UTC(2018, 6, 1)), y: 640},
      {x: new Date(Date.UTC(2018, 7, 1)), y: 649},
      {x: new Date(Date.UTC(2018, 8, 1)), y: 747},
      {x: new Date(Date.UTC(2018, 9, 1)), y: 710},
      {x: new Date(Date.UTC(2018, 10, 1)), y: 790},
    ];

    this.tickValues = [
      new Date(Date.UTC(2018, 0, 1)),
      new Date(Date.UTC(2018, 1, 1)),
      new Date(Date.UTC(2018, 2, 1)),
      new Date(Date.UTC(2018, 3, 1)),
      new Date(Date.UTC(2018, 4, 1)),
      new Date(Date.UTC(2018, 5, 1)),
      new Date(Date.UTC(2018, 6, 1)),
      new Date(Date.UTC(2018, 7, 1)),
      new Date(Date.UTC(2018, 8, 1)),
      new Date(Date.UTC(2018, 9, 1)),
      new Date(Date.UTC(2018, 10, 1)),
      // new Date(Date.UTC(2018, 11, 1)),
    ];
  }

  xTickFormatter(value) {
    return value.toISOString().substr(0, 10);
  }

  titleFormatter(ro) {
    return ro.map((obj) => ({
      title: `EUR ${obj.y}`,
      value: obj.x.toISOString().substr(0, 10),
    }));
  }

  barAxisTickFormatter(value, index) {
    return this.barData[index].y;
  }

  render() {
    return (
      <FlexibleXYPlot
        xType="ordinal"
        onMouseLeave={() => this.setState({crosshairValues: []})}
        height={200}
        margin={{ left: 60, right: 60, bottom: 60 }}>
        <XAxis tickValues={this.tickValues} tickFormat={this.xTickFormatter} tickLabelAngle={-45} />
        <YAxis />
        <YAxis orientation="right" tickFormat={this.barAxisTickFormatter.bind(this)} />
        <LineSeries
          onNearestX={(value, {index}) =>
              this.setState({crosshairValues: [this.data[index]]})}
          data={this.data} />
        <VerticalBarSeries data={this.barData} />
        <DiscreteColorLegend
          items={["Median apartment price per sqm in Riga", "Classified amount in Riga"]} />
        <Crosshair values={this.state.crosshairValues} itemsFormat={this.titleFormatter} titleFormat={this.titleFormatter} />
      </FlexibleXYPlot>
    );
  }
}

export default BelowMap;
