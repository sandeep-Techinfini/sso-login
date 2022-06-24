import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
import axios from 'axios';

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    if(data.id){
      console.log("working",formData)

      const response= await api.signIn({email:formData.email,password:formData.password,"from": "username-password",
   "to": "bearer",});

 if(response.data.token){
  //localStorage.setItem("profile",response.data)
  console.log( `Bearer ${response.data.token}`)
//********************************************************************************************************************* */
var config = {
  method: 'get',
  url: 'http://localhost:3030/check-authentication',
  headers: { 
    'Authorization': `Bearer ${response.data.token}`
  }
};

axios(config)
.then(function (response) {
  dispatch({ type: AUTH, data:response.data});
  router.push('/');
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});




  // const varifyResponse = await api.varify();

  //  console.log("working2",varifyResponse.data)
  //     dispatch({ type: AUTH, data:varifyResponse.data});
     // router.push('/');
 }
     
    }

    

    //
  } catch (error) {
    console.log(error);
  }
};

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn({email:formData.email,password:formData.password,"from": "username-password",
    "to": "bearer",});

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};
