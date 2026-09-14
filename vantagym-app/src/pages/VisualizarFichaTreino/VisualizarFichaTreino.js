import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import style from "./VisualizarFichaTreino.module.css"
import { Sidebar } from "../../components/Sidebar/Sidebar"
import { Topbar } from "../../components/Topbar/Topbar"
import { FaPlus, FaPen, FaArrowLeft, FaSave, FaTrash } from "react-icons/fa"
import FichaTreinoAPI from "../../services/fichaTreinoAPI"
import ExercicioAPI from "../../services/exercicioAPI"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

export function VisualizarFichaTreino() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [ficha, setFicha] = useState(null)
    const [gruposMusculares, setGruposMusculares] = useState([])
    const [nome, setNome] = useState("")
    const [nomeSalvo, setNomeSalvo] = useState(false)
    const [mostrarModal, setMostrarModal] = useState(false)
    const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false)
    const [exercicioSelecionado, setExercicioSelecionado] = useState(null)

    useEffect(() => {
        carregarFicha();
        carregarGruposMusculares();
    }, []);

    const carregarFicha = async () => {
        try {
            const response = await FichaTreinoAPI.obterAsync(id);
            setFicha(response);
            setNome(response.nome);
        } catch (error) {
            console.error("Erro ao carregar ficha:", error);
        }
    };

    const carregarGruposMusculares = async () => {
        try {
            const response = await ExercicioAPI.listarGruposMusculares();
            setGruposMusculares(response);
        } catch (error) {
            console.error("Erro ao carregar grupos musculares:", error);
        }
    };

    const handleAtualizarNome = async () => {
        try {
            await FichaTreinoAPI.atualizarAsync(id, nome);
            await carregarFicha();
            setNomeSalvo(true);

            setTimeout(() => {
                setNomeSalvo(false);
            }, 2000);
        } catch (error) {
            console.error("Erro ao atualizar ficha:", error);
        }
    };

    const handleClickDeletar = (exercicio) => {
        setExercicioSelecionado(exercicio);
        setMostrarModal(true);
    };

    const handleDeletar = async () => {
        try {
            await ExercicioAPI.deletarAsync(exercicioSelecionado.id);
            setFicha({
                ...ficha,
                exercicios: ficha.exercicios.filter(
                    exercicio => exercicio.id !== exercicioSelecionado.id
                )
            });

            handleFecharModal();
            setMostrarModalSucesso(true);

            setTimeout(() => {
                setMostrarModalSucesso(false);
            }, 1300);
        } catch (error) {
            console.error("Erro ao deletar exercício:", error);
        }
    };

    const handleFecharModal = () => {
        setMostrarModal(false);
        setExercicioSelecionado(null);
    };

    const handleFecharModalSucesso = () => {
        setMostrarModalSucesso(false);
    };

    const obterNomeGrupoMuscular = (id) => {
        const grupo = gruposMusculares.find(x => x.id === id);

        if (grupo) {
            return grupo.nome;
        }

        return "-";
    };

    return (
        <div className={style.pagina}>
            <Sidebar>
                <Topbar>
                    <main className={style.conteudo}>
                        <div className={style.cabecalho}>
                            <div>
                                <span>MEUS TREINOS</span>

                                <div className={style.nomeEditavel}>
                                    <input
                                        type="text"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)} />

                                    <div className={style.salvar}>
                                        <button onClick={handleAtualizarNome}>
                                            <FaSave />
                                        </button>
                                        <span>Salvar nome</span>
                                    </div>
                                </div>

                                {nomeSalvo && (
                                    <span className={style.mensagemSucesso}>
                                        Nome salvo com sucesso!
                                    </span>
                                )}

                                <p>Visualize e gerencie os exercícios desta ficha.</p>
                            </div>

                            <div className={style.acoesCabecalho}>
                                <button
                                    className={style.botaoVoltar}
                                    onClick={() => navigate("/fichasTreino")}>
                                    <FaArrowLeft /> Voltar
                                </button>

                                <button
                                    className={style.botaoAdicionar}
                                    onClick={() => navigate(`/exercicios/criar/${id}`)}>
                                    <FaPlus /> Adicionar exercício
                                </button>
                            </div>
                        </div>

                        <div className={style.tabela}>
                            <div className={style.tabelaCabecalho}>
                                <span>Exercício</span>
                                <span className={style.centralizado}>Grupo muscular</span>
                                <span className={style.centralizado}>Séries</span>
                                <span className={style.centralizado}>Repetições</span>
                                <span className={style.centralizado}>Ações</span>
                            </div>

                            {ficha?.exercicios?.map((exercicio) => (
                                <div className={style.tabelaLinha} key={exercicio.id}>
                                    <span>{exercicio.nome}</span>

                                    <span className={style.centralizado}>
                                        {obterNomeGrupoMuscular(exercicio.grupoMuscular)}
                                    </span>

                                    <span className={style.centralizado}>
                                        {exercicio.series}
                                    </span>

                                    <span className={style.centralizado}>
                                        {exercicio.repeticoes}
                                    </span>

                                    <div className={style.acoes}>
                                        <button
                                            onClick={() => navigate(`/exercicios/${exercicio.id}/editar`)}>
                                            <FaPen />
                                        </button>

                                        <button className={style.botaoExcluir} onClick={() => handleClickDeletar(exercicio)}>
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {ficha?.exercicios?.length === 0 && (
                                <div className={style.vazio}>
                                    Nenhum exercício cadastrado nesta ficha.
                                </div>
                            )}
                        </div>

                        <Modal
                            show={mostrarModal}
                            onHide={handleFecharModal}
                            contentClassName={style.modal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirmar</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                Tem certeza que deseja deletar o exercício {exercicioSelecionado?.nome}?
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
                                Exercício deletado com sucesso!
                            </Modal.Body>
                        </Modal>
                    </main>
                </Topbar>
            </Sidebar>
        </div>
    );
}