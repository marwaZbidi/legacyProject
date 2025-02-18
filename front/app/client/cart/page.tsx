"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from "../navbar/navbar"
import Footer from "../component/footer"


interface Product {
  id: number;
  name: string;
  price: number;
  images: string
}


type Quantities = {
  [productId: number]: number;
};

const Cart: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Quantities>({});
  
  const id: string | undefined = Cookies.get('userId'); 

  useEffect(() => {
    if (id) {
      fetchProducts();
    }
  }, [id]);

  const fetchProducts = async (): Promise<void> => {
    try {
      const response = await axios.get<Product[]>(`http://localhost:3000/Cart/get/${id}`);
      setProducts(response.data);
      const initialQuantities: Quantities = {};
      response.data.forEach((product) => {
        initialQuantities[product.id] = 1;
      });
      setQuantities(initialQuantities);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleDeleteOne = (productId:number) => {
    axios
      .delete(`http://localhost:3000/Cart/deleteOneProduct/${productId}`)
      .then((response) => {
        console.log(response.data);
     
        fetchProducts();
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  const handleQuantityChange = (productId:number, quantity:number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const calculateTotalPrice = (product:Product) => {
    return product.price * quantities[product.id];
  };

  const calculateGrandTotal = () => {
    return products.reduce((total, product) => {
      return total + calculateTotalPrice(product);
    }, 0);
  };


  return (
    <div>
      <Navbar/>
      <div className="bg-gray-100">
  <div className="container mx-auto mt-10">
    <div className="flex shadow-md my-10">
      <div className="w-3/4 bg-white px-10 py-10">
        <div className="flex justify-between border-b pb-8">
          <h1 className="font-semibold text-2xl">Shopping Cart</h1>
        </div>
        <div className="flex mt-10 mb-5">
          <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
          <h3 className="font-semibold text center text-gray-600 text-xs uppercase w-1/5 text center">Quantity</h3>
          <h3 className="font-semibold text center text-gray-600 text-xs uppercase w-1/5 text center">Price</h3>
          <h3 className="font-semibold text center text-gray-600 text-xs uppercase w-1/5 text center">Total</h3>
        </div>
       
        {products.map((product)=>(
        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" key={product.id}>
          <div className="flex w-2/5">
            <div className="w-20">
              <img className="h-24" src={product.images} alt=""/>
            </div>
            <div className="flex flex-col justify-between ml-4 flex-grow">
              <span className="font-bold text-sm">{product.name}</span>
              <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs"
              onClick={() => {handleDeleteOne(product.id)}}>Remove</a>
            </div>
          </div>
          
          <div className="flex justify-center w-1/5">
            
    <button onClick={() =>handleQuantityChange(product.id,quantities[product.id] - 1) } disabled={quantities[product.id] <= 1}>
                          -
                        </button>
                        <span>{quantities[product.id]}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              product.id,
                              quantities[product.id] + 1
                            )
                          }
                        >
                          +
                        </button>
            
          </div>
          <span className="text-center w-1/5 font-semibold text-sm">{product.price}</span>
          <span className="text-center w-1/5 font-semibold text-sm">{calculateTotalPrice(product)} DT</span>
        </div>
         ))}  
      
        <a href="#" className="flex font-semibold text-indigo-600 text-sm mt-10">
          <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
          Continue Shopping
        </a>
      </div>

      <div id="summary" className="w-1/4 px-8 py-10">
        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
        <div className="border-t mt-8">
          <div className="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Total cost</span>
            <span>{calculateGrandTotal()} DT</span>
          </div>
          <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-black uppercase w-full">Checkout</button>
        </div>
      </div>

    </div>
  </div>
</div>
<Footer/>
    </div>
  )
}

export default Cart