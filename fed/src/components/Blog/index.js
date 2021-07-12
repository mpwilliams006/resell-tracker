import React, { useEffect, useState } from 'react';
import AuthorSignature from '../AuthorSignature'


const BlogHeader = (props) => {
  return (
    <div className="w-full md:w-7/12 inline-block p-4">
      <BlogTitle title={props.title}></BlogTitle>
      <BlogSubtitle subtitle={props.subtitle}></BlogSubtitle>
      <AuthorSignature
        logo="https://preview.cruip.com/open-pro/images/news-author-04.jpg"
        name="Mike Williams"
        date="March, 20th 2021"></AuthorSignature>
    </div>
  );
}

const Article = ({ article }) => {

  const typeCheck = (item) => {
    let type;
    switch (item.type) {
      case 'h3':
        type = <h3 className="text-left pt-4">{item.text}</h3>;
        break;
      case 'paragraph':
        type = <TextBlock text={item.text}></TextBlock>
        break;
      case 'image':
        type = <CaptionedImage url={item.url} caption={item.caption}></CaptionedImage>;
        break;
    }
    //let itemOrImage = item.text ? <TextBlock text={item.text}></TextBlock> : <CaptionedImage url={item.url} caption={item.caption}></CaptionedImage>;
    return type;
  }

  return (
    <div className="w-full md:w-7/12 inline-block p-4">
      {article.map(item => typeCheck(item))}
    </div>
  )
}

const CaptionedImage = ({ url, caption }) => {
  return (
    <div>
      <img className="pt-4" src={url} />
      <span className="text-xs text-gray-400">{caption}</span>
    </div>

  )
}

const TextBlock = ({ text }) => {
  return (
    <p className="pt-4 text-left text-gray-400 text-xl">{text}</p>
  )
}

const BlogTitle = ({ title }) => {
  return (
    <h1 className="w-3/4 pt-2 text-left text-6xl">{title}</h1>
  );
}

const BlogSubtitle = ({ subtitle }) => {
  return (
    <h2 className="pt-2 text-2xl text-left">{subtitle}</h2>
  );
}

const BlogPost = ({ article, title }) => {

  return (
    <>

      <BlogHeader {...title}></BlogHeader>
      <div className="w-full md:w-10/12 mx-auto">
        <img src="https://preview.cruip.com/open-pro/images/news-single.jpg" />
      </div>
      <Article article={article}></Article>
    </>
  );
};

export { BlogPost as default };