import React, { useState } from 'react';
import axios from './axios';

function ForgotPassword() {
    const [id_forgot, setId_forgot] = useState({
        email_id: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange1 = (e) => {
        setId_forgot({ ...id_forgot, [e.target.name]: e.target.value });
    }

    const handleSubmit1 = (e) => {
        e.preventDefault();
        setErrorMessage("Please Wait...")
        axios.post('/login/forgot_password', id_forgot)
            .then((res) => {
                console.log("forgot_password: ", res.data);
                if (res.status === 200) {
                    // Password recovery email sent successfully
                    setErrorMessage('Password sent to your email.');
                }
            })
            .catch((error) => {
                console.log("Error:", error.response);
                if (error.response.status === 404) {
                    // Email ID not found in the database
                    setErrorMessage('Email ID not found. Please check your email ID.');
                } else {
                    setErrorMessage('Failed to send password recovery email. Please try again later.');
                }
            });
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title" style={{ fontSize: '24px' }}>Forgot Password</h4>
                            <form>
                                <br />
                                <div className="form-group" style={{ marginBottom: '10px' }}>
                                    <label htmlFor="email_id" style={{ fontSize: '18px' }}>Enter your email_id (password will be sent to this mail-id):</label>
                                    <input type="text" className="form-control" id="email_id" name="email_id" value={id_forgot.email_id} placeholder="Enter your email ID" onChange={handleChange1} />
                                </div>
                                <button type="submit" className="btn btn-outline-success btn-lg" onClick={handleSubmit1}>Send Code</button>
                            </form>
                            {errorMessage && <div className="alert alert-primary mt-3" role="alert">{errorMessage}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
