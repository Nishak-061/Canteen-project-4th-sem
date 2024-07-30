import React from "react";
import { NavLink, Link } from "react-router-dom";
import { MdRestaurant } from "react-icons/md";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import config from "../../config";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <MdRestaurant />
              Canteen Food
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-1">
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link mx-2" style={{ backgroundColor: 'inherit', borderRadius: '20px' }}  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FFAAAA'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'inherit'}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle mx-1"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                  style={{ backgroundColor: 'inherit', borderRadius: '20px' }}  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FFAAAA'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'inherit'}
                >
                  categories
                </Link>
                <ul className="dropdown-menu" >
                  <li>
                    <Link className="dropdown-item" to={"/categories"} style={{ backgroundColor: 'inherit', borderRadius: '20px' }}  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FFAAAA'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'inherit'}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                        style={{ backgroundColor: 'inherit', borderRadius: '20px' }}  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FFAAAA'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'inherit'}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link" style={{ backgroundColor: 'inherit', borderRadius: '20px' }}  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FFAAAA'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'inherit'}>
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link" style={{ backgroundColor: 'inherit', borderRadius: '20px' }}  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FFAAAA'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'inherit'}>
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ backgroundColor: 'inherit', borderRadius: '20px' }}  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FFAAAA'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'inherit'}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                          style={{ backgroundColor: 'inherit', borderRadius: '20px' }}  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FFAAAA'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'inherit'}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                          style={{ backgroundColor: 'inherit', borderRadius: '20px' }}  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FFAAAA'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'inherit'}
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="nav-link mx-2" style={{ backgroundColor: 'inherit', borderRadius: '20px' }}  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FFAAAA'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'inherit'}>
                    Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;








// import React from "react";
// import { NavLink, Link } from "react-router-dom";
// import { MdRestaurant } from "react-icons/md";
// import { useAuth } from "../../context/auth";
// import toast from "react-hot-toast";
// import SearchInput from "../Form/SearchInput";
// import useCategory from "../../hooks/useCategory";
// import { useCart } from "../../context/cart";
// import { Badge } from "antd";

// const Header = () => {
//   const [auth, setAuth] = useAuth();
//   const [cart] = useCart();
//   const categories = useCategory();
//   const handleLogout = () => {
//     setAuth({
//       ...auth,
//       user: null,
//       token: "",
//     });
//     localStorage.removeItem("auth");
//     toast.success("Logged out successfully");
//   };
//   return (
//     <>
//       <nav className="navbar navbar-expand-lg bg-body-tertiary">
//         <div className="container-fluid">
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarTogglerDemo01"
//             aria-controls="navbarTogglerDemo01"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon" />
//           </button>
//           <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
//             <Link to="/" className="navbar-brand">
//               <MdRestaurant />
//               Canteen Food
//             </Link>
//             <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//               <SearchInput />
//               <li className="nav-item">
//                 <NavLink to="/" className="nav-link">
//                   Home
//                 </NavLink>
//               </li>
//               <li className="nav-item dropdown">
//                 <Link
//                   className="nav-link dropdown-toggle"
//                   to={"/categories"}
//                   data-bs-toggle="dropdown"
//                 >
//                   categories
//                 </Link>
//                 <ul className="dropdown-menu">
//                   <li>
//                     <Link className="dropdown-item" to={"/categories"}>
//                       All Categories
//                     </Link>
//                   </li>
//                   {categories?.map((c) => (
//                     <li>
//                       <Link
//                         className="dropdown-item"
//                         to={`/category/${c.slug}`}
//                       >
//                         {c.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </li>

//               {!auth.user ? (
//                 <>
//                   <li className="nav-item">
//                     <NavLink to="/register" className="nav-link">
//                       Register
//                     </NavLink>
//                   </li>
//                   <li className="nav-item">
//                     <NavLink to="/login" className="nav-link">
//                       Login
//                     </NavLink>
//                   </li>
//                 </>
//               ) : (
//                 <>
//                   <li className="nav-item dropdown">
//                     <NavLink
//                       className="nav-link dropdown-toggle"
//                       href="#"
//                       role="button"
//                       data-bs-toggle="dropdown"
//                       aria-expanded="false"
//                     >
//                       {auth?.user?.name}
//                     </NavLink>
//                     <ul className="dropdown-menu">
//                       <li>
//                         <NavLink
//                           to={`/dashboard/${
//                             auth?.user?.role === 1 ? "admin" : "user"
//                           }`}
//                           className="dropdown-item"
//                         >
//                           Dashboard
//                         </NavLink>
//                       </li>
//                       <li>
//                         <NavLink
//                           onClick={handleLogout}
//                           to="/login"
//                           className="dropdown-item"
//                         >
//                           Logout
//                         </NavLink>
//                       </li>
//                     </ul>
//                   </li>
//                 </>
//               )}
//               <li className="nav-item">
//                 <Badge count={cart?.length} showZero>
//                   <NavLink to="/cart" className="nav-link">
//                     Cart
//                   </NavLink>
//                 </Badge>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Header;
