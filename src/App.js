import React from 'react';
import { withNamespaces } from 'react-i18next';
import progress from 'nprogress';

import { GET_REGION_TABLE_DATA } from './apollo/Query';
import Home from './pages/Home';
import QueryWithGlobalVariables from './components/QueryWithGlobalVariables';

progress.configure({
  showSpinner: false,
  speed: 1000,
  trickleSpeed: 150,
});

class App extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <QueryWithGlobalVariables query={GET_REGION_TABLE_DATA}>
        {({ loading, error, data }) => {
          if (loading) {
            progress.start();
          } else {
            progress.done();
          }

          if (error)
            return (
              <div>
                Error: <pre>{JSON.stringify(error, null, 2)}</pre>
              </div>
            );

          if (!Object.keys(data).length && loading)
            return <p>{t('loading')}</p>;

          return <Home data={data} />;
        }}
      </QueryWithGlobalVariables>
    );
  }
}

export default withNamespaces()(App);
