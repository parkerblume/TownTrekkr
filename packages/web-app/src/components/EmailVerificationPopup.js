import React, { useState } from 'react';

const EmailVerificationPopup = ({ user, onClose }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [resendMessage, setResendMessage] = useState('');

  const handleVerify = async () => {
    if (user.verified === true) {
      onClose();
      return;
    }
    
    if (!code) {
      setError('Please enter the verification code.');
      //user.verified = true;
      console.log('Status: ', user.verified);
      return;
    }

    try {
      const response = await fetch('/api/user/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email, code }),
      });

      if (!response.ok) {
        throw new Error('Verification failed.');
      }

      const data = await response.json();
      if (data.success) {
        onClose();
      } else {
        setError('Verification failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during verification. Please try again.');
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await fetch('/api/user/sendemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });

      if (!response.ok) {
        throw new Error('Failed to resend the code.');
      }

      setResendMessage('A new code has been sent to your email.');
    } catch (error) {
      setError('An error occurred while resending the code.');
    }
  };

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(5px)',
      }} />
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '50%',
        height: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#ABC4AB',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}>
        <h2>Please check your email for a verification code:</h2>
        <input type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="Verification Code" style={{ fontSize: '20px', padding: '10px', margin: '20px', width: '80%' }} />
        <button onClick={handleVerify} style={{ fontSize: '20px', padding: '10px 20px', backgroundColor: '#DCC9B6'}}>Verify</button>
        <button onClick={handleResendCode} style={{ fontSize: '20px', padding: '10px 20px', backgroundColor: '#ABC4AB', color: 'white', border: 'none', borderRadius: '5px' }}>Resend Code</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {resendMessage && <p style={{ color: 'green' }}>{resendMessage}</p>}
      </div>
    </>
  );
};

export default EmailVerificationPopup;
