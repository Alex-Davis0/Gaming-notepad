import React from 'react';
import NavBar from '../components/nav-bar';

const url = `https://api.rawg.io/api/games?key=${process.env.GAME_API_KEY}&page_size=688028`;
class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      library: [],
      note: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ note: event.target.value });
  }

  handleSubmit() {
    event.preventDefault();

    const postData = {
      note: this.state.note,
      gameId: this.props.gameId
    };
    fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    })
      .then(
        res => res.json()
      )
      .catch(err => console.error(err));
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
    if (!this.state.library) {
      return null;
    }
    const stateArray = this.state.library;
    const notes = stateArray.map(game => {
      const { id, name, background_image: backgroundImage } = game;
      if (this.props.gameId === `${id}`) {
        return (
          <form key={id} className='container-xxl con' onSubmit={this.handleSubmit}>
          <div className=' row mb-3 bg textarea-holder'>
            <img className='notes-img align-self-start' src={backgroundImage} alt={name} />
              <div className='col align-self-end'>
                <label className='col form-label text-warning'>Game Notes</label>
                <h2 className='text-warning'>{name}</h2>
                <textarea type="text" id="Notes" className='form-text textarea' onChange={this.handleChange}/>
                <button type='submit' className='btn btn-warning button'>Submit</button>
              </div>
          </div>
      </form>
        );
      }
      return null;
    });
    return (
      <>
      <NavBar />
      {notes}
      </>
    );
  }
}

export default Notes;
