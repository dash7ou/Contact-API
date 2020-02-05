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
                name: 'hadeel al-mora',
                phone: '2222-00-22',
                type: "professional",
                email: "morad@gmail.com"
            },
            {
                id: 2,
                email: "mohammed@gmail.com",
                name: 'shimaa al-mora',
                phone: '3333-00-22',
                type: "personal"
            }
        ]
    }

    const [state, dispatch ] = useReducer(contactReducer, initialState);
    return(
        <ContactContext.Provider
            value={{
                contacts: state.contacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}

export { ContactState as default }