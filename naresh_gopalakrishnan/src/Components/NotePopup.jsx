import React, {useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateNote, togglePopup, filterNotes, displayNotes, setActiveNote } from "../Redux/Notes/noteActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrash, faTrashRestore } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

function NotePopup({data}) {

    const [noteData, setNoteData] = useState(data);
    const [validation, setValidation] = useState({
        title: {isPassed: true, message: ""},
        context: {isPassed: true, message: ""}
    })
    const {title, context, starred, deleted} = noteData;

    const dispatch = useDispatch();
    const filter = useSelector(state => state.filter)
    const displayNotesList = useSelector(state => state.displayNotes)

    const iconClickHandler = (value) => {
        const updatedNote = {...noteData}
        if (value === "star") {
            updatedNote.starred = !updatedNote.starred
        } else if (value === "delete") {
            updatedNote.deleted = !updatedNote.deleted
        }

        setNoteData(updatedNote);
    }
    
    const inputChangeHandler = (e) => {
        const updatedNote = {...noteData}
        updatedNote[e.target.name] = e.target.value;
        setNoteData(updatedNote);
    }

    const saveHandler = () => {
        dispatch(updateNote(noteData));
        dispatch(filterNotes());
        dispatch(displayNotes(filter));
        if(displayNotesList.length > 1) dispatch(setActiveNote(noteData.id));
        dispatch(togglePopup());
    }

    const runValidation = (e) => {
        const uptValidation = {...validation}
        if(!e.target.value) {
            uptValidation[e.target.name].isPassed = false;
            uptValidation[e.target.name].message = "This field is required";
        } else if ( e.target.value.length < 5) {
            uptValidation[e.target.name].isPassed = false;
            uptValidation[e.target.name].message = "Minimum 5 characters are required";
        } else {
            uptValidation[e.target.name].isPassed = true;
            uptValidation[e.target.name].message = "";
        }
        setValidation(uptValidation);
    }

    const checkValidation = () => {
        return Object.values(validation).every(value => value.isPassed)
    }

    return (
        <section className="popup-container">
            <div className="popup-top-section">
                <h1 className="app-title">Notes</h1>
                <div className="welcome-user">Welcome <span className="user-name">Naresh</span></div>
            </div>
            <div className="popup-wrapper">
                <header className="popup-header">
                    <h1 className="popup-title">Edit note</h1>
                    <div className="popup-icons">
                        <span onClick={() => iconClickHandler("star")}>
                            {starred ? <FontAwesomeIcon icon={faStar} size="2x" className="icon starred"/> : <FontAwesomeIcon icon={farStar} size="2x" className="icon"/>}
                        </span>
                        <span onClick={() => iconClickHandler("delete")}>
                            {deleted ? <FontAwesomeIcon icon={faTrashRestore} size="2x" className="icon"/> : <FontAwesomeIcon icon={faTrash} size="2x" className="icon"/>}
                        </span>
                    </div>
                </header>
                <form>
                    <label htmlFor="title-input">Title <span className="required-field">*</span></label>
                    <input className={`${validation.title.isPassed ? "" : "error-input"}`} min="5" autoFocus type="text" id="title-input" name="title" value={title} onChange={inputChangeHandler} onBlur={runValidation}/>
                    <p className="error-message">{validation.title.message}</p>

                    <label htmlFor="context-input">Context <span className="required-field">*</span></label>
                    <textarea className={`${validation.context.isPassed ? "" : "error-input"}`} min="5" id="context-input" cols="30" rows="10" name="context" value={context} onChange={inputChangeHandler} onBlur={runValidation}></textarea>
                    <p className="error-message">{validation.context.message}</p>
                </form>
                <div className="action-buttons">
                    <button className="secondary-btn" onClick={() => dispatch(togglePopup())}>Cancel</button>
                    <button className={`primary-btn ${checkValidation() ? "" : "disabled"}`} onClick={saveHandler}>Save</button>
                </div>
            </div>
            <div className="popup-overlay"></div>
        </section>
    )
}

export default NotePopup
