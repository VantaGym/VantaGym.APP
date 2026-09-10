import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import { MdFitnessCenter, MdHistory, MdTrendingUp } from "react-icons/md";
import UsuarioAPI from "../../services/usuarioAPI";
import HistoricoTreinoAPI from "../../services/historicoTreinoAPI";

export function Home() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);
    const [treinosSemana, setTreinosSemana] = useState(0);
    const [tempoUltimoTreino, setTempoUltimoTreino] = useState(0);
    const [volumeSemana, setVolumeSemana] = useState(0);
    const [ultimoTreino, setUltimoTreino] = useState(null);
    const [exerciciosUltimoTreino, setExerciciosUltimoTreino] = useState(0);
    const [volumeUltimoTreino, setVolumeUltimoTreino] = useState(0);

    useEffect(() => {
        carregarHome();
    }, []);

    async function carregarHome() {
        try {
            const usuarioID = 1;

            const usuarioResponse = await UsuarioAPI.obterAsync(usuarioID);
            const treinosSemanaResponse = await HistoricoTreinoAPI.obterQuantidadeTreinosSemanaAsync();
            const tempoUltimoTreinoResponse = await HistoricoTreinoAPI.obterTempoDesdeUltimoTreinoAsync();
            const volumeSemanaResponse = await HistoricoTreinoAPI.obterVolumeSemanaAsync();
            const ultimoTreinoResponse = await HistoricoTreinoAPI.obterUltimoTreinoAsync();
            const exerciciosResponse = await HistoricoTreinoAPI.obterQuantidadeExerciciosUltimoTreinoAsync();
            const volumeUltimoTreinoResponse = await HistoricoTreinoAPI.obterVolumeUltimoTreinoAsync();

            setUsuario(usuarioResponse);
            setTreinosSemana(treinosSemanaResponse);
            setTempoUltimoTreino(tempoUltimoTreinoResponse);
            setVolumeSemana(volumeSemanaResponse);
            setUltimoTreino(ultimoTreinoResponse);
            setExerciciosUltimoTreino(exerciciosResponse);
            setVolumeUltimoTreino(volumeUltimoTreinoResponse);
        } catch (error) {
            console.error("Erro ao carregar Home:", error);
        }
    }

    return (
        <div className={styles.pagina}>
            <Sidebar>
                <Topbar>
                    <main className={styles.conteudo}>
                        <div className={styles.boasVindas}>
                            <span>VISÃO GERAL</span>
                            <h1>Olá, {usuario?.nome}</h1>
                            <p>Pronto para continuar sua evolução?</p>
                        </div>

                        <div className={styles.cards}>
                            <div className={styles.card}>
                                <div className={styles.cardTopo}>
                                    <span>Treinos na semana</span>
                                    <MdFitnessCenter className={styles.cardIcone} />
                                </div>
                                <h2>{treinosSemana}</h2>
                                <p>treinos realizados nesta semana</p>
                            </div>

                            <div className={styles.card}>
                                <div className={styles.cardTopo}>
                                    <span>Tempo desde o último treino</span>
                                    <MdHistory className={styles.cardIcone} />
                                </div>
                                <h2>{tempoUltimoTreino} dias</h2>
                                <p>desde o último treino realizado</p>
                            </div>

                            <div className={styles.card}>
                                <div className={styles.cardTopo}>
                                    <span>Volume da semana</span>
                                    <MdTrendingUp className={styles.cardIcone} />
                                </div>
                                <h2>{volumeSemana} kg</h2>
                                <p>volume total nesta semana</p>
                            </div>
                        </div>

                        <div className={styles.atividade}>
                            <div className={styles.atividadeTopo}>
                                <div>
                                    <span>ATIVIDADE RECENTE</span>
                                    <h2>Último treino</h2>
                                </div>

                                <button onClick={() => navigate("/historico")}>
                                    Ver histórico
                                </button>
                            </div>

                            <div className={styles.atividadeDados}>
                                <div>
                                    <span>Treino</span>
                                    <p>{ultimoTreino?.nomeFicha || "-"}</p>
                                </div>

                                <div>
                                    <span>Data</span>
                                    <p>
                                        {ultimoTreino ? new Date(ultimoTreino.dataExecucao).toLocaleDateString("pt-BR") : "-"}
                                    </p>
                                </div>

                                <div>
                                    <span>Exercícios</span>
                                    <p>{exerciciosUltimoTreino}</p>
                                </div>

                                <div>
                                    <span>Volume</span>
                                    <p>{volumeUltimoTreino} kg</p>
                                </div>
                            </div>
                        </div>
                    </main>
                </Topbar>
            </Sidebar>
        </div>
    );
}