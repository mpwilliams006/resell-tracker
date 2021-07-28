import React, { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useForm, SubmitHandler } from "react-hook-form";
import dayjs from 'dayjs';

const MyItems = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [items, setItems] = useState([]);

  useEffect(() => {
    getMyItems();
  }, []);

  const reduceItems = (itemsToReduce) => {
    const reducedItems = [];
    console.log(itemsToReduce);
    itemsToReduce.forEach(a => {
      a.items.map((items) => {
        reducedItems.push({ ...items, discordHandle: a.discordHandle })
      })
    });
    setItems(reducedItems);
  }

  const getMyItems = () => {
    getData(`http://localhost:3000/api/v1/users/myitems/${Cookies.get('id')}`)
      .then(response => {
        console.log(response.data.listings.items);
        setItems(response.data.listings.items);
        // response.data && reduceItems(response.data.items);
      }).catch(error => {
        console.log(error);
      });
  };

  async function getData(url = '') {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${Cookies.get('Token')}`
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const onSubmit = (data) => {
    postData('http://localhost:3000/api/v1/users/items', data)
      .then(response => {
        console.log(response);
      }).then(() => {
        // history.push('/all-items');
      });
  };

  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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
    <div className='container mx-auto'>
      <form className="flex flex-row mx-auto" onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <div className="flex flex-col">
          <label className="text-sm">Item</label>
          <div className="border-2 border-black w-1/6"><input className="text-black mb-12" placeholder={item.item} defaultValue={item.item} {...register("item")} /></div>
        </div>

        <div className="flex flex-col w-32">
          <label className="text-sm">Price</label>
          <div className="border-2 border-black"><input className="text-black mb-12 w-32" defaultValue={item.purchasePrice} {...register("purchasePrice")} /></div>
        </div>
        <input type="hidden" value={Cookies.get('id')} {...register("id")} />
        <input type="hidden" value={item._id} {...register("itemid")} />
        <div className="flex flex-col w-32">
          <label className="text-sm">Sold Price</label>
          <div className="border-2 border-black  w-32"><input className="text-black mb-12  w-32" defaultValue={item.soldPrice} {...register("soldPrice")} /></div>
        </div>
        <div className="flex flex-col w-32">
          <label className="text-sm">Purchase Date</label>
          <div className="border-2 border-black "><input className="text-black mb-12 w-32" defaultValue={item.datePurchased} {...register("datePurchased")} /></div>
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Date Sold</label>
          <div className="border-2 border-black "><input className="text-black mb-12" defaultValue={item.dateSold} {...register("dateSold")} /></div>
        </div>
        <div className="flex flex-col w-24">
          <label className="text-sm">Quantity</label>
          <div className="border-2 border-black "><input className="text-black mb-12 w-24" defaultValue={item.quantity} {...register("quantity")} /></div>
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Categories</label>
          <div className="border-2 border-black "><input className="text-black mb-12" defaultValue={item.categories} {...register("categories")} /></div>
        </div>
        {/* include validation with required or other standard HTML validation rules */}
        <div className="border-2 border-black "><input className="hover:bg-purple-900 py-3 px-4 text-base bg-purple-500 cursor-pointer" type="submit" /></div>
      </form>
    </div >
  );
}


export default MyItems;
