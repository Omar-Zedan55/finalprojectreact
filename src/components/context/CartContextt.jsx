import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContext";
export const CartContext = createContext();
export default function CartContextPrivider({ children }) {
    const { token } = useContext(authContext);
    const [totalprice, settotalprice] = useState(0);
    const [numofitems, setnumofitems] = useState(0);
    const [cartId, setcartId] = useState(0)
    const [products, setproducts] = useState(null);
    const [WishListproducts, setWishListproducts] = useState([]);
    async function addProductToWishList(productid) {
        try {
            const { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/wishlist",
                {
                    productId: productid,
                },
                {
                    headers: { token: localStorage.getItem("tkn") },
                }
            );
            getuserWishList();
            return data;
        } catch (error) {
        }
    }

    async function getuserWishList() {
        try {
            const { data } = await axios.get(
                "https://ecommerce.routemisr.com/api/v1/wishlist",
                {
                    headers: { token: localStorage.getItem("tkn") },
                }
            );
            setWishListproducts(data.data)


            return data;
        } catch (error) {
        }            
    }

    useEffect(() => {
        if (token != null) {
            getuserWishList();
        }
    }, [token]);

    async function getusercart() {
        try {
            const { data } = await axios.get(
                "https://ecommerce.routemisr.com/api/v1/cart",
                {
                    headers: { token: localStorage.getItem("tkn") },
                }
            );
            settotalprice(data.data.totalCartPrice);
            setnumofitems(data.numOfCartItems);
            setproducts(data.data.products);
            setcartId(data.data._id)
            return data;
        } catch (error) {
        }
    }
    async function addproducttocart(productid) {
        try {
            const { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/cart",
                {
                    productId: productid,
                },
                {
                    headers: { token: localStorage.getItem("tkn") },
                }
            );
            getusercart();
            return data;
        } catch (error) {
        }
    }

    useEffect(() => {
        if (token != null) {
            getusercart();
        }
    }, [token]);
    async function updateCount(id, count) {
        try {
            let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                count: count
            }, {
                headers: {
                    token: localStorage.getItem("tkn")
                }
            }
            )
            settotalprice(data.data.totalCartPrice);
            setnumofitems(data.numOfCartItems);
            setproducts(data.data.products);
            setcartId(data.data._id)
            return (data)
        } catch (error) {

        }
    }
    async function remove(id) {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                headers: {
                    token: localStorage.getItem("tkn")
                }
            }
            )
            settotalprice(data.data.totalCartPrice);
            setnumofitems(data.numOfCartItems);
            setproducts(data.data.products);
            setcartId(data.data._id)
            return (data)
        } catch (error) {
        }
    }
    async function removewish(id) {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
                headers: {
                    token: localStorage.getItem("tkn")
                }
            }
            )
            getuserWishList()
            return (data)
        } catch (error) {
        }
    }
    async function clearcart() {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers: {
                    token: localStorage.getItem("tkn")
                }
            }
            )
            settotalprice(0);
            setnumofitems(0);
            setproducts(null);
            return (data)
        } catch (error) {
        }
    }

    return (
        <div>
            <CartContext.Provider
                value={{
                    settotalprice,
                    setnumofitems,
                    setproducts,
                    addproducttocart,
                    cartId,
                    totalprice,
                    numofitems,
                    products,
                    updateCount,
                    clearcart,
                    remove,
                    addProductToWishList,
                    WishListproducts,
                    removewish,
                    getuserWishList
                }}
            >
                {children}
            </CartContext.Provider>
        </div>
    );
}
