import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './route/App';
import Game from './route/Game';
import Rule from './route/Rule';
import { Route, Routes, HashRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import UserNameProvider from './context/userName';

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter className="App">
    <UserNameProvider>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<App />}/>
          <Route path="/game/:mode" element={<Game />} />
          <Route path="/rule" element={<Rule />} />
        </Routes>
      </ThemeProvider>
    </UserNameProvider>
  </HashRouter>
);

