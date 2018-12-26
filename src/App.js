import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import loadable from 'react-loadable';
import Loading from './components/Loading';

const Home = loadable({
  loader: () => import('./pages/Home'),
  loading: Loading,
});
const Pulse = loadable({
  loader: () => import('./pages/Pulse'),
  loading: Loading,
});

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="wrapper" style={{height: 'calc(100% - 56px)'}}>
          <Route exact path="/" component={Home} />
          <Route path="/pulse" component={Pulse} />
        </div>
      </Router>
    );
  }

}

export default App;
