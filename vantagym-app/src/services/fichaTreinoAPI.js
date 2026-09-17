import { HTTPClient } from "./client";

const FichaTreinoAPI = {
    async obterAsync(fichaTreinoID) {
        try {
            const response = await HTTPClient.get(`/FichaTreino/Obter/${fichaTreinoID}`)
            return response.data
        } catch (error) {
            console.error("Erro ao criar ficha de treino:", error.response?.data)
            throw error
        }
    },

    async listarAsync() {
        try {
            const response = await HTTPClient.get(`/FichaTreino/Listar`)
            return response.data
        } catch (error) {
            console.error("RESPOSTA DA API:", error.response?.data)
            throw error
        }
    },

    async criarAsync(nome) {
        try {
            const fichaCriar = {
                Nome: nome
            }
            const response = await HTTPClient.post(`/FichaTreino/Criar`, fichaCriar)
            return response.data
        } catch (error) {
            console.error("Erro ao criar ficha de treino:", error)
            throw error
        }
    },

    async atualizarAsync(id, nome) {
        try {
            const ficha = {
                ID: id,
                Nome: nome
            }
            const response = await HTTPClient.put(`/FichaTreino/Atualizar`, ficha)
            return response.data
        } catch (error) {
            console.error("Erro ao atualizar ficha de treino:", error)
            throw error
        }
    },

    async deletarAsync(fichaTreinoID) {
        try {
            const response = await HTTPClient.delete(`/FichaTreino/Deletar/${fichaTreinoID}`)
            return response.data
        } catch (error) {
            console.error("Erro ao deletar ficha de treino:", error)
            throw error
        }
    }
}

export default FichaTreinoAPI;