import React, { Component, ErrorInfo, ReactNode } from "react";

/**
 * Simple error boundary component. Wrap any part of the app that could
 * throw runtime errors with this component. When an error is caught
 * the fallback UI is shown and the error is logged to the console. See
 * https://reactjs.org/docs/error-boundaries.html for guidance.
 */
type ErrorBoundaryProps = { children: ReactNode };
type ErrorBoundaryState = { hasError: boolean; error: unknown };

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: unknown) {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-600">
          <h2 className="text-lg font-semibold mb-2">A apărut o eroare</h2>
          <p className="text-sm">Ne pare rău, ceva nu a mers bine. Te rugăm să reîncarci pagina sau să revii mai târziu.</p>
        </div>
      );
    }
    return this.props.children;
  }
}