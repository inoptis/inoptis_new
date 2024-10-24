import Main from "../Pages/Main/Main";
import About from "../Pages/About/About";
import Partners from "../Pages/Partners/Partners";
import Catalog from "../Pages/Catalog/Catalog";


export const InfoRoutes = [
    { path: '/', element: <Main />},
    { path: '/about', element: <About />},
    { path: '/partners', element: <Partners />},
    { path: '/catalog', element: <Catalog />},
]
