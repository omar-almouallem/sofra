import { StrictMode } from 'react';
import { ConfigProvider } from 'antd';
import 'react-toastify/dist/ReactToastify.css';



export function App ()
{
  return (

    <StrictMode>

      <ConfigProvider theme={{
        token: {
          fontFamily: "PT Serif, serif"
        }
      }}>
        <div>Weclome to frontend</div>

      </ConfigProvider>

    </StrictMode >
  );
}

export default App;
