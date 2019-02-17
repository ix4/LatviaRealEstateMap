import React from 'react';
import { Query, Mutation } from 'react-apollo';
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

import {
  SET_SELECTED_DATES,
  SET_SELECTED_TYPE,
  SET_SELECTED_CATEGORY,
} from '../apollo/Mutation';
import { GET_LOCAL_STATE, GET_TABLE_DATA } from '../apollo/Query';
import QueryWithGlobalVariables from './QueryWithGlobalVariables';
import Table from './Table';

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

  render() {
    const { t } = this.props;

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
                  <Mutation mutation={SET_SELECTED_TYPE}>
                    {(setSelectedType) => (
                      <FormGroup>
                        <Label for="fieldType">{t('form.type.label')}</Label>
                        <Input
                          type="select"
                          name="type"
                          id="fieldType"
                          value={data.type}
                          onChange={(event) =>
                            this.handleInputChange(event, setSelectedType)
                          }
                        >
                          <option value="SELL">
                            {t('form.type.values.SELL')}
                          </option>
                          <option value="RENT">
                            {t('form.type.values.RENT')}
                          </option>
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
                  <Table
                    data={data.getTableData}
                    type={data.type.toLowerCase()}
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
