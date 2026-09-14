import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home"
import { FichasTreino } from "./pages/FichasTreino/FichasTreino";
import { NovoFichaTreino } from "./pages/NovoFichaTreino/NovoFichaTreino"
import { VisualizarFichaTreino } from "./pages/VisualizarFichaTreino/VisualizarFichaTreino"
import { RegistrarTreino } from "./pages/RegistrarTreino/RegistrarTreino"
import { NovoExercicio } from "./pages/NovoExercicio/NovoExercicio"
import { EditarExercicio } from "./pages/EditarExercicio/EditarExercicio"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/fichastreino" element={<FichasTreino />} />
                <Route path="/fichasTreino/criar" element={<NovoFichaTreino />} />
                <Route path="/fichasTreino/:id" element={<VisualizarFichaTreino />} />
                <Route path="/registrarTreino/:id" element={<RegistrarTreino />} />
                <Route path="/exercicios/criar/:id" element={<NovoExercicio />} />
                <Route path="/exercicios/:id/editar" element={<EditarExercicio />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;