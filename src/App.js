import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home';
import Update from './components/Update';
import Header from './components/Header';
import { ToastContainer } from 'react-toast';
function App() {
  return (
   <BrowserRouter>
    <ToastContainer position='bottom-left' delay='6000'/>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/:id' element={<Update/>}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
