import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import style from "./FichasTreino.module.css"
import { Sidebar } from "../../components/Sidebar/Sidebar"
import { Topbar } from "../../components/Topbar/Topbar"
import { FaPlus, FaEye, FaTrash, FaPlay } from "react-icons/fa"
import FichaTreinoAPI from "../../services/fichaTreinoAPI"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

export function FichasTreino() {
    const navigate = useNavigate();

    const [fichas, setFichas] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false)
    const [fichaSelecionada, setFichaSelecionada] = useState(null)

    const carregarFichas = async () => {
        try {
            const response = await FichaTreinoAPI.listarAsync();
            setFichas(response);
        } catch (error) {
            console.error("Erro ao carregar fichas:", error);
        }
    };

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
        <div className={style.pagina}>
            <Sidebar>
                <Topbar>
                    <main className={style.conteudo}>
                        <div className={style.cabecalho}>
                            <div>
                                <span>MEUS TREINOS</span>
                                <h1>Fichas de treino</h1>
                                <p>Gerencie suas fichas de treino cadastradas.</p>
                            </div>

                            <button
                                className={style.botaoCriar}
                                onClick={() => navigate("/fichasTreino/criar")}><FaPlus />
                                Nova ficha
                            </button>
                        </div>

                        <div className={style.tabela}>
                            <div className={style.tabelaCabecalho}>
                                <span>Nome</span>
                                <span className={style.centralizado}>Grupo muscular</span>
                                <span className={style.centralizado}>Ações</span>
                            </div>

                            {fichas.map((ficha) => (
                                <div className={style.tabelaLinha} key={ficha.id}>
                                    <span className={style.nomeFicha}>{ficha.nome}</span>

                                    <span className={style.gruposMusculares}>
                                        {ficha.gruposMusculares?.join(" - ")}
                                    </span>

                                    <div className={style.acoes}>
                                        <div className={style.acao}>
                                            <button
                                                className={style.botaoIniciar}
                                                onClick={() => navigate(`/registrarTreino/${ficha.id}`)}><FaPlay />
                                            </button>
                                            <span>Iniciar Treino</span>
                                        </div>

                                        <div className={style.acao}>
                                            <button
                                                onClick={() => navigate(`/fichasTreino/${ficha.id}`)}><FaEye />
                                            </button>
                                            <span>Visualizar e Editar Ficha</span>
                                        </div>

                                        <div className={style.acao}>
                                            <button
                                                onClick={() => navigate(`/exercicios/criar/${ficha.id}`)}><FaPlus />
                                            </button>
                                            <span>Adicionar Novo Exercício</span>
                                        </div>

                                        <div className={style.acao}>
                                            <button
                                                className={style.botaoExcluir}
                                                onClick={() => handleClickDeletar(ficha)}><FaTrash />
                                            </button>
                                            <span>Excluir</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {fichas.length === 0 && (
                                <div className={style.vazio}>
                                    Nenhuma ficha encontrada.
                                </div>
                            )}
                        </div>

                        <Modal show={mostrarModal} onHide={handleFecharModal} contentClassName={style.modal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirmar</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                Tem certeza que deseja deletar a ficha {fichaSelecionada?.nome}?
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="dark" className={style.botaoCancelar} onClick={handleFecharModal}>
                                    Cancelar
                                </Button>

                                <Button variant="danger" className={style.botaoDeletar} onClick={handleDeletar}>
                                    Deletar
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={mostrarModalSucesso} onHide={handleFecharModalSucesso} contentClassName={style.modal}>
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