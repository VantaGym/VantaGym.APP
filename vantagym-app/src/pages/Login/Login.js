import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";
import LogoVantaGym from "../../assets/logo_png.png";
import Modal from "react-bootstrap/Modal";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";


export function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const handleEntrar = async (e) => {
        e.preventDefault();
        setErro('');
        if (!email || !senha) {
            setErro('Preencha o e-mail e a senha');
            return;
        }
        setCarregando(true);

        try {
            setMostrarModal(true);
            setTimeout(() => {
                setMostrarModal(false);
                navigate('/home');
            }, 1300);
        } catch (error) {
            console.error(error);
            setErro('Erro ao entrar');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className={styles.pagina}>

            <div className={styles.conteudo}>

                <form className={styles.formulario} onSubmit={handleEntrar}>
                    <img src={LogoVantaGym} alt="VantaGym" className={styles.logoImagem} />

                    {erro && <p className={styles.mensagemErro}>{erro}</p>}

                    <div className={styles.form}>
                        <div className={styles.campo}>
                            <MdEmail className={styles.iconeInput} />
                            <input
                                id="email"
                                type="email"
                                placeholder="e-mail"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="username"
                            />
                        </div>

                        <div className={styles.campo}>
                            <MdLock className={styles.iconeInput} />
                            <input
                                id="senha"
                                type={mostrarSenha ? "text" : "password"}
                                placeholder="senha"
                                className={`${styles.input} ${styles.inputSenha}`}
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className={styles.botaoOlho}
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}>
                                {mostrarSenha ? <MdVisibilityOff /> : <MdVisibility />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className={styles.botaoEntrar}
                            disabled={carregando}
                        >
                            {carregando ? "Entrando..." : "Entrar"}
                        </button>

                        <p className={styles.cadastro}>
                            Ainda não possui uma conta?{" "}
                            <Link to="/cadastro">
                                Cadastre-se
                            </Link>
                        </p>
                    </div>

                    <p className={styles.rodape}>
                        © 2026 VantaGym
                    </p>
                </form>
            </div>

            <Modal show={mostrarModal}
                backdrop="static"
                keyboard={false}
                dialogClassName={styles.modalPosicao}
                contentClassName={styles.modalConteudo}
            >
                <Modal.Header className={styles.modalHeader}>
                    <Modal.Title className={styles.modalTitulo}>
                        Bem-vindo ao VantaGym
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className={styles.modalBody}>
                    Login realizado com sucesso.
                </Modal.Body>
            </Modal>
        </div>
    );
}