import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "./Cadastro.module.css";
import LogoVantaGym from "../../assets/logo_png.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdPerson, MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import UsuarioAPI from "../../services/usuarioAPI";

export function Cadastro() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [mostrarModal, setMostrarModal] = useState(false)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            try {
                await UsuarioAPI.criarAsync(nome, email, senha);

                setMostrarModal(true);

                setTimeout(() => {
                    setMostrarModal(false);
                    navigate('/');
                }, 1300);
            } catch (error) {
                console.error("Erro ao criar conta:", error);
            }
        }
    };

    const isFormValid = () => {
        return nome && email && senha;
    };

    return (
        <div className={style.pagina}>
            <div className={style.conteudo}>
                <img src={LogoVantaGym} alt="VantaGym" className={style.logoImagem} />

                <h3 className={style.titulo}>Criar conta</h3>

                <Form onSubmit={handleSubmit} className={style.formulario}>

                    <Form.Group controlId="formNome" className="mb-3">
                        <Form.Label className={style.label}>Informe seu nome</Form.Label>
                        <div className={style.campo}>
                            <MdPerson className={style.iconeInput} />
                            <Form.Control
                                type="text"
                                placeholder="Digite seu nome"
                                name="nome"
                                className={style.input}
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                autoComplete="name"
                                required
                            />
                        </div>
                    </Form.Group>

                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label className={style.label}>Informe seu email</Form.Label>
                        <div className={style.campo}>
                            <MdEmail className={style.iconeInput} />
                            <Form.Control
                                type="email"
                                placeholder="Ex: usuario@gmail.com"
                                name="email"
                                className={style.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="username"
                                required
                            />
                        </div>
                    </Form.Group>

                    <Form.Group controlId="formSenha" className="mb-3">
                        <Form.Label className={style.label}>Crie sua senha</Form.Label>
                        <div className={style.campo}>
                            <MdLock className={style.iconeInput} />
                            <Form.Control
                                type={mostrarSenha ? "text" : "password"}
                                placeholder="******"
                                name="senha"
                                className={`${style.input} ${style.inputSenha}`}
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                autoComplete="new-password"
                                required
                            />
                            <button
                                type="button"
                                className={style.botaoOlho}
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}>
                                {mostrarSenha ? <MdVisibilityOff /> : <MdVisibility />}
                            </button>
                        </div>
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className={style.botaoCadastrar}
                        disabled={!isFormValid()}>
                        Criar conta
                    </Button>

                    <p className={style.jaTemConta}>
                        Já possui uma conta?{" "}
                        <Link to="/">Entrar</Link>
                    </p>

                    <Modal show={mostrarModal} dialogClassName={style.modalPosicao} contentClassName={style.modalConteudo}
                    >
                        <Modal.Header className={style.modalHeader}>
                            <Modal.Title className={style.modalTitulo}>
                                Sucesso
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body className={style.modalBody}>
                            Conta criada com sucesso!
                        </Modal.Body>
                    </Modal>
                </Form>

            <p className={style.rodape}>
                © 2026 VantaGym
            </p>
        </div>
        </div >
    );
}