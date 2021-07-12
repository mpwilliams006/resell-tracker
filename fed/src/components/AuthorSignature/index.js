import React, { useEffect, useState } from 'react';


const AuthorIcon = ({className, logo}) => {
  return (<img src={logo} className={`rounded-full w-8 inline mr-4 ${className}`} alt="logo" />)
}

const Author = ({name}) => {
  return (
    <span className="mr-4 text-base">{name}</span>
  );
}

const PostDate = ({date}) => {
  return (
    <span className="mr-4 text-gray-600 text-base">- {date}</span>
  );
}

const AuthorSignature = ({logo, name, date}) => {

  return (
    <div className="max-w-md pt-4 text-left">
      <AuthorIcon logo={logo}></AuthorIcon>
      <Author name={name}></Author>
      <PostDate date={date}></PostDate>
    </div>
  );
};

export { AuthorSignature as default };