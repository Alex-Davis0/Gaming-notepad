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
    const { name, background_image: backgroundImage } = this.state.library;
    const postData = {
      note: this.state.note,
      name: name,
      backgroundImage: backgroundImage,
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
      .then(res => {
        this.setState({ note: '' });
      })
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
        const jsonResults = json.results.find(game => {
          const { id } = game;
          return id === parseFloat(this.props.gameId);
        });
        this.setState({ library: jsonResults });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.library) {
      return null;
    }
    const stateArray = this.state.library;
    const { id, name, background_image: backgroundImage } = stateArray;
    return (
      <>
      <NavBar />
        <form key={id} className='container-xxl con' onSubmit={this.handleSubmit}>
          <div className=' row mb-3 bg note-textarea-holder align-items-center'>
            <div className='col-12'>
            <img className='notes-img align-self-center' src={backgroundImage} alt={name} />
            </div>
            <div className='col-12'>
              <label className='form-label text-warning'>Game Notes</label>
              <h2 className='text-warning'>{name}</h2>
              <textarea type="text" id="Notes" className='form-text textarea' onChange={this.handleChange} value={this.state.note} />
              <button type='submit' className='btn btn-warning button'>Submit</button>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default Notes;
