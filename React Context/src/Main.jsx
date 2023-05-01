import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DataList from './components/DataList';
import FavList from './components/FavList';

export default function Main() {
  return (
    <main>
        <Routes>
          <Route path='/' element={<DataList></DataList>}></Route>
          <Route path='/index' element={<DataList></DataList>}></Route>
          <Route path='/index.html' element={<DataList></DataList>}></Route>
          <Route path='/home' element={<DataList></DataList>}></Route>
          <Route path='/favs' element={<FavList></FavList>}></Route>
          </Routes>
    </main>
  )
}
