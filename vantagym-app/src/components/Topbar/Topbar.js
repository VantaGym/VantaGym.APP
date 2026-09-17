import style from "./Topbar.module.css"
import { useNavigate } from "react-router-dom"
import { MdLogout } from "react-icons/md"

export function Topbar({ children }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div>
            <div className={style.topbar_conteudo}>
                <button onClick={handleLogout} className={style.botao_deslogar}><MdLogout /></button>
            </div>
            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>
    )
}