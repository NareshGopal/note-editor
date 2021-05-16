import { DISPLAY_NOTES, SET_ACTIVE_NOTE, TOGGLE_POPUP, UPDATE_NOTE, FILTER_NOTES, SEARCH_NOTES, TOGGLE_NOTE_DELETE, TOGGLE_NOTE_STAR } from "./noteTypes"

const initialState = {
    filter:"All",
    notes: [ 
        { 
        "id": 1, 
        "createdAt": "January 13, 2021 11:13:00", 
        "title": "Personal Notes", 
        "context": "Some random personal note. This is not so important but  still needed.", 
        "starred": false, 
        "deleted": false 
        }, 
        { 
        "id": 2, 
        "createdAt": "January 27, 2021 09:53:00", 
        "title": "Shopping Notes", 
        "context": "This is where I store all my shopping related notes  like shop contact details and items to purchase.", 
        "starred": false, 
        "deleted": false 
        }, 
        { 
        "id": 3, 
        "createdAt": "February 04, 2021 16:00:00", 
        "title": "Medical Notes", 
        "context": "This is a very important note for all the medications  that my family uses. It consists of medicine names, therapists contact  details and information related to hospitals.", 
        "starred": true, 
        "deleted": false 
        }, 
        { 
        "id": 4, 
        "createdAt": "March 14, 2021 10:10:00", 
        "title": "Friends", 
        "context": "This note consists of all my friends & their family  details like birthdays and anniversaries.", 
        "starred": false, 
        "deleted": false 
        }, 
        { 
        "id": 5, 
        "createdAt": "April 02, 2021 19:35:00", 
        "title": "Other Notes", 
        "context": "I use this note to store all other information that are  not needed temporarily.", 
        "starred": false, 
        "deleted": true 
        } 
    ],
    starredNotes: [],
    deletedNotes: [],       
    displayNotes: [],
    activeNote: null,
    showPopup: false,
}

const filterNotes = (notes) => {
    const starredNotes = notes.filter(note => note.starred);
    const deletedNotes = notes.filter(note => note.deleted);
    return {
        starredNotes,
        deletedNotes
    }
}

const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case DISPLAY_NOTES: 
            switch (action.payload) {
                case "All": return {
                    ...state,
                    displayNotes: state.notes,
                    filter: "All",
                    activeNote: state.notes[0].id,
                }

                case "Starred": {
                    return {
                        ...state,
                        displayNotes: state.starredNotes,
                        filter: "Starred",
                        activeNote: state.starredNotes[0]?.id,
                    }
                }                    
                
                case "Deleted": {
                    return {
                        ...state,
                        displayNotes: state.deletedNotes,
                        filter: "Deleted",
                        activeNote: state.deletedNotes[0]?.id,
                    }
                }
            
                default: return state
            }

        case SET_ACTIVE_NOTE: {
            return {
                ...state,
                activeNote: action.payload
            }
        }

        case TOGGLE_POPUP: {
            return {
                ...state,
                showPopup: !state.showPopup
            }
        }

        case UPDATE_NOTE: {
            const updatedNotes = [...state.notes];
            const noteIndex = updatedNotes.findIndex(note => note.id === action.payload.id)
            updatedNotes.splice(noteIndex, 1, action.payload)
            return {
                ...state,
                notes: updatedNotes
            }
        }

        case FILTER_NOTES: {
            const {starredNotes, deletedNotes} = filterNotes(state.notes);
            return {
                ...state,
                displayNotes: state.notes,
                starredNotes,
                deletedNotes
            }
        }

        case SEARCH_NOTES: {
            let regexp = new RegExp(`${action.payload}`, "i");
            const updtDisplayNotes = state.displayNotes.filter(note => {
                return note.title.match(regexp)
            });
            return {
                ...state,
                displayNotes: updtDisplayNotes,
                activeNote: updtDisplayNotes[0]?.id
            }
        }

        case TOGGLE_NOTE_STAR: {
            const updtNotes = state.notes.map(note => {
                if(note.id === action.payload) {
                    note.starred = !note.starred;
                    return note
                } else return note
            });
            
            return {
                ...state,
                notes: updtNotes
            }
        }

        case TOGGLE_NOTE_DELETE: {
            const updtNotes = state.notes.map(note => {
                if(note.id === action.payload) {
                    note.deleted = !note.deleted;
                    return note
                } else return note
            });
            
            return {
                ...state,
                notes: updtNotes
            }
        }

        default: {
            const {starredNotes, deletedNotes} = filterNotes(state.notes);
            return {
                ...state,
                displayNotes: state.notes,
                starredNotes,
                deletedNotes
            }
        }
    }
}

export default noteReducer