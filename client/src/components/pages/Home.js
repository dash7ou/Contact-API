import React, { useEffect, useContext , Fragment} from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";
import authContext from "../../context/auth/authContext";
import contactContext from "../../context/contact/contactContext";
import alertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";
const Home = ()=>{
    const { loadUser } = useContext(authContext);
    const { errorContact } = useContext(contactContext);
    const { alerts,setAlert } = useContext(alertContext)
    useEffect(()=>{
        loadUser()
        if(errorContact){
            setAlert(errorContact, 'danger')
        }
        // eslint-disable-next-line
    }, [ errorContact ])
    return (
        <Fragment>
            <Alerts />
            <div className="grid-2">
                <div>
                    <ContactForm />
                </div>
                <div>
                    <ContactFilter />
                    <Contacts />
                </div>
            </div>
        </Fragment>
    )
}


export { Home as default}