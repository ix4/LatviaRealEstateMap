import React from 'react';
import progress from 'nprogress';

import { GET_REGION_TABLE_DATA } from './apollo/Query';
import { Home } from './pages/Home';
import { QueryWithGlobalVariables } from './components/QueryWithGlobalVariables';

progress.configure({
  showSpinner: false,
  speed: 1000,
  trickleSpeed: 150,
});

export class App extends React.Component {
  render() {
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

          if (!Object.keys(data).length && loading) return <p>Loading...</p>;

          return <Home data={data} />;
        }}
      </QueryWithGlobalVariables>
    );
  }
}
