import React, { useState } from 'react';


const ResetPassword = () => {
    const [password, setPassword] = useState(null);
    const [error, setError] = useState('');
    const token = window.location.pathname.split("/").pop();

    const handleSubmit = async (event) => {
        setError(null)

        event.preventDefault();
        const response = await fetch(`/api/user/resetpassword/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }
        console.log(error)
        console.log(response.data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter new password" />
            <button type="submit">Reset Password</button>
        </form>
    );
};

export default ResetPassword;