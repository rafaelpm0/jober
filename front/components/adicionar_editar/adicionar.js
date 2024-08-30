import styles from "../../styles/adicionar/adicionar.module.css";
import { useState } from "react";
import handleSubmit from "../../api/add_job";
import Modal from "./modal";
import {
  handlBoelano,
  handleChangeObjectEvent,
  handleChangeObject,
  handleChangeImage,
} from "../handles/handles";

export default function Adicionar({ setJobs }) {
  const [open, setOpen] = useState(false);
  const [include, setInclude] = useState([]);

  async function handleForm(e) {
    e.preventDefault();
    const result = await handleSubmit(e, include, setInclude);
    handleChangeObject(result, setJobs);
    setOpen(false);
  }

  return (
    <>
      <a
        className={styles.add_btn}
        onClick={() => {
          handlBoelano(open, setOpen);
        }}
      >
        <img src="/assets/add.png" alt="imagem do job" />
      </a>

      {open && (
        <Modal>
          <div
            className={`${styles.container_form} ${
              open ? `${styles.open}` : `${styles.close}`
            }`}
          >
            <a
              className={styles.modal}
              onClick={() => handlBoelano(open, setOpen)}
            >
              <form onSubmit={handleForm} onClick={(e) => e.stopPropagation()}>
                <label htmlFor="job_name">Nome:</label>
                <input
                  type="text"
                  placeholder="Digite aqui"
                  value={include.job_name || ""}
                  onChange={(event) =>
                    handleChangeObjectEvent(event, setInclude)
                  }
                  name="job_name"
                  id="job_name"
                  required
                />

                <label htmlFor="job_description">Descrição:</label>
                <textarea
                  placeholder="Digite aqui"
                  value={include.job_description || ""}
                  onChange={(event) =>
                    handleChangeObjectEvent(event, setInclude)
                  }
                  name="job_description"
                  id="job_description"
                  required
                />

                <input
                  type="file"
                  name="image"
                  onChange={(event)=>{handleChangeImage(event, setInclude)}}
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
