import React , { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import { 
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER
} from "../type"


const ContactState = props =>{
    const initialState = {
        contacts : [
            {
                id: 1,
                name: 'hadeel',
                phone: '2222-00-22',
                type: "professional",
                email: "morad@gmail.com"
            },
            {
                id: 2,
                email: "mohammed@gmail.com",
                name: 'shimaa',
                phone: '3333-00-22',
                type: "personal"
            },
            {
                id: 3,
                email: "nooor@gmail.com",
                name: 'noor',
                phone: '553-10-21',
                type: "personal"
            }
        ],
        current: null,
        contactFiltered: null
    }

    const [state, dispatch ] = useReducer(contactReducer, initialState);

    // Add contact
    const addContact = (contact)=>{
        contact.id = uuid.v4();
        dispatch({ type: ADD_CONTACT, contact})
    }

    // Delete contact
    const deleteContact = (contactId) =>{
        dispatch({ type: DELETE_CONTACT, contactId})
    }

    // Set current
    const setCurrent = (contact)=>{
        dispatch({type: SET_CURRENT, contact})
    }

    // Clear currnet
    const clearCurrent = ()=>{
        dispatch({type: CLEAR_CURRENT})
    }

    // Update Current
    const updateContact = (newContact)=>{
        dispatch({ type: UPDATE_CONTACT, newContact})
    }

    // Filter Contact
    const filterContact = (filterText)=>{
        dispatch({type: FILTER_CONTACT,filterText })
    }

    // Clear Filter
    const clearFilter = ()=>{
        dispatch({type: CLEAR_FILTER})
    }
    return(
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContact,
                contactFiltered: state.contactFiltered,
                clearFilter
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}

export { ContactState as default }