export default async function handleSubmit(
  e,
  job,
  del_image = false,
  setMessage
) {
  e.preventDefault();
  try {
    job.del_image = del_image;
    const response = await fetch(`http://127.0.0.1:8000/api/job/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(job),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log(del_image, result.image == null);
    if (del_image || result.image == null) {
      result["has_image"] = false;
    } else {
      result["has_image"] = true;
    }

    setMessage(["Tarefa editada", "success"]);

    return result;
  } catch (error) {
    setMessage(["Erro de envio", "error"]);
    throw new Error(console.log(e));
  }
}
