import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import HomeBootstrap from "./user/HomeBootstrap";
import useFetchData from "../hooks/useFetchData";
import config from "../config";


const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);






  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${config.API_BASE_URL}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${config.API_BASE_URL}/api/v1/product/product-list/1`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTotal Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${config.API_BASE_URL}/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${config.API_BASE_URL}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, !radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${config.API_BASE_URL}/api/v1/product/product-filters`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All products - Best offers"}>
      <HomeBootstrap />
      <div className="row -mt-3">
        <div className="col-md-2">
          <h4
            className="text-center wow animate__animated animate__slideInLeft"
            data-wow-delay="0.2s"
          >
            Filter By Category
          </h4>
          <div
            className="d-flex flex-column wow animate__animated animate__slideInLeft"
            data-wow-delay="0.4s"
          >
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4
            className="text-center mt-4 wow animate__animated animate__slideInLeft"
            data-wow-delay="0.5s"
          >
            Filter By Price
          </h4>
          <div
            className="d-flex flex-column wow animate__animated animate__slideInLeft"
            data-wow-delay="0.7s"
          >
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9 offset-1">
          <h1
            className="text-center  wow animate__animated animate__slideInDown"
            data-wow-delay="0.3s"
          >
            <i className="fa fa-cutlery text-warning"></i> OUR MENU
          </h1>
          <div
            className="d-flex flex-wrap wow animate__animated animate__fadeInBottomRight"
            data-wow-delay="0.9s"
          >
            {products?.map((p) => (
              <div className="card m-1" style={{ width: "15rem" }}>
                <img
                  src={`${config.API_BASE_URL}/api/v1/product/product-photo/${p._id}`}
                  className="img-fluid card-img-top mb-1"
                  alt={p.name}
                />
                <div className="card-body h-75">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    <small>{p.description}</small>
                  </p>
                  <p className="card-text">₹ {p.price}</p>
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`${config.API_BASE_URL}/product/${p.slug}`)}
                  >
                    More Details
                  </button>

                  <button
                    className="btn btn-danger ms-1 mt-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added successfully");
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;








// import React, { useState, useEffect } from "react";
// import Layout from "../components/Layout/Layout";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Checkbox, Radio } from "antd";
// import { Prices } from "../components/Prices";
// import { useCart } from "../context/cart";
// import { toast } from "react-hot-toast";
// import HomeBootstrap from "./user/HomeBootstrap";

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useCart();
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [checked, setChecked] = useState([]);
//   const [radio, setRadio] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   //get all cat
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/category/get-category");
//       if (data?.success) {
//         setCategories(data?.category);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAllCategory();
//     getTotal();
//   }, []);
//   //get products
//   const getAllProducts = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
//       setLoading(false);
//       setProducts(data.products);
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//     }
//   };

//   //getTotal Count
//   const getTotal = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/product/product-count");
//       setTotal(data?.total);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (page === 1) return;
//     loadMore();
//   }, [page]);
//   //load more
//   const loadMore = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
//       setLoading(false);
//       setProducts([...products, ...data?.products]);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   //filter by cat
//   const handleFilter = (value, id) => {
//     let all = [...checked];
//     if (value) {
//       all.push(id);
//     } else {
//       all = all.filter((c) => c !== id);
//     }
//     setChecked(all);
//   };
//   useEffect(() => {
//     if (!checked.length || !radio.length) getAllProducts();
//   }, [checked.length, !radio.length]);

//   useEffect(() => {
//     if (checked.length || radio.length) filterProduct();
//   }, [checked, radio]);

//   //get filterd product
//   const filterProduct = async () => {
//     try {
//       const { data } = await axios.post("/api/v1/product/product-filters", {
//         checked,
//         radio,
//       });
//       setProducts(data?.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <Layout title={"All products - Best offers"}>
//       <HomeBootstrap />
//       <div className="row -mt-3">
//         <div className="col-md-2">
//           <h4
//             className="text-center wow animate__animated animate__slideInLeft"
//             data-wow-delay="0.2s"
//           >
//             Filter By Category
//           </h4>
//           <div
//             className="d-flex flex-column wow animate__animated animate__slideInLeft"
//             data-wow-delay="0.4s"
//           >
//             {categories?.map((c) => (
//               <Checkbox
//                 key={c._id}
//                 onChange={(e) => handleFilter(e.target.checked, c._id)}
//               >
//                 {c.name}
//               </Checkbox>
//             ))}
//           </div>
//           {/* price filter */}
//           <h4
//             className="text-center mt-4 wow animate__animated animate__slideInLeft"
//             data-wow-delay="0.5s"
//           >
//             Filter By Price
//           </h4>
//           <div
//             className="d-flex flex-column wow animate__animated animate__slideInLeft"
//             data-wow-delay="0.7s"
//           >
//             <Radio.Group onChange={(e) => setRadio(e.target.value)}>
//               {Prices?.map((p) => (
//                 <div key={p._id}>
//                   <Radio value={p.array}>{p.name}</Radio>
//                 </div>
//               ))}
//             </Radio.Group>
//           </div>
//           <div className="d-flex flex-column">
//             <button
//               className="btn btn-danger"
//               onClick={() => window.location.reload()}
//             >
//               RESET FILTERS
//             </button>
//           </div>
//         </div>
//         <div className="col-md-9 offset-1">
//           <h1
//             className="text-center  wow animate__animated animate__slideInDown"
//             data-wow-delay="0.3s"
//           >
//             <i className="fa fa-cutlery text-warning"></i> OUR MENU
//           </h1>
//           <div
//             className="d-flex flex-wrap wow animate__animated animate__fadeInBottomRight"
//             data-wow-delay="0.9s"
//           >
//             {products?.map((p) => (
//               <div className="card m-1" style={{ width: "15rem" }}>
//                 <img
//                   src={`/api/v1/product/product-photo/${p._id}`}
//                   className="img-fluid card-img-top mb-1"
//                   alt={p.name}
//                 />
//                 <div className="card-body h-75">
//                   <h5 className="card-title">{p.name}</h5>
//                   <p className="card-text">
//                     <small>{p.description}</small>
//                   </p>
//                   <p className="card-text">₹ {p.price}</p>
//                   <button
//                     className="btn btn-primary ms-1"
//                     onClick={() => navigate(`/product/${p.slug}`)}
//                   >
//                     More Details
//                   </button>

//                   <button
//                     className="btn btn-danger ms-1 mt-1"
//                     onClick={() => {
//                       setCart([...cart, p]);
//                       localStorage.setItem(
//                         "cart",
//                         JSON.stringify([...cart, p])
//                       );
//                       toast.success("Item Added successfully");
//                     }}
//                   >
//                     Add To Cart
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="m-2 p-3">
//             {products && products.length < total && (
//               <button
//                 className="btn btn-warning"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setPage(page + 1);
//                 }}
//               >
//                 {loading ? "Loading ..." : "Loadmore"}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default HomePage;
