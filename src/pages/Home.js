import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import { Chart } from '../components/Chart';
import { Map } from '../components/Map';
import { Navigation } from '../components/Navigation';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { SideMenu } from '../components/SideMenu';

export class Home extends React.Component {
  render() {
    const regions = this.props.data.getRegions;
    console.log(regions ? JSON.stringify(regions[0]) : null);

    return (
      <div>
        <Navigation />

        <Container fluid>
          <Row>
            <Col xs={{ order: 2 }} md="6" lg="7" xl="8">
              <Map />
            </Col>
            <Col
              xs={{ order: 1 }}
              md={{ size: 6, order: 3 }}
              lg="5"
              xl="4"
              className="pt-3 mb-3 pl-md-0"
            >
              <SideMenu />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md="6" lg="7" xl="8" className="mt-3">
              <Chart />
            </Col>
            <Col md="6" lg="5" xl="4" className="mt-3 pl-md-0">
              <NewsletterSignup />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
