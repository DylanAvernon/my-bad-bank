import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AllData from './pages/alldata';
import CreateAccount from './pages/createaccount';
import { Deposit } from './pages/deposit';
import Home from './pages/home';
import Login from './pages/login';
import Withdraw from './pages/withdraw';
import NavBar from './components/navbar';
import { UserContext } from './context/context';
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <UserContext.Provider value={{user: null, users:[{name: 'Dylan', email: 'dylanvernon22@gmail.com', password: 'secret', balance: 100}]}}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/CreateAccount' element={<CreateAccount />} />
            <Route path='/login' element={<Login />}/>
            <Route path='/deposit' element={<Deposit />} />
            <Route path='/withdraw' element={<Withdraw />} />
            <Route path='/alldata' element={<AllData />}/>
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
