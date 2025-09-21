import React, { useEffect, useState } from 'react';
import AdminNav from '../components/AdminNav';
import axios from 'axios';


const View = () => {

  const [problem, setProblem] = useState([])
  const [loading, setLoading] = useState(true)



  useEffect(() =>{
    const fetchProblems = async () =>{
      try{

        const res = await axios.get("http://localhost:4000/api/problem/view");
        console.log(res.data);

        setProblem(res.data);

      }catch(error){
        console.log("error fetch-->", error);
      }
    }

    fetchProblems();
  },[])


  return (
    <div className="flex flex-col min-h-screen">
      <AdminNav />

      <div className='max-w-7xl mx-auto p-4 mt-6' >

        {loading && <div className='text-center text-primary py-10'> loading problems</div>}

        {problem.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg: grid-cols-3 gap-6'>
            {problem.map ( problem=>(
              <div>
                {problem.title} | {problem.description}

                <problemCard key = {problem._id} problem = {problem} />
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default View;
