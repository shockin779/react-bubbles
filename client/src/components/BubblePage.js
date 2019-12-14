import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getColors = async () => {
      axiosWithAuth().get('/colors')
        .then(res => {
          // setIsLoading(false);
          setColorList(res.data);
        })
        .catch(err => console.log(err.message))
    }
    getColors();
  },[]);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} isLoading={isLoading} />
    </>
  );
};

export default BubblePage;
