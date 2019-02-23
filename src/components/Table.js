import React from 'react';
import { Mutation } from 'react-apollo';
import ReactTable from 'react-table';
import { withNamespaces } from 'react-i18next';

import { SET_HOVERED_REGION } from '../apollo/Mutation';

import 'react-table/react-table.css';

class Table extends React.Component {
  formatPercentageValue(value) {
    const number = (value * 100).toFixed(2);

    return value > 0 ? `+${number}` : number;
  }

  defaultSortMethod(a, b) {
    return a.toString().localeCompare(b);
  }

  render() {
    const { t, type, data } = this.props;

    const columns = [
      {
        Header: t('table.columns.region.header'),
        headerClassName: 'text-left',
        columns: [
          {
            Header: t('table.columns.region.name'),
            headerClassName: 'text-left',
            accessor: 'name',
          },
          {
            Header: t('table.columns.region.price'),
            headerClassName: 'text-right',
            accessor: `price_per_sqm.${type}`,
            className: 'text-right',
            Cell: ({ value }) => (value ? `${value}€` : ''),
          },
          {
            Header: t('table.columns.region.btr_ratio'),
            headerClassName: 'text-right',
            accessor: 'btl_ratio',
            className: 'text-right',
            Cell: ({ value }) => (value ? value.toFixed(2) : ''),
          },
        ],
      },
      {
        Header: t('table.columns.yoy_change.header'),
        columns: [
          {
            Header: t('table.columns.yoy_change.price'),
            headerClassName: 'text-right',
            accessor: `price_per_sqm_change.${type}`,
            className: 'text-right',
            Cell: (props) => (
              <span
                className={props.value > 0 ? 'text-success' : 'text-danger'}
              >
                {this.formatPercentageValue(props.value)}%
              </span>
            ),
          },
          {
            Header: t('table.columns.yoy_change.btr_ratio'),
            headerClassName: 'text-right',
            accessor: 'btl_ratio_change',
            className: 'text-right',
            Cell: (props) => (
              <span
                className={props.value > 0 ? 'text-success' : 'text-danger'}
              >
                {this.formatPercentageValue(props.value)}%
              </span>
            ),
          },
        ],
      },
    ];

    return (
      <Mutation mutation={SET_HOVERED_REGION}>
        {(setHoveredRegion) => (
          <ReactTable
            data={data}
            columns={columns}
            showPagination={false}
            defaultPageSize={data.length}
            defaultSorted={[
              {
                id: 'name',
                desc: false,
              },
            ]}
            defaultSortMethod={this.defaultSortMethod}
            getTdProps={(state, rowInfo, column, instance) => {
              return {
                onMouseEnter: () => {
                  setHoveredRegion({
                    variables: { region: rowInfo.original.name },
                  });
                },
              };
            }}
            style={{
              height: '45vh',
            }}
          />
        )}
      </Mutation>
    );
  }
}

export default withNamespaces()(Table);
