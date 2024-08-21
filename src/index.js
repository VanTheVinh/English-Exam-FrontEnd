import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App'; // Đảm bảo đường dẫn đúng
import GlobalStyles from './components/globalStyles'; // Đảm bảo đường dẫn đúng
import { AppProvider } from './context/AppContext'; // Đảm bảo đường dẫn đúng

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GlobalStyles>
      <AppProvider>
        <App />
      </AppProvider>
    </GlobalStyles>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
