import { HTTPClient } from "./client";

const HistoricoTreinoAPI = {
    async obterAsync(historicoID) {
        try {
            const response = await HTTPClient.get(`/HistoricoTreino/Obter/${historicoID}`)
            return response.data
        } catch (error) {
            console.error("Erro ao buscar histórico de treino:", error)
            throw error
        }
    },

    async listarAsync() {
        try {
            const response = await HTTPClient.get(`/HistoricoTreino/Listar`)
            return response.data
        } catch (error) {
            console.error("Erro ao listar históricos de treino:", error)
            throw error
        }
    },

    async criarAsync(seriesFeitas, cargaKg, repeticoesFeitas, dataExecucao, exercicioID, fichaTreinoID) {
        try {
            const historicoCriar = {
                SeriesFeitas: seriesFeitas,
                CargaKg: cargaKg,
                RepeticoesFeitas: repeticoesFeitas,
                DataExecucao: dataExecucao,
                ExercicioID: exercicioID,
                FichaTreinoID: fichaTreinoID
            }
            const response = await HTTPClient.post(`/HistoricoTreino/Criar`, historicoCriar)
            return response.data
        } catch (error) {
            console.error("Erro ao criar histórico de treino:", error)
            throw error
        }
    },

    async atualizarAsync(id, seriesFeitas, cargaKg, repeticoesFeitas) {
        try {
            const historico = {
                ID: id,
                SeriesFeitas: seriesFeitas,
                CargaKg: cargaKg,
                RepeticoesFeitas: repeticoesFeitas
            }
            const response = await HTTPClient.put(`/HistoricoTreino/Atualizar`, historico)
            return response.data
        } catch (error) {
            console.error("Erro ao atualizar histórico de treino:", error)
            throw error
        }
    },

    async deletarAsync(historicoID) {
        try{
            const response = await HTTPClient.delete(`/HistoricoTreino/Deletar/${historicoID}`)
            return response.data
        } catch(error) {
            console.error("Erro ao deletar histórico de treino:", error)
            throw error
        }
    }
}

export default HistoricoTreinoAPI