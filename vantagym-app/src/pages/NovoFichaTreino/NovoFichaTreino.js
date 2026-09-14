import { useState } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import style from "./NovoFichaTreino.module.css";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FichaTreinoAPI from "../../services/fichaTreinoAPI";

export function NovoFichaTreino() {
    const [nome, setNome] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const usuarioID = 1;
            await FichaTreinoAPI.criarAsync(nome, usuarioID);
            setMostrarModal(true);
            setTimeout(() => {
                setMostrarModal(false);
                navigate('/fichasTreino');
            }, 1300);
        } catch (error) {
            console.error("Erro ao criar ficha:", error.response?.data);
        }
    };

    const isFormValid = () => {
        return nome;
    };

    return (
        <div className={style.pagina}>
            <Sidebar>
                <Topbar>
                    <main className={style.conteudo}>
                        <div className={style.cabecalho}>
                            <span>MEUS TREINOS</span>
                            <h1>Nova ficha</h1>
                            <p>Crie uma nova ficha para organizar seus exercícios.</p>
                        </div>

                        <Form onSubmit={handleSubmit} className={style.formulario}>
                            <Form.Group controlId="formNome" className="mb-4">
                                <Form.Label>Nome da ficha</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Digite o nome da ficha"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <div className={style.botoes}>
                                <Button
                                    className={style.botaoCancelar}
                                    onClick={() => navigate('/fichasTreino')}>
                                    Cancelar
                                </Button>

                                <Button
                                    className={style.botaoSalvar}
                                    type="submit"
                                    disabled={!isFormValid()}>
                                    Criar ficha
                                </Button>
                            </div>
                        </Form>

                        <Modal show={mostrarModal} contentClassName={style.modal}>
                            <Modal.Header>
                                <Modal.Title className={style.tituloModal}>
                                    Sucesso
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                Ficha criada com sucesso!
                            </Modal.Body>
                        </Modal>
                    </main>
                </Topbar>
            </Sidebar>
        </div>
    );
}