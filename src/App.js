import { Route, useLocation } from "react-router-dom";
import "./App.css";
import CardPokeDetails from "./componentes/cards/CardPokeDetails";
import CreatePoke from "./componentes/createPoke/CreatePoke";
import Footer from "./componentes/footer/Footer";
import Home from "./componentes/home/Home";
import Landing from "./componentes/landing/Landing";
import Navbar from "./componentes/navbar/Navbar";

function App() {
  const { pathname } = useLocation();
  return (
    <>
      <Route exact path="/" component={Landing} />
      {pathname !== "/" && <Navbar />}
      <Route exact path="/home" component={Home} />
      <Route path="/home/:id" component={CardPokeDetails} />
      <Route path="/create" component={CreatePoke} />
      {pathname !== "/" && <Footer />}
    </>
  );
}

export default App;
