import { useState } from 'react'
import Navbar from './Components/Navbar'
import VoiceAssistant from './Components/VoiceAssistant'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <VoiceAssistant/>
    </>
  )
}

export default App
