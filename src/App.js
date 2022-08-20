import React , {useState , useEffect} from "react";
import { Box, ThemeProvider ,Grid, CircularProgress , Button} from "@material-ui/core";
import theme from "./theme/theme";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/Job/JobCard";
import NewJobModal from "./components/Job/NewJobModal";
import {firestore , app } from './firebase/config';
import {Close as CloseIcon} from '@material-ui/icons'
import ViewJobModal from "./components/Job/ViewJobModal";



export default () => {

  const [jobs , setJobs] = useState([]);
  const [loading , setLoading] = useState(true);
  const [newJobModal , setNewJobModal] = useState(false);
  const [customSearch, setCustomSearch] = useState(false);
  const [viewJob, setViewjob] = useState({});
  

  
  const fetchJobs = async () => {
    setCustomSearch(false);
    setLoading(true);
    const req = await firestore.collection('jobs').orderBy('postedOn', 'desc').get();
    const tempJob = req.docs.map((job) => ({ ...job.data() , id: job.id , postedOn: job.data().postedOn.toDate()}));
    // console.log(tempJob)
    setJobs(tempJob);
    setLoading(false)
  }

  const fetchJobsCustom = async (jobSearch) => {
    setLoading(true);
    setCustomSearch(true);
    const req = await firestore.collection('jobs').orderBy('postedOn', 'desc').where("location", "==", jobSearch.location).where("type", "==", jobSearch.type).get();
    const tempJob = req.docs.map((job) => ({ ...job.data() , id: job.id , postedOn: job.data().postedOn.toDate()}));
    setJobs(tempJob);
    setLoading(false)
  };

  const postJob = async (jobDetails) => {
    await firestore.collection("jobs").add( {
      ...jobDetails,
      postedOn: app.firestore.FieldValue.serverTimestamp(),
    });
    fetchJobs();
  };
  useEffect(() => {
    fetchJobs();
  },[])
  return <ThemeProvider theme={theme}>
    <Header openNewJobModal={() => setNewJobModal(true)} />
    <NewJobModal closeModal={() => setNewJobModal(false)} newJobModal={newJobModal} postJob={postJob} />
    <ViewJobModal job={viewJob} closeModal={()=>setViewjob({})} />
    <Box mb={3}>
    <Grid container justify='center'>
      <Grid item xs={10}>
        <SearchBar fetchJobsCustom={fetchJobsCustom} />

        {
          loading ? 
          (<Box display="flex" justifyContent="center"> <CircularProgress/></Box>) : 
          (
            <>
              {customSearch && (
                <Box my={2} display="flex" justifyContent="flex-end">
                  <Button variant="secondary" onClick={fetchJobs}>
                    <CloseIcon size={20} /> Custom Search
                  </Button>
                </Box>
              )}
              {jobs.map((job) => (
                <JobCard
                  open={()=> setViewjob(job)}
                  key={job.id}
                  {...job}
                />
              ))}
            </>
          )
        }
        
      </Grid>
    </Grid>
    </Box>
  </ThemeProvider>
}