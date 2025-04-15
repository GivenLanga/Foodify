// src/components/ErrorBoundary.js
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to display fallback UI after an error is thrown
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log error information to an error reporting service here
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error is encountered
      return <h2>Something went wrong. Please try refreshing the page.</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
