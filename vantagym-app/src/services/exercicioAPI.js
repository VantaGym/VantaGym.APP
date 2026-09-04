import { HTTPClient } from "./client";

const ExercicioAPI = {
    async obterAsync(exercicioID) {
        try {
            const response = await HTTPClient.get(`/Exercicio/Obter/${exercicioID}`)
            return response.data
        } catch (error) {
            console.error("Erro ao obter exercício:", error)
            throw error;
        }
    },

    async listarAsync() {
        try {
            const response = await HTTPClient.get(`/Exercicio/Listar`)
            return response.data
        } catch (error) {
            console.error("Erro ao listar exercícios:", error)
            throw error;
        }
    },

    async criarAsync(nome, series, repeticoes, grupoMuscular, fichaTreinoID) {
        try {
            const exericicioCriar = {
                Nome: nome,
                Series: series,
                Repeticoes: repeticoes,
                GrupoMuscular: parseInt(grupoMuscular),
                FichaTreinoID: fichaTreinoID
            }
            const response = await HTTPClient.post(`/Exercicio/Criar`, exericicioCriar)
            return response.data
        } catch (error) {
            console.error("Erro ao criar exercício:", error)
            throw error
        }
    },

    async atualizarAsync(id, nome, series, repeticoes, grupoMuscular, fichaTreinoID) {
        try {
            const exercicio = {
                ID: id,
                Nome: nome,
                Series: series,
                Repeticoes: repeticoes,
                GrupoMuscular: parseInt(grupoMuscular),
                FichaTreinoID: parseInt(fichaTreinoID)
            }
            const response = await HTTPClient.put(`/Exercicio/Atualizar`, exercicio)
            return response.data
        } catch (error) {
            console.error("Erro ao atualizar exercício:", error)
            throw error
        }
    },

    async deletarAsync(exercicioID) {
        try {
            const response = await HTTPClient.delete(`/Exercicio/Deletar/${exercicioID}`)
            return response.data
        } catch (error) {
            console.error("Erro ao deletar exercício:", error)
            throw error
        }
    },

    async listarGruposMusculares() {
        try {
            const response = await HTTPClient.get(`/Exercicio/ListarGruposMusculares`)
            return response.data
        } catch (error) {
            console.error("Erro ao listar grupos musculares:", error)
            throw error
        }
    }
}

export default ExercicioAPI;