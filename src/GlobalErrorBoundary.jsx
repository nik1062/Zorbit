import React from 'react';

export default class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("Global Error Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', background: '#222', color: '#ff5555', fontFamily: 'monospace', minHeight: '100vh' }}>
          <h1>React Runtime Error</h1>
          <p>{this.state.error && this.state.error.toString()}</p>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px', marginTop: '1rem' }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer' }}>Reload Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}
