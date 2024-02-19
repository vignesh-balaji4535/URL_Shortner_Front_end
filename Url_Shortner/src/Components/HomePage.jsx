import { useEffect,useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import axios from "axios";
import Login from './Login';
import { useNavigate } from 'react-router-dom';


function HomePage() {
  const user_token = localStorage.getItem("user_key");
  const user_id = localStorage.getItem("user_data");
  const [url, setUrl] = useState("");
  const [data,setData]=useState()
  const [reload, setReload] = useState(false)
  const navigate = useNavigate();
  const handleButton =  async() => {

     await axios.post(`https://url-shortner-a1ie.onrender.com/api/${user_id}`,{long_url:url})
      .catch((err)=>console.log(err))
      setUrl("");
      setReload(!reload)

      
  }

  const handleDelete = (_id)=>{
    axios.delete(`https://url-shortner-a1ie.onrender.com/api/delete/${_id}`)
    .catch(err=>console.log(err.message))
    alert("URL Record Deleted SUccessfully !!!")
    setReload(!reload)

  }
  useEffect(()=>{

     axios.get("https://url-shortner-a1ie.onrender.com/api/all")
    .then((res)=>{setData(res.data)})
    .catch(err=>console.log(err))

  },[reload])

  const logout=()=>{
    window.alert("User logout success !!!")
    localStorage.setItem("user_data","");
    localStorage.setItem("user_key","");
    setReload(!reload)
  }


  return (
    <div className='container-fluid my-4'style={{height:"100vh"}}>
      
      <div className='container text-center'>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <br />
<h2 className='text-white'>URL SHORTNER</h2>


      {

        user_id&&user_token?
        <>  
      
{/* // URL SHORTNER */}

<div className="container-fluid">
<div className="row">
      <div className="col-lg-12 col-sm-12 d-flex align-items-center  justify-content-center ">
        <input
          type="text"
          value={url}
          className=" mx-2"
          name="Shortner"
          placeholder="Enter Long Url"
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: "260px", height: "42px", fontSize: "25px" }}
        />

        <button
          className="btn btn-success text-center "
          style={{  fontSize: "25px" }}
          onClick={handleButton}
        >
          Submit
        </button>
      </div>
      <br />
      <br /><br />
      
      {!data&&
        <div className="container text-center">
          <div className="spinner-grow text-primary" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow text-secondary" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow text-success" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow text-danger" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow text-warning" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow text-info" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow text-light" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow text-dark" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
        </div>
        }
        <br />
        <br />
      <div className="container d-flex justify-content-center m-0">

      <table className="table  table table-dark table-striped-columns m-0 " style={{width:"100%"}}>



  <thead>
    <tr>
      <th scope="col">Full URL</th>
      <th scope="col">Short URL</th>
      <th scope="col">Clicks</th>
      <th scope="col">Remove</th>
    </tr>
  </thead>
  <tbody>
{
  data&&data.map((itm,index)=>{
return <tr key={index}>
      <td style={{overflowX:"scroll"}} ><a href={itm.long_url}>{itm.long_url}</a></td>
      <td style={{overflowX:"scroll"}} ><a onClick={()=>setReload(!reload)} href={`https://url-shortner-a1ie.onrender.com/api/${itm.short_url}`}  target="_blank">{`https://url-shortner-a1ie.onrender.com/api/${itm.short_url}` }</a></td>
      <td >{itm.clickCount}</td>
      <td><button className='btn btn-danger' onClick={()=>handleDelete(itm._id)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg>
        </button></td>
    </tr>
  })
}

  </tbody>
</table>
      </div>
      </div>
      </div>
      </>:
      <div className='container   ' style={{height:"100vh",marginTop:"80px"}}>
        <br />
        <br />
        <br />
      <h2 className='text-white'>
        NO USER TOKEN PLS LONG IN AGAIN !!!!
      </h2>
      <button className="btn btn-success text-center" onClick={()=>navigate("/userLogin")}>Login Again</button>
      </div>



    }
     <br /><br />
     <div className="card p-3">
      <h3>ACCOUNT SETTINGS</h3>
      <div>
      <button className="btn btn-danger text-center" onClick={logout}>LogOut</button>

      </div>
     </div>
    </div>
  )
}

export default HomePage
