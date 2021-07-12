import React, { useEffect, useState } from 'react';
import AuthorSignature from '../AuthorSignature'


const NavCard = (props) => {
  return (
    <div className="sm:w-full md:w-1/3 p-4">
      <a href={props.href} >
        <img src={props.img} />
        <NavCardTitle title={props.title}></NavCardTitle>
        <NavCardDescription description={props.description}></NavCardDescription>
      </a>
    </div>
  );
}

const NavCardTitle = ({ title }) => {
  return (
    <h2 className="text-2xl pt-2 text-left">{title}</h2>
  );
}

const NavCardDescription = ({ description }) => {
  return (
    <p className="pt-2 text-base text-left">{description}</p>
  );
}

const NavCards = () => {
  const navCards = [
    {
      title: "The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      img: "https://preview.cruip.com/open-pro/images/news-01.jpg",
      href: "/rogan"
    },
    {
      title: "Nav cards 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      img: "https://preview.cruip.com/open-pro/images/news-01.jpg",
      href: "/rogan"
    },
    {
      title: "The fast looking bug crawled away",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      img: "https://preview.cruip.com/open-pro/images/news-01.jpg",
      href: "/rogan"
    },
  ]

  return (
    <>
      <div className="max-w-7xl flex sm:flex-col md:flex-row mx-auto">
        {navCards.map((item, index) =>
          item && <NavCard {...item}></NavCard>
        )}
      </div>
      <div className="max-w-7xl flex mx-auto">
        {navCards.map((item, index) =>
          item && <div className="w-1/3 inline-block p-4"><AuthorSignature
            logo="https://preview.cruip.com/open-pro/images/news-author-04.jpg"
            name="Mike Williams"
            date="March, 20th 2021"></AuthorSignature></div>
        )}
      </div>
    </>
  );
};

export { NavCards as default };