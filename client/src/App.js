import {BrowserRouter, Routes, Route} from 'react-router-dom';
//import logo from './logo.png';

//pages & components 
//import Login from './pages/Login';
//import Navbar from './components /Navbar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

//import { BrowserRouter, Routes, Route } from 'react-router-dom'
//import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Login />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
