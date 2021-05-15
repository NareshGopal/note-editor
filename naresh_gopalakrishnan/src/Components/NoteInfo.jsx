import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import NotePopup from "./NotePopup";
import { togglePopup, toggleNoteDelete, displayNotes, filterNotes, setActiveNote, toggleNoteStar } from "../Redux/Notes/noteActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrash, faTrashRestore, faPen } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

function NoteInfo() {
    const notes = useSelector(state => state.displayNotes);
    const activeNoteId = useSelector(state => state.activeNote);
    const filter = useSelector(state => state.filter);
    const showPopup = useSelector(state => state.showPopup);
    const dispatch = useDispatch()

    if(!activeNoteId) return <p className="no-note-details">No details to display.</p> 

    const activeNote = notes.filter(note => note.id === activeNoteId);
    if(!activeNote.length) return <p className="no-note-details">No details to display.</p> 
    const {createdAt, title, context, starred, deleted} = activeNote[0];

    const toggleOptionHandler = (action) => {
        if (action === "delete") {
            dispatch(toggleNoteDelete(activeNoteId));
        } else {
            dispatch(toggleNoteStar(activeNoteId));
        }
        dispatch(filterNotes());
        dispatch(displayNotes(filter));
        if(filter === "All") dispatch(setActiveNote(activeNoteId));
    }
    
    return (
            <div className="note-info-container">
                <div className="note-header">
                    <div className="title-time">
                        <h1 className="note-info-title">{title}</h1>
                        <p className="note-info-time">{createdAt}</p>
                    </div>
                    <div className="note-info-icons-container">
                        <FontAwesomeIcon icon={faPen} size="2x" className={`icon ${deleted ? "disabled" : ""}`} onClick={() => dispatch(togglePopup())}/>
                        {starred ? <FontAwesomeIcon icon={faStar} size="2x" className={`icon starred ${deleted ? "disabled" : ""}`} onClick={() => toggleOptionHandler('star')}/> : <FontAwesomeIcon icon={farStar} size="2x" className={`icon ${deleted ? "disabled" : ""}`} onClick={() => toggleOptionHandler('star')}/>}
                        {deleted ? <FontAwesomeIcon icon={faTrashRestore} size="2x" className="icon" onClick={() => toggleOptionHandler('delete')}/> : <FontAwesomeIcon icon={faTrash} size="2x" className="icon" onClick={() => toggleOptionHandler('delete')}/>}
                    </div>
                </div>
                <div className="note-info-content">{context}</div>

                {showPopup && <NotePopup data={activeNote[0]}/>}
            </div> 
    )
}

export default NoteInfo
