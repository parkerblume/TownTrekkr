import * as React from "react";
import { useNavigate } from "react-router-dom";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import SubmitButton from "../components/SubmitButton";

function LoginForm() {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://www.towntrekkr.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log('Login successful:', data);
            navigate('/HomePage'); // Redirect to HomePage on success
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle login failure (e.g., show an error message)
        }
    };

    return (<div className="form-container">
			<form className="input-field w-1/2" onSubmit={handleSubmit}>
				<EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
				<PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
				<SubmitButton text="Submit" />
			</form>
		</div>
    );
}

export default LoginForm;

