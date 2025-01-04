import { wrapper } from '../reduxstore/store';
import '@/scss/styles.scss'
import Alert from '@/components/ui/Alert'; 

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Alert /> {/* Render the Alert component */}
            <Component {...pageProps} />
        </>
    );
}

export default wrapper.withRedux(MyApp);
