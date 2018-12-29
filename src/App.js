import React from 'react';
import { Query } from 'react-apollo';
import progress from 'nprogress';

import { GET_LOCAL_STATE, GET_REGION_TABLE_DATA } from './apollo/Query';
import { Home } from './pages/Home';

progress.configure({
  showSpinner: false,
  speed: 1000,
  trickleSpeed: 150,
});

export class App extends React.Component {
  render() {
    return (
      <Query query={GET_LOCAL_STATE}>
        {({ data }) => (
          <Query query={GET_REGION_TABLE_DATA} variables={data}>
            {({ loading, error, data }) => {
              if (loading) {
                progress.start();
              } else {
                progress.done();
              }

              if (error)
                return (
                  <p>
                    Error: <pre>{JSON.stringify(error, null, 2)}</pre>
                  </p>
                );

              if (!Object.keys(data).length && loading)
                return <p>Loading...</p>;

              return <Home data={data} />;
            }}
          </Query>
        )}
      </Query>
    );
  }
}
