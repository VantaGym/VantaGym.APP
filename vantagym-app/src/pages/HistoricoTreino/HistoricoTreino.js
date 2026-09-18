import { useEffect, useState } from "react"
import style from "./HistoricoTreino.module.css"
import { Sidebar } from "../../components/Sidebar/Sidebar"
import { Topbar } from "../../components/Topbar/Topbar"
import HistoricoTreinoAPI from "../../services/historicoTreinoAPI"

export function HistoricoTreino() {
    const [historicos, setHistoricos] = useState([])

    const carregarHistorico = async () => {
        try {
            const response = await HistoricoTreinoAPI.listarAsync()
            setHistoricos(response)
        } catch (error) {
            console.error("Erro ao carregar históricos:", error)
        }
    }

    useEffect(() => {
        carregarHistorico()
    }, [])

    return (
        <div className={style.pagina}>
            <Sidebar>
                <Topbar>
                    <main className={style.conteudo}>
                        <div className={style.cabecalho}>
                            <span>HISTÓRICO</span>
                            <h1>Histórico de treinos</h1>
                            <p>Acompanhe seus exercícios realizados.</p>
                        </div>

                        <div className={style.tabelaContainer}>
                            <table className={style.tabela}>
                                <thead>
                                    <tr>
                                        <th>Treino</th>
                                        <th>Exercício</th>
                                        <th>Séries</th>
                                        <th>Repetições</th>
                                        <th>Carga</th>
                                        <th>Data</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {historicos.map((historico) => (
                                        <tr key={historico.id}>
                                            <td>{historico.nomeFicha}</td>
                                            <td>{historico.nomeExercicio}</td>
                                            <td>{historico.seriesFeitas}</td>
                                            <td>{historico.repeticoesFeitas}</td>
                                            <td>{historico.cargaKg} kg</td>
                                            <td>
                                                {new Date(historico.dataExecucao).toLocaleDateString("pt-BR")}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {historicos.length === 0 && (
                                <div className={style.vazio}>
                                    <p>Nenhum treino registrado ainda.</p>
                                </div>
                            )}
                        </div>
                    </main>
                </Topbar>
            </Sidebar>
        </div>
    )
}