import React, { useState } from 'react';
import { handleSignup, handleLogin } from './SignupLogin';

const SignupLoginModal = ({ show, onClose, type, setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (!show) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (type === 'signup') {
            await handleSignup({ email, password });
        } else if (type === 'login') {
            const sucess=await handleLogin({ email, password });
            if(sucess)setIsLoggedIn(true);
        }
        
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{type === 'signup' ? '회원가입' : '로그인'}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">{type === 'signup' ? '회원가입' : '로그인'}</button>
                    <button type="button" onClick={onClose}>닫기</button>
                </form>
            </div>
        </div>
    );
};

export default SignupLoginModal;
