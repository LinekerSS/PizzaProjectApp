import styles from './styles.module.scss';
import { ReactNode, ButtonHTMLAttributes } from 'react'

import {FaSpinner} from 'react-icons/fa';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{ // Preciso verificar mais sobre!
    loading?: boolean, // ? é opcional
    children: ReactNode
}

export function Button({ loading, children, ...rest} : ButtonProps) {
    return (
        <button 
        className={styles.button}
        disabled={loading}
        {...rest}
        >
            { loading ? (
                <FaSpinner color='#fff' size={16} />
            ) : 
            <a className={styles.buttonText}>{children}</a>
            }            
        </button>
    )
}