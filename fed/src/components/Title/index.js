import React, { useEffect, useState } from 'react';

const Title = ({title}) => {
  return (
    <h1 className="text-6xl">{title}</h1>
  );
};

export { Title as default };