import React, { useState } from 'react';

const ChangePasswordComp = (props) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword && password !== '' || confirmPassword !== '') {
            alert('Lozinka je izmijenjena:', password);
            setPassword('');
            setConfirmPassword('');
        }
        else if (password === '' && confirmPassword === ''){
            alert('Lozinka ne smije biti prazno polje.');
            setPassword('');
            setConfirmPassword('');
        }
            else {
            alert("Lozinke se ne podudaraju.");
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="password"
                    id="newPassword"
                    placeholder="Unesite novu lozinku"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Ponovite novu lozinku"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="change-password">Sačuvaj</button>
        </form>
    );
};

export default ChangePasswordComp;
