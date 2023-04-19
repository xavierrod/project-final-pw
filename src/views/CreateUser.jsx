import React, { useState } from 'react';

function CreateUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type='email' value={email} onChange={handleEmailChange} />
      </label>
      <label>
        Password:
        <input
          type='password'
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <button type='submit'>Sign Up</button>
    </form>
  );
}

export default CreateUser;
