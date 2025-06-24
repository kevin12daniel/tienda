import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import Productos from './components/Productos';
import Ofertas from './components/Ofertas';
import Contacto from './components/Contacto';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Productos" element={<Productos />} />
      <Route path="/Ofertas" element={<Ofertas />} />
      <Route path="/Contacto" element={<Contacto />} />
    </Routes>
  );
}

export default App;
