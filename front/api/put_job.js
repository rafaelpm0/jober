export default async function handleSubmit(e, job, del_image) {
  e.preventDefault();
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/job/?del_image=${del_image}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(job),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
   
    // medida para colocar o has_image na resposta
    if (result.image !== null && del_image == false) {
      result.has_image = true;
    } else {
      result.has_image = false;
    }
    return result;
  } catch (error) {
   
  }
}
