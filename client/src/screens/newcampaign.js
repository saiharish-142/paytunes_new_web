import React,{useState,useEffect} from 'react'
import { Paper,Divider,Grid } from '@material-ui/core'
 import {makeStyles} from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.secondary,
      padding:'3%',
    //   margin:'3%',
      '& svg': {
        margin: theme.spacing(1.5),
      },
      '& hr': {
        margin: theme.spacing(0, 0.5),
      },
    },
  }));


export default function NewCampaign(){

    const  classes=useStyles()
    const history=useHistory()
    const [active,setActive]=useState('')


    return (
        <div>
            <Paper id="rcorners2" className='dashboard' elevation={3}>
            <div style={{ "text-align": 'left',alignItems:'flex-start' , fontSize:'30px', marginLeft: "7%",marginBottom:'7%'}} >
            <h3  >Create Campaign </h3>
            </div>
            
            <form  >
            <div style={{"text-align": 'left',fontSize:'20px',marginLeft:'5%'}}>
            <h4 >What shall we call your Campaign? *</h4></div>
            <div ><input className="input" placeholder="e.g. Client / Product Name - May 2021" size="30"  /></div>
            </form>
            
            <div style={{margin:'5%'}}>
      <Grid container alignItems="center" className={classes.root}>
          <div className="col">
          <div className="heading"> Total Company Budget * </div>
          <div className="field">
              <span>Amount</span>
              
              <input className="inputbox" placeholder="in $" type="number" required max="100000" step="0.01" />
          </div>
          </div>
        
        <Divider orientation="vertical" flexItem style={{margin:'0px 40px'}}/>
        <div style={{width:'35%'}}>
          <div className="heading"> Campaign Dates </div>
          <div style={{display:'flex'}}>
          <div className="field">
              <span>Start Dates</span>
              
              <input className="inputbox" placeholder="yyyy-mm-dd" type="date"  />
          </div>
          <div className="field">
              <span>End Dates</span>
              
              <input className="inputbox" placeholder="yyyy-mm-dd" type="date"  />
          </div>
          </div>
          
          </div>
          
          
       <Divider orientation="vertical" flexItem={true} style={{margin:'0px 40px'}}/>
       <div style={{width:'25%'}}>
          <div className="heading"> Launch </div>
          <div className="field">
              <span>Do you want your Campaign to be active?</span>
              <div class="radio-toolbar" onChange={(e)=>setActive(e.target.value)} >
                  <input type="radio" id="active" name="Active" value="true"/>
                  <label for="active">Yes</label>
                  <input type="radio" id="inActive" name="Active" value="false"/>
                  <label for="inActive">No</label>
              </div>
              
          </div>
          </div>
      </Grid>
    </div>
    
      <div style={{textAlign:'right',marginRight:'2%'}}>
      <button type="button" tabIndex="0" id class="button-footer"  >Create Campaign Without Line Item</button>
      <button type="submit" tabIndex="0" id class="button-footer2"  onClick={()=>history.push('/dashboard/c/campaign/new')} >Next:Create Line Item</button>
      </div>
      
            
            </Paper>
        </div>
    )
}