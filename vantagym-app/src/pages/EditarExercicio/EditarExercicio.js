import { useEffect, useState } from "react"
import { Sidebar } from "../../components/Sidebar/Sidebar"
import { Topbar } from "../../components/Topbar/Topbar"
import style from "./EditarExercicio.module.css"
import { useNavigate, useParams } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import ExercicioAPI from "../../services/exercicioAPI"

export function EditarExercicio() {
    const [nome, setNome] = useState('')
    const [series, setSeries] = useState('')
    const [repeticoes, setRepeticoes] = useState('')
    const [grupoMuscular, setGrupoMuscular] = useState('')
    const [gruposMusculares, setGruposMusculares] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')

    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        carregarExercicio()
        carregarGruposMusculares()
    }, [])

    const carregarExercicio = async () => {
        try {
            const exercicio = await ExercicioAPI.obterAsync(id)
            setNome(exercicio.nome)
            setSeries(exercicio.series)
            setRepeticoes(exercicio.repeticoes)
            setGrupoMuscular(exercicio.grupoMuscular)
        } catch (error) {
            console.error("Erro ao buscar exercício:", error)
        }
    }

    const carregarGruposMusculares = async () => {
        try {
            const grupos = await ExercicioAPI.listarGruposMusculares()
            setGruposMusculares(grupos)
        } catch (error) {
            console.error("Erro ao buscar grupos musculares:", error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setMensagemErro('')
            await ExercicioAPI.atualizarAsync(id, nome, series, repeticoes, grupoMuscular)
            setMostrarModal(true)

            setTimeout(() => {
                setMostrarModal(false)
                navigate(-1)
            }, 1300)
        } catch (error) {
            console.error("Erro ao atualizar exercício:", error.response?.data)

            if (typeof error.response?.data === "string") {
                setMensagemErro(error.response.data)
            } else {
                setMensagemErro("Erro ao atualizar exercício!")
            }
        }
    }

    const isFormValid = () => {
        return nome && series && repeticoes && grupoMuscular
    }

    return (
        <div className={style.pagina}>
            <Sidebar>
                <Topbar>
                    <main className={style.conteudo}>
                        <div className={style.cabecalho}>
                            <span>MEUS TREINOS</span>
                            <h1>Editar exercício</h1>
                            <p>Altere as informações do exercício.</p>
                        </div>

                        <Form onSubmit={handleSubmit} className={style.formulario}>
                            <Form.Group controlId="formNome" className="mb-4">
                                <Form.Label>Nome do exercício</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ex: Supino Reto"
                                    value={nome}
                                    onChange={(e) => {
                                        setNome(e.target.value)
                                        setMensagemErro('')
                                    }}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formSeries" className="mb-4">
                                <Form.Label>Séries</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ex: 3"
                                    value={series}
                                    onChange={(e) => {
                                        setSeries(e.target.value)
                                        setMensagemErro('')
                                    }}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formRepeticoes" className="mb-4">
                                <Form.Label>Repetições</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ex: 12"
                                    value={repeticoes}
                                    onChange={(e) => {
                                        setRepeticoes(e.target.value)
                                        setMensagemErro('')
                                    }}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formGrupoMuscular" className="mb-4">
                                <Form.Label>Grupo muscular</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={grupoMuscular}
                                    onChange={(e) => {
                                        setGrupoMuscular(e.target.value)
                                        setMensagemErro('')
                                    }}
                                    required>
                                    <option value="">Selecione o grupo muscular</option>
                                    {gruposMusculares.map((grupo) => (
                                        <option key={grupo.id} value={grupo.id}>
                                            {grupo.nome}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            {mensagemErro && (
                                <div className={style.mensagemErro}>
                                    {mensagemErro}
                                </div>
                            )}

                            <div className={style.botoes}>
                                <Button className={style.botaoCancelar} onClick={() => navigate(-1)}>
                                    Cancelar
                                </Button>

                                <Button className={style.botaoSalvar} type="submit" disabled={!isFormValid()}>
                                    Salvar alterações
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
                                Exercício atualizado com sucesso!
                            </Modal.Body>
                        </Modal>
                    </main>
                </Topbar>
            </Sidebar>
        </div>
    )
}