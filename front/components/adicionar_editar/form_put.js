import {
  handleChangeObjectEvent,
  handleChangeImage,
  handlBoelano,
} from "../handles/handles";
import styles from "../../styles/forms/forms.module.css";

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
        <label htmlFor="job_name">Nome:</label>
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
          className={delet ? `${styles.delet}` : `${`${styles.not_delet}`}`}
        >
          Deletar
        </button>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
