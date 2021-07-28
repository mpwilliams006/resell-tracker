import React, { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useForm, SubmitHandler } from "react-hook-form";
import dayjs from 'dayjs';

const MyItems = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({});

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

        setItems(response.data.listings.items);
        console.log(items);
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
      {Object.keys(currentItem).length === 0 &&
        <table>
          <thead>
            <tr>
              <th className="w-1/6">Item</th>
              <th className="w-1/6">Purchase Price</th>
              <th className="w-1/6">Sold Price</th>
              <th className="w-1/6">Date Purchased</th>
              <th className="w-1/6">Date Sold</th>
              <th className="w-1/6">Quantity</th>
              <th className="w-1/6">Edit</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => {
              return (
                <tr key={item._id} className="border-white border-2">
                  <th className="border-white border-2">{item.item}</th>
                  <th className="border-white border-2">{item.purchasePrice}</th>
                  <th className="border-white border-2">{item.soldPrice}</th>
                  <th className="border-white border-2">{item.datePurchased}</th>
                  <th className="border-white border-2">{item.dateSold}</th>
                  <th className="border-white border-2">{item.quantity}</th>
                  <th className="border-white border-2"><button className="hover:bg-purple-900 py-3 px-4 text-base bg-purple-500 cursor-pointer" onClick={() => setCurrentItem(item)}>Edit</button></th>
                </tr>
              );
            })}
          </tbody>
        </table>
      }
      {Object.keys(currentItem).length != 0 &&
        <form className="flex flex-col w-1/2 mx-auto" onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <label>Item</label>
          <input className="text-black mb-12" defaultValue={currentItem.item} {...register("item")} />
          <input className="text-black mb-12" type="hidden" value={Cookies.get('id')} {...register("userId")} />
          <input className="text-black mb-12" type="hidden" value={currentItem._id} {...register("itemId")} />
          <label>Quantity</label>
          <input className="text-black mb-12" defaultValue={currentItem.quantity} {...register("quantity")} />
          <label>Date Purchased</label>
          <input className="text-black mb-12" defaultValue={currentItem.datePurchased} {...register("datePurchased")} />
          <label>Date Sold</label>
          <input className="text-black mb-12" defaultValue={currentItem.dateSold} {...register("dateSold")} />
          <label>Purchase Price</label>
          <input className="text-black mb-12" defaultValue={currentItem.purchasePrice} {...register("purchasePrice")} />
          <label>Sold Price</label>
          <input className="text-black mb-12" defaultValue={currentItem.soldPrice} {...register("soldPrice")} />
          <label>Categories</label>
          <input className="text-black mb-12" defaultValue={currentItem.categories} {...register("categories")} />
          {/* include validation with required or other standard HTML validation rules */}
          <input className="hover:bg-purple-900 py-3 px-4 text-base bg-purple-500 cursor-pointer" type="submit" />
          {/* errors will return when field validation fails  */}
          {errors && <span>This field is required</span>}

        </form>}
    </div>
  )
}


export default MyItems;
