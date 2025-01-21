import { useState } from 'react'
import './App.css'
import AppRouter from './routes/AppRouter'
import Header from './components/Header'

function App() {

  return (
    <>
      <Header />
      <AppRouter />
    </>
  )
}

export default App
