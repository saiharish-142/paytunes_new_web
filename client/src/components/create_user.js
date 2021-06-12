import React ,{useEffect, useState} from 'react'
import {Paper,FormControl,TextField,Select,MenuItem,Button,Snackbar,makeStyles} from '@material-ui/core'
import {useHistory } from 'react-router-dom'
import {Alert} from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));



export default function Create_User(){
  const history=useHistory()
  const classes=useStyles()
    let [role,setRole]=useState('')
    let [advertiser,setadvertiser]=useState('')
    let [advertise_data,setAdvertise_data]=useState([])
    const [firstname,setfirstname]=useState('')
    const [lastname,setlastname]=useState('')
    const [email,setemail]=useState('')
    const [success,setsuccess]=useState('')
    const [error,seterror]=useState('')
    const [open,setOpen]=useState(false)


  const handleclick=()=>{
    setOpen(true)
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

    const handleChange=(event)=>{
        role=setRole(event.target.value)
    }
    const handleChange2=(event)=>{
        advertiser=setadvertiser(event.target.value)
    }
    useEffect(()=>{
      fetch('http://127.0.0.1:5000/advertiser/get_advertisers',{
      method:'POST',
      headers:{"Content-Type":"application/json","Authorization" :"Bearer "+localStorage.getItem("jwt")},
      
  }).then(res=>res.json()).then(data=>{
      
      if(data.error){
          return console.log(data.error)
      }
      
      setAdvertise_data(data)
      
  })
    },[])
    const Create_User=()=>{
      fetch('http://127.0.0.1:5000/user/create_user',{
        method:'POST',
        headers: {"Content-Type":"application/json",
        "Authorization" :"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        firstname,
        lastname,
        email,
        advertiser,
        role,
        username:firstname+lastname
      })
    }).then(res=>res.json()).then(data=>{
      if(data.error){
        return console.log(data.error)
        seterror(data.error)
      }
      setsuccess('Successfuly Created!')
      setOpen(true)
      history.push('/advertisers')
    })
    }

    return(
      
      
        <Paper id="rcorners2"  className='dashboard' elevation={3}>
          <div className={classes.root}>
              {success ? (
					<Alert
						onClose={() => {
							setsuccess('');
						}}
						style={{ margin: '3%' }}
						severity="success"
					>
						{success}
					</Alert>
				) : (
					<React.Fragment />
				)}
				{error ? (
					<Alert
						onClose={() => {
							seterror('');
						}}
						style={{ margin: '3%' }}
						severity="error"
					>
						{error}
					</Alert>
				) : (
					''
				)}
        </div>
              <div style={{float:"left",margin:"2%",paddingBottom:'2%'}} > <h1>Create User</h1> </div>
              <form style={{padding:"40px",width:'30%'}} onSubmit={e=>{
            e.preventDefault()
            Create_User()
              }}>
            <TextField
          required={true}
          id="outlined-required"
          style={{width:"150%"}}
          label="First Name"
          variant="outlined"
          autoComplete='off'
          onChange={(e)=>setfirstname(e.target.value)}
        /><br/><br/>
        <TextField   // set validation in these fields
          required
          id="outlined-required"
          label="Last Name"
          variant="outlined"
          style={{width:"150%"}}
          autoComplete='off'
          onChange={(e)=>setlastname(e.target.value)}
        />
        <br/><br/>
        <TextField
          required
          //id="outlined-required"
          label="Email"
          variant="outlined"
          style={{width:"150%"}}
          autoComplete='off'
          onChange={(e)=>setemail(e.target.value)}
        />
        <br/><br/>
        <div style={{display:'block',marginBottom:'30px'}}>
        <label style={{fontSize:"22px" , float:"left",marginBottom:'10px'}} >Role</label>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          label="Select Category"
          style={{width:'100%'}}
          onChange={handleChange}
        >
          <MenuItem value="Administrator">Administrator</MenuItem>
          <MenuItem value='Campaign Manager'>Campaign Manager</MenuItem>
          <MenuItem value='Trafficker'>Trafficker</MenuItem>
          <MenuItem value='Creative'>Creative</MenuItem>
          <MenuItem value='Reporting'>Reporting</MenuItem>
          </Select>
        </div>
        
          <br/><br/>
          <div style={{display:'block',marginBottom:'30px'}}>
          <label style={{fontSize:"22px" , float:"left",marginBottom:'10px'}} >Default Advertiser (Optional)</label>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={advertiser}
          label="Select Category"
          style={{width:'100%'}}
          onChange={handleChange2}
        >
          
          {advertise_data.map((data)=>{
            return <MenuItem value={`${data.name}`}>{data.name}</MenuItem>  
          })}
            
          </Select>
          </div>
          
          
          <button style={{width:'70%' ,padding: '20px 40px',border:'1px solid #4645d6','border-radius': '10px',cursor:'pointer',backgroundColor:'#4645d6',color:'white' ,'font-weight':'bold'}}>Create User</button>
        </form>
        </Paper>
    )

}