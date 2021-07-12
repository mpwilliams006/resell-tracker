import React, { FC } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from 'react-router-dom';

type Inputs = {
  discordHandle: string,
  email: string,
  password: string,
  passwordConfirm: string
};

let opts = { clickEvent: () => { console.log('clicked') } };
opts['clickEvent'] = () => { console.log('clicked') };

const SignUp: FC<Inputs> = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const history = useHistory();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    postData('http://localhost:3000/api/v1/users/users', data)
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
      }).then(() => {
        history.push('/signin');
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
    <>
      <h1>Sign Up</h1>
      <form className="flex flex-col w-1/2 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <label>Discord Handle</label>
        <input className="text-black mb-12" defaultValue="Bigtom" {...register("discordHandle")} />
        <label>Email</label>
        <input className="text-black mb-12" defaultValue="bigtom@gmail.com" {...register("email")} />
        <label>Password</label>
        <input className="text-black mb-12" defaultValue="test1234" {...register("password")} />
        <label>Confirm Password</label>
        <input className="text-black mb-12" defaultValue="test1234" {...register("passwordConfirm")} />
        {/* include validation with required or other standard HTML validation rules */}
        <input className="hover:bg-purple-900 py-3 px-4 text-base bg-purple-500 cursor-pointer" type="submit" {...opts} />
        {/* errors will return when field validation fails  */}
        {errors.password && <span>This field is required</span>}

      </form>
    </>
  );
}

export default SignUp;