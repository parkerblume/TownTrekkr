import React, { useState } from 'react';
import { Tooltip, Snackbar, Alert } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Define the theme for tooltips
const theme = createTheme({
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: '#55a25a', // Dark green
                    color: 'white',
                    fontSize: '0.875rem',
                },
            },
        },
    },
});

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [snackbarInfo, setSnackbarInfo] = useState({ open: false, message: '', severity: 'info' });
    const [tooltipError, setTooltipError] = useState('');
    const token = window.location.pathname.split("/").pop();

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTooltipError('');  // Clear previous tooltip errors

        if (!password) {
            setTooltipError("Password is required");
            return;  // Stop form submission if no password is entered
        } else if (!strongPasswordRegex.test(password)) {
            setSnackbarInfo({ open: true, message: "Password does not meet criteria", severity: 'error' });
            setTooltipError("Password does not meet criteria");
            return;
        }

        try {
            const response = await fetch(`/api/user/resetpassword/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            if (!response.ok) {
                throw new Error('Password reset failed');
            }

            setPassword(''); // Clear password after successful reset
            setSnackbarInfo({ open: true, message: 'Password Changed Successfully', severity: 'success' });
        } catch (error) {
            setSnackbarInfo({ open: true, message: error.message || 'Failed to reset password', severity: 'error' });
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarInfo({ ...snackbarInfo, open: false });
    };

    return (
        <ThemeProvider theme={theme}>
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
                    <h2 style={{ textAlign: 'center' }}>New Password</h2>
                    <Tooltip title={tooltipError} open={Boolean(tooltipError)} placement="top" arrow>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            style={{
                                margin: '10px 0',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc'
                            }}
                        />
                    </Tooltip>
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
                </form>
            </div>
            <Snackbar open={snackbarInfo.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarInfo.severity} sx={{ width: '100%' }}>
                    {snackbarInfo.message}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
};

export default ResetPassword;
