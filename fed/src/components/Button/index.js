import React from 'react';

const Button = (props) => {

  const handleClick = () => {
    if (props.href) {
      return () => {window.location.href = props.href};
    } else {
      return props.clickEvent;
    }
  }

  return (<button onClick={handleClick()} type="button" className={props.className}>{props.text}</button>)
}

export { Button as default };