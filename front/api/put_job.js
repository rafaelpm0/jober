export default async function handleSubmit(e, job, del_image=false) {
  e.preventDefault();
  try {

    job.del_image = del_image;
    const response = await fetch(
      `http://127.0.0.1:8000/api/job/`,
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

    return result;
  } catch (error) {
   
  }
}
