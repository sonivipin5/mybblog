import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import '../styles/globals.css'
import Head from 'next/head'
import BottomToTop from '../components/BottomToTop'

function MyApp({ Component, pageProps, props }) {
  return <>
          <Head>
            <title>MyBlog</title>
          </Head>
            <NavBar data={props}/>
            <Component data={props} {...pageProps} />
            <Footer/>
            <BottomToTop/>
        </>
}


MyApp.getInitialProps = async (ctx) => {
  const header = {
    Authorization:
    `bearer ${process.env.GET_DATA_API}`,
  };
  // Fetch data from external API
  const {API_URL} = process.env
  const res = await fetch(`${API_URL}/v1/posts?populate=*`, { headers: header });
  const post = await res.json();
  // Pass data to the page via props
  return {
    props: {
      post: post,
    },
  };
 
}
export default MyApp
