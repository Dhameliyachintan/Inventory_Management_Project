import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SupplierInformation() {
  const [inventory, setInventory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedInventory = JSON.parse(localStorage.getItem("inventory")) || [];
    setInventory(storedInventory);
  }, []);

  const handleDelete = (index) => {
    const updatedInventory = inventory.filter((_, i) => i !== index);
    setInventory(updatedInventory);
    localStorage.setItem("inventory", JSON.stringify(updatedInventory));
  };

  const handleEdit = (index) => {
    const itemToEdit = inventory[index];
    navigate(`/editInventoryForm/${index}`, { state: { item: itemToEdit, index } });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-white">Inventory List</h1>

      <div className="grid grid-cols-1 gap-6">
        {inventory.map((item, index) => (
          <div
            key={index}
            className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200"
          >
            <p className="text-gray-300 mb-1">
              <span className="font-semibold">Item Name:</span> {item.itemName}
            </p>
            <p className="text-gray-300 mb-1">
              <span className="font-semibold">Supplier Name:</span> {item.supplier.name} {/* Added Supplier Name */}
            </p>
            <p className="text-gray-300 mb-1">
              <span className="font-semibold">Supplier Contact:</span> {item.supplier.contact}
            </p>
            <p className="text-gray-300 mb-1">
              <span className="font-semibold">Supplier Email:</span> {item.supplier.email}
            </p>
            <p className="text-gray-300 mb-1">
              <span className="font-semibold">Supplier Address:</span> {item.supplier.address}
            </p>
            <button
              onClick={() => handleEdit(index)}
              className="mt-2 w-full p-2 bg-yellow-500 text-white rounded hover:bg-yellow-400"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(index)}
              className="mt-2 w-full p-2 bg-red-500 text-white rounded hover:bg-red-400"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
