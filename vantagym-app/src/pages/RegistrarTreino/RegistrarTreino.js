import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./RegistrarTreino.module.css";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import FichaTreinoAPI from "../../services/fichaTreinoAPI";
import HistoricoTreinoAPI from "../../services/historicoTreinoAPI";
import Modal from "react-bootstrap/Modal";

export function RegistrarTreino() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [ficha, setFicha] = useState(null);
    const [exercicios, setExercicios] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");

    const carregarFicha = async () => {
        try {
            const response = await FichaTreinoAPI.obterAsync(id);
            setFicha(response);
            const exerciciosPreenchidos = response.exercicios.map((exercicio) => ({
                ...exercicio,
                seriesFeitas: exercicio.series,
                repeticoesFeitas: exercicio.repeticoes,
                cargaKg: ''
            }));
            setExercicios(exerciciosPreenchidos);
        } catch (error) {
            console.error("Erro ao carregar treino:", error);
        }
    };

    const handleSeries = (exercicioID, valor) => {
        setMensagemErro("");
        setExercicios(exercicios.map((exercicio) =>
            exercicio.id === exercicioID ? { ...exercicio, seriesFeitas: valor } : exercicio
        ));
    };

    const handleRepeticoes = (exercicioID, valor) => {
        setMensagemErro("");
        setExercicios(exercicios.map((exercicio) =>
            exercicio.id === exercicioID ? { ...exercicio, repeticoesFeitas: valor } : exercicio
        ));
    };

    const handleCarga = (exercicioID, valor) => {
        setMensagemErro("");
        setExercicios(exercicios.map((exercicio) =>
            exercicio.id === exercicioID ? { ...exercicio, cargaKg: valor } : exercicio
        ));
    };

    const handleFinalizarTreino = async () => {
        try {
            setMensagemErro("");
            for (const exercicio of exercicios) {
                await HistoricoTreinoAPI.criarAsync(
                    exercicio.seriesFeitas,
                    exercicio.cargaKg,
                    exercicio.repeticoesFeitas,
                    exercicio.id,
                    ficha.id
                );
            }
            setMostrarModal(true);
            setTimeout(() => {
                setMostrarModal(false);
                navigate("/fichasTreino");
            }, 1300);
        } catch (error) {
            console.error("Erro ao finalizar treino:", error);
            if (typeof error.response?.data === "string") {
                setMensagemErro(error.response.data);
            } else {
                setMensagemErro("Preencha todos os campos corretamente!");
            }
        }
    };

    useEffect(() => {
        carregarFicha();
    }, []);

    return (
        <div className={style.pagina}>
            <Sidebar>
                <Topbar>
                    <main className={style.conteudo}>
                        <div className={style.cabecalho}>
                            <div>
                                <span>TREINO EM ANDAMENTO</span>
                                <h1>{ficha?.nome}</h1>
                                <p> Registre suas séries, repetições e cargas durante o treino </p>
                            </div>

                            <button
                                className={style.botaoVoltar}
                                onClick={() => navigate("/fichasTreino")}><FaArrowLeft />
                                Voltar para fichas
                            </button>
                        </div>

                        <div className={style.tabela}>
                            <div className={style.tabelaCabecalho}>
                                <span>Exercício</span>
                                <span>Séries</span>
                                <span>Repetições</span>
                                <span>Carga (kg)</span>
                            </div>

                            {exercicios.map((exercicio) => (
                                <div
                                    className={style.tabelaLinha}
                                    key={exercicio.id}>
                                    <div>
                                        <span className={style.nomeExercicio}>
                                            {exercicio.nome}
                                        </span>
                                    </div>

                                    <input
                                        type="number"
                                        min="0"
                                        value={exercicio.seriesFeitas}
                                        onChange={(e) => handleSeries(exercicio.id, e.target.value)}
                                    />

                                    <input
                                        type="number"
                                        min="0"
                                        value={exercicio.repeticoesFeitas}
                                        onChange={(e) => handleRepeticoes(exercicio.id, e.target.value)}
                                    />

                                    <input
                                        type="number"
                                        min="0"
                                        value={exercicio.cargaKg}
                                        onChange={(e) => handleCarga(exercicio.id, e.target.value)}
                                        placeholder="0"
                                    />
                                </div>
                            ))}

                            {exercicios.length === 0 && (
                                <div className={style.vazio}>
                                    Nenhum exercício cadastrado nesta ficha.
                                </div>
                            )}
                        </div>

                        {mensagemErro && (
                            <div className={style.mensagemErro}>
                                {mensagemErro}
                            </div>
                        )}

                        <div className={style.rodape}>
                            <button
                                className={style.botaoFinalizar} onClick={handleFinalizarTreino}><FaCheck />
                                Finalizar treino
                            </button>
                        </div>

                        <Modal show={mostrarModal} contentClassName={style.modal}>
                            <Modal.Header>
                                <Modal.Title className={style.tituloModal}>
                                    Sucesso
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                Treino registrado com sucesso!
                            </Modal.Body>
                        </Modal>
                    </main>
                </Topbar>
            </Sidebar>
        </div>
    );
}