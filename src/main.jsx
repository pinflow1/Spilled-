import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  componentDidCatch(error) {
    this.setState({ error: error.message })
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          background: '#0a0a0a', minHeight: '100vh',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24, fontFamily: 'monospace',
        }}>
          <div style={{
            background: '#111', border: '1px solid #333',
            borderRadius: 12, padding: 24, maxWidth: 500, width: '100%',
          }}>
            <div style={{ fontSize: 11, color: '#ff4422', fontWeight: 700, marginBottom: 12, letterSpacing: '0.1em' }}>
              CRASH ERROR
            </div>
            <div style={{ fontSize: 13, color: '#888', lineHeight: 1.6, wordBreak: 'break-all' }}>
              {this.state.error}
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)
