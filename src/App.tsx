import './App.css'
import React,{useState} from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Items from './pages/Items';
import NewItemForm from './pages/NewItemForm';
import Login from './pages/Login';
// import Visitante from './pages/Visitante';
import Door from './pages/Door';
import Session from './pages/Session';
import Admin from './pages/Admin';

export const ContextIds = React.createContext<any>({
  itemId:'',setItemId: () => {},
  userId:'',setUserId: () => {},
  type:'', setType: () => {}
});

function App() {
  const [itemId, setItemId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [type, setType] = useState<string>("");

  return (
    <>
      <BrowserRouter>
        <div className="rota">
          <ContextIds.Provider value= {{itemId,setItemId,userId,setUserId,type,setType}}>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/itens' element={<Items/>}/>
              <Route path='/cadastrar-novo-item' element={<NewItemForm/>}/>
              <Route path='/abrir-porta' element={<Door/>}/>
              <Route path='/login/guardar' element = {<Login tipo = "guardar" />}/>
              <Route path='/login/buscar' element = {<Login tipo = "buscar" />}/>
              <Route path='/sessao/buscar' element={<Session tipo='buscar'/>}/>
              <Route path='/sessao/guardar' element={<Session tipo = 'guardar'/>}/>
              <Route path = '/admin/*' element = {<Admin/>}/>
            </Routes>
          </ContextIds.Provider>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;
