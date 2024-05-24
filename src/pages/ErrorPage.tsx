import * as React from 'react';
import Spinner from "react-bootstrap/Spinner";


function ErrorPage() {
    return(
        <>
        <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100wh' }}>
        <Spinner animation="border" />
        </div>
        </>
    )
}

export default ErrorPage;