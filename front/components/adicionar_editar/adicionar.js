import styles from "../../styles/adicionar/adicionar.module.css";
import { useState } from "react";
import handleSubmit from "../../api/add_job";
import Modal from "./modal";

export default function Adicionar({ setJobs }) {
  const [open, setOpen] = useState(false);
  const [include, setInclude] = useState([]);

  const handlOpen = () => {
    setOpen(!open);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInclude((prevState) => ({ ...prevState, [name]: value }));
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

  const handlSetJobs = (result) => {
    setJobs((prevState) => [...prevState, result]);
  };

  async function handleForm(e) {
    e.preventDefault();
    const result = await handleSubmit(e, include, setInclude);
    handlSetJobs(result);
    setOpen(false);
  }

  return (
    <>
      <a className={styles.add_btn} onClick={handlOpen}>
        <img src="/assets/add.png" alt="imagem do job" />
      </a>

      {open && (
        <Modal>
          <div
            className={`${styles.container_form} ${
              open ? `${styles.open}` : `${styles.close}`
            }`}
          >
            <a className={styles.modal} onClick={()=>handlOpen()}>
              <form onSubmit={handleForm}  onClick={(e) => e.stopPropagation()}>
                <label htmlFor="job_name">Nome:</label>
                <input
                  type="text"
                  placeholder="Digite aqui"
                  value={include.job_name || ""}
                  onChange={handleChange}
                  name="job_name"
                  id="job_name"
                  required
                />

                <label htmlFor="job_description">Descrição:</label>
                <textarea
                  placeholder="Digite aqui"
                  value={include.job_description || ""}
                  onChange={handleChange}
                  name="job_description"
                  id="job_description"
                  required
                />

                <input
                  type="file"
                  name="image"
                  onChange={handleChangeImage}
                  id="image"
                />

                <button type="submit">Enviar</button>
              </form>
            </a>
          </div>
        </Modal>
      )}
    </>
  );
}
