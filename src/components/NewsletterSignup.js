import React from 'react';
import { Button, Card, CardBody, CardText, CardTitle } from 'reactstrap';

export class NewsletterSignup extends React.Component {
  render() {
    return (
      <Card color="primary">
        <CardBody>
          <CardTitle>Newsletter</CardTitle>
          <CardText>
            Want to receive notifications about Brokalys platform updates to
            your email?
          </CardText>
          <Button>Sign up</Button>
        </CardBody>
      </Card>
    );
  }
}
