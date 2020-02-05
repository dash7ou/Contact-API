import React, {Fragment, useContext} from "react";
import ContactContext from "../../context/contact/contactContext"
import ContactItem from "./ContactItem";

const Contacts = ()=>{
    const { contacts, deleteContact, setCurrent,contactFiltered } = useContext(ContactContext);

    if(contacts.length === 0){
        return(<h4>Please enter contact :) </h4>)
    }
    return(
        <Fragment>
            {
                contactFiltered ? contactFiltered.map(contact => 
                    <ContactItem  
                        contact={contact}
                        deleteContact={deleteContact}
                        setCurrent={setCurrent}
                        key={contact.id}
                    />
                ):
                contacts.map(contact => 
                    <ContactItem  
                        contact={contact}
                        deleteContact={deleteContact}
                        setCurrent={setCurrent}
                        key={contact.id}
                    />
                )
            }
        </Fragment>
    )
}


export { Contacts as default }