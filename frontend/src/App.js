import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Gerar } from './pages/Gerar';
import { Listar } from './pages/Listar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<Gerar />} />
          <Route path='/pass-list' element={<Listar />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );

}

export default App;
