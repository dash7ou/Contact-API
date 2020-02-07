import React , { useContext } from 'react';
import alertContext from "../../context/alert/alertContext";

const Alerts = ()=>{
    const { alerts } = useContext(alertContext);
    return(
        alerts.length>0 && (
            <div key={alerts[0].id} className={`alert alert-${alerts[0].type}`}>
                <i className="fas fa-info-circle"/> {alerts[0].msg}
            </div>
        )
    )
};


export { Alerts as default }