import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Gerar } from './pages/Gerar';
import { Listar } from './pages/Listar';

let index = true;

function App() {
  
  if (index === true){
  return (
    
    <div className="App">
      <Header />
      <Gerar />
      <Footer />
    </div>
  );} else {

    return (
    
      <div className="App">
        <Header />
        <Listar />
        <Footer />
      </div>
    );

  }
}

export default App;
