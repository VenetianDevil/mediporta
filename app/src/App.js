import './App.css';
import 'react-notifications/lib/notifications.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Tags from './pages/tags/tags.tsx';
import { HelmetProvider } from 'react-helmet-async';
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import { NotificationContainer } from 'react-notifications';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Container } from 'react-bootstrap';

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <header>
            </header>
            <main>
              <Container>
                <Routes>
                  <Route path='*' element={<Navigate to="/tagi" />} />
                  <Route path="/tagi" element={<Tags />} />
                </Routes>
              </Container>
            </main>
            <footer>

            </footer>
          </Router>
        </QueryClientProvider>
      </HelmetProvider>

      <NotificationContainer />
    </div>
  );
}

export default App;
