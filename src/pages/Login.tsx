import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

interface LoginFormData {
    email: string;
    password: string;
}

interface LocationState {
    message?: string;
    from?: string;
}

interface LoginError {
    message: string;
}

const Login: React.FC = (): JSX.Element => {
    const [loginFormData, setLoginFormData] = useState<LoginFormData>({ email: '', password: '' });
    const [status, setStatus] = useState<'idle' | 'submitting'>('idle');
    const [error, setError] = useState<LoginError | null>(null);

    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState;
    const from = state?.from || '/host';

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setStatus('submitting');
        try {
            await loginUser(loginFormData);
            setError(null);
            localStorage.setItem('loggedin', 'true');
            navigate(from, { replace: true });
        } catch (err) {
            setError(err as LoginError);
        } finally {
            setStatus('idle');
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="login-container">
            {state?.message && (
                <h3 className="login-error">{state.message}</h3>
            )}
            <h1>Sign in to your account</h1>
            {error?.message && (
                <h3 className="login-error">{error.message}</h3>
            )}

            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={loginFormData.email}
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={loginFormData.password}
                />
                <button
                    disabled={status === 'submitting'}
                >
                    {status === 'submitting'
                        ? 'Logging in...'
                        : 'Log in'
                    }
                </button>
            </form>
        </div>
    );
};

export default Login; 