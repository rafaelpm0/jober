/**
 * Manipula o envio do formulário e o processamento do resultado.
 *
 * @param {Event} e - O evento de submissão do formulário. É usado para prevenir o comportamento padrão de envio.
 * @returns {Promise<void>} - Não retorna valor. Apenas executa operações de estado e fechamento de modais.
 *
 * @throws {Error} - Pode lançar um erro se ocorrer um problema durante o envio dos dados ou o processamento do resultado.
 */
async function handleForm(e) {
  e.preventDefault();

  const obj_inclusao = { ...include };

  delete obj_inclusao["job_create_at"];
  delete obj_inclusao["has_image"];

  try {
      const result = await handleSubmit(e, obj_inclusao, delet, setMessage);

      try {
          handleChangeDelete(result, setJobs);
      } catch (processingError) {
          setMessage(["Erro ao processar o resultado", "error"]);
          console.error("Erro ao processar o resultado:", processingError);
      }

      setOpen(false);
      setOpenImage(false);
      setDelet(false);
  } catch (submitError) {
      console.error("Erro ao enviar os dados:", submitError);
      setMessage(["Erro ao enviar os dados ao servidor", "error"]);
  }
}