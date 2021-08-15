import React, { FC, useContext, createContext } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from 'react-router-dom';
//import AuthSwitcher from './../../AuthSwitcher';
import IsAuthenticated from './../../auth-context';
import { GlobalStateContext } from './../State';



const SignIn = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const useGlobalState = useContext(GlobalStateContext);
  const history = useHistory();
  const onSubmit = (data) => {
    postData('http://localhost:3000/api/v1/users/login', data)
      .then(response => {
        console.log(response);
        let d = new Date();
        d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        document.cookie =
          "Token=" + response.token + ";" + expires + ";path=/";
        document.cookie =
          "id=" + response.data.user._id + ";" + expires + ";path=/";
        console.log(response); // JSON data parsed by `data.json()` call
        useGlobalState.updateState({ user: response.data.user })
      }).then(() => {
        history.push('/all-items');
      });
  };

  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="flex flex-col w-1/2 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <label>Email</label>
      <input className="text-black mb-12" defaultValue="test" {...register('email', { type: 'string' })} />
      <label>Password</label>
      {/* include validation with required or other standard HTML validation rules */}
      <input className="text-black mb-12 " {...register("password", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.password && <span>This field is required</span>}

      <input className="bg-black hover:bg-gray-500 cursor-pointer" type="submit" />
    </form>
  );
}

export default SignIn;