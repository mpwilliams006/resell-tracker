import React, { useEffect, useState } from 'react';

const NavCardTitle = ({ title }) => {
  return (
    <h2 className="text-2xl pt-2 text-left">{title}</h2>
  );
}

const List = ({ list }) => {
  return (
    <div className="">
      <ul className="sm:px-4 md:px-12">
        {list.map(item => (
          item.header ? <li className="text-gray-100">{item.header}</li> : <li className="text-gray-400"><a href={item.href}>{item.text}</a></li>
        ))}
      </ul>
    </div>

  );
}

const Footer = () => {

  const listItems = [[
    { header: "Company" },
    {
      text: "Consectetur adipiscing",
      href: "/random"
    },
    {
      text: "Random link",
      href: "/random2"
    },
    {
      text: "RandomLink",
      href: "/random3"
    }
  ],
  [
    { header: "Resurces" },
    {
      text: "Consectetur adipiscing",
      href: "/random"
    },
    {
      text: "Random link",
      href: "/random2"
    },
    {
      text: "RandomLink",
      href: "/random3"
    }
  ],
  [
    { header: "Random" },
    {
      text: "Consectetur adipiscing",
      href: "/random"
    },
    {
      text: "Random link",
      href: "/random2"
    },
    {
      text: "RandomLink",
      href: "/random3"
    }
  ]]

  return (
    <>
      <div className="w-full bg-black">
        <div className="w-full md:w-10/12  mx-auto py-16 flex items-center sm:flex-col md:flex-row flex-wrap p-4">
          <div className="text-white sm:w-full md:w-5/12 flex flex-col mb-12">
            <svg className="fill-current mb-2 w-8 text-purple-600" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M31.952 14.751a260.51 260.51 0 00-4.359-4.407C23.932 6.734 20.16 3.182 16.171 0c1.634.017 3.21.28 4.692.751 3.487 3.114 6.846 6.398 10.163 9.737.493 1.346.811 2.776.926 4.262zm-1.388 7.883c-2.496-2.597-5.051-5.12-7.737-7.471-3.706-3.246-10.693-9.81-15.736-7.418-4.552 2.158-4.717 10.543-4.96 16.238A15.926 15.926 0 010 16C0 9.799 3.528 4.421 8.686 1.766c1.82.593 3.593 1.675 5.038 2.587 6.569 4.14 12.29 9.71 17.792 15.57-.237.94-.557 1.846-.952 2.711zm-4.505 5.81a56.161 56.161 0 00-1.007-.823c-2.574-2.054-6.087-4.805-9.394-4.044-3.022.695-4.264 4.267-4.97 7.52a15.945 15.945 0 01-3.665-1.85c.366-3.242.89-6.675 2.405-9.364 2.315-4.107 6.287-3.072 9.613-1.132 3.36 1.96 6.417 4.572 9.313 7.417a16.097 16.097 0 01-2.295 2.275z"></path></svg>
            <span className="text-left text-gray-400">Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</span>
          </div>
          <div className="sm:w-4/12 md:w-7/12 flex items-center">
            {listItems.map(item => (
              <List list={item}></List>
            ))}
          </div>
        </div>
        <div className="w-full md:w-10/12 mx-auto py-16 flex items-center p-4">
          <span className="text-white text-left">© 2020 Open PRO. All rights reserved.</span>
        </div>
      </div>
    </>
  );
};

export { Footer as default };