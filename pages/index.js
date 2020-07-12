import Link from 'next/link'
import Layaout from '../components/layaout'
import { motion } from 'framer-motion'
import Grid from '../components/Grid';


import Unsplash from 'unsplash-js';
const unsplash = new Unsplash({ accessKey: "UmGg7X1Au5u-WBL4u95sXq11Jtn_Jtm3V9VnyFBOA18" });

export default function Home({ paquetes }) {
  return (
    <Layaout titulo="Home">
      <header>
        <Link href="/" as={`/`} >
          <img src="/img/nextjs.svg" width="80" />
        </Link>
        <div>
          <Link href="/paginar/[pag]" as={`/paginar/2`} >
            <a>Next &#8594;</a>
          </Link>
        </div>
      </header>
      <Grid>
        {
          paquetes.map(({ urls, id }, k) => (
            <Link key={k} href="/photo/[id]" as={`/photo/${id}`} scroll={false}>
              <a>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <img key={k} src={urls.small} />
                </motion.div>
              </a>
            </Link>
          ))
        }
      </Grid>
    </Layaout>
  
  )
}


export async function getStaticProps() {

  const datos = await unsplash.photos.listPhotos(1, 10, "latest")
  const paquetes = await datos.json()
  console.log(paquetes)

  return {
    props: {
      paquetes
    }
  }
}

