import React, { useEffect, useState } from "react";
import "./app.css";

import Header from "./components/header/header";

import { BiListPlus } from "react-icons/bi";
import { RiCloseLine } from "react-icons/ri";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  Input,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";

const App = () => {
  const [allGroup, setAllGroup] = useState([
    { groupName: "Computer", id: Date.now() },
    { groupName: "Mobile", id: Date.now() },
    { groupName: "School", id: Date.now() },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [newGroup, setNewGroup] = useState("");
  const [input, setInput] = useState("");
  const [selectGroup, setSelectGroup] = useState("");
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProductLs();
  }, []);

  useEffect(() => {
    addProductLS();
  }, [product]);

  const nameProductHandler = (e) => {
    setInput(e.target.value);
  };

  const groupHandler = (e) => {
    setSelectGroup(e.target.value);
  };

  const newGroupHandler = (e) => {
    setInputValue(e.target.value);
    setNewGroup({ groupName: e.target.value, id: Date.now() });
  };

  const addnewGroup = (e) => {
    e.preventDefault();
    if (newGroup.length !== 0) {
      setAllGroup([...allGroup, newGroup]);
    }
    setInputValue("");
    setNewGroup("");
  };

  const removeProduct = (id) => {
    const filterdProduct = product.filter((p) => p.id !== id);
    // console.log(filterdProduct)
    setProduct(filterdProduct);
  };

  const addProductHandler = (e) => {
    e.preventDefault();
    const notify = () =>
      toast.success("Product added!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    if (input !== "" && selectGroup.value !== "SELECT") {
      setProduct([
        ...product,
        { groupName: selectGroup, productName: input, id: Date.now() },
      ]);
      notify();
      setInput("");
    }
  };

  

  const addProductLS = () => {
    localStorage.setItem("product", JSON.stringify(product));
  };

  const getProductLs = () => {
    let productLS = localStorage.getItem("product");
    if (productLS === null) {
      localStorage.setItem("product", JSON.stringify([]));
    } else {
      let getProduct = JSON.parse(localStorage.getItem("product"));
      setProduct(getProduct);
    }
  };

  return (
    <>
      <Header product={product} />
      <div id="container">
        <form id="add-product-container">
          <div id="input-box">
            <p id="product-title">Product name</p>
            <input
              id="product-input"
              placeholder="enter title"
              onChange={nameProductHandler}
              type="text"
              value={input}
            />
          </div>

          <div id="input-box">
            <p id="product-title">Select category</p>
            <div id="box-select-popover">
              <select id="select-category" onChange={groupHandler}>
                <option className="option" value="SELECT">
                  SELECT
                </option>
                {allGroup.map((g) => {
                  return (
                    <option value={g.groupName} key={g.id}>
                      {g.groupName}
                    </option>
                  );
                })}
              </select>


                <Popover  placement="top">
                  <PopoverTrigger>
                    <span id="add-icon-box">
                      <BiListPlus fontSize="35px" />
                    </span>
                  </PopoverTrigger>
                  <PopoverContent width={window.innerWidth <= 540 ? '300px' : null} padding="20px">
                    <PopoverArrow />

                    <Text fontWeight="semibold">Enter a new category</Text>
                    <PopoverCloseButton />
                    <br />
                    <Input
                      placeholder="Apple ... "
                      onChange={newGroupHandler}
                      value={inputValue}
                    />
                    <Button
                      marginTop="10px"
                      border="1px"
                      borderColor="hsl(345deg 100% 47%)"
                      color="hsl(345deg 100% 47%)"
                      variant="outline"
                      onClick={addnewGroup}
                    >
                      submit
                    </Button>
                  </PopoverContent>
                </Popover>

            </div>
          </div>

          <div id="input-box">
            <button class="pushable" onClick={addProductHandler}>
              <span class="front">Add product</span>
            </button>
            <ToastContainer />
          </div>
        </form>

        <div id="container-product">
          {product.map((p) => {
            return (
              <div id="product-box">
                <p key={p.id} id="text-product">
                  {p.productName}
                </p>
                <div id="title-close-box">
                  <p key={p.id} id="title-product">
                    {p.groupName}
                  </p>
                  <span id="close-box" onClick={() => removeProduct(p.id)}>
                    <RiCloseLine id="close-icon" />
                  </span>
                </div>
              </div>
            );
          })}

          {product.length === 0 ? (
            <img
              id="img"
              src="https://cdn.dribbble.com/users/1418633/screenshots/6693173/empty-state_4x.png?compress=1&resize=1200x900"
              alt="empty"
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default App;
