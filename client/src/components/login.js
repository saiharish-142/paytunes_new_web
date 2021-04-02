import React,{useContext, useState} from 'react'
import { Paper,TextField,Button } from '@material-ui/core'
import {Usercontext} from '../App'

import M from 'materialize-css'
import { orange } from '@material-ui/core/colors'

function Login(){

    let [email,setemail]=useState('')
    let [password,setpassword]=useState('')
    let [error,seterror]=useState('')
    const {dispatch}=useContext(Usercontext)

// usercontext
    function login(){

        
        fetch('http://127.0.0.1:5000/user/signin',{
            method:'Post',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                email,password
            })
        }).then(res=>res.json()).
        then(data=>{
            if(data.error){
                M.toast({html:data.error, classes:'#ff5252 red accent-2'})
            }else{
                localStorage.setItem('jwt',data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"Signedin Successfully", classes:'#69f0ae green accent-2'})
            }

        })
    }

return (
    <div style={{backgroundColor:"orangered", 
    position: 'absolute',
    width: '100%',
    margin: 0 }}>
        <Paper id="rcorners2"  className='login' elevation={3}>
                <form className="login__box" onSubmit={e=>{
                    e.preventDefault()
                    login()
                }}>
                    <div className='login__title' >Log In</div>
                    <TextField placeholder='Email' margin="dense" required={true} onChange={(e)=>{setemail(e.target.value)}} /><br/>
                    <TextField type='password' margin="dense" required={true} placeholder='Password' onChange={(e)=>{setpassword(e.target.value)}} /><br/>
                    <button className="button">login</button>
                </form>
            </Paper>
    </div>
)

}

export default Login