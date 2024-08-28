/**
 * Função para lidar com a exclusão de um job.
 * 
 * Esta função realiza uma requisição HTTP DELETE para remover um job específico do servidor.
 * Após a exclusão bem-sucedida, ela atualiza o estado `jobs` para refletir a remoção do job.
 * 
 * @param {Function} setJobs - Função de atualização do estado de jobs, geralmente fornecida pelo hook `useState`.
 * @param {Array} jobs - Array atual de jobs, usado para filtrar o job que deve ser removido.
 * @param {number} id - O ID do job que deve ser excluído.
 * 
 * @throws {Error} Se ocorrer um erro durante a requisição ou processamento.
 */
export default async function handleDelete(setJobs, jobs, id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/job/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }), // Enviando o id no corpo da requisição
    });

    if (response.ok) {
      // Atualiza o estado removendo o job excluído
      const updatedJobs = jobs.filter(item => item.id !== id);
      console.log(updatedJobs); // Log para verificar o resultado
      setJobs(updatedJobs);
      // Adicionar feedback de sucesso ao usuário aqui
    } else {
      // Adicionar feedback de erro ao usuário aqui
    }
  } catch (err) {
    // Adicionar feedback de erro de conexão aqui
  }
}