import React ,{ useState } from 'react'
import { Box, Select, MenuItem, Button , makeStyles , CircularProgress} from '@material-ui/core';

const useStyles = makeStyles({
    wrapper: {
        backgroundColor: "#fff",
        display: "flex",
        boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
        borderRadius:"5px",
        "& > *" :{
            flex: 1,
            height : "45px",
            margin:"8px",
        }
    }
})
export default (props) => {
    const initialState = {
        type: "Full time",
        location: "Remote",
      };
      const [jobSearch, setJobSearch] = useState(initialState);
      const [loading, setLoading] = useState(false);

      const handleChange = (e) => {
        e.persist();
        setJobSearch((oldState) => ({
            ...oldState,[e.target.name] : e.target.value
        }))
    }

    const search = async () => {
        setLoading(true);
        await props.fetchJobsCustom(jobSearch);
        setLoading(false);
      };


    const classes = useStyles()
  return (
    <Box p={2} mt={-5} mb={2} className={classes.wrapper}>
        <Select onChange={handleChange} value={jobSearch.type} name="type" disableUnderline variant='filled' defaultValue="Full time">
            <MenuItem value="Full time">Full time</MenuItem>
            <MenuItem value="Part time">Part time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
        </Select>
        <Select onChange={handleChange} value={jobSearch.location} name="location" disableUnderline variant='filled' defaultValue="Remote">
            <MenuItem value="Remote">Remote</MenuItem>
            <MenuItem value="In-office">In-office</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
        </Select>
        <Button variant="contained" color="primary" disableElevation disabled={loading} onClick={search}>{loading ? (<CircularProgress  color="secondary" size="22"/>) : ("Search job") }</Button>
    </Box>
  )
}

