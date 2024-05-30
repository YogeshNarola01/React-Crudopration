import React, { useState } from 'react'

const Crud2 = () => {

    const [name,setName]=useState("")
    const [phone,setPhone]=useState("")
    let datas = localStorage.getItem("users2") ? JSON.parse(localStorage.getItem("users2")) : []
    const [record2,setRecord2]=useState(datas)
    const [status,setStatus]=useState("deactive")
    const [mdelet2,setMdelet2]=useState([])

    const handlesubmit = (e) =>{
        e.preventDefault();

        if(!name || !phone){
            alert("All fild are required..")
            return false
        }

        let obj = {
            id : Date.now(),name,phone,status
        }

        let newlist = [...record2,obj]
        localStorage.setItem("users2",JSON.stringify(newlist))
        setRecord2(newlist)
        setName("")
        setPhone("")
    }

    const dataDelet =(id)=>{
        let dd = record2.filter(item => item.id != id)

        localStorage.setItem("users2",JSON.stringify(dd))
        setRecord2(dd)
    }

    const dataStatus = (id,status)=>{
        if(status === "deactive"){
            let dstatus = record2.map((val)=>{
                if(val.id == id){
                    val.status = "active"
                }
                return val;
            })
            localStorage.setItem("users2",JSON.stringify(dstatus))
            setRecord2(dstatus)
        }else{
            let dstatus = record2.map((val)=>{
                if(val.id == id){
                    val.status = "deactive"
                }
                return val;
            })
            localStorage.setItem("users2",JSON.stringify(dstatus))
            setRecord2(dstatus)
        }
    }


    const handleChangedelet2=(id,checked)=>{
        let all2 = [...mdelet2]
        if(checked){
            all2.push(id)
        }else{
            all2 = all2.filter(val => val != id)
        }
        setMdelet2(all2)
    }

    const multipleDlet2=()=>{
        if(mdelet2.length > 0){
            let d2 = record2.filter(val => !mdelet2.includes(val.id))
            localStorage.setItem("users2",JSON.stringify(d2))
            setRecord2(d2)
        }
    }

  return (
    <div align="center" className='main'>
        <h1>:: Add User Data ::</h1>
        <form onSubmit={handlesubmit} className='form'><br/>
            Name : {""}<input type='text' placeholder='Enter Youre Name' onChange={(e)=>setName(e.target.value)} value={name}></input><br/><br/>
            Phone : {""}<input type='number' placeholder='Enter Youre Phone' onChange={(e)=>setPhone(e.target.value)} value={phone}></input><br/><br/>
            <input className='btn' type='submit'></input>
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
                    <td><button className='mdbtn' onClick={()=>multipleDlet2()}>Delet</button></td>
                </tr>
            </thead>
            <tbody>
                {
                    record2.map((val)=>{
                        return(
                            <tr key={val.id}>
                                <td>{val.id}</td>
                                <td>{val.name}</td>
                                <td>{val.phone}</td>
                                <td>
                                    {
                                        val.status === "deactive" ? (
                                            <button className='btn' style={{background:"#ed5650",color:"white",cursor:"pointer"}} onClick={()=> dataStatus(val.id,val.status)}>{val.status}</button>
                                        ) : (
                                            <button className='btn' style={{background:"green",color:"white",cursor:"pointer"}} onClick={()=> dataStatus(val.id,val.status)}>{val.status}</button>
                                        )
                                    }
                                </td>
                                <td><button className='btn' style={{background:"#ed5650",color:"white",cursor:"pointer"}} onClick={()=> dataDelet(val.id)}>Delet</button></td>
                                <td><input type="checkbox" onChange={(e)=>handleChangedelet2(val.id,e.target.checked)}/></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>

)
}

export default Crud2
