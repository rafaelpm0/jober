/**
 * Função assíncrona que lida com o envio de dados de um job para a API e atualiza o estado de mensagens com o resultado da operação.
 * 
 * @param {Event} e - O evento do formulário que está sendo manipulado.
 * @param {Object} job - O objeto de job contendo os dados a serem enviados para a API.
 * @param {boolean} [del_image=false] - Flag opcional para indicar se a imagem associada ao job deve ser excluída.
 * @param {Function} setMessage - Função de atualização de estado para definir mensagens de sucesso ou erro.
 * 
 * @returns {Promise<Object>} - Retorna uma promessa que resolve com o resultado da API, se a operação for bem-sucedida.
 * 
 * @throws {Error} Se a resposta da API não for bem-sucedida, um erro é lançado com o status da resposta.
 * 
 */
export default async function handleSubmit(e, job, del_image = false, setMessage) {
    e.preventDefault();
    try {
      // Adiciona a flag para exclusão de imagem, se fornecida
      job.del_image = del_image;

      if (job.image == null){
        delete job['image']
      }
  
      const response = await fetch(`http://127.0.0.1:8000/api/job/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });

      if (!response.ok) {
        setMessage(["Erro de envio ao servidor", "error"]);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if(del_image==false && result['image']!== null){
        result['has_image'] = true;
      }else{
        result['has_image'] = false;
      }
      console.log(result)
      setMessage(["Tarefa editada", "success"]);
  
      return result;
    } catch (error) {
      setMessage(["Erro de envio ao servidor", "error"]);
      throw new Error(`HTTP error! Status: ${error}`);
    }
  }
  