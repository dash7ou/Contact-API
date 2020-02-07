import { 
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER,
    CONTACT_ERROR
} from "../type"

export default (state, action)=>{
    switch(action.type){
        case ADD_CONTACT:
            return {
                ...state,
                contacts:[
                    ...state.contacts,
                    action.contact
                ],
                errorContact: null
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts:[
                    ...state.contacts.filter(contact => contact.id !== action.contactId)
                ],
                errorContact: null
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.contact
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact.id === action.newContact.id ? action.newContact : contact),
                errorContact: null
            }
        case FILTER_CONTACT:
            return {
                ...state,
                contactFiltered: [
                    ...state.contacts.filter(contact =>{
                        return contact.name.toLowerCase().includes(action.filterText) || contact.email.toLowerCase().includes(action.filterText)
                    })
                ]
            }
        case CLEAR_FILTER:
            return {
                ...state,
                contactFiltered: null
            }
        case CONTACT_ERROR:
            return {
                ...state,
                errorContact: action.error
            }
        default:
            return state
    }
}