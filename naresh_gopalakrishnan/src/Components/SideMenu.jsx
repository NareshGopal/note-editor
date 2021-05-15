import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { displayNotes } from "../Redux/Notes/noteActions";

function SideMenu() {
    const allNotes = useSelector(state => state.notes);
    const starredNotes = useSelector(state => state.starredNotes);
    const deletedNotes = useSelector(state => state.deletedNotes);
    const filter = useSelector(state => state.filter);
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(displayNotes("All"));
    }, [dispatch])
    
    const filterData = [
        {
            type: "All",
            count: allNotes.length
        },
        {
            type: "Starred",
            count: starredNotes.length
        },
        {
            type: "Deleted",
            count: deletedNotes.length
        },     
    ]

    const menuItemHandler = (type) => {
        dispatch(displayNotes(type));
    }

    return (
        <section className="side-menu">
           <h1 className="app-title">Notes</h1>
           <ul className="note-types">
               {filterData.map(value => <li key={value.type} className={`note-type-item ${value.type === filter ? 'active' : ""}`} onClick={() => menuItemHandler(value.type)}>{value.type} ({value.count})</li>)}
           </ul>
        </section>
    )
}

export default SideMenu
