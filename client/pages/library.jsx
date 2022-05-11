import React from 'react';
import NavBar from '../components/nav-bar';

const url = `https://api.rawg.io/api/games?key=${process.env.GAME_API_KEY}&page_size=688028`;
class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      library: []
    };
  }

  componentDidMount() {
    fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({ library: json.results });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.library) return null;
    const stateArray = this.state.library;
    const library = stateArray.map(game => {
      const { id, name, background_image: backgroundImage } = game;
      return (
        <div key={id} className='col-3'>
          <img className='img-size' src={backgroundImage} alt="game.name" />
          <a className='text-warning a' href={`#notes?gameId=${id}`}>{name}</a>
        </div>
      );
    }

    );

    return (
      <>
      <NavBar />
        <div className='container-xxl bg mar'>
          <div className='row'>
            {library}
          </div>
        </div>
      </>
    );
  }
}
export default Library;
