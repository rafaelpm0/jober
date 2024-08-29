export default async function handleSubmit(e, include, setStatus){
  console.log(include)
  console.log(e)
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
      setStatus(`Atualizado com sucesso: ${result.message}`);
    } catch (error) {
      setStatus(`Erro: ${error.message}`);
    }      
 
  };   