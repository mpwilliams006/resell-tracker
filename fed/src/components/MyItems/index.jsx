import React, { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Select from './../Select';
import Dashboard from './../Dashboard';
import dayjs from 'dayjs';
import * as yup from 'yup';

const sortItems = (type, itemType, arrayToSort, setSortedArray, preSort, asc, setAsc) => {
  let sorted = [];
  switch (type) {
    case 'numbers':
      sorted = asc ? [...arrayToSort].sort((a, b) => a[itemType] - b[itemType]) : [...arrayToSort].sort((a, b) => b[itemType] - a[itemType]);
      setSortedArray(sorted);
      break;
    case 'alphabetical':
      sorted = asc ? [...arrayToSort].sort((a, b) => a[itemType] === b[itemType] ? 0 : a[itemType] < b[itemType] ? -1 : 1) :
        [...arrayToSort].sort((a, b) => a[itemType] === b[itemType] ? 0 : a[itemType] < b[itemType] ? 1 : -1)
      setSortedArray(sorted);
      break;
    case 'date':
      sorted = asc ? [...arrayToSort].sort((a, b) => new Date(b[itemType]) - new Date(a[itemType])) :
        [...arrayToSort].sort((a, b) => new Date(a[itemType]) - new Date(b[itemType]))
      setSortedArray(sorted);
      break;
    default:
      setSortedArray(preSort);
  }
  setAsc(!asc);
}

const MyItems = () => {
  const schema = yup.object().shape({
    item: yup.string(),
    quantity: yup.number(),
    itemId: yup.string(),
    quantity: yup.number(),
    datePurchased: yup.string(),
    dateSold: yup.string(),
    purchasePrice: yup.number(),
    categories: yup.string(),
    id: yup.string()
  });
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  const [filter, setFilter] = useState('');
  const [asc, setAsc] = useState(true);

  useEffect(() => {
    let result;
    switch (filter) {
      case 'Sold Items':
        result = items.filter(item => item.dateSold);
        setFilteredItems(result);
        break;
      case 'Unsold Items':
        result = items.filter(item => !item.dateSold);
        setFilteredItems(result);
        break;
      default:
        setFilteredItems(items);
    }
  }, [filter]);

  useEffect(() => {
    getMyItems();
  }, []);

  useEffect(() => {
    console.log(currentItem);
  }, [currentItem]);

  const setNewForm = (item) => {
    setCurrentItem({});
    for (const [key, value] of Object.entries(item)) {
      if (key === '_id') {
        setValue('itemId', value);
      } else {
        setValue(key, value);
        console.log(`${key}`);
      }
    }
    setCurrentItem(item);
  }

  const getMyItems = () => {
    getData(`http://localhost:3000/api/v1/users/myitems/${Cookies.get('id')}`)
      .then(response => {
        setItems(response.data.listings.items);
        setFilteredItems(response.data.listings.items);
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
        getMyItems();
        setCurrentItem({});
      });
  };

  const deleteItem = (data) => {
    deleteData('http://localhost:3000/api/v1/users/items', data)
      .then(response => {
        getMyItems();
        setCurrentItem({});
      });
  };

  async function deleteData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
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
        <div>
          <Select handleClick={setFilter} />
          <table>
            <thead>
              <tr>
                <th onClick={() => sortItems('alphabetical', 'item', filteredItems, setFilteredItems, items, asc, setAsc)} className="w-1/6 cursor-pointer">Item</th>
                <th onClick={() => sortItems('numbers', 'purchasePrice', filteredItems, setFilteredItems, items, asc, setAsc)} className="w-1/12 cursor-pointer">Purchase Price</th>
                <th onClick={() => sortItems('numbers', 'soldPrice', filteredItems, setFilteredItems, items, asc, setAsc)} className="w-1/12 cursor-pointer">Sold Price</th>
                <th onClick={() => sortItems('date', 'datePurchased', filteredItems, setFilteredItems, items, asc, setAsc)} className="w-1/6 cursor-pointer">Date Purchased</th>
                <th onClick={() => sortItems('date', 'dateSold', filteredItems, setFilteredItems, items, asc, setAsc)} className="w-1/6 cursor-pointer">Date Sold</th>
                <th onClick={() => sortItems('numbers', 'quantity', filteredItems, setFilteredItems, items, asc, setAsc)} className="w-1/6 cursor-pointer">Quantity</th>
                <th className="w-1/6">Edit</th>
                <th className="w-1/6">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, i) => {
                return (
                  <tr key={item._id} className="border-white border-2">
                    <th className="border-white border-2">{item.item}</th>
                    <th className="border-white border-2">{item.purchasePrice}</th>
                    <th className="border-white border-2">{item.soldPrice}</th>
                    <th className="border-white border-2">{item.datePurchased}</th>
                    <th className="border-white border-2">{item.dateSold}</th>
                    <th className="border-white border-2">{item.quantity}</th>
                    <th className="border-white border-2"><button className="hover:bg-purple-900 py-3 px-4 text-base bg-purple-500 cursor-pointer" onClick={() => setNewForm(item)}>Edit</button></th>
                    <th className="border-white border-2"><button className="hover:bg-purple-900 py-3 px-4 text-base bg-purple-500 cursor-pointer" onClick={() => deleteItem(item)}>Delete</button></th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      }
      {Object.keys(currentItem).length != 0 &&
        <form className="flex flex-col w-1/2 mx-auto" action="#" onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          {currentItem.item}
          <label>Item</label>
          <input className="text-black mb-12" {...register("item")} />
          <input className="text-black mb-12" type="hidden" value={Cookies.get('id')} {...register("id")} />
          <input className="text-black mb-12" type="hidden" {...register("itemId")} />
          <label>Quantity</label>
          <input className="text-black mb-12" type="number" {...register('quantity', { type: 'number' })} />
          <label>Date Purchased</label>
          <input className="text-black mb-12" {...register("datePurchased")} />
          <label>Date Sold</label>
          <input className="text-black mb-12" {...register("dateSold")} />
          <label>Purchase Price</label>
          <input className="text-black mb-12" type="number" {...register('purchasePrice', { type: 'number' })} />
          <label>Sold Price</label>
          <input className="text-black mb-12" type="number" {...register('soldPrice', { type: 'number' })} />
          <label>Categories</label>
          <input className="text-black mb-12" {...register("categories")} />
          {/* include validation with required or other standard HTML validation rules */}
          <input className="hover:bg-purple-900 py-3 px-4 text-base bg-purple-500 cursor-pointer" type="submit" />
          {/* errors will return when field validation fails  */}
          {errors && <span>This field is required</span>}

        </form>}
      <Dashboard purchases={filteredItems} />
    </div >
  )
}


export { sortItems };
export default MyItems;
