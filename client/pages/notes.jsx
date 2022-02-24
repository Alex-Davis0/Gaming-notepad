import React from 'react';
import NavBar from '../components/nav-bar';

const url = `https://api.rawg.io/api/games?key=${process.env.GAME_API_KEY}&page_size=688028`;
class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      library: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    event.preventDefault();

    const formData = new FormData();

    formData.append('caption', this.state.caption);
    formData.append('image', this.fileInputRef.current.files[0]);

    fetch('/api/notes', {
      method: 'POST',
      body: formData
    })
      .then(
        res => res.json()
      )
      .then(res => {
        this.setState({
          caption: ''
        });
        this.fileInputRef.current.value = null;
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
      <form key={id} className='container'>
        <div className=' row mb-3 bg textarea-holder'>
          <img src={backgroundImage} alt={name} />
          <label className='form-label text-warning'>Game Notes</label>
          <textarea type="text" id="Notes" className='form-text textarea'/>
          <button onSubmit={this.handleSubmit} type='submit' className='btn btn-warning'>Submit</button>
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
