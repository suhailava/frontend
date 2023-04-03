import logo from './logo.svg';
import './App.css';
import Form from './Component/Form';
import Grid from './Component/Grid';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Form />}></Route>
        <Route path='/Form/:id' element={<Form />}></Route>
        <Route path='/Grid' element={<Grid />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
