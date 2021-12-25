import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
     <BrowserRouter>
        <div className="container">
            <Header/>
            <Content/>
            <Footer/>
        </div>
     </BrowserRouter>
  );
}

export default App;
