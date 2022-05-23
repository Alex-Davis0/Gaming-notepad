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
        <form key={id} id={id} className='container-xxl con bg' onSubmit={e => this.handleSubmit(e, id)}>
          <div className=' row mb-3  textarea-holder align-items-center'>
            <div className='col-7'>
            <img className='notes-img' src={backgroundImage} alt={name} />
            </div>
            <div className='col-5'>
                          <div className='end'>
            <button type='button' className='btn trash fas fa-trash-alt' onClick={e => this.handleDelete(e, id)}></button>
            </div>
              <h2 className='text-warning h2-size'>Notes for</h2>
              <h2 className='text-warning h2-size'>{name}</h2>
              <textarea type="text" id="Notes" className='form-text textarea' value={note} onChange={e => this.handleChange(e, id)}/>
              <div className='end'>
              <button type='submit' className='btn btn-warning button'>Submit</button>
              </div>
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
