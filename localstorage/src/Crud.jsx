import React, { useState } from 'react'

const Crud = () => {
    const [name,setName]=useState("")
    const [phone,setPhone]=useState("")
    const [status,setStatus]=useState("deactive")
    let data = localStorage.getItem('users1') ? JSON.parse(localStorage.getItem("users1")) : []
    const [record1,setRecord1]=useState(data)
    const [mdelet,setMdelet]=useState([])
    const [mstatus,setMsattus]=useState([])

    const handlesubmit=(e)=>{
        e.preventDefault();

        if(!name || !phone){
            alert("All filed are required")
            return false;
        }

        let obj = {
            id : Date.now(),name,phone,status
        };
        let newfild = [...record1,obj]
        localStorage.setItem("users1",JSON.stringify(newfild))
        setRecord1(newfild)
        setName("")
        setPhone("")
    }

    const handleStatus =(id,status)=>{
        if(status === "deactive"){
            let upstatus = record1.map((val)=>{
                if(val.id == id){
                    val.status = "active"
                }
                return val;
            })
            localStorage.setItem("users1",JSON.stringify(upstatus))
            setRecord1(upstatus)
        }else{
            let upstatus = record1.map((val)=>{
                if(val.id == id){
                    val.status = "deactive"
                }
                return val;
            })
            localStorage.setItem("users1",JSON.stringify(upstatus))
            setRecord1(upstatus)
        }
    }

    const userDelet =(id)=>{
        let ud = record1.filter(val => val.id != id)
        setRecord1(ud)
        localStorage.setItem("users1",JSON.stringify(ud))
    }


    const handleChangedelet = (id,checked)=>{
        let all = [...mdelet]
        if(checked){
            all.push(id)
        }else{
            all = all.filter(val => val != id)
            return false
        }
        setMdelet(all)
    }

    const multipleDelet = () =>{
        if(mdelet.length > 0){
            let d = record1.filter(val => !mdelet.includes(val.id))
            localStorage.setItem("users1",JSON.stringify(d))
            setRecord1(d)
        }else{
            alert("minimum one selected ..!")
            return false
        }
    }

    const handleStatusedite = (id,checked) =>{
        let all = [...mstatus]
        if(checked){
            all.push(id)
        }else{
            all = all.filter(val => val != id)
        }
        setMsattus(all)
    }

    const multipleStatusedite = () =>{
        let multplestatusupdate = record1.map((val) => {
            if(mstatus.includes(val.id)){
                if(val.status === "active"){
                    val.status = "deactive"
                }else{
                    val.status = "active"
                }
            }
            return val
        })
        localStorage.setItem("users1",JSON.stringify(multplestatusupdate))
        setRecord1(multplestatusupdate)
        setMsattus([])
    }


   return (
    <>
    <div align="center" className='main'>
        <h1>:: Add User Data ::</h1>
        <form onSubmit={handlesubmit} className='form'>
        <p>Name : {""}<input type="text" placeholder='Enter Youre Name..' onChange={(e)=>setName(e.target.value)} value={name}/></p>
        <p>Phone : {""}<input type="number" placeholder='Enter Youre Phone..' onChange={(e)=>setPhone(e.target.value)} value={phone}/></p>
        <input className='btn' type="submit" />
        </form>
        <h1>:: View User Data ::</h1>
        <table border={5}>
            <thead>
                <tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Phone</td>
                    <td>Status</td>
                    <td>Action</td>
                    <td><button className='mdbtn' onClick={()=>multipleDelet()}>Delet</button></td>
                    <td><button className='mdbtn' onClick={()=>multipleStatusedite()}>Status Edite</button></td>
                </tr>
            </thead>
            <tbody>
                {
                    record1.map((val)=>{
                        return(
                            <tr key={val.id}>
                                <td>{val.id}</td>
                                <td>{val.name}</td>
                                <td>{val.phone}</td>
                                <td>
                                    {
                                    val.status === "deactive" ? (
                                    <button className='btn' onClick={()=>handleStatus(val.id,val.status)} style={{background:"#ed5650",color:"white", cursor:"pointer"}}>{val.status}</button> 
                                   ) : (
                                    <button className='btn' onClick={()=>handleStatus(val.id,val.status)} style={{background:"green",color:"white", cursor:"pointer"}}>{val.status}</button>
                                   )   
                                }
                                </td>
                                <td><button className='btn' style={{background:"#ed5650",color:"white",cursor:"pointer"}} onClick={()=>userDelet(val.id)}>Delet</button></td>
                                <td><input type="checkbox" onChange={(e)=>handleChangedelet(val.id,e.target.checked)}/></td>
                                <td><input type="checkbox" checked={mstatus.includes(val.id)} onChange={(e)=>handleStatusedite(val.id,e.target.checked)}/></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
    </>
  )
}

export default Crud
