import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Snackbar, Alert, createTheme, ThemeProvider } from "@mui/material";

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

function LoginForm() {
	const navigate = useNavigate();
    const [showTooltip, setShowTooltip] = useState({ email: false, password: false });
    const [openDialog, setOpenDialog] = useState(false);
    const [emailForReset, setEmailForReset] = useState('');
    const [snackbarInfo, setSnackbarInfo] = useState({ open: false, message: '', severity: 'info' });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex to validate email format

	const handleSubmit = async (event) => {
		event.preventDefault();
        const email = event.target.email.value.trim().toLowerCase();
        const password = event.target.password.value;
		let hasError = false;

        setShowTooltip({ email: false, password: false });

		if (!email) {
			setShowTooltip(prev => ({ ...prev, email: true }));
			hasError = true;
		}
		if (!password) {
			setShowTooltip(prev => ({ ...prev, password: true }));
			hasError = true;
		}

		if (hasError) return;

		try {
			const response = await fetch('/api/user/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				console.error('Login failed');
				return;
			}

			const data = await response.json();
			if (data && data.id) {
				localStorage.setItem('user', JSON.stringify({
					id: data.id,
					name: data.username,
					email: data.email,
					verified: data.verified,
				}));
			navigate('/HomePage');
            }
        } catch (error) {
            setSnackbarInfo({ open: true, message: error.message, severity: 'error' });
        }
    };

    const handleOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleResetPassword = async () => {
        if (!emailRegex.test(emailForReset)) {
            setSnackbarInfo({ open: true, message: 'Invalid email format.', severity: 'error' });
            return;
        }

        try {
            const response = await fetch('/api/user/forgetpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailForReset }),
            });

            if (response.ok) {
                setSnackbarInfo({ open: true, message: 'Reset link sent to your email.', severity: 'success' });
            } else {
                throw new Error('Failed to send reset email, please try again.');
            }
        } catch (error) {
            setSnackbarInfo({ open: true, message: error.message, severity: 'error' });
        }

        handleClose();
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarInfo({ ...snackbarInfo, open: false });
	};

	return (
		<ThemeProvider theme={theme}>
			<form className="ml-6 w-5/6 mb-60 p-10 bg-stone-600 shadow-2xl rounded-2xl" onSubmit={handleSubmit}>
				<div className="mb-6">
					<label htmlFor="email" className="mb-2 block font-medium text-white text-xl">Email address</label>
					<Tooltip title="Please fill out this field" open={showTooltip.email} placement="top" arrow>
						<input type="email" name="email" id="email"
                               className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 p-4 focus:border-blue-500 focus:ring-blue-500"
						       placeholder="john.doe@company.com"/>
					</Tooltip>
				</div>
				<div className="mb-6">
					<label htmlFor="password" className="mb-2 block text-xl font-medium text-white">Password</label>
					<Tooltip title="Please fill out this field" open={showTooltip.password} placement="top" arrow>
                        <input type="password" name="password" id="password"
                               className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 p-4 focus:border-blue-500 focus:ring-blue-500"
						       placeholder="•••••••••"/>
					</Tooltip>
				</div>
                <div style={{ position: 'relative' }}>
				<button type="submit"
				        className="w-full rounded-lg bg-blue-700 px-4 text-center text-xl font-bold text-white py-2 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 sm:w-auto dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
				</button>
					<button type="button" onClick={handleOpen}
							style={{
								background: 'none',
								border: 'none',
								color: 'white',
								textDecoration: 'underline',
								cursor: 'pointer',
								padding: '0',
								fontSize: '0.875rem',
								position: 'absolute', // Position absolutely within the relative container
								bottom: '1rem', // Match this value to the bottom padding of the "Submit" button
								right: '0' // Align to the far right
							}}>
						Forgot Password?
					</button>
				</div>


			</form>
            <Dialog open={openDialog} onClose={handleClose} BackdropProps={{ style: { backgroundColor: 'transparent', boxShadow: 'none' } }}>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To reset your password, please enter your email address here. We will send a reset link to your email.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={emailForReset}
                        onChange={(e) => setEmailForReset(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleResetPassword}>Submit</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
				open={snackbarInfo.open}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				style={{ zIndex: 1500 }} // Ensure this value is greater than the Dialog's z-index
				>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbarInfo.severity}
					sx={{ width: '100%' }}
				>
					{snackbarInfo.message}
				</Alert>
			</Snackbar>
		</ThemeProvider>
	);
}

export default LoginForm;
