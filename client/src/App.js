import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import 'semantic-ui-css/semantic.min.css'
//import logo from './logo.png';

//pages & components 
//import Login from './pages/Login';
import Home from './pages/Home';
//import Navbar from './components /Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
