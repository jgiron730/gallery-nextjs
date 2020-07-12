import './styles/global.scss'
import { AnimatePresence } from 'framer-motion'

export default function App({ Component, pageProps,router }) {
//  console.log(Component)
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Component {...pageProps} key={router.asPath} />
    </AnimatePresence>
    
  )

}

