import React from 'react';
import { Query, Mutation } from 'react-apollo';
import ReactTable from 'react-table';
import { withNamespaces } from 'react-i18next';
import {
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import { SET_SELECTED_DATES, SET_SELECTED_CATEGORY } from '../apollo/Mutation';
import { GET_LOCAL_STATE, GET_TABLE_DATA } from '../apollo/Query';
import QueryWithGlobalVariables from '../components/QueryWithGlobalVariables';

import 'react-table/react-table.css';

const moment = extendMoment(Moment);

const start = new Date(2018, 0, 1);
const end = moment().subtract(1, 'month');
const range = moment.range(start, end);

class SideMenu extends React.Component {
  handleInputChange(
    {
      target: { name, value },
    },
    runGraphQLMutation,
  ) {
    const variables = {};

    switch (name) {
      case 'start_date':
        variables[name] = value;
        variables['end_date'] = moment(value)
          .add(1, 'month')
          .format('YYYY-MM-DD');
        break;

      default:
        variables[name] = value;
        break;
    }

    runGraphQLMutation({ variables });
  }

  formatPercentageValue(value) {
    const number = (value * 100).toFixed(2);

    return value > 0 ? `+${number}` : number;
  }

  render() {
    const { t } = this.props;

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
            accessor: 'price_per_sqm.sell',
            className: 'text-right',
            Cell: ({ value }) => (value ? `${value.toFixed(2)}€` : ''),
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
            accessor: 'price_per_sqm_change.sell',
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
      <div>
        <Query query={GET_LOCAL_STATE}>
          {({ data }) => (
            <Form>
              <Row form>
                <Col sm={6}>
                  <Mutation mutation={SET_SELECTED_CATEGORY}>
                    {(setSelectedCategory) => (
                      <FormGroup>
                        <Label for="fieldCategory">
                          {t('form.category.label')}
                        </Label>
                        <Input
                          type="select"
                          name="category"
                          id="fieldCategory"
                          value={data.category}
                          onChange={(event) =>
                            this.handleInputChange(event, setSelectedCategory)
                          }
                        >
                          <option value="APARTMENT">
                            {t('form.category.values.APARTMENT')}
                          </option>
                          <option value="HOUSE">
                            {t('form.category.values.HOUSE')}
                          </option>
                          {/*<option value="LAND">{t('form.category.values.LAND')}</option>*/}
                        </Input>
                      </FormGroup>
                    )}
                  </Mutation>
                </Col>

                <Col sm={6}>
                  <Mutation mutation={SET_SELECTED_DATES}>
                    {(setSelectedDate) => (
                      <FormGroup>
                        <Label for="fieldSelectedMonth">
                          {t('form.start_date.label')}
                        </Label>
                        <Input
                          type="select"
                          name="start_date"
                          id="fieldSelectedMonth"
                          value={data.start_date}
                          onChange={(event) =>
                            this.handleInputChange(event, setSelectedDate)
                          }
                        >
                          {Array.from(range.by('month'))
                            .map((row) => row.format('YYYY-MM-DD'))
                            .map((row) => (
                              <option key={row} value={row}>
                                {row}
                              </option>
                            ))}
                        </Input>
                      </FormGroup>
                    )}
                  </Mutation>
                </Col>
              </Row>
            </Form>
          )}
        </Query>

        <Card>
          <CardBody>
            <QueryWithGlobalVariables query={GET_TABLE_DATA}>
              {({ data }) => {
                if (!data || !data.getTableData) {
                  return '';
                }

                return (
                  <ReactTable
                    data={data.getTableData}
                    columns={columns}
                    showPagination={false}
                    defaultPageSize={data.getTableData.length}
                    defaultSorted={[
                      {
                        id: 'name',
                        desc: false,
                      },
                    ]}
                    style={{
                      height: '45vh',
                    }}
                  />
                );
              }}
            </QueryWithGlobalVariables>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default withNamespaces()(SideMenu);
