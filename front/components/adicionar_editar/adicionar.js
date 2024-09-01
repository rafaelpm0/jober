import styles from "../../styles/adicionar_editar/adicionar_editar.module.css";
import { useState } from "react";
import handleSubmit from "../../api/add_job";
import Modal from "../Modal/modal";
import { handlBoelano, handleChangeDelete } from "../handles/handles";
import FormPost from "./form_post";

export default function Adicionar({ setJobs, setMessage }) {
  const [open, setOpen] = useState(false);
  const [include, setInclude] = useState([]);

  async function handleForm(e) {
    e.preventDefault();
    try {
      const result = await handleSubmit(e, include, setMessage);
      handleChangeDelete(result, setJobs);
    } catch (e) {
      console.log(e);
    }
    setOpen(false);
  }

  return (
    <>
      <a
        className={styles.add_btn}
        onClick={() => {
          handlBoelano(open, setOpen);
          setInclude([])
        }}
      >
        <img src="/assets/add.png" alt="imagem do job" />
      </a>

      {open && (
        <Modal>
          <div
            className={`${styles.container_form} ${styles.efect}`}
          >
            <a
              className={styles.modal}
              onClick={() => handlBoelano(open, setOpen)}
            >
              <FormPost
                handleForm={handleForm}
                include={include}
                setInclude={setInclude}
              />
            </a>
          </div>
        </Modal>
      )}
    </>
  );
}
