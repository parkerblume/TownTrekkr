import React, { useState } from 'react';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const token = window.location.pathname.split("/").pop();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess(false);
        
        const response = await fetch(`/api/user/resetpassword/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
        } else {
            setSuccess(true);
            setPassword(''); // Clear password after successful reset
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#90EE90' // Light green background
        }}>
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                width: '300px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                padding: '20px',
                borderRadius: '5px',
                backgroundColor: 'white'
            }}>
                <h2 style={{ textAlign: 'center' }}>Enter New Password</h2>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="password"
                    style={{
                        margin: '10px 0',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc'
                    }}
                />
                <button type="submit" style={{
                    padding: '10px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>
                    Reset Password
                </button>
                {error && (
                    <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>
                )}
                {success && (
                    <div style={{ color: 'green', marginTop: '10px' }}>Password Changed</div>
                )}
            </form>
        </div>
    );
};

export default ResetPassword;
