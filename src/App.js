import './Styles/Global.css'
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import SEOHelmet from './Components/SEO/SEOHelmet';
import MyRoutes from "./Routes/Routes";
import { BrowserRouter } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [csrfToken, setCsrfToken] = useState(null);

    useEffect(() => {
        axios
            .get("https://inoptis.ru/csrf-api", { withCredentials: true })
            .then((response) => {
                setCsrfToken(response.data)
            })
            .catch((error) => console.error("Ошибка получения CSRF-токена:", error));
    }, []);

    console.log(csrfToken)
  return (
    <div className="App">
      <SEOHelmet
        title="ООО Иноптис — Сайт компании Иноптис"
        description="НТЦ «ИНОПТИС» — детище команды профессионалов, любящих решать сложные задачи."
        keywords="ИНОПТИС, оптика, лазерная техника, инновации"
        url="https://inoptis.ru"
        image="/logo512.png"
      />
      <BrowserRouter>
          <Header/>
          <MyRoutes/>
          <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
