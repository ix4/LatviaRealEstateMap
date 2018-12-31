import React from 'react';
import { Query, Mutation } from 'react-apollo';
import ReactTable from 'react-table';
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
import { QueryWithGlobalVariables } from '../components/QueryWithGlobalVariables';

import 'react-table/react-table.css';

const moment = extendMoment(Moment);

const start = new Date(2018, 0, 1);
const end = moment().subtract(1, 'month');
const range = moment.range(start, end);

export class SideMenu extends React.Component {
  columns = [
    {
      Header: 'Region',
      headerClassName: 'text-left',
      columns: [
        {
          Header: 'Name',
          headerClassName: 'text-left',
          accessor: 'name',
        },
        {
          Header: 'Median Price',
          headerClassName: 'text-right',
          accessor: 'price',
          className: 'text-right',
        },
        {
          Header: 'BtR ratio',
          headerClassName: 'text-right',
          accessor: 'btrRatio',
          className: 'text-right',
        },
      ],
    },
    {
      Header: 'YoY change',
      columns: [
        {
          Header: 'Price',
          headerClassName: 'text-right',
          accessor: 'priceChange',
          className: 'text-right',
          Cell: (props) => (
            <span className={props.value > 0 ? 'text-success' : 'text-danger'}>
              {props.value > 0 ? `+${props.value}` : props.value}%
            </span>
          ),
        },
        {
          Header: 'BtR ratio',
          headerClassName: 'text-right',
          accessor: 'btrRatioChange',
          className: 'text-right',
          Cell: (props) => (
            <span className={props.value > 0 ? 'text-success' : 'text-danger'}>
              {props.value > 0 ? `+${props.value}` : props.value}%
            </span>
          ),
        },
      ],
    },
  ];

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

  render() {
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
                        <Label for="fieldCategory">Property Type</Label>
                        <Input
                          type="select"
                          name="category"
                          id="fieldCategory"
                          value={data.category}
                          onChange={(event) =>
                            this.handleInputChange(event, setSelectedCategory)
                          }
                        >
                          <option value="APARTMENT">Apartment</option>
                          <option value="HOUSE">House</option>
                          {/*<option value="LAND">Land</option>*/}
                        </Input>
                      </FormGroup>
                    )}
                  </Mutation>
                </Col>

                <Col sm={6}>
                  <Mutation mutation={SET_SELECTED_DATES}>
                    {(setSelectedDate) => (
                      <FormGroup>
                        <Label for="fieldSelectedMonth">Selected Month</Label>
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
              {({ data: { getTableData } }) => (
                <ReactTable
                  data={getTableData}
                  columns={this.columns}
                  showPagination={false}
                  defaultPageSize={getTableData.length}
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
              )}
            </QueryWithGlobalVariables>
          </CardBody>
        </Card>
      </div>
    );
  }
}
