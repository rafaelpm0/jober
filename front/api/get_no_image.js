/**
 * Função assíncrona que realiza uma solicitação para a API de jobs e retorna os dados recebidos.
 * Atualiza o estado com mensagens de erro, se necessário.
 * 
 * @param {Function} setMessage - Função de atualização de estado do `useState` usada para armazenar mensagens de erro.
 * @returns {Promise<Array>} - Retorna uma promessa que resolve com a lista de jobs retornada pela API.
 * 
 * @throws {Error} Se a resposta da API não for bem-sucedida, um erro é lançado com o status da resposta.
 * 
 **/
export default async function fetchData(setMessage) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/job/?all=true&inst_img=true");

    if (!response.ok) {
      setMessage(["Servidor indisponível", "error"]);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jobs = await response.json();
    return jobs;
  } catch (err) {
    setMessage(["Servidor indisponível", "error"]);
    console.error("Erro ao buscar dados:", err);
    throw err; // Lance o erro novamente para que ele possa ser tratado no componente
  }
}