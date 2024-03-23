import * as React from "react";
import { useNavigate } from "react-router-dom";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import SubmitButton from "../components/SubmitButton";
import UsernameInput from "../components/UsernameInput";

function RegisterForm() {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://www.towntrekkr.com/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, username }),
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            const data = await response.json();
            console.log('Signup successful:', data);
            navigate('/HomePage');
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
		<div className="form-container">
			<form className="input-field w-1/2" onSubmit={handleSubmit}>
				<UsernameInput value={username} onChange={(e) => setUsername(e.target.value)} />
				<EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
				<PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
				<SubmitButton text="Submit" />
			</form>
		</div>
    );
}

export default RegisterForm;



