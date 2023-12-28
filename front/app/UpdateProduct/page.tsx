import React, { useState, ChangeEvent } from "react";
import "../UpdateProduct/updateProduct.css";
import axios from "axios";

interface UpdateProductProps {
  oneProduct: { id: number }; 
}

const UpdateProduct: React.FC<UpdateProductProps> = ({ oneProduct }) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [unit, setUnit] = useState<number>(0);
  const [category, setCategory] = useState<string>("Tent");
  const [refresh, setRefresh] = useState<boolean>(false);

  const obj = {
    name: name,
    price: price,
    description: description,
    unit: unit,
    category: category,
  };

  const modify = (id: number) => {
    console.log(obj);
    axios
      .put(`http://localhost:3000/seller/updateProduct/${id}`, obj)
      .then(() => {
        alert("Product Modified");
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleUnitChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUnit(Number(e.target.value));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  return (
    <div className="container">
      <h2>Update Product Details</h2>
      <form>
        <div className="form-group">
          <label>Product Name:</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input type="number" value={price} onChange={handlePriceChange} />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Unit:</label>
          <input type="number" value={unit} onChange={handleUnitChange} />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="Tent">Tent</option>
            <option value="Sleepingbags">Sleeping bags</option>
            <option value="Campingpillow">Camping pillow</option>
            <option value="flashlights">Flashlights</option>
            <option value="Campchairs">Camp chairs</option>
            <option value="Camptable">Camp table</option>
            <option value="Lantern">Lantern</option>
          </select>
        </div>
        <button type="button" onClick={() => modify(oneProduct.id)}>
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
