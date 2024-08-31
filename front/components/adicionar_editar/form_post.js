import { handleChangeObjectEvent, handleChangeImage } from "../handles/handles";
import styles from "../../styles/forms/forms.module.css";

/**
 * Componente FormPost
 *
 * @description
 * Este componente renderiza um formulário para a criação ou edição de um "Job". O formulário inclui campos para o nome do job, descrição e upload de imagem.
 *
 * @param {Function} handleForm - Função que é chamada quando o formulário é enviado. Ela lida com o processamento dos dados do formulário.
 * @param {Object} include - Objeto de estado que armazena os valores dos campos do formulário.
 * @param {Function} setInclude - Função para atualizar o estado `include` conforme o usuário preenche os campos do formulário.
 *
 * @returns {JSX.Element} Um formulário de input de dados para um job.
 */
export default function FormPost({ handleForm, include, setInclude }) {
  return (
    <div className={styles.form}>
      <form
        onSubmit={(e) => handleForm(e)}
        onClick={(e) => e.stopPropagation()}
      >
        <label htmlFor="job_name">Tarefa:</label>
        <input
          type="text"
          placeholder="Digite aqui"
          value={include.job_name || ""}
          onChange={(event) => handleChangeObjectEvent(event, setInclude)}
          name="job_name"
          id="job_name"
          required
        />

        <label htmlFor="job_description">Descrição:</label>
        <textarea
          placeholder="Digite aqui"
          value={include.job_description || ""}
          onChange={(event) => handleChangeObjectEvent(event, setInclude)}
          name="job_description"
          id="job_description"
          required
        />

        <input
          className={styles.image}
          type="file"
          name="image"
          onChange={(event) => handleChangeImage(event, setInclude)}
          id="image"
        />

        <button className={styles.btn} type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}
