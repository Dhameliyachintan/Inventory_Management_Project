import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InventoryDashboard() {
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

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700 text-start">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Item Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Supplier Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th> 
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {inventory.map((item, index) => (
              <tr key={index} className="hover:bg-gray-600 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{item.itemName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{item.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{item.supplier.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{item.category}</td> 
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-yellow-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="ml-2 text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
