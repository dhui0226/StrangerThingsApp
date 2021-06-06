import React, { useState } from 'react'
import {register, login} from '../api'

const Register = (props) =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('') 

    const [errorMessage, setErrorMessage] = useState(null);
    const {setIsLoggedIn} = props;

    return (
        <>              
        <form className ='authenticate' onSubmit = {(event) => event.preventDefault()}> 
            <h1 className = 'maintitle'>Stranger's Things</h1>
            
            <h1 className = 'login'> Log In</h1>

            {errorMessage ? <h2 className = 'error'>{errorMessage}</h2> : null}
        
        <div className = 'credentialtools'>
            <input type ='text'
            className = 'credential'
            placeholder ='username' 
            value ={username} 
            onChange={(event) => setUsername(event.target.value)}
            />            

            <input type = 'password' 
            value = {password} 
            placeholder ='password'
            className = 'credential' 
            onChange = {(event) => setPassword(event.target.value)} 
            />

            <button className = 'loginbutton' onClick = {async (event) => {
                try{
                    const result = await login(username, password);
                    setIsLoggedIn(true);
                }catch (error){
                    setErrorMessage(error.message);
                }
            }}> Log-In </button>

            <button className = 'registerbutton' onClick ={async (event) => {
                try{
                    const result = await register(username, password);
                }catch (error){
                    setErrorMessage(error.message);
                }
            }}> Register </button>
        </div>
        </form>
        </>
    )
}

export default Register;