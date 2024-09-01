import { useEffect } from 'react';
import styles from '../../styles/utilitarios/load.module.css';

/**
 * Componente que exibe um indicador de carregamento enquanto aguarda a conclusão de uma operação assíncrona.
 * 
 * @returns {JSX.Element} - O componente JSX que renderiza o indicador de carregamento.
 * 
 * @example
 * import Loading from './path/to/Loading';
 * 
 * function App() {
 *   return (
 *     <div>
 *       <Loading />
 *     </div>
 *   );
 * }
 */

export default function Loading(){
    useEffect(() => {
        const img = new Image();
        img.src = "/assets/load.png"; // Precarrega a imagem
    }, []);
    
    return(
        <div className={styles.load}>
            <img src="/assets/load.png" alt="loading" />
        </div>
    )
}