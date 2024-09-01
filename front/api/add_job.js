/**
 * Envia os dados do formulário para o servidor e trata a resposta.
 *
 * @param {Event} e - O evento de submissão do formulário.
 * @param {Object} include - Dados a serem enviados na requisição POST.
 * @param {Function} setMessage - Função para definir a mensagem de status (sucesso ou erro).
 * @returns {Promise<Object>|undefined} - Retorna a resposta JSON do servidor em caso de sucesso ou `Error` em caso de erro.
 */
export default async function handleSubmit(e, include, setMessage) {
    e.preventDefault(); // Previne o comportamento padrão de envio do formulário
    
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/job/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(include),
        });
  
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const result = await response.json();
        setMessage(["Tarefa Adicionada", "success"]);
        return result;
  
    } catch (error) {
        setMessage(["Erro de envio ao servidor", "error"]);
        throw error;
    }
  }