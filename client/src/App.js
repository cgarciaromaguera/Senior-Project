import {BrowserRouter, Routes, Route} from 'react-router-dom';
//import logo from './logo.png';

//pages & components 
import Login from './pages/Login'
import Navbar from './components /Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
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
