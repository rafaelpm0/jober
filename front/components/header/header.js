import styles from "../../styles/header/header.module.css";

/**
 * Componente de Header para o aplicativo.
 *
 * Este componente renderiza o cabeçalho da página com um título fixo "Jober".
 * Utiliza estilos importados do módulo CSS `header.module.css`.
 *
 * @returns {JSX.Element} - Retorna um elemento JSX que representa o cabeçalho da página.
 */
export default function Header() {
    return (
        <header className={styles.container}>
            <h1>Jober</h1>
        </header>
    );
}