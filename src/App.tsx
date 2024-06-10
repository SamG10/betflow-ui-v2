import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from './themes/theme';
import LiveEvents from './pages/LiveEvents';
import Dashboard from './pages/Dashboard';
import MyBets from './pages/MyBets';
import Layout from './layouts/Layout';
import styles from './styles/App.module.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Calendar from './pages/Calendar';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className={styles.layout_container}>
            <Layout>
              <div className={styles.page_content}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/liveEvents" element={<LiveEvents />} />
                  <Route path="/myBets" element={<MyBets />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/calendar" element={<Calendar />} />
                </Routes>
              </div>
            </Layout>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
