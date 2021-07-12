import React, { FC } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

type Inputs = {
  item: string,
  userId: Number,
  datePurchased: Date,
  dateSold: Date,
  quantity: Number,
  purchasePrice: Number,
  soldPrice: Number,
  categories: [String]
};

const AddItem: FC<Inputs> = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const history = useHistory();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    postData('http://localhost:3000/api/v1/users/items', data)
      .then(response => {
        console.log(response);
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
        'Content-Type': 'application/json',
        'authorization': `Bearer ${Cookies.get('Token')}`
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
      <label>Item</label>
      <input className="text-black mb-12" defaultValue="Bigtom" {...register("item")} />
      <input className="text-black mb-12" type="hidden" value={Cookies.get('id')} defaultValue="Bigtom" {...register("userId")} />
      <label>Quantity</label>
      <input className="text-black mb-12" defaultValue="bigtom@gmail.com" {...register("quantity")} />
      <label>Date Purchased</label>
      <input className="text-black mb-12" defaultValue="test1234" {...register("datePurchased")} />
      <label>Date Sold</label>
      <input className="text-black mb-12" defaultValue="test1234" {...register("dateSold")} />
      <label>Purchase Price</label>
      <input className="text-black mb-12" defaultValue="bigtom@gmail.com" {...register("purchasePrice")} />
      <label>Sold Price</label>
      <input className="text-black mb-12" defaultValue="test1234" {...register("soldPrice")} />
      <label>Categories</label>
      <input className="text-black mb-12" defaultValue="test1234" {...register("categories")} />
      {/* include validation with required or other standard HTML validation rules */}
      <input className="hover:bg-purple-900 py-3 px-4 text-base bg-purple-500 cursor-pointer" type="submit" />
      {/* errors will return when field validation fails  */}
      {errors && <span>This field is required</span>}

    </form>
  );
}

export default AddItem;