import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from '../store.js'
import { SocketContext, SocketContextProvider } from './context/SocketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <Provider store={store}>
    <SocketContextProvider>
    <App />
    </SocketContextProvider>
   </Provider>
  </>
)
