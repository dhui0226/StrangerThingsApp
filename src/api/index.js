const BASE_URL = 'https://strangers-things.herokuapp.com/api/2104-UIC-RM-WEB-FT';

export const givenToken = (token) =>{
    localStorage.setItem('given-token', token);
}

export const grabToken = () => {
    return localStorage.getItem('given-token')
}

export const clearToken = () => {
    localStorage.removeItem('given-token');
}



export const register = async(username, password, checkUser = false) => {
    const response = await fetch(`${BASE_URL}/users/register`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password,
                }
            })
        })

        const {error, data} = await response.json();
        console.log('register', data)

        if (error){
           throw Error(error.message)
        } else if (data && data.token){
               givenToken(data.token);
               alert('Registration Success! Press Log-in to Log In')
        }
        
        return data
}

export const login = async(username, password, checkUser = false) => {

    const response = await fetch(`${BASE_URL}/users/login`, 
        {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                username: username,
                password: password,
            }
        })
        })

        const {error, data} = await response.json();
        console.log('logging in', data)

        if (error){
           throw Error(error.message)
        } else if (data && data.token){
               givenToken(data.token);
        }
    
        return data
}

export const publicPosts = async () => {
    const response = await fetch(`${BASE_URL}/posts`)   
    const data = await response.json();   

}

