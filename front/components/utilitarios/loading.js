import { useEffect } from 'react';
import styles from '../../styles/utilitarios/load.module.css';

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