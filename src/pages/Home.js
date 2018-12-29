import React from 'react';
import {
  Button,
  Row,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
} from 'reactstrap';

import BelowMap from '../components/BelowMap';
import Map from '../components/Map';
import Navigation from '../components/Navigation';
import SideMenu from '../components/SideMenu';

class Home extends React.Component {
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
              <BelowMap />
            </Col>
            <Col md="6" lg="5" xl="4" className="mt-3 pl-md-0">
              <Card color="primary">
                <CardBody>
                  <CardTitle>Newsletter</CardTitle>
                  <CardText>
                    Want to receive notifications about Brokalys platform
                    updates to your email?
                  </CardText>
                  <Button>Sign up</Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
