import React , { useReducer } from "react";
import axios from "axios";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import { 
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONATACTS
} from "../type"


const ContactState = props =>{
    const initialState = {
        contacts : null,
        current: null,
        contactFiltered: null,
        errorContact: null
    }

    const [state, dispatch ] = useReducer(contactReducer, initialState);


    // get all contact to the user login
    const getContext = async ()=>{
        try{
            const res = await axios.get("/api/v1/contacts");
            dispatch({
                type: GET_CONTACTS,
                contacts: res.data.contacts
            })
        }catch(err){
            dispatch({ type: CONTACT_ERROR, error: err.response.data.error })
        }
    }

    // Add contact
    const addContact = async (contact)=>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
            const res = await axios.post("/api/v1/contacts", contact, config)
            dispatch({ type: ADD_CONTACT, contact: res.data})
        }catch(err){
            dispatch({ type: CONTACT_ERROR, error: err.response.data.error })
        }
    }

    // Delete contact
    const deleteContact = async (contactId) =>{
        try{
            await axios.delete(`/api/v1/contacts/${contactId}`)
            dispatch({ type: DELETE_CONTACT, contactId})
        }catch(err){
            dispatch({ type: CONTACT_ERROR, error: err.response.data.error })
        }
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

    const clearContacts = ()=>{
        dispatch({ type: CLEAR_CONATACTS})
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
                clearFilter,
                errorContact : state.errorContact,
                getContext,
                clearContacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}

export { ContactState as default }