import React from 'react';
import NavBar from '../components/nav-bar';

// const url = `https://api.rawg.io/api/games?key=${process.env.GAME_API_KEY}&page_size=688028`;
class NotesLib extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // library: [],
      notes: []
    };
  }

  componentDidMount() {
    // fetch(url, {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' }
    // })
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(json => {
    //     this.setState({ library: json.results });
    //   })
    //   .catch(err => console.error(err));
    fetch('api/notes', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({ notes: json });
      });
  }

  render() {
    if (this.state.notes === []) return null;
    const stateArray = this.state.notes;

    const notes = stateArray.map(game => {
      const { noteId: id, note, backgroundImage, name } = game;
      return (
          <div key={id} className=' row mb-3 bg textarea-holder align-items-center'>
            <img className='notes-img col' src={backgroundImage} alt={name} />
            <div className='col'>
              <h2 className='text-warning'>Notes</h2>
              <h2 className='text-warning'>{name}</h2>
              <textarea type="text" id="Notes" className='form-text textarea' value={note} />
            </div>
          </div>
      );
    }
    );

    return (
      <>
        <NavBar />
          <div className='container-xxl con'>
            {notes}
          </div>
      </>
    );
  }
}
export default NotesLib;
