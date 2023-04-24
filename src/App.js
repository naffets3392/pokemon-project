import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';
import Nav from './components/Nav';
import Home from './pages/Home';
import MyPokemons from './pages/MyPokemons';

function App() {
  return (
    <AppProvider>
      <Router>
          <div className="App">
            <Nav />
            <Routes>
              <Route path='/' exact element={<Home />}/>
              <Route path='/mypokemons' element={<MyPokemons />}/>
            </Routes>
          </div>
      </Router>
    </AppProvider>
  );
}

export default App;
