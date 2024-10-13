import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function EditInventoryForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};

  const [formData, setFormData] = useState({
    itemName: item?.itemName || '',
    description: item?.description || '',
    category: item?.category || '',
    quantity: item?.quantity || 0, // Default to 0 if undefined
    supplier: {
      name: item?.supplier?.name || '',
      contact: item?.supplier?.contact || '',
      email: item?.supplier?.email || '',  // Add email
      address: item?.supplier?.address || '' // Add address
    }
  });

  const availableCategories = [
    "Electronics",
    "Furniture",
    "Clothing",
    "Office Supplies",
    "Groceries",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('supplier.')) {
      const supplierField = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        supplier: {
          ...prevData.supplier,
          [supplierField]: value,
        }
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.itemName || !formData.category || formData.quantity <= 0 || !formData.supplier.name || !formData.supplier.contact || !formData.supplier.email || !formData.supplier.address) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    const storedInventory = JSON.parse(localStorage.getItem("inventory")) || [];
    
    // Update the item in the inventory
    const updatedInventory = storedInventory.map((invItem, index) => 
      index === location.state.index ? { ...invItem, ...formData } : invItem
    );

    localStorage.setItem("inventory", JSON.stringify(updatedInventory));
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-white">Edit Inventory Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300" htmlFor="itemName">Item Name</label>
          <input
            type="text"
            name="itemName"
            id="itemName"
            value={formData.itemName}
            onChange={handleChange}
            className="mt-1 p-2 w-full bg-gray-700 text-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-300" htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full bg-gray-700 text-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 p-2 w-full bg-gray-700 text-gray-300 rounded"
          >
            <option value="">Select a category</option>
            {availableCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-300" htmlFor="quantity">Quantity</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1 p-2 w-full bg-gray-700 text-gray-300 rounded"
            min="1"
          />
        </div>
        <div>
          <label className="block text-gray-300" htmlFor="supplier.name">Supplier Name</label>
          <input
            type="text"
            name="supplier.name"
            id="supplier.name"
            value={formData.supplier.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full bg-gray-700 text-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-300" htmlFor="supplier.contact">Supplier Contact</label>
          <input
            type="text"
            name="supplier.contact"
            id="supplier.contact"
            value={formData.supplier.contact}
            onChange={handleChange}
            className="mt-1 p-2 w-full bg-gray-700 text-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-300" htmlFor="supplier.email">Supplier Email</label>
          <input
            type="email"
            name="supplier.email"
            id="supplier.email"
            value={formData.supplier.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full bg-gray-700 text-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-300" htmlFor="supplier.address">Supplier Address</label>
          <input
            type="text"
            name="supplier.address"
            id="supplier.address"
            value={formData.supplier.address}
            onChange={handleChange}
            className="mt-1 p-2 w-full bg-gray-700 text-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
