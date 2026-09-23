import { HTTPClient } from "./client";

const IAAPI = {
    async gerarTreinoAsync(idade, peso, altura, objetivo, nivelExperiencia, diasPorSemana, minutosPorTreino, restricoes) {
        try {
            const treino = {
                idade: parseInt(idade),
                peso: parseFloat(peso),
                altura: parseInt(altura),
                objetivo: objetivo,
                nivelExperiencia: nivelExperiencia,
                diasPorSemana: parseInt(diasPorSemana),
                minutosPorTreino: parseInt(minutosPorTreino),
                restricoes: restricoes
            };
            const response = await HTTPClient.post("/IA/GerarTreino", treino);
            return response.data;
        } catch (error) {
            console.error("Erro ao gerar treino:", error);
            throw error;
        }
    }
};

export default IAAPI;