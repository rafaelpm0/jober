import styles from "../../styles/adicionar/adicionar.module.css";
import { useEffect, useState } from "react";
import handleSubmit from "../../api/put_job";
import Modal from "./modal";

export default function Editar({ job, setJobs }) {
  const [open, setOpen] = useState(false);
  const [include, setInclude] = useState([]);
  const [delet, setDelet] = useState(false);

  useEffect(() => {
    setInclude(job);
  }, []);

  const handlOpen = () => {
    setOpen(!open);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInclude((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDelete =() => {
    setDelet(!delet)
};

  const handleChangeImage = (event) => {
    const { files } = event.target;

    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Content = reader.result.split(",")[1]; // Extrai o conteúdo Base64
        const fileName = file.name; // Obtém o nome do arquivo
        const fileType = file.type; // Obtém o tipo MIME do arquivo

        const image = {
          name: fileName,
          type: fileType,
          content: base64Content,
        };
        setInclude((prevState) => ({ ...prevState, image: image }));
      };

      reader.readAsDataURL(file);
    }
  };

  async function handleForm(e) {
    e.preventDefault();
    const obj_inclusao = include;
    
    delete obj_inclusao["job_create_at"];
    delete obj_inclusao["has_image"];
    console.log(obj_inclusao, delet)
    const result = await handleSubmit(e, obj_inclusao, delet);
    handlSetJobs(result);
    setOpen(false);
  }

  const handlSetJobs = (result) => {
    setJobs((prevState) => {
      // Verifica se o job já existe na lista
      const jobIndex = prevState.findIndex((job) => job.id === result.id);

      if (jobIndex !== -1) {
        // Se o job existe, cria uma nova lista com o job atualizado
        const updatedJobs = [...prevState];
        updatedJobs[jobIndex] = result;
        return updatedJobs;
      } else {
        // Se o job não existe, adiciona-o à lista
        return [...prevState, result];
      }
    });
  };

  return (
    <>
      <a onClick={handlOpen}>
        <img src="/assets/edit.png" alt="editar" />
      </a>

      {open && (
        <Modal>
          <div
            className={`${styles.container_form} ${
              open ? `${styles.open}` : `${styles.close}`
            }`}
          >
            <a className={styles.modal} onClick={() => handlOpen()}>
              <form onSubmit={handleForm} onClick={(e) => e.stopPropagation()}>
                <label htmlFor="job_name">Nome:</label>
                <input
                  type="text"
                  placeholder="Digite aqui"
                  value={include.job_name || ""}
                  onChange={handleChange}
                  name="job_name"
                  id="job_name"
                />

                <label htmlFor="job_description">Descrição:</label>
                <textarea
                  placeholder="Digite aqui"
                  value={include.job_description || ""}
                  onChange={handleChange}
                  name="job_description"
                  id="job_description"
                />

                <input
                  type="file"
                  name="image"
                  onChange={handleChangeImage}
                  id="image"
                />
                <button type="button"  onClick={()=>handleDelete()} className={delet ? `${styles.delet}` : `${`${styles.not_delet}`}`}>Deletar</button>
                <button type="submit">Enviar</button>
              </form>
            </a>
          </div>
        </Modal>
      )}
    </>
  );
}
