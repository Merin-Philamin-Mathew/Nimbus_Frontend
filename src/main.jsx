import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.jsx'
import store, { persistor } from './redux/store.js';
import './index.css'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider 
  clientId="885489626025-i725tkjcmt11rkmb8jk27ep03tthkmsm.apps.googleusercontent.com"
  >
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  </GoogleOAuthProvider>

)
