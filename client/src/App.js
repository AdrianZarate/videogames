import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import {Home, Landing, Form, Detail} from './views'

function App() {

  const location = useLocation(); 

  return (
    <div className="App">
      {/* Otras maneras de enrutar */}
      {/* <Route exact path='/' component={Landing}/> */}
      {/* <Route exact path='/' render={() => <Home unaprop='valor'/>}/> */}

      {location.pathname !== '/' && <NavBar/>}

      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/create' element={<Form/>} />
        <Route path='/detail/:id' element={<Detail/>} />
      </Routes>
    </div>
  );
}

export default App;