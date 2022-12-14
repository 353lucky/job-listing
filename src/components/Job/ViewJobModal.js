import React from "react";
import { Box, Grid, Dialog, DialogTitle, DialogContent, DialogActions , makeStyles, Typography , Button , IconButton } from '@material-ui/core';
import {Close as CloseIcon} from '@material-ui/icons'
import { format } from "date-fns";
const useStyles = makeStyles((theme) => ({
    info:{
        '& > *' : {
            margin : "4px",
        }
    },
    skillChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",    
        fontWeight: 600,
        backgroundColor: theme.palette.secondary.main,
        color: "#fff"
    }
}))
export default  (props) => {
    const classes = useStyles();
    return (
    <Dialog open={!!Object.keys(props.job).length} fullWidth> 
        <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
            {props.job.title} @ {props.job.companyName}
                <IconButton onClick={props.closeModal}>
                    <CloseIcon/>
                </IconButton>
            </Box>
        </DialogTitle>
        <DialogContent>
        <Box>
          <Box className={classes.info} display="flex">
            <Typography fontSize={15} fontWeight="bold" variant="caption">
              Posted on:
            </Typography>
            <Typography fontSize={15} variant="body2">
              {props.job.postedOn &&
                format(props.job.postedOn, "dd/MMM/yyyy HH:MM")}
            </Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography fontSize={15} fontWeight="bold" variant="caption">
              Job type:
            </Typography>
            <Typography fontSize={15} variant="caption">
              {props.job.type}
            </Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography fontSize={15} fontWeight="bold" variant="caption">
              Job location:
            </Typography>
            <Typography fontSize={15} variant="caption">
              {props.job.location}
            </Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography fontSize={15} fontWeight="bold" variant="caption">
              Job description:
            </Typography>
            <Typography fontSize={15} variant="caption">
              {props.job.description}
            </Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography fontSize={15} fontWeight="bold" variant="caption">
              Company name :
            </Typography>
            <Typography fontSize={15} variant="caption">
              {props.job.companyNAme}
            </Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography fontSize={15} fontWeight="bold" variant="caption">
              Company Url :
            </Typography>
            <Typography fontSize={15} variant="caption">
              {props.job.companyUrl}
            </Typography>
          </Box>
          <Box ml={.5}>
            <Typography fontSize={15} fontWeight="bold" variant="caption">
              Skills:
            </Typography>
            <Grid container alignItems="center">
              {props.job.skills &&
                props.job.skills.map((skill) => (
                  <Grid item key={skill} className={classes.skillChip}>
                    {skill}
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Box>
        </DialogContent>
        <DialogActions>
        <Button
          variant="outlined"
          component="a"
          href={props.job.link}
          target="_blank"
        >
          Apply
        </Button>
        </DialogActions>

    </Dialog>
)}