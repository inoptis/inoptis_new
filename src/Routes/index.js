import Main from "../Pages/Main/Main";
import About from "../Pages/About/About";
import Partners from "../Pages/Partners/Partners";
import Catalog from "../Pages/Catalog/Catalog";
import Contacts from "../Pages/Contacts/Contacts";
import SubCatalog from "../Pages/SubCatalog/SubCatalog";
import ProductPage from "../Pages/ProductPage/ProductPage";
import SearchPage from "../Pages/Search/SearchPage";
import Privacy from "../Pages/Privacy/Privacy";


export const InfoRoutes = [
    { path: '/', element: <Main />},
    { path: '/about', element: <About />},
    { path: '/partners', element: <Partners />},
    { path: '/contacts', element: <Contacts />},
    { path: '/catalog', element: <Catalog />},
    { path: '/search', element: <SearchPage />},
    { path: '/privacy', element: <Privacy />},
    { path: '/catalog/subcatalog', element: <SubCatalog />},
    { path: '/catalog/subcatalog/:id', element: <ProductPage />},
]
