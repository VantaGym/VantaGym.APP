import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import style from "./Login.module.css"
import LogoVantaGym from "../../assets/logo_png.png"
import Modal from "react-bootstrap/Modal"
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md"
import UsuarioAPI from "../../services/usuarioAPI"


export function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
    const [carregando, setCarregando] = useState(false)
    const [mostrarModal, setMostrarModal] = useState(false)
    const [mostrarSenha, setMostrarSenha] = useState(false)

    const handleEntrar = async (e) => {
        e.preventDefault();
        setErro('');

        if (!email || !senha) {
            setErro('Preencha o e-mail e a senha');
            return;
        }
        setCarregando(true);
        try {
            const usuario = await UsuarioAPI.loginAsync(email, senha);
            localStorage.setItem("token", usuario.token);
            
            setMostrarModal(true);
            setTimeout(() => {
                setMostrarModal(false);
                navigate('/home');
            }, 1300);
        } catch (error) {
            console.error(error);
            setErro("Email ou senha inválidos!")
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className={style.pagina}>

            <div className={style.conteudo}>

                <form className={style.formulario} onSubmit={handleEntrar}>
                    <img src={LogoVantaGym} alt="VantaGym" className={style.logoImagem} />

                    {erro && <p className={style.mensagemErro}>{erro}</p>}

                    <div className={style.form}>
                        <div className={style.campo}>
                            <MdEmail className={style.iconeInput} />
                            <input
                                id="email"
                                type="email"
                                placeholder="e-mail"
                                className={style.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="username"
                            />
                        </div>

                        <div className={style.campo}>
                            <MdLock className={style.iconeInput} />
                            <input
                                id="senha"
                                type={mostrarSenha ? "text" : "password"}
                                placeholder="senha"
                                className={`${style.input} ${style.inputSenha}`}
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className={style.botaoOlho}
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}>
                                {mostrarSenha ? <MdVisibilityOff /> : <MdVisibility />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className={style.botaoEntrar}
                            disabled={carregando}
                        >
                            {carregando ? "Entrando..." : "Entrar"}
                        </button>

                        <p className={style.cadastro}>
                            Ainda não possui uma conta?{" "}
                            <Link to="/cadastro">
                                Cadastre-se
                            </Link>
                        </p>
                    </div>

                    <p className={style.rodape}>
                        © 2026 VantaGym
                    </p>
                </form>
            </div>

            <Modal show={mostrarModal} dialogClassName={style.modalPosicao} contentClassName={style.modalConteudo}
            >
                <Modal.Header className={style.modalHeader}>
                    <Modal.Title className={style.modalTitulo}>
                        Bem-vindo ao VantaGym
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className={style.modalBody}>
                    Login realizado com sucesso.
                </Modal.Body>
            </Modal>
        </div>
    );
}