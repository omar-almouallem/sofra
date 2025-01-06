import { StrictMode } from 'react';
import { ConfigProvider } from 'antd';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes/routes';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { BrowserRouter } from 'react-router-dom';



export function App ()
{
  return (

    <StrictMode>
      
      <AuthProvider>
      <CartProvider>

      <ConfigProvider theme={{
        token: {
          fontFamily: "PT Serif, serif"
        }
      }}>
        <ToastContainer
          position='top-center'
          theme='light'
        />
        <Routes />
      </ConfigProvider>
      </CartProvider>
      </AuthProvider>
    </StrictMode >
  );
}

export default App;
