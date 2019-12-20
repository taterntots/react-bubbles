import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import Bubbles from './Bubbles';
import ColorList from './ColorList';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
 
  const getData = () => {
    axiosWithAuth()
      .get('/colors')
      .then(res => {
        // console.log(res);
        setColorList(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;