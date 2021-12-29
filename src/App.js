import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="container">
                    <Header/>
                    <Content/>
                    <Footer/>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
