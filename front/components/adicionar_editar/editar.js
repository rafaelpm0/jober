import styles from "../../styles/adicionar/adicionar.module.css";
import { useEffect, useState } from "react";
import handleSubmit from "../../api/put_job";
import Modal from "./modal";
import { handlBoelano, handleChangeDelete } from "../handles/handles";
import FormPut from "./form_put";

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
              <FormPut
                handleForm={handleForm}
                include={include}
                setInclude={setInclude}
                delet={delet}
                setDelet={setDelet}
              />
            </a>
          </div>
        </Modal>
      )}
    </>
  );
}
