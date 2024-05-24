import * as React from 'react';
import Spinner from "react-bootstrap/Spinner";


function ClientProfile() {
    return(
        <>
        <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100wh' }}>
        <Spinner animation="border" />
        </div>
        </>
    )
}

export default ClientProfile;