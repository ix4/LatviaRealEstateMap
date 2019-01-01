import React from 'react';
import { Query } from 'react-apollo';

import { GET_LOCAL_STATE } from '../apollo/Query';

class QueryWithGlobalVariables extends React.Component {
  render() {
    return (
      <Query query={GET_LOCAL_STATE}>
        {({ data }) => (
          <Query query={this.props.query} variables={data}>
            {this.props.children.bind(this)}
          </Query>
        )}
      </Query>
    );
  }
}

export default QueryWithGlobalVariables;
