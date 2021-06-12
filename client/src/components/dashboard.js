import React from 'react'
import {Paper,Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom'

export default function Dashboard(){
    const history=useHistory()
    return (
        <div>
        <Paper id="rcorners2"  className='dashboard' elevation={3}>
        
        <p style={{ width:"fit-content", "text-align": 'left',alignItems:'flex-start' , fontSize:'30px', marginLeft: "7%",marginBottom:'7%'}} >Create Campaign</p> 
        <Button href='/dashboard/new/campaign' style={{ height:'fit-content', 'margin-right':'5%' ,'marginTop':'1%'}} variant ="contained" color="primary" size="large" id="rcorners2" >Create Campaign</Button>
        
        </Paper>
        </div>
        
    )
}