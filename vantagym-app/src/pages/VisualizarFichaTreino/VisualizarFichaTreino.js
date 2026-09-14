import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./VisualizarFichaTreino.module.css";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import { FaPlus, FaPen, FaArrowLeft, FaSave } from "react-icons/fa";
import FichaTreinoAPI from "../../services/fichaTreinoAPI";
import ExercicioAPI from "../../services/exercicioAPI";

export function VisualizarFichaTreino() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [ficha, setFicha] = useState(null);
    const [gruposMusculares, setGruposMusculares] = useState([]);
    const [nome, setNome] = useState("");
    const [nomeSalvo, setNomeSalvo] = useState(false);

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

    const obterNomeGrupoMuscular = (id) => {
        const grupo = gruposMusculares.find(x => x.id === id);

        if (grupo) {
            return grupo.nome;
        }

        return "-";
    };

    return (
        <div className={styles.pagina}>
            <Sidebar>
                <Topbar>
                    <main className={styles.conteudo}>
                        <div className={styles.cabecalho}>
                            <div>
                                <span>MEUS TREINOS</span>

                                <div className={styles.nomeEditavel}>
                                    <input
                                        type="text"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}/>

                                    <div className={styles.salvar}>
                                        <button onClick={handleAtualizarNome}>
                                            <FaSave />
                                        </button>
                                        <span>Salvar nome</span>
                                    </div>
                                </div>

                                {nomeSalvo && (
                                    <span className={styles.mensagemSucesso}>
                                        Nome salvo com sucesso!
                                    </span>
                                )}

                                <p>Visualize e gerencie os exercícios desta ficha.</p>
                            </div>

                            <div className={styles.acoesCabecalho}>
                                <button
                                    className={styles.botaoVoltar}
                                    onClick={() => navigate("/fichasTreino")}>
                                    <FaArrowLeft /> Voltar
                                </button>

                                <button
                                    className={styles.botaoAdicionar}
                                    onClick={() => navigate(`/exercicios/criar/${id}`)}>
                                    <FaPlus /> Adicionar exercício
                                </button>
                            </div>
                        </div>

                        <div className={styles.tabela}>
                            <div className={styles.tabelaCabecalho}>
                                <span>Exercício</span>
                                <span>Grupo muscular</span>
                                <span>Séries</span>
                                <span>Repetições</span>
                                <span>Ações</span>
                            </div>

                            {ficha?.exercicios?.map((exercicio) => (
                                <div className={styles.tabelaLinha} key={exercicio.id}>
                                    <span>{exercicio.nome}</span>
                                    <span>{obterNomeGrupoMuscular(exercicio.grupoMuscular)}</span>
                                    <span>{exercicio.series}</span>
                                    <span>{exercicio.repeticoes}</span>

                                    <div className={styles.acoes}>
                                        <button
                                            onClick={() => navigate(`/exercicios/${exercicio.id}/editar`)}>
                                            <FaPen />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {ficha?.exercicios?.length === 0 && (
                                <div className={styles.vazio}>
                                    Nenhum exercício cadastrado nesta ficha.
                                </div>
                            )}
                        </div>
                    </main>
                </Topbar>
            </Sidebar>
        </div>
    );
}