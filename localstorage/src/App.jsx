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
     </div>
    </>
  )
}

export default App
