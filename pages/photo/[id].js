import Layaout from '../../components/layaout'

import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import Unsplash from 'unsplash-js';
const unsplash = new Unsplash({ accessKey: "UmGg7X1Au5u-WBL4u95sXq11Jtn_Jtm3V9VnyFBOA18" });

function Photo({ foto }) {
    //console.log(foto.alt_description)
    const router = useRouter();

    //console.log(router)

    /* Este funciona cuando el fallback en getStaticPaths esta true
    Como generar la página en tiempo real necesito darle tiempo para
    agarrar los datos y luego renderizarlos.
    */
    if (router.isFallback) {
        return <div>Esperando...</div>
    }
    return (
        <Layaout titulo="photo">
            <header>
                <span onClick={() => Router.back()}>
                    &#8592; Back
                </span>
                <h1>{foto.alt_description} </h1>
            </header>
            <img src={foto.urls.regular} />
        </Layaout>
    )
}

export default Photo


export async function getStaticPaths() {
    //const paths= [{ params: { id: '4TBSG2Oqu0Q' } }];

    const dato = await unsplash.photos.listPhotos(1, 10, "latest")
    const fotos = await dato.json()

    const paths = fotos.map(({ id }) => {
        return {
            params: {
                id: id
            }
        }
    })
    //console.log(paths +  ' la ruta')
    return {
        fallback: true,
        paths
    }
}

export async function getStaticProps({ params }) {
    //console.log(params.id + 'el id')
    const dato = await unsplash.photos.getPhoto(params.id)
    const foto = await dato.json()

    return {
        props: {
            foto
        }
    }
}
