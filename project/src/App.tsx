import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./componentes/head";
import { FC } from "react";
import Landing from "./pages/landing";
import ProductsPage from "./pages/productos";
import PromotionalBanner from "./componentes/banerpromocional";
import Footer from "./componentes/footer";
import Login from "./pages/login";
import FavoritesPage from "./pages/favoritespage";
import OrderManagement from "./pages/gestiondeencargos";

const App: FC = () => {

  return (
    <div className="">
      <div className="w-full -z-0 bg-white min-h-screen h-full bg-opacity-10 backdrop-blur-sm">
        <Router>
              <div className="sticky top-0 z-10  lex flex-col">
                <Header/>
              </div>
              
          <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/landing" element={<Landing/>} />
            <Route path="/encargos" element={<OrderManagement/>} />
            <Route path="/productos" element={<ProductsPage/>} />
            <Route path="/favoritos" element={<FavoritesPage/>} />
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </Router>
        
      </div>
      <Footer/>
    </div>
  );
};

export default App;
