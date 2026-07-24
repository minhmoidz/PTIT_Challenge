import { Component, type ReactNode, type ErrorInfo } from 'react';
import { Typography, Button, Container } from '@mui/material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ mb: 2 }} color="error">
            Đã có lỗi xảy ra
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Vui lòng thử tải lại trang. Nếu lỗi vẫn tiếp diễn, hãy liên hệ Ban Tổ chức.
          </Typography>
          <Button variant="contained" onClick={this.handleReset}>
            Tải lại
          </Button>
        </Container>
      );
    }
    return this.props.children;
  }
}
