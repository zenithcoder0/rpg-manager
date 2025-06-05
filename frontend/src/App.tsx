import { useState } from 'react';
import { supabase } from './supabaseclient';

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignUp = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setError(error.message)
    else setError('Check your email for confirmation.')
    setLoading(false)
  }

  const handleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else setError('')
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Login / Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleLogin} disabled={loading}>Login</button>
      <button onClick={handleSignUp} disabled={loading}>Sign Up</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}


