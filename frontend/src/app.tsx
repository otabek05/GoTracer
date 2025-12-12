import 'src/global.css';
import { ThemeProvider } from 'src/theme/theme-provider';
import { WebSocketProvider } from './hook/WebsocketContext';

type AppProps = {
  children: React.ReactNode;
};

export default function App({ children }: AppProps) {
  return (
    <ThemeProvider>

      <WebSocketProvider>
        {children}
      </WebSocketProvider>
      
    </ThemeProvider>
  );
}


