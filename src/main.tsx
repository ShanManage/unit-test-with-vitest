import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeConfig, ConfigProvider } from 'antd'

const config: ThemeConfig = {
  components: {
    Button: {
      colorPrimary: '#5570F1'
    },
  }
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={config}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
