import { useEffect, useState } from 'react';
import './index.css'
import './App.css';
import axios from 'axios';
import Profiles from './components/Profiles.js';
// import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const url = 'https://api.hatchways.io/assessment/students'
  const [profiles, setProfiles] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  

 
useEffect(() => {
  const getProfiles = () => {

    axios.get(`${url}`).then((response) => {  
    setProfiles(response)
    setHasSearched(true)

    })

  } 
  getProfiles()
},[])



  return (
   
    <div>
      
        {hasSearched && profiles !== "" ? <Profiles 
        students={profiles?.data?.students} setStudents={setProfiles} /> : null}
      </div>
  );
}

export default App;
