import './Styles/Global.css'
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import MyRoutes from "./Routes/Routes";
import {BrowserRouter} from "react-router-dom";

function App() {

  return (
    <div className="App">
        <BrowserRouter>
            <Header/>
            <MyRoutes/>
            <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
