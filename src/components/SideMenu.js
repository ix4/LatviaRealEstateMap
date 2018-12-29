import React from 'react';
import { Mutation } from 'react-apollo';
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

import { SET_SELECTED_DATES } from '../apollo/Mutation';

import 'react-table/react-table.css';

function random(low, high) {
  return Math.random() * (high - low) + low;
}

export class SideMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: 'apartment',
      type: 'sell',
    };

    const regions = [
      'Āgenskalns',
      'Atgāzene',
      'Avoti',
      'Beberbeķi',
      'Berģi',
      'Bieriņi',
      'Bišumuiža',
      'Bolderāja',
      'Brasa',
      'Brekši',
      'Bukulti',
      'Buļļi',
      'Centrs',
      'Čiekurkalns',
      'Daugavgrīva',
      'Dreiliņi',
      'Dzirciems',
      'Dārzciems',
      'Dārziņi',
      'Grīziņkalns',
      'Imanta',
      'Iļģuciems',
      'Jaunciems',
      'Jugla',
      'Katlakalns',
      'Kleisti',
      'Kundziņsala',
      'Ķengarags',
      'Ķīpsala',
      'Mangaļsala',
      'Maskavas forstate',
      'Mežaparks',
      'Mežciems',
      'Mīlgrāvis',
      'Mūkupurvs',
      'Pleskodāle',
      'Purvciems',
      'Pētersala-Andrejsala',
      'Pļavnieki',
      'Rumbula',
      'Salas',
      'Sarkandaugava',
      'Skanste',
      'Šķirotava',
      'Spilve',
      'Suži',
      'Šampēteris',
      'Teika',
      'Torņakalns',
      'Trīsciems',
      'Vecdaugava',
      'Vecmilgrāvis',
      'Vecpilsēta',
      'Vecāķi',
      'Voleri',
      'Zasulauks',
      'Ziepniekkalns',
      'Zolitūde',
    ];

    this.regions = regions.map((region) => ({
      name: region,
      priceChange: random(-10, 10).toFixed(2),
      btrRatioChange: random(-10, 10).toFixed(2),
      price: random(500, 2000).toFixed(2),
      btrRatio: (random(1, 10) / 100).toFixed(2),
      median: random(0, 100).toFixed(2),
    }));
  }

  handleChange(event, setSelectedDate) {
    setSelectedDate({
      variables: {
        start_date: event.target.value,
        end_date: '2018-02-01',
      },
    });
  }

  render() {
    const columns = [
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
              <span
                className={props.value > 0 ? 'text-success' : 'text-danger'}
              >
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
              <span
                className={props.value > 0 ? 'text-success' : 'text-danger'}
              >
                {props.value > 0 ? `+${props.value}` : props.value}%
              </span>
            ),
          },
        ],
      },
    ];

    return (
      <div>
        <Form>
          <Row form>
            <Col sm={6}>
              <FormGroup>
                <Label for="exampleSelect">Property Type</Label>
                <Input type="select" name="select" id="exampleSelect">
                  <option>Apartment</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
            </Col>

            <Col sm={6}>
              <Mutation mutation={SET_SELECTED_DATES}>
                {(setSelectedDate) => (
                  <FormGroup>
                    <Label for="exampleSelect">Selected Month</Label>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      onChange={(event) =>
                        this.handleChange(event, setSelectedDate)
                      }
                    >
                      <option value="2018-01-20">November 2018</option>
                      <option value="2018-01-10">December 2018</option>
                    </Input>
                  </FormGroup>
                )}
              </Mutation>
            </Col>
          </Row>
        </Form>

        <Card>
          <CardBody>
            <ReactTable
              data={this.regions}
              columns={columns}
              showPagination={false}
              style={{
                height: '45vh',
              }}
              showPageSizeOptions={false}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}
