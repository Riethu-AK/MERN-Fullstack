import { useState, useEffect } from 'react'

function App() {
  const [isAuthed, setIsAuthed] = useState(false)
  const [authMode, setAuthMode] = useState('login') // 'login' | 'signup'
  const [authForm, setAuthForm] = useState({ email: '', password: '', confirm: '' })
  const [authError, setAuthError] = useState('')

  const [expenses, setExpenses] = useState([])
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editDesc, setEditDesc] = useState('')
  const [editAmt, setEditAmt] = useState('')

  const API = 'https://expense-tracker-mern-wnyw.onrender.com'

  useEffect(() => {
    if (isAuthed) {
      fetchExpenses()
    }
  }, [isAuthed])

  const fetchExpenses = async () => {
    try {
      const res = await fetch(`${API}/expenses`)
      const data = await res.json()
      setExpenses(data)
    } catch (err) {
      console.error('Error fetching expenses:', err)
    }
  }

  const handleAuthChange = (field, value) => {
    setAuthForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSignup = async () => {
    if (!authForm.email || !authForm.password || !authForm.confirm) {
      return setAuthError('Please fill all fields')
    }
    if (authForm.password !== authForm.confirm) {
      return setAuthError('Passwords do not match')
    }
    try {
      const res = await fetch(`${API}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authForm.email, password: authForm.password })
      })
      const data = await res.json()
      if (data.success) {
        setAuthMode('login')
        setAuthError('Signup successful. Please log in.')
        setAuthForm({ email: authForm.email, password: '', confirm: '' })
      } else {
        setAuthError(data.message)
      }
    } catch (err) {
      setAuthError('Signup failed: ' + err.message)
    }
  }

  const handleLogin = async () => {
    if (!authForm.email || !authForm.password) {
      return setAuthError('Please fill all fields')
    }
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authForm.email, password: authForm.password })
      })
      const data = await res.json()
      if (data.success) {
        setAuthError('')
        setIsAuthed(true)
      } else {
        setAuthError(data.message)
      }
    } catch (err) {
      setAuthError('Login failed: ' + err.message)
    }
  }

  const toggleMode = () => {
    setAuthMode((m) => (m === 'login' ? 'signup' : 'login'))
    setAuthError('')
  }

  const addExpense = async () => {
    if (!description || !amount) return alert('Fill all fields')
    try {
      const res = await fetch(`${API}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, amount: parseFloat(amount), date: new Date() })
      })
      const newExpense = await res.json()
      setExpenses([...expenses, newExpense])
      setDescription('')
      setAmount('')
    } catch (err) {
      console.error('Error adding expense:', err)
    }
  }

  const deleteExpense = async (id) => {
    try {
      await fetch(`${API}/expenses/${id}`, { method: 'DELETE' })
      setExpenses(expenses.filter(e => e._id !== id))
    } catch (err) {
      console.error('Error deleting expense:', err)
    }
  }

  const startEdit = (expense) => {
    setEditingId(expense._id)
    setEditDesc(expense.description)
    setEditAmt(expense.amount)
  }

  const updateExpense = async (id) => {
    if (!editDesc || !editAmt) return alert('Fill all fields')
    try {
      const res = await fetch(`${API}/expenses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: editDesc, amount: parseFloat(editAmt) })
      })
      const updatedExpense = await res.json()
      setExpenses(expenses.map(e => e._id === id ? updatedExpense : e))
      setEditingId(null)
    } catch (err) {
      console.error('Error updating expense:', err)
    }
  }

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)

  const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#111',
    color: '#f5f5f5',
    padding: '20px'
  }

  const cardStyle = {
    width: '100%',
    maxWidth: '520px',
    padding: '24px',
    borderRadius: '12px',
    background: '#1c1c1c',
    boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
    textAlign: 'center'
  }

  const inputDivStyle = {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginBottom: '16px',
    flexWrap: 'wrap'
  }

  const fieldStyle = {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #444',
    background: '#222',
    color: '#f5f5f5'
  }

  const buttonStyle = {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #444',
    background: '#111',
    color: '#f5f5f5',
    cursor: 'pointer'
  }

  if (!isAuthed) {
    return (
      <div style={pageStyle}>
        <div style={cardStyle}>
          <h1 style={{ marginBottom: '12px' }}>Expense Tracker</h1>
          <h2 style={{ margin: '0 0 16px' }}>{authMode === 'login' ? 'Login' : 'Sign Up'}</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
            <input
              style={fieldStyle}
              type="email"
              placeholder="Email"
              value={authForm.email}
              onChange={(e) => handleAuthChange('email', e.target.value)}
            />
            <input
              style={fieldStyle}
              type="password"
              placeholder="Password"
              value={authForm.password}
              onChange={(e) => handleAuthChange('password', e.target.value)}
            />
            {authMode === 'signup' && (
              <input
                style={fieldStyle}
                type="password"
                placeholder="Confirm Password"
                value={authForm.confirm}
                onChange={(e) => handleAuthChange('confirm', e.target.value)}
              />
            )}
          </div>

          {authError && <p style={{ color: '#ff6b6b', marginTop: 0 }}>{authError}</p>}

          {authMode === 'login' ? (
            <button style={buttonStyle} onClick={handleLogin}>Login</button>
          ) : (
            <button style={buttonStyle} onClick={handleSignup}>Sign Up</button>
          )}

          <p style={{ marginTop: '12px' }}>
            {authMode === 'login' ? 'No account yet?' : 'Already have an account?'}{' '}
            <button style={{ ...buttonStyle, padding: '6px 10px' }} onClick={toggleMode}>
              {authMode === 'login' ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1>Expense Tracker</h1>
        
        <div style={inputDivStyle}>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={fieldStyle}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={fieldStyle}
          />
          <button style={buttonStyle} onClick={addExpense}>Add Expense</button>
        </div>

        <h2>Total: ₹{totalExpenses.toFixed(2)}</h2>

        <div style={{ width: '100%', marginTop: '12px' }}>
          {expenses.map((expense) => (
            <div key={expense._id} style={{ border: '1px solid #333', padding: '10px', margin: '10px 0', textAlign: 'left', borderRadius: '8px', background: '#161616' }}>
              {editingId === expense._id ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input
                    type="text"
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    placeholder="Description"
                    style={fieldStyle}
                  />
                  <input
                    type="number"
                    value={editAmt}
                    onChange={(e) => setEditAmt(e.target.value)}
                    placeholder="Amount"
                    style={fieldStyle}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={buttonStyle} onClick={() => updateExpense(expense._id)}>Save</button>
                    <button style={buttonStyle} onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                  <p style={{ margin: 0 }}>{expense.description} - ₹{expense.amount.toFixed(2)}</p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={buttonStyle} onClick={() => startEdit(expense)}>Edit</button>
                    <button style={buttonStyle} onClick={() => deleteExpense(expense._id)}>Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
