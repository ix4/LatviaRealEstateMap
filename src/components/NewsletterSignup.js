import React from 'react';
import { withNamespaces } from 'react-i18next';
import { Button, Card, CardBody, CardText, CardTitle } from 'reactstrap';

class NewsletterSignup extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <Card color="primary">
        <CardBody>
          <CardTitle>{t('newsletter.title')}</CardTitle>
          <CardText>{t('newsletter.body')}</CardText>
          <Button>{t('newsletter.button')}</Button>
        </CardBody>
      </Card>
    );
  }
}

export default withNamespaces()(NewsletterSignup);
