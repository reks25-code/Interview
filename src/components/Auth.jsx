import React, { useState } from 'react';
import { useStorage } from '../hooks/useStorage';

const Auth = ({ onComplete }) => {
  const { user: storedUser, saveUser } = useStorage();
  const [isRegister, setIsRegister] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [backendUp, setBackendUp] = useState(true);

  // check backend health once
  React.useEffect(() => {
    fetch('http://localhost:4000/api/health')
      .then(r => {
        if (!r.ok) throw new Error('backend not ok');
        setBackendUp(true);
      })
      .catch(() => setBackendUp(false));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return setError('Please provide email and password');
    if (isRegister) {
      if (!backendUp) {
        // fallback to local registration
        const newUser = { name: name || email.split('@')[0], email, password, skills: [], resume: null };
        saveUser(newUser);
        onComplete && onComplete(newUser);
        return;
      }

      fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
        .then(async (r) => {
          const json = await r.json().catch(() => ({}));
          if (!r.ok) throw new Error(json.error || 'Registration failed');
          return json;
        })
        .then(data => {
          const newUser = data.user;
          saveUser(newUser);
          onComplete && onComplete(newUser);
        })
        .catch((err) => setError(err.message || 'Registration failed'));
    } else {
      if (!backendUp) {
        // attempt to login from local storage
        if (storedUser && storedUser.email === email && storedUser.password === password) {
          onComplete && onComplete(storedUser);
          return;
        }
        return setError('Backend unreachable and no local user matches');
      }

      // login via server
      fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
        .then(async (r) => {
          const json = await r.json().catch(() => ({}));
          if (!r.ok) throw new Error(json.error || 'Login failed');
          return json;
        })
        .then(data => {
          saveUser(data.user);
          onComplete && onComplete(data.user);
        })
        .catch((err) => setError(err.message || 'Login failed'));
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Institute-style background image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(15,23,42,0.35), rgba(15,23,42,0.35)), url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          filter: 'brightness(0.95)'
        }}
      />

      <div className="relative z-10 w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">{isRegister ? 'Register' : 'Login'}</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name (optional)" className="w-full p-2 border rounded" />
          )}
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border rounded" />

          <div className="flex items-center justify-between">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded">{isRegister ? 'Register' : 'Login'}</button>
            <button type="button" onClick={()=>{setIsRegister(!isRegister); setError('');}} className="text-sm text-indigo-600 underline">{isRegister ? 'Have an account? Login' : "Don't have account? Register"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
