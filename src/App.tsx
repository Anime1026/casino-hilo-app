import Router from "./Router";
//mui theme provider
import MaterialThemeProvider from "./providers/theme";
//import style
import "./assets/styles/index.scss";
// tostify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <MaterialThemeProvider>
      <ToastContainer />
      <Router />
    </MaterialThemeProvider>
  );
}

export default App;
