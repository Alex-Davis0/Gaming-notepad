import React from 'react';
import NavBar from '../components/nav-bar';

class NotesLib extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notesLib: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(event, id) {
    this.setState({ notesLib: { ...this.state.notesLib, [id]: { ...this.state.notesLib[id], note: event.target.value } } });
  }

  handleDelete(event, id) {
    fetch('/api/notes/' + id, {
      method: 'DELETE'
    })
      .catch(err => console.error(err));
    location.reload();
  }

  handleSubmit(event, id) {
    fetch('/api/notes/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.notesLib[id])
    })
      .then(
        res => res.json()
      )
      .catch(err => console.error(err));
  }

  componentDidMount() {
    fetch('api/notes', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        const notesLib = {};
        json.forEach(e => (notesLib[e.noteId] = e));
        this.setState({ notesLib });
      });
  }

  render() {
    if (this.state.notesLib === {}) return null;

    const notes = Object.values(this.state.notesLib).map(game => {
      const { noteId: id, note, backgroundImage, name } = game;
      return (
        <form key={id} id={id} className='container-xxl con' onSubmit={e => this.handleSubmit(e, id)}>
          <div className=' row mb-3 bg textarea-holder align-items-center'>
            <button type='button' className='btn trash fas fa-trash-alt' onClick={e => this.handleDelete(e, id)}></button>
            <img className='notes-img col' src={backgroundImage} alt={name} />
            <div className='col'>
              <h2 className='text-warning'>Notes</h2>
              <h2 className='text-warning'>{name}</h2>
              <textarea type="text" id="Notes" className='form-text textarea' value={note} onChange={e => this.handleChange(e, id)}/>
              <button type='submit' className='btn btn-warning button'>Submit</button>
            </div>
          </div>
        </form>
      );
    }
    );

    return (
      <>
        <NavBar />
            {notes}
      </>
    );
  }
}
export default NotesLib;
