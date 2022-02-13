import { ReplayCircleFilled } from '@mui/icons-material';
import React, { useLayoutEffect, useState } from 'react';
import { Navigate } from "react-router-dom";

import HeliosAlert from '../components/Alert';
import { InitialTransition } from '../components/Transition';
import Login from '../Login';

export default function Dashboard({token, setToken}){
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState("error");
    const [alertContent, setAlertContent] = useState("");
    useLayoutEffect(() => {
        fetch('http://localhost:9999/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: token})
        })
        .then(data => {
            if(data.status === 401){
                localStorage.removeItem('token');
                <Login setToken={setToken} />
            }
        })
    })
    return (
        <><div className='App'>
            {showAlert && <HeliosAlert text={alertContent} type={alertType} />}
        </div><InitialTransition /></>
    );
}