import styles from "../../styles/adicionar/adicionar.module.css";
import { useEffect, useState } from "react";
import handleSubmit from "../../api/put_job";
import Modal from "./modal";
import {
  handlBoelano,
  handleChangeImage,
  handleChangeObjectEvent,
  handleChangeDelete,
} from "../handles/handles";

export default function Editar({ job, setJobs }) {
  const [open, setOpen] = useState(false);
  const [include, setInclude] = useState([]);
  const [delet, setDelet] = useState(false);

  useEffect(() => {
    setInclude(job);
  }, []);

  async function handleForm(e) {
    e.preventDefault();
    const obj_inclusao = include;

    delete obj_inclusao["job_create_at"];
    delete obj_inclusao["has_image"];

    const result = await handleSubmit(e, obj_inclusao, delet);
    handleChangeDelete(result, setJobs);
    setOpen(false);
  }

  return (
    <>
      <a
        onClick={() => {
          handlBoelano(open, setOpen);
        }}
      >
        <img src="/assets/edit.png" alt="editar" />
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
                />

                <input
                  type="file"
                  name="image"
                  onChange={(event) => {
                    handleChangeImage(event, setInclude);
                  }}
                  id="image"
                />
                <button
                  type="button"
                  onClick={() => handlBoelano(delet, setDelet)}
                  className={
                    delet ? `${styles.delet}` : `${`${styles.not_delet}`}`
                  }
                >
                  Deletar
                </button>
                <button type="submit">Enviar</button>
              </form>
            </a>
          </div>
        </Modal>
      )}
    </>
  );
}
