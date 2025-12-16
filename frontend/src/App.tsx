import { WebSocketProvider } from './hook/WebSocketContext'
import AppRouter from './router/AppRouter'

function App() {

  return  (
    <>
    <WebSocketProvider>
        <AppRouter /> 
    </WebSocketProvider>
    </>
  )
}

export default App
