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
        try {
            const response = await HTTPClient.delete(`/HistoricoTreino/Deletar/${historicoID}`)
            return response.data
        } catch (error) {
            console.error("Erro ao deletar histórico de treino:", error)
            throw error
        }
    },

    async obterQuantidadeTreinosSemanaAsync() {
        try {
            const response = await HTTPClient.get(`/HistoricoTreino/ObterQuantidadeTreinosSemana`)
            return response.data
        } catch (error) {
            console.error("Erro ao obter quantidade de treinos da semana:", error)
            throw error
        }
    },

    async obterVolumeUltimoTreinoAsync() {
        try {
            const response = await HTTPClient.get(`/HistoricoTreino/ObterVolumeUltimoTreino`)
            return response.data
        } catch (error) {
            console.error("Erro ao obter volume do último treino:", error)
            throw error
        }
    },

    async obterUltimoTreinoAsync() {
        try {
            const response = await HTTPClient.get(`/HistoricoTreino/ObterUltimoTreino`)
            return response.data
        } catch (error) {
            console.error("Erro ao obter último treino:", error)
            throw error
        }
    },

    async obterQuantidadeExerciciosUltimoTreinoAsync() {
        try {
            const response = await HTTPClient.get(`/HistoricoTreino/ObterQuantidadeExerciciosUltimoTreino`)
            return response.data
        } catch (error) {
            console.error("Erro ao obter quantidade de exercícios do último treino:", error)
            throw error
        }
    },

    async obterTempoDesdeUltimoTreinoAsync() {
        try {
            const response = await HTTPClient.get(`/HistoricoTreino/ObterTempoDesdeUltimoTreino`)
            return response.data
        } catch (error) {
            console.error("Erro ao obter tempo desde o último treino:", error)
            throw error
        }
    },

    async obterVolumeSemanaAsync() {
        try {
            const response = await HTTPClient.get(`/HistoricoTreino/ObterVolumeSemana`)
            return response.data
        } catch (error) {
            console.error("Erro ao obter volume da semana:", error)
            throw error
        }
    }
}
export default HistoricoTreinoAPI