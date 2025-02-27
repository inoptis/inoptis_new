import './Styles/Global.css';
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import SEOHelmet from './Components/SEO/SEOHelmet';
import MyRoutes from "./Routes/Routes";
import { BrowserRouter } from "react-router-dom";
import {CsrfProvider} from "./Context/CSRFContext";


function App() {
    return (
        <CsrfProvider>
            <div className="App">
                <SEOHelmet
                    title="ООО Иноптис — Сайт компании Иноптис"
                    description="НТЦ «ИНОПТИС» — детище команды профессионалов, любящих решать сложные задачи."
                    keywords="ИНОПТИС, оптика, лазерная техника, инновации"
                    url="https://inoptis.ru"
                    image="/logo512.png"
                />
                <BrowserRouter>
                    <Header />
                    <MyRoutes />
                    <Footer />
                </BrowserRouter>
            </div>
        </CsrfProvider>
    );
}

export default App;
