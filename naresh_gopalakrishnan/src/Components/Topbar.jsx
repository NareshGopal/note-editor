import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { searchNotes, displayNotes, setActiveNote } from "../Redux/Notes/noteActions";

function Topbar() {

    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const searchHandler = (e) => {
        dispatch(setActiveNote(null))
        if(e.target.value) {
            dispatch(searchNotes(e.target.value))
        } else {
            dispatch(displayNotes(filter))
        }
    }

    return (
        <div className="topbar-container">
            <input type="text" name="search-note" id="search-note-input" placeholder="Search by title" onBlur={searchHandler}/>
            <div className="welcome-user">Welcome <span className="user-name">Naresh</span></div>
        </div>
    )
}

export default Topbar
