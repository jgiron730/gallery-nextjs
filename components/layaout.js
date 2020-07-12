import Head from 'next/head'
import styles from './layout.module.scss'

import { motion } from 'framer-motion'

const variants = {
    initial: { x: -80, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { ease: "easeOut", duration: .5 } },
    exit: { x: 80, opacity: 0, transition: { ease: "easeIn", duration: .5 } },
}

function layaout({ children, titulo }) {

    const seccion = titulo === 'photo' ? styles.photo : null;
    return (
        <motion.div
            className={`${styles.cont} ${seccion} `}
            initial="initial"
            animate="animate"
            exit="exit"
            //transition="transition"
            variants={variants}
        >
            <Head>
                <title>{titulo}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>


            {children}

            <footer>Developed by Julio Girón</footer>

        </motion.div>
    )
}

export default layaout
