import style from './Sidebar.module.css'
import Logo from "../../assets/logo_png.png"
import { SidebarItem } from '../SidebarItem/SidebarItem'
import { Link } from 'react-router-dom'
import { IoHome } from "react-icons/io5"
import { FaDumbbell } from "react-icons/fa6"
import { FaPlus } from "react-icons/fa"
import { FaCalendarCheck } from "react-icons/fa"
import { BsGraphUp } from "react-icons/bs"

export function Sidebar({ children }) {
    return (
        <div className={style.sidebar}>
            <div className={style.sidebar_conteudo}>
                <div className={style.sidebar_header}>
                    <Link to='/home'>
                        <img src={Logo} alt="Logo-VantaGym" className={style.logo} />
                    </Link>
                    <hr className={style.linha} />
                </div>

                <div className={style.sidebar_corpo}>
                    <SidebarItem texto="Home" link="/home" logo={<IoHome />} />
                </div>

                <div className={style.sidebar_corpo}>
                    <SidebarItem texto="Meus Treinos" link="/fichastreino" logo={<FaDumbbell />} />
                </div>

                <div className={style.sidebar_corpo}>
                    <SidebarItem texto="Montar Treino" link="/home" logo={<FaPlus />} />
                </div>

                <div className={style.sidebar_corpo}>
                    <SidebarItem texto="Histórico" link="/home" logo={<FaCalendarCheck />} />
                </div>
            </div>

            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>
    )
}