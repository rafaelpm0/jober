import {
  handleChangeObjectEvent,
  handleChangeImage,
  handlBoelano,
} from "../handles/handles";
import styles from "../../styles/forms/forms.module.css";

/**
 * Componente de formulário para edição de um job, permitindo a atualização dos detalhes do job e a manipulação de imagens associadas.
 *
 * @param {Object} props - Propriedades passadas para o componente.
 * @param {Function} props.handleForm - Função que lida com o envio do formulário.
 * @param {Object} props.include - Objeto contendo os dados atuais do job a serem exibidos e editados no formulário.
 * @param {Function} props.setInclude - Função de atualização de estado para modificar os dados do job.
 * @param {boolean} props.delet - Flag que indica se a imagem associada ao job deve ser deletada.
 * @param {Function} props.setDelet - Função de atualização de estado para controlar a flag de exclusão da imagem.
 *
 * @returns {JSX.Element} - O componente JSX que renderiza o formulário de edição do job.
 *
 * }
 */


export default function FormPut({
  handleForm,
  include,
  setInclude,
  delet,
  setDelet,
}) {
  return (
    <div className={styles.form}>
      <form onSubmit={handleForm} onClick={(e) => e.stopPropagation()}>
        <label htmlFor="job_name">Tarefa:</label>
        <input
          type="text"
          placeholder="Digite aqui"
          value={include.job_name || ""}
          onChange={(event) => handleChangeObjectEvent(event, setInclude)}
          name="job_name"
          id="job_name"
        />

        <label htmlFor="job_description">Descrição:</label>
        <textarea
          placeholder="Digite aqui"
          value={include.job_description || ""}
          onChange={(event) => handleChangeObjectEvent(event, setInclude)}
          name="job_description"
          id="job_description"
        />

        <input
          className={styles.image}
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
          className={`${styles.del_btn} ${
            delet ? `${styles.delet}` : `${styles.not_delet}`
          }`}
        >
          Deletar imagem
        </button>
        <button className={styles.btn} type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}
