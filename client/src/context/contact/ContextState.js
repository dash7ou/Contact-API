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
        ]
    }

    const [state, dispatch ] = useReducer(contactReducer, initialState);

    // Add contact
    const addContact = (contact)=>{
        dispatch({ type: ADD_CONTACT, contact})
    }

    return(
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                addContact
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}

export { ContactState as default }