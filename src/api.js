import  axios from 'axios'

const baseUrl = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod'

export function requestInvite(name, email){
    return axios.post(baseUrl + '/fake-auth', {name, email})
        .then(function(response){
            return response.data
        }).catch(function (error) {
            if (error.response) {
                if(error.response.status === 400){
                    return Promise.reject(error.response.data.errorMessage)
                }else{
                    return Promise.reject(error.response.statusText)
                }
            } else if (error.request) {
                return Promise.reject(error.message)
            } else if(error.message){
                // Something happened in setting up the request that triggered an Error
                return Promise.reject(error.message)
            }else{
                console.error('Error', error);
                return Promise.reject(error)
            }
        })
}