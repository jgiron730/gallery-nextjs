import styles from './layout.module.scss'

function Grid({children}) {
    return (
        <div className={styles.home}>
            {children}
        </div>
    )
}

export default Grid
