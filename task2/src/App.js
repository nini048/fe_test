import logo from './logo.svg';
import './App.css';
import TransactionForm from './components/TransactionForm';
import { SnackbarProvider } from "notistack";
function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}>
      <TransactionForm />
    </SnackbarProvider>
  );
}

export default App;
