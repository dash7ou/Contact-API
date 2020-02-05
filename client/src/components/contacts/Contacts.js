import React, {Fragment, useContext} from "react";
import ContactContext from "../../context/contact/contactContext"
import ContactItem from "./ContactItem";

const Contacts = ()=>{
    const { contacts, deleteContact } = useContext(ContactContext);
    return(
        <Fragment>
            {
                contacts.map(contact => 
                    <ContactItem  
                        contact={contact}
                        deleteContact={deleteContact}
                        key={contact.id}
                    />
                )
            }
        </Fragment>
    )
}


export { Contacts as default }