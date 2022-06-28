import Header from './Components/Header';
import Home from './View/Homepage/Home';
import './App.css';
import Footer from './Components/Footer';
import { BrowserRouter, Routes, Route, } from "react-router-dom";

<script src="bower_components/aos/dist/aos.js"></script> 




// const Page404 = () => {
//   return (
//     <div>pAGE NOT FOUND</div>
//   )
// }

function App() {
  return (
    <BrowserRouter basename='/staking'>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="" element={<Home />} />
          <Route exact path="home" element={<Home />} />

          {/* <Route path="*" element={<Page404 />} /> */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
