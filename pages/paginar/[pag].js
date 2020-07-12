import Link from 'next/link'
import { useRouter } from 'next/router'
import Layaout from '../../components/layaout'
import Unsplash from 'unsplash-js';
import Grid from '../../components/Grid';
const unsplash = new Unsplash({ accessKey: "UmGg7X1Au5u-WBL4u95sXq11Jtn_Jtm3V9VnyFBOA18" });
import { motion } from 'framer-motion'

function Pag({ paquetes }) {
    const router = useRouter();

    //console.log(router.query.pag)

    const siguiente = parseInt(router.query.pag) + 1;
    const atras = router.query.pag === 1 ? 1 : parseInt(router.query.pag) - 1;

    /*     if (router.isFallback){
            return <p>Cargando...</p>
        } */


    return (

        <Layaout titulo="Home" >

            <header>
                <Link href="/" as={`/`} >
                    <img src="/img/nextjs.svg" width="80" />
                </Link>

                <div>
                    {atras < 1 ? null :
                        <Link href="/paginar/[pag]" as={`/paginar/${atras}`} >
                            <a>&#8592; Back</a>
                        </Link>
                    }
                    <Link href="/paginar/[pag]" as={`/paginar/${siguiente}`} >
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
export default Pag


export async function getStaticPaths() {

    const paths = [
        { params: { pag: '1' } },
        { params: { pag: '2' } },
        { params: { pag: '3' } },
        { params: { pag: '4' } },
        { params: { pag: '5' } },
        { params: { pag: '6' } },
        { params: { pag: '7' } },
        { params: { pag: '8' } },
        { params: { pag: '9' } },
        { params: { pag: '10' } }
    ];

    return {
        fallback: false,
        paths
    }
}

export async function getStaticProps({ params }) {
    //console.log(params.pag)

    const datos = await unsplash.photos.listPhotos(params.pag, 7, "latest")
    const paquetes = await datos.json()

    return {
        props: {
            paquetes
        }
    }
}