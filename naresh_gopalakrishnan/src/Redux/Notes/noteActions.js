import { DISPLAY_NOTES, SET_ACTIVE_NOTE, TOGGLE_POPUP, UPDATE_NOTE, FILTER_NOTES, SEARCH_NOTES,  TOGGLE_NOTE_DELETE, TOGGLE_NOTE_STAR } from "./noteTypes"

export const displayNotes = (payload) => {
  return {
    type: DISPLAY_NOTES,
    payload
  }
}

export const setActiveNote = (payload) => {
  return {
    type: SET_ACTIVE_NOTE,
    payload
  }
}

export const togglePopup = () => {
  return {
    type: TOGGLE_POPUP,
  }
}

export const updateNote = (payload) => {
  return {
    type: UPDATE_NOTE,
    payload
  }
}

export const filterNotes = () => {
  return {
    type: FILTER_NOTES,
  }
}

export const searchNotes = (payload) => {
  return {
    type: SEARCH_NOTES,
    payload
  }
}

export const toggleNoteDelete = (payload) => {
  return {
    type: TOGGLE_NOTE_DELETE,
    payload
  }
}

export const toggleNoteStar = (payload) => {
  return {
    type: TOGGLE_NOTE_STAR,
    payload
  }
}