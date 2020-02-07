import React, { useState, useContext, useEffect } from 'react';
import ContactContext from "../../context/contact/contactContext";


const ContactForm = ()=>{
    const { addContact, current, clearCurrent, updateContact } =useContext(ContactContext);
    const [contact , setContact ] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });
    const {name , email, phone , type} = contact;

    useEffect(()=>{
        if(current !== null){
            setContact(current)
        }else{
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
    }, [ current, ContactContext])

    const onChange = e => setContact({...contact, [e.target.name]: e.target.value});
    const onSubmit = e =>{
        e.preventDefault();
        console.log('fu....')
        if(current === null ){
            addContact(contact)
        }else {
            updateContact(contact)
        }
        clearAll()
    }

    const clearAll = () =>{
        clearCurrent();
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        })
    }
    return (
        <form onSubmit={ onSubmit }>
            <h2 className='text-primary'> { current ? 'Edit Contact' : 'Add Contact'} </h2>
            <input
                type="text"
                placeholder='name'
                name='name'
                value={name}
                onChange={onChange}
            />
            <input
                type="text"
                placeholder='email'
                name='email'
                value={email}
                onChange={onChange}
            />
            <input
                type="text"
                placeholder='phone'
                name='phone'
                value={phone}
                onChange={onChange}
            />
            <h5>Contact Type</h5>
            <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange}/> Personal{' '}
            <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange}/> professional {' '}
            <div>
                <input type='submit' value={current? 'Update Contact':'Add Contact'} className='btn btn-primary btn-block'/>
            </div>
            {current && <div>
                <button className='btn btn-light btn-block' onClick={clearAll}>Cancel</button>
            </div>}
        </form>
    );
}

export { ContactForm as default }