import styles from "../../styles/adicionar/adicionar.module.css";
import { useState } from "react";
import handleSubmit from "../../api/add_job";
import Modal from "../Modal/modal";
import { handlBoelano, handleChangeDelete } from "../handles/handles";
import FormPost from "./form_post";
import Message from "../utilitarios/message";

export default function Adicionar({ setJobs, setMessage }) {
  const [open, setOpen] = useState(false);
  const [include, setInclude] = useState([]);

  async function handleForm(e) {
    e.preventDefault();
    try {
      const result = await handleSubmit(e, include, setInclude, setMessage);
      handleChangeDelete(result, setJobs);
    } catch (e) {
      console.log(e);
      setMessage("Erro de conexão no servidor", "error");
    }
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
