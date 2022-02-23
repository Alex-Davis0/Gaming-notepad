import React from 'react';
import Home from './pages/home';
import Library from './pages/library';
import Notes from './pages/notes';
import NotFound from './pages/not-found';
import parseRoute from './lib/parse-route';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'library') {
      return <Library />;
    }
    if (route.path === 'notes') {
      return <Notes />;
    }
    return <NotFound />;
  }

  render() {
    return (
      <>
        {this.renderPage()}
      </>
    );
  }
}
