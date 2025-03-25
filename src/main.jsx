import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ContextProvider } from './context/ContextProvider'
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense("Ngo9BigBOggjHTQxAR8/V1NMaF1cW2hIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEBjW31dcHxVRGNbVkByVg==");


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </StrictMode>,
)
