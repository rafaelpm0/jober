export default async function handleSubmit(e, include, setStatus){

    e.preventDefault(); 
    try {
      
      const response = await fetch(`http://127.0.0.1:8000/api/job/?inst_image=true`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify(include),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return result
    } catch (error) {
      setStatus(`Erro: ${error.message}`);
    }      
 
  };   