
import React, { useEffect, useState } from 'react';

const Logo = ({logo, className}) => {
  return (<a href="/" ><img src={logo} className={className} alt="logo" /></a>)
}

export { Logo as default };