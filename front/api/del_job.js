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
        const updatedJobs = jobs.filter(item => item.id !== id);
        console.log(updatedJobs)
        setJobs(updatedJobs);
        //colocar display de sucesso ao deletar
      } else {
        //colocar display de erro ao deletar
      }
    } catch (err) {
      //colocar botao de erro de conexao
    }
  }