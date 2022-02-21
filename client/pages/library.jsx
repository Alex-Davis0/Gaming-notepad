import React from 'react';
import NavBar from '../components/nav-bar';

const url = 'https://api.rawg.io/api/games?key=2b1c564fe61d448fa953aa160239a72f&page_size=688028';
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
      return (
        <div key={game.id} className='col-3'>
          <img className='img-size' src={game.background_image} alt="game.name" />
          <h2 className='text-warning'>{game.name}</h2>
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
