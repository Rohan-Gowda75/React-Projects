import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import JobCard from "./Components/JobCard";
import { useEffect, useState } from "react";
import { collection, query, orderBy, where, getDocs } from "firebase/firestore";
import { db } from "./firebase.config";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [customSearch, setCustomSearch] = useState(false);

  //  Fetch all jobs initially
  const fetchJobs = async () => {
    setCustomSearch(false);
    const tempJobs = [];
    const jobsRef = collection(db, "jobs");
    const q = query(jobsRef, orderBy("postedOn", "desc"));
    const req = await getDocs(q);

    req.forEach((job) => {
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate(),
      });
    });

 
    setJobs(tempJobs);
  };

    useEffect(() => {
    fetchJobs();
  }, []);

  //  Fetch jobs with filters (dynamic)
  const fetchJobsCustom = async (jobCriteria) => {
    setCustomSearch(true);
    const tempJobs = [];
    let q = query(collection(db, "jobs"));

    if (jobCriteria.type) q = query(q, where("type", "==", jobCriteria.type));
    if (jobCriteria.title) q = query(q, where("title", "==", jobCriteria.title));
    if (jobCriteria.experience)
      q = query(q, where("experience", "==", jobCriteria.experience));
    if (jobCriteria.location)
      q = query(q, where("location", "==", jobCriteria.location));

    q = query(q, orderBy("postedOn", "desc")); 

    const req = await getDocs(q);

    req.forEach((job) => {
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate(),
      });
    });

    
    setJobs(tempJobs);
  };



  return (
    <div>
      <NavBar />
      <Header />
      <SearchBar fetchJobsCustom={fetchJobsCustom} />

      {customSearch && (
        <button onClick={fetchJobs} className="flex pl-[1250px] mb-2">
          <p className="bg-blue-500 px-10 py-2 rounded-md text-white">
            Clear Filters
          </p>
        </button>
      )}

      {/* 🔹 Show jobs or fallback */}
      {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job.id} {...job} />)
      ) : (
        <p className="text-center text-gray-500 mt-10">No jobs found</p>
      )}
    </div>
  );
}
