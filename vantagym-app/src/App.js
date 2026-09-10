import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home"
import { FichasTreino } from "./pages/FichasTreinoListar/FichaTreinoListar";

function App() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/fichastreino" element={<FichasTreino />} />
                </Routes>
            </BrowserRouter>
        );
    }

export default App;