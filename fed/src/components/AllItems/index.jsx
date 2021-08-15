import React, { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { sortItems } from './../MyItems';
import Select from './../Select';

const AllItems = () => {


  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filter, setFilter] = useState('');
  const [asc, setAsc] = useState(true);


  useEffect(() => {
    getAllItems();
  }, []);

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

  const reduceItems = (itemsToReduce) => {
    const reducedItems = [];
    console.log(itemsToReduce);
    itemsToReduce.forEach(a => {
      a.items.map((items) => {
        console.log(a);
        reducedItems.push({ ...items, discordHandle: a.discordHandle })
      })

    });
    setItems(reducedItems);
    setFilteredItems(reducedItems);
    console.log(items);
  }

  const getAllItems = () => {
    getData('http://localhost:3000/api/v1/users/items?fields=items,discordHandle')
      .then(response => {
        // setItems(response.data.items);
        //console.log(concat(list1, list2, [7, 8, 9]));
        response.data && reduceItems(response.data.items);
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

  /*
  const filterSearch = (searchText) => {
    const filteredResults = [];
    let skip = false;
    for (var i = 0; i < foods.length; i++) {
      skip = false;
      for (let key in foods[i]) {
        if (!skip) {
          if (foods[i][key].toString().toLowerCase().indexOf(searchText.toLowerCase()) != -1) {
            filteredResults.push(foods[i]);
            skip = true;
          }
        }
      }
    }
    // setFilteredFoods(filteredResults);
  }*/

  return (
    <div className='container mx-auto'>
      <Select handleClick={setFilter} />
      <table>
        <thead>
          <tr>
            <th onClick={() => sortItems('alphabetical', 'user', filteredItems, setFilteredItems, items, asc, setAsc)} className="w-1/5 md:w-2/12">User</th>
            <th onClick={() => sortItems('alphabetical', 'item', filteredItems, setFilteredItems, items, asc, setAsc)} className="w-2/5 md:w-1/6">Item</th>
            <th onClick={() => sortItems('number', 'purchasePrice', filteredItems, setFilteredItems, items, asc, setAsc)} className="w-1/12 md:w-1/6">Purchase Price</th>
            <th onClick={() => sortItems('number', 'soldPrice', filteredItems, setFilteredItems, items, asc, setAsc)} className="w-1/12 md:w-1/6">Sold Price</th>
            <th onClick={() => sortItems('number', 'soldPrice', filteredItems, setFilteredItems, items, asc, setAsc)} className="w-1/12 table-cell md:hidden">Profit</th>
            <th onClick={() => sortItems('date', 'datePurchased', filteredItems, setFilteredItems, items, asc, setAsc)} className="hidden md:table-cell md:w-1/6">Date Purchased</th>
            <th onClick={() => sortItems('date', 'dateSold', filteredItems, setFilteredItems, items, asc, setAsc)} className="hidden md:table-cell md:w-1/6">Date Sold</th>
            <th onClick={() => sortItems('number', 'quantity', filteredItems, setFilteredItems, items, asc, setAsc)} className="hidden md:table-cell md:w-1/6">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, i) => {
            return (
              <tr key={item._id} className="border-2">
                <th className="border-white border-2">{item.discordHandle}</th>
                <th className="border-white border-2">{item.item}</th>
                <th className="border-white border-2">{item.purchasePrice}</th>
                <th className="border-white border-2">{item.soldPrice}</th>
                <th className={`table-cell bg-white md:hidden ${item.soldPrice - item.purchasePrice > 0 ? 'text-green-900' : 'text-red-900'}`}>{item.soldPrice - item.purchasePrice}</th>
                <th className="hidden md:table-cell border-white border-2">{item.datePurchased}</th>
                <th className="hidden md:table-cell border-white border-2">{item.dateSold}</th>
                <th className="hidden md:table-cell border-white border-2">{item.quantity}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}


export default AllItems;
