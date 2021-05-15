import React from 'react'
import { useDispatch } from "react-redux";
import { setActiveNote } from "../Redux/Notes/noteActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrash, faTrashRestore } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

function Note({data: {id, createdAt, title, context, starred, deleted}, isActive}) {
    const dispatch = useDispatch()
    const clickHandler = () => {
        dispatch(setActiveNote(id))
    }

    return (
        <div className={`note-container ${isActive ? "active" : ""}`} onClick={clickHandler}>
            <div className="note-header">
                <div className="note-title-container">
                    <h1 className="note-title">{title}</h1>
                    {deleted && <span className="deleted-tag">Deleted</span>}
                </div>
                <div className="note-icons">
                    {starred ? <FontAwesomeIcon icon={faStar} size="2x" className="icon starred"/> : <FontAwesomeIcon icon={farStar} size="2x" className="icon"/>}
                    {deleted ? <FontAwesomeIcon icon={faTrashRestore} size="2x" className="icon"/> : <FontAwesomeIcon icon={faTrash} size="2x" className="icon"/>}
                </div>
            </div>
            <div className="note-content">{context}</div>
        </div>
    )
}

export default Note
