import React, {Fragment, useContext, useEffect} from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group"
import ContactContext from "../../context/contact/contactContext"
import ContactItem from "./ContactItem";
import Spinner from "../../components/layout/Spinner"

const Contacts = ()=>{
    const { contacts, deleteContact, setCurrent,contactFiltered , getContext} = useContext(ContactContext);

    useEffect(()=>{
        getContext();
    }, [])

    if(contacts !== null && contacts.length === 0){
        return(<h4>Please enter contact :) </h4>)
    }


    return(
        <Fragment>
        {contacts !== null ? (
            <TransitionGroup>
            {
                contactFiltered ? contactFiltered.map(contact =>
                    <CSSTransition key={contact._id} timeout={500} classNames="item">
                        <ContactItem  
                            contact={contact}
                            deleteContact={deleteContact}
                            setCurrent={setCurrent}
                        />
                    </CSSTransition>
                ):
                contacts.map(contact =>
                    <CSSTransition key={contact._id} timeout={500} classNames="item">
                        <ContactItem  
                            contact={contact}
                            deleteContact={deleteContact}
                            setCurrent={setCurrent}
                        />
                    </CSSTransition>
                )
            }
            </TransitionGroup>
        ): <Spinner />}
            
        </Fragment>
    )
}


export { Contacts as default }
