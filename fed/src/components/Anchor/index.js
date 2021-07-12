import React from 'react';
import { NavLink } from 'react-router-dom'

const Anchor = ({ href, text }) => {
  return (<NavLink className="p-4 text-base hover:text-white text-purple-500" to={href}>{text}</NavLink>)
}

export { Anchor as default };