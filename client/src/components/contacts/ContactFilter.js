import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = ()=>{
    const { filterContact, clearFilter, contactFiltered } = useContext(ContactContext)
    const text = useRef('');

    useEffect(()=>{
        if(contactFiltered === null){
            text.current.value = ''
        }
    })

    const onChange = e =>{
        if(text.current.value !== ''){
            filterContact(e.target.value)
        }else{
            clearFilter()
        }
    }

    return(
        <form>
            <input type='text' ref={text} placeholder="Filter Contact..." onChange={onChange}/>
        </form>
    );
};

export { ContactFilter as default }