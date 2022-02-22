import React, {useEffect, useState} from 'react';
import Note from "./components/Note";

import notesService from "./services/Notes"
import './index.css'

const Footer = () => {
    const footerStyle = {
        color: 'blue',
        fontStyle: 'bold',
        fontsize: 8
    }
    return (
        <div style={footerStyle}>
            <br/>
            <em>Note app, Department of Computer Science, University of Helsinki 2021</em>
        </div>
    )
}

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('Empty');
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        console.log('Effect');
        notesService
            .getAll()
            .then(initialNotes => {
                console.log('Promise fulfilled');
                setNotes(initialNotes);
            })
            .catch(error => {
                alert(error);
            })
    }, []);
    console.log('Render ', notes.length, ' notes');

    const addNote = (event) => {
        event.preventDefault();
        console.log(event.target);
        const noteToSend = {
            content : newNote,
            date : new Date(),
            important : Math.random() < 0.5
        }
        notesService
            .create(noteToSend)
            .then(returnedNote => {
                console.log(returnedNote);
                setNotes(notes.concat(returnedNote));
                setNewNote('');
            });
    }

    const handleNoteChange = (event) => {
        console.log(event.target.value);
        setNewNote(event.target.value);
    }

    const notesToShow = showAll ? notes : notes.filter(note => note.important)

    const toggleImportance = (id) => {
        console.log('Toggling importance');
        const note = notes.find(n => n.id === id);
        const changedNote = {...note, important: !note.important};
        notesService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id ===id ? returnedNote : note))
            });
    }

    return (
        <>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)}/> )}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type="submit">Add note</button>
            </form>
            <Footer/>
        </>
    )
}

export default App;
