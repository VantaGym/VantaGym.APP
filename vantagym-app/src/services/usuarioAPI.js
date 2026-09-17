import { HTTPClient } from "./client";

const UsuarioAPI = {
    async obterAsync() {
        try {
            const response = await HTTPClient.get(`/Usuario/Obter`)
            return response.data
        } catch (error) {
            console.error("Erro ao obter usuário", error)
            throw error
        }
    },

    async listarAsync() {
        try {
            const response = await HTTPClient.get(`/Usuario/Listar`);
            return response.data;
        } catch (error) {
            console.error("Erro ao listar usuários:", error);
            throw error;
        }
    },

    async criarAsync(nome, email, senha) {
        try {
            const usuarioCriar = {
                Nome: nome,
                Email: email,
                Senha: senha
            };
            const response = await HTTPClient.post(`/Usuario/Criar`, usuarioCriar);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            throw error;
        }
    },

    async atualizarAsync(nome, email) {
        try {
            const usuario = {
                Nome: nome,
                Email: email
            }
            const response = await HTTPClient.put(`/Usuario/Atualizar`, usuario);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            throw error;
        }
    },

    async deletarAsync() {
        try {
            const response = await HTTPClient.delete(`/Usuario/Deletar`);
            return response.data;
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            throw error;
        }
    },

    async alterarSenhaAsync(senhaNova, senhaAntiga) {
        try {
            const usuarioAlterarSenha = {
                SenhaNova: senhaNova,
                SenhaAntiga: senhaAntiga
            };
            const response = await HTTPClient.put(`/Usuario/AlterarSenha`, usuarioAlterarSenha);
            return response.data;
        } catch (error) {
            console.error("Erro ao alterar senha do usuário:", error);
            throw error;
        }
    },

    async loginAsync(email, senha) {
        try {
            const usuarioLogin = {
                Email: email,
                Senha: senha
            };
            const response = await HTTPClient.post(`/Usuario/Login`, usuarioLogin);
            return response.data;
        } catch (error) {
            console.error("Erro ao realizar login:", error);
            throw error;
        }
    }
}

export default UsuarioAPI;