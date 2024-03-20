import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './layouts/Layout';
import { ThemeProvider } from '@mui/material';
import theme from './themes/theme';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route element={<Home />} path="/" />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
