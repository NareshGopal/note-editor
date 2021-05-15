import React from 'react'
import Note from './Note'
import { useSelector } from "react-redux";

function NoteList() {
    const notes = useSelector(state => state.displayNotes);
    const activeNote = useSelector(state => state.activeNote);
    const filter = useSelector(state => state.filter);

    return (
        <section className="note-lists-container">
            <h1 className="note-section-title">{filter}</h1>
            {notes.length > 0 ? notes.map(note => <Note key={note.id} data={note} isActive={activeNote === note.id}/>) : <p className="no-note-details">No notes found.</p>}
        </section>
    )
}

export default NoteList
