import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //get cat
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${config.API_BASE_URL}/api/v1/category/get-category`);
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}








// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function useCategory() {
//   const [categories, setCategories] = useState([]);

//   //get cat
//   const getCategories = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/category/get-category");
//       setCategories(data?.category);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getCategories();
//   }, []);

//   return categories;
// }
