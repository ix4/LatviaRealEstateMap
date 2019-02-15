import React from 'react';
import { withNamespaces } from 'react-i18next';
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Form,
  Input,
} from 'reactstrap';

class NewsletterSignup extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <Card color="primary">
        <CardBody>
          <CardTitle>{t('newsletter.title')}</CardTitle>
          <CardText>{t('newsletter.body')}</CardText>
          <Form inline>
            <Input type="email" name="email" placeholder="Email" />
            <Button>{t('newsletter.button')}</Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default withNamespaces()(NewsletterSignup);
