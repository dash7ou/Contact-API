import React from "react";
import PropTypes from "prop-types"


const ContactItem = ({contact, deleteContact,setCurrent })=>{

    const { _id, name , email, phone , type } = contact;
    const typeUpper = `${type.charAt(0).toUpperCase()}${type.slice(1)}`
    return(
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name}{' '}
                <span style={{float: 'right'}}
                    className= {'badge '+ (type === 'professional' ? 'badge-success': 'badge-primary')}
                >
                    { typeUpper }
                </span>
            </h3>
            <ul>
                {email && (
                    <li>
                        <i className='fas fa-envelope-open'/> { email }
                    </li>
                )}

                {phone && (
                    <li>
                        <i className='fas fa-phone'/> { phone }
                    </li>
                )}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={()=>setCurrent(contact)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={()=>deleteContact(_id)}>delete</button>
            </p>
        </div>
    );
};


ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
}

export { ContactItem as default }

