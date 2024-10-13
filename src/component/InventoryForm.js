import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function InventoryForm() {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierContact, setSupplierContact] = useState("");
  const [supplierEmail, setSupplierEmail] = useState("");  
  const [supplierAddress, setSupplierAddress] = useState(""); 

  const [itemNameError, setItemNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [purchaseDateError, setPurchaseDateError] = useState("");
  const [supplierError, setSupplierError] = useState("");
  const [supplierEmailError, setSupplierEmailError] = useState(""); 
  const [supplierAddressError, setSupplierAddressError] = useState(""); 
  const [success, setSuccess] = useState(false);

  const availableCategories = [
    "Electronics",
    "Furniture",
    "Clothing",
    "Technology",
    "Office Supplies",
    "Groceries",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    let isValid = true;

    setItemNameError("");
    setDescriptionError("");
    setCategoryError("");
    setQuantityError("");
    setPurchaseDateError("");
    setSupplierError("");
    setSupplierEmailError("");
    setSupplierAddressError("");

    if (!itemName) {
      setItemNameError("Item name is required.");
      isValid = false;
    }

    if (!description) {
      setDescriptionError("Description is required.");
      isValid = false;
    }

    if (!category) {
      setCategoryError("Please select a category.");
      isValid = false;
    }

    if (quantity <= 0) {
      setQuantityError("Quantity must be greater than 0.");
      isValid = false;
    }

    if (!purchaseDate) {
      setPurchaseDateError("Purchase date is required.");
      isValid = false;
    }

    if (!supplierName) {
      setSupplierError("Supplier name is required.");
      isValid = false;
    }

    if (!supplierContact) {
      setSupplierError("Supplier contact is required.");
      isValid = false;
    }

    if (!supplierEmail) {
      setSupplierEmailError("Supplier email is required.");
      isValid = false;
    }

    if (!supplierAddress) {
      setSupplierAddressError("Supplier address is required.");
      isValid = false;
    }

    if (!isValid) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    const newItem = {
      itemName,
      category,
      description,
      quantity,
      purchaseDate,
      supplier: {
        name: supplierName,
        contact: supplierContact,
        email: supplierEmail,  
        address: supplierAddress,  
      },
    };

    const inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    inventory.push(newItem);
    localStorage.setItem("inventory", JSON.stringify(inventory));

    setSuccess(true);
    toast.success("Item added to inventory successfully!");
    resetForm();
    navigate("/");
  };

  const resetForm = () => {
    setItemName("");
    setDescription("");
    setCategory("");
    setQuantity(0);
    setPurchaseDate("");
    setSupplierName("");
    setSupplierContact("");
    setSupplierEmail("");  
    setSupplierAddress("");  
  };

  const lowStockThreshold = 5;
  const sufficientStockThreshold = 10;

  const getStockIndicatorColor = () => {
    if (quantity < lowStockThreshold) return "bg-red-500";
    if (quantity >= sufficientStockThreshold) return "bg-green-500";
    return "bg-yellow-500";
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-100">
        Add a New Inventory Item
      </h1>
      {success && <p className="text-green-500">Item added successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Item Name:
          </label>
          <input
            type="text"
            value={itemName}
            placeholder="Enter Item Name"
            onChange={(e) => setItemName(e.target.value)}
            className={`mt-1 block w-full border ${
              itemNameError ? "border-red-500" : "border-gray-300"
            } bg-gray-800 text-gray-100 rounded-md p-2 focus:outline-none focus:border-blue-500`}
          />
          {itemNameError && (
            <p className="text-red-500 text-xs mt-1">{itemNameError}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Description:
          </label>
          <textarea
            value={description}
            placeholder="Enter Description"
            onChange={(e) => setDescription(e.target.value)}
            className={`mt-1 block w-full border ${
              descriptionError ? "border-red-500" : "border-gray-300"
            } bg-gray-800 text-gray-100 rounded-md p-2 focus:outline-none focus:border-blue-500`}
          />
          {descriptionError && (
            <p className="text-red-500 text-xs mt-1">{descriptionError}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Category:
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`mt-1 block w-full border ${
              categoryError ? "border-red-500" : "border-gray-300"
            } bg-gray-800 text-gray-100 rounded-md p-2 focus:outline-none focus:border-blue-500`}
          >
            <option value="">Select a category</option>
            {availableCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          {categoryError && (
            <p className="text-red-500 text-xs mt-1">{categoryError}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Quantity:
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className={`mt-1 block w-full border ${
              quantityError ? "border-red-500" : "border-gray-300"
            } bg-gray-800 text-gray-100 rounded-md p-2 focus:outline-none focus:border-blue-500`}
            min="1"
          />
          {quantityError && (
            <p className="text-red-500 text-xs mt-1">{quantityError}</p>
          )}
          <div
            className={`mt-2 h-2 rounded-md ${getStockIndicatorColor()}`}
            style={{ width: `${(quantity / 100) * 100}%` }}
          ></div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Purchase Date:
          </label>
          <input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            className={`mt-1 block w-full border ${
              purchaseDateError ? "border-red-500" : "border-gray-300"
            } bg-gray-800 text-gray-100 rounded-md p-2 focus:outline-none focus:border-blue-500`}
          />
          {purchaseDateError && (
            <p className="text-red-500 text-xs mt-1">{purchaseDateError}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Supplier Name:
          </label>
          <input
            type="text"
            value={supplierName}
            placeholder="Enter Supplier Name"
            onChange={(e) => setSupplierName(e.target.value)}
            className={`mt-1 block w-full border ${
              supplierError ? "border-red-500" : "border-gray-300"
            } bg-gray-800 text-gray-100 rounded-md p-2 focus:outline-none focus:border-blue-500`}
          />
          {supplierError && (
            <p className="text-red-500 text-xs mt-1">{supplierError}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Supplier Contact:
          </label>
          <input
            type="text"
            value={supplierContact}
            placeholder="Enter Supplier Contact"
            onChange={(e) => setSupplierContact(e.target.value)}
            className={`mt-1 block w-full border ${
              supplierError ? "border-red-500" : "border-gray-300"
            } bg-gray-800 text-gray-100 rounded-md p-2 focus:outline-none focus:border-blue-500`}
          />
          {supplierError && (
            <p className="text-red-500 text-xs mt-1">{supplierError}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Supplier Email:
          </label>
          <input
            type="email"
            value={supplierEmail}
            placeholder="Enter Supplier Email"
            onChange={(e) => setSupplierEmail(e.target.value)}
            className={`mt-1 block w-full border ${
              supplierEmailError ? "border-red-500" : "border-gray-300"
            } bg-gray-800 text-gray-100 rounded-md p-2 focus:outline-none focus:border-blue-500`}
          />
          {supplierEmailError && (
            <p className="text-red-500 text-xs mt-1">{supplierEmailError}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Supplier Address:
          </label>
          <input
            type="text"
            value={supplierAddress}
            placeholder="Enter Supplier Address"
            onChange={(e) => setSupplierAddress(e.target.value)}
            className={`mt-1 block w-full border ${
              supplierAddressError ? "border-red-500" : "border-gray-300"
            } bg-gray-800 text-gray-100 rounded-md p-2 focus:outline-none focus:border-blue-500`}
          />
          {supplierAddressError && (
            <p className="text-red-500 text-xs mt-1">{supplierAddressError}</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}