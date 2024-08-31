import styles from "../../styles/adicionar/adicionar.module.css";
import { useState } from "react";
import handleSubmit from "../../api/add_job";
import Modal from "./modal";
import {
  handlBoelano,
  handleChangeObjectEvent,
  handleChangeDelete,
  handleChangeImage,
} from "../handles/handles";
import FormPost from "./form_post";

export default function Adicionar({ setJobs }) {
  const [open, setOpen] = useState(false);
  const [include, setInclude] = useState([]);

  async function handleForm(e) {
    e.preventDefault();
    const result = await handleSubmit(e, include, setInclude);
    handleChangeDelete(result, setJobs);
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
              <FormPost handleForm={handleForm} include={include} setInclude={setInclude}/>
            </a>
          </div>
        </Modal>
      )}
    </>
  );
}
