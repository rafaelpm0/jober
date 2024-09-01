import styles from "../../styles/adicionar_editar/adicionar_editar.module.css";
import { useEffect, useState } from "react";
import handleSubmit from "../../api/put_job";
import Modal from "../Modal/modal";
import { handlBoelano, handleChangeDelete } from "../handles/handles";
import FormPut from "./form_put";

/**
 * Componente React para editar um job. Exibe um botão de edição que abre um modal com um formulário para atualizar os detalhes do job.
 * 
 * @param {Object} props - Propriedades passadas para o componente.
 * @param {Object} props.job - Objeto representando o job a ser editado.
 * @param {Function} props.setJobs - Função de atualização de estado para definir a lista de jobs.
 * @param {Function} props.setMessage - Função de atualização de estado para definir mensagens de sucesso ou erro.
 * @param {Function} props.setOpenImage - Função de atualização de estado para controlar a visibilidade da imagem.
 * 
 * @returns {JSX.Element} - O componente JSX que renderiza o botão de edição e o modal de formulário.
 * 
 * }
 */
export default function Editar({ job, setJobs, setMessage, setOpenImage }) {
  const [open, setOpen] = useState(false);
  const [include, setInclude] = useState([]);
  const [delet, setDelet] = useState(false);

  useEffect(() => {
    setInclude(job);
  }, [job]);

  async function handleForm(e) {
    e.preventDefault();

    const obj_inclusao = { ...include };

    delete obj_inclusao["job_create_at"];
    delete obj_inclusao["has_image"];

    try {
      const result = await handleSubmit(e, obj_inclusao, delet, setMessage);
      handleChangeDelete(result, setJobs);
      setOpen(false);
      setOpenImage(false);
      setDelet(false);
    } catch (err) {
      console.error("Erro ao enviar os dados:", err);
      setOpen(false);
      setOpenImage(false);
      setDelet(false);
    }
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
          <div className={`${styles.container_form} ${styles.efect}`}>
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
