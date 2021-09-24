import React from "react";
import "./header.css";

import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { FiShoppingCart } from "react-icons/fi";
import { CgProductHunt } from "react-icons/cg";

const Header = (props) => {
  return (
    <header id="header">
      <div id="box-menu">
        <HiOutlineMenuAlt1 id="menu-icon"/>
      </div>
      <div id="middle-box">
        <h1 id="title-header">STORE</h1>
        <p id="desc-header">Best store in the world</p>
      </div>

      <div id="product-box-icon">
        <CgProductHunt id="product-icon" />
        <span id="product-number">{props.product.length}</span>
      </div>
    </header>
  );
};

export default Header;
