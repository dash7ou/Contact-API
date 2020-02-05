import React, {Fragment, useContext} from "react";
import ContactContext from "../../context/contact/contactContext"
import ContactItem from "./ContactItem";

const Contacts = ()=>{
    const { contacts, deleteContact, setCurrent } = useContext(ContactContext);
    return(
        <Fragment>
            {
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