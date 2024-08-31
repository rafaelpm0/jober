export default async function handleSubmit(e, include, setStatus, setMessage){
    e.preventDefault(); 
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
      return result
    } catch (error) {
      setMessage(["Erro de envio ao servidor", "error"]);
    }      
 
  };   