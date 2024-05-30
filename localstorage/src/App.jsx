import { useState } from 'react'
import Crud from './Crud'
import Crud2 from './Crud2'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div style={{display:"flex",justifyContent:"center"}}>
     <Crud/>
     <Crud2/>
     </div>
    </>
  )
}

export default App
