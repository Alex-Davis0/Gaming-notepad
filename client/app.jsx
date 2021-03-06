import React from 'react';
import Home from './pages/home';
import Library from './pages/library';
import Notes from './pages/notes';
import NotFound from './pages/not-found';
import parseRoute from './lib/parse-route';
import NotesLib from './pages/notes-lib';
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
      const gameId = route.params.get('gameId');
      return <Notes gameId={gameId}/>;
    }
    if (route.path === 'notesLib') {
      const gameId = route.params.get('gameId');
      return <NotesLib gameId={gameId} />;
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
