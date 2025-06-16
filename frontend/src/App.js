import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Login } from './pages/Auth/Login'
import { Signup } from './pages/Auth/Signup'
import { Home } from './pages/Dashboard/Home'
import { Income } from './pages/Dashboard/Income'
import { Expense } from './pages/Dashboard/Expense'
import { UserProvider } from './context/userContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Home />} />
          <Route path='/income' element={<Income />} />
          <Route path='/expense' element={<Expense />} />
        </Routes>
      </Router>
          <Toaster/>
    </UserProvider>
  );
}

export default App;

const Root = () => {
  const isAuthendicated = !!localStorage.getItem('token');
  return isAuthendicated ? <Navigate to='/dashboard' /> : <Navigate to='/login' />
}