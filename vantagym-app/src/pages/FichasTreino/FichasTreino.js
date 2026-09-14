import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FichasTreino.module.css";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import { FaPlus, FaEye, FaTrash, FaPlay } from "react-icons/fa";
import FichaTreinoAPI from "../../services/fichaTreinoAPI";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export function FichasTreino() {
    const navigate = useNavigate();

    const [fichas, setFichas] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);
    const [fichaSelecionada, setFichaSelecionada] = useState(null);


    const carregarFichas = async () => {
        try {
            const response = await FichaTreinoAPI.listarAsync();
            setFichas(response);
        } catch (error) {
            console.error("Erro ao carregar fichas:", error);
        }
    }

    const handleClickDeletar = (ficha) => {
        setFichaSelecionada(ficha);
        setMostrarModal(true);
    };

    const handleDeletar = async () => {
        try {
            await FichaTreinoAPI.deletarAsync(fichaSelecionada.id);
            setFichas(fichas.filter(f => f.id !== fichaSelecionada.id));
            handleFecharModal();
            setMostrarModalSucesso(true);

            setTimeout(() => {
                setMostrarModalSucesso(false);
            }, 1300);
        } catch (error) {
            console.error("Erro ao deletar ficha:", error);
        }
    };

    const handleFecharModal = () => {
        setMostrarModal(false);
        setFichaSelecionada(null);
    };

    const handleFecharModalSucesso = () => {
        setMostrarModalSucesso(false);
    };

    useEffect(() => {
        carregarFichas();
    }, []);

    return (
        <div className={styles.pagina}>
            <Sidebar>
                <Topbar>
                    <main className={styles.conteudo}>
                        <div className={styles.cabecalho}>
                            <div>
                                <span>MEUS TREINOS</span>
                                <h1>Fichas de treino</h1>
                                <p>Gerencie suas fichas de treino cadastradas.</p>
                            </div>

                            <button
                                className={styles.botaoCriar}
                                onClick={() => navigate("/fichasTreino/criar")}><FaPlus />
                                Nova ficha
                            </button>
                        </div>

                        <div className={styles.tabela}>
                            <div className={styles.tabelaCabecalho}>
                                <span>Nome</span>
                                <span className={styles.centralizado}>Grupo muscular</span>
                                <span className={styles.centralizado}>Ações</span>
                            </div>

                            {fichas.map((ficha) => (
                                <div className={styles.tabelaLinha} key={ficha.id}>
                                    <span className={styles.nomeFicha}>{ficha.nome}</span>
                                    <span className={styles.gruposMusculares}>
                                        {ficha.gruposMusculares?.join(" - ")}
                                    </span>

                                    <div className={styles.acoes}>
                                        <div className={styles.acao}>
                                            <button
                                                className={styles.botaoIniciar}
                                                onClick={() => navigate(`/registrarTreino/${ficha.id}`)}><FaPlay />
                                            </button>
                                            <span>Iniciar Treino</span>
                                        </div>

                                        <div className={styles.acao}>
                                            <button
                                                onClick={() => navigate(`/fichasTreino/${ficha.id}`)}><FaEye />
                                            </button>
                                            <span>Visualizar e Editar Ficha</span>
                                        </div>

                                        <div className={styles.acao}>
                                            <button
                                                className={styles.botaoExcluir}
                                                onClick={() => handleClickDeletar(ficha)}><FaTrash />
                                            </button>
                                            <span>Excluir</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {fichas.length === 0 && (
                                <div className={styles.vazio}>
                                    Nenhuma ficha encontrada.
                                </div>
                            )}
                        </div>

                        <Modal show={mostrarModal} onHide={handleFecharModal} contentClassName={styles.modal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirmar</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                Tem certeza que deseja deletar a ficha {fichaSelecionada?.nome}?
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="dark" className={styles.botaoCancelar} onClick={handleFecharModal}>
                                    Cancelar
                                </Button>

                                <Button variant="danger" className={styles.botaoDeletar} onClick={handleDeletar}>
                                    Deletar
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={mostrarModalSucesso} onHide={handleFecharModalSucesso} contentClassName={styles.modal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Sucesso</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                Ficha deletada com sucesso!
                            </Modal.Body>
                        </Modal>
                    </main>
                </Topbar>
            </Sidebar>
        </div>
    );
}