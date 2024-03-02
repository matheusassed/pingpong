import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Home from './pages/Home/Home.tsx'
import NovaPartida from './pages/NovaPartida/NovaPartida.tsx'
import Historico from "./pages/Historico/Historico.tsx";
import Estatisticas from "./pages/Estatisticas/Estatisticas.tsx";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to='/'><h1>Controle do Ping</h1></Link>
      </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nova-partida" element={<NovaPartida />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/estatisticas" element={<Estatisticas />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
