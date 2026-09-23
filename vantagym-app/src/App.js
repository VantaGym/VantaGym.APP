import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home"
import { FichasTreino } from "./pages/FichasTreino/FichasTreino";
import { NovoFichaTreino } from "./pages/NovoFichaTreino/NovoFichaTreino"
import { VisualizarFichaTreino } from "./pages/VisualizarFichaTreino/VisualizarFichaTreino"
import { RegistrarTreino } from "./pages/RegistrarTreino/RegistrarTreino"
import { NovoExercicio } from "./pages/NovoExercicio/NovoExercicio"
import { EditarExercicio } from "./pages/EditarExercicio/EditarExercicio"
import { HistoricoTreino } from "./pages/HistoricoTreino/HistoricoTreino"
import { MontarTreino } from "./pages/MontarTreino/MontarTreino";
import { RotaPrivada } from "./components/RotaPrivada/RotaPrivada";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<RotaPrivada><Home /></RotaPrivada>} />
                <Route path="/fichastreino" element={<RotaPrivada><FichasTreino /></RotaPrivada>} />
                <Route path="/fichasTreino/criar" element={<RotaPrivada><NovoFichaTreino /></RotaPrivada>} />
                <Route path="/fichasTreino/:id" element={<RotaPrivada><VisualizarFichaTreino /></RotaPrivada>} />
                <Route path="/registrarTreino/:id" element={<RotaPrivada><RegistrarTreino /></RotaPrivada>} />
                <Route path="/exercicios/criar/:id" element={<RotaPrivada><NovoExercicio /></RotaPrivada>} />
                <Route path="/exercicios/:id/editar" element={<RotaPrivada><EditarExercicio /></RotaPrivada>} />
                <Route path="/historico" element={<RotaPrivada><HistoricoTreino /></RotaPrivada>} />
                <Route path="/montartreino" element={<RotaPrivada><MontarTreino /></RotaPrivada>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;