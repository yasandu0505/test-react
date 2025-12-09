import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/status')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then(data => {
        setResponse(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <h1>Status Response</h1>
      <div className="card">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {response && (
          <pre style={{ textAlign: 'left', background: '#000000', padding: '1rem', borderRadius: '4px' }}>
            {JSON.stringify(response, null, 2)}
          </pre>
        )}
      </div>
    </>
  )
}

export default App
