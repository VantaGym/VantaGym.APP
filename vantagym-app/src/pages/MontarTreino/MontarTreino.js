import { useState } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import IAAPI from "../../services/iaAPI";
import style from "./MontarTreino.module.css";
import FichaTreinoAPI from "../../services/fichaTreinoAPI";
import ExercicioAPI from "../../services/exercicioAPI";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import Modal from "react-bootstrap/Modal"

export function MontarTreino() {
    const navigate = useNavigate();
    const [idade, setIdade] = useState("");
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");
    const [objetivo, setObjetivo] = useState("");
    const [nivelExperiencia, setNivelExperiencia] = useState("");
    const [diasPorSemana, setDiasPorSemana] = useState("");
    const [minutosPorTreino, setMinutosPorTreino] = useState("");
    const [restricoes, setRestricoes] = useState("");
    const [treino, setTreino] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [salvando, setSalvando] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false)

    const handleGerarTreino = async (e) => {
        e.preventDefault();

        try {
            setCarregando(true);
            setMensagemErro("");

            const response = await IAAPI.gerarTreinoAsync(idade, peso, altura, objetivo, nivelExperiencia, diasPorSemana, minutosPorTreino, restricoes);

            setTreino(response);
        } catch (error) {
            console.error("Erro ao salvar treino:", error);
            setMensagemErro("Não foi possível salvar o treino. Tente novamente.");
        } finally {
            setCarregando(false);
        }
    }
    const handleSalvarTreino = async () => {
        try {
            setSalvando(true);
            setMensagemErro("");

            for (const ficha of treino.fichas) {
                const fichaID = await FichaTreinoAPI.criarAsync(ficha.nome);

                for (const exercicio of ficha.exercicios) {
                    await ExercicioAPI.criarAsync(exercicio.nome, exercicio.series, exercicio.repeticoes, exercicio.grupoMuscular, fichaID);
                }
            }
            setMostrarModal(true);
            setTimeout(() => {
                setMostrarModal(false);
                navigate("/fichastreino");
            }, 1300);
        } catch (error) {
            console.error("Erro ao salvar treino:", error);
            setMensagemErro("Não foi possível salvar o treino. Tente novamente.");
        } finally {
            setSalvando(false);
        }
    }

    const isFormValid = () => {
        return (idade && peso && altura && objetivo && nivelExperiencia && diasPorSemana && minutosPorTreino);
    };

    return (
        <div className={style.pagina}>
            <Sidebar>
                <Topbar>
                    <main className={style.conteudo}>
                        <div className={style.cabecalho}>
                            <div>
                                <span>MEUS TREINOS</span>
                                <h1>Montar treino com IA</h1>
                                <p>Preencha as informações abaixo para gerar seu treino.</p>
                            </div>

                            <button
                                className={style.botaoVoltar}
                                onClick={() => navigate("/home")}><FaArrowLeft />
                                Voltar
                            </button>
                        </div>

                        <Form onSubmit={handleGerarTreino} className={style.formulario}>
                            <Form.Group controlId="formIdade" className="mb-4">
                                <Form.Label>Idade</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    max="100"
                                    placeholder="Ex: 25"
                                    value={idade}
                                    onChange={(e) => setIdade(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formPeso" className="mb-4">
                                <Form.Label>Peso (kg)</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    max="200"
                                    placeholder="Ex: 70"
                                    value={peso}
                                    onChange={(e) => setPeso(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formAltura" className="mb-4">
                                <Form.Label>Altura (cm)</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    placeholder="Ex: 175"
                                    value={altura}
                                    onChange={(e) => setAltura(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formObjetivo" className="mb-4">
                                <Form.Label>Objetivo</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={objetivo}
                                    onChange={(e) => setObjetivo(e.target.value)}
                                    required
                                >
                                    <option value="">Selecione seu objetivo</option>
                                    <option value="Hipertrofia">Hipertrofia</option>
                                    <option value="Força">Força</option>
                                    <option value="Condicionamento">Condicionamento</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formNivelExperiencia" className="mb-4">
                                <Form.Label>Nível de experiência</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={nivelExperiencia}
                                    onChange={(e) => setNivelExperiencia(e.target.value)}
                                    required
                                >
                                    <option value="">Selecione o nível</option>
                                    <option value="Iniciante">Iniciante</option>
                                    <option value="Intermediário">Intermediário</option>
                                    <option value="Avançado">Avançado</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formDiasPorSemana" className="mb-4">
                                <Form.Label>Dias por semana</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    max="7"
                                    placeholder="Ex: 4"
                                    value={diasPorSemana}
                                    onChange={(e) => setDiasPorSemana(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formMinutosPorTreino" className="mb-4">
                                <Form.Label>Minutos por treino</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="10"
                                    placeholder="Ex: 60"
                                    value={minutosPorTreino}
                                    onChange={(e) => setMinutosPorTreino(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formRestricoes" className="mb-4">
                                <Form.Label>Restrições ou preferências</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Ex: dor no ombro, sem acesso a barra fixa..."
                                    value={restricoes}
                                    onChange={(e) => setRestricoes(e.target.value)}
                                />
                            </Form.Group>

                            {mensagemErro && (
                                <div className={style.mensagemErro}>
                                    {mensagemErro}
                                </div>
                            )}

                            <div className={style.botoes}>
                                <Button
                                    className={style.botaoSalvar}
                                    type="submit"
                                    disabled={carregando || !isFormValid()}
                                >
                                    {carregando ? "Gerando treino..." : "Gerar treino"}
                                </Button>
                            </div>
                        </Form>

                        {treino && (
                            <div className={style.resultado}>
                                <h2>Seu treino</h2>

                                {treino.fichas.map((ficha, index) => (
                                    <div key={index} className={style.ficha}>
                                        <h3>{ficha.nome}</h3>

                                        {ficha.exercicios.map((exercicio, indexExercicio) => (
                                            <div
                                                key={indexExercicio}
                                                className={style.exercicio}
                                            >
                                                <span>{exercicio.nome}</span>
                                                <p>{exercicio.series} séries de {exercicio.repeticoes} repetições</p>
                                            </div>
                                        ))}
                                    </div>
                                ))}

                                <div className={style.botoes}>
                                    <Button
                                        className={style.botaoSalvar}
                                        onClick={handleSalvarTreino}
                                        disabled={salvando}
                                    >
                                        {salvando ? "Salvando treino..." : "Salvar treino"}
                                    </Button>
                                </div>

                            </div>
                        )}
                        <Modal show={mostrarModal} contentClassName={style.modal}>
                            <Modal.Header>
                                <Modal.Title className={style.tituloModal}>
                                    Sucesso
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                Treino salvo com sucesso!
                            </Modal.Body>
                        </Modal>
                    </main>
                </Topbar>
            </Sidebar>
        </div>
    );
}