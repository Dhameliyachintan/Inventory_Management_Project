import './App.css';
import { Route, Routes } from 'react-router-dom';
import InventoryForm from './component/InventoryForm';
import Navbar from './component/Navbar';
import InventoryDashboard from './component/InventoryDashboard';
import Home from './Dashboard/Home';
import EditInventoryForm from './component/EditInventoryForm';
import SupplierInformation from './component/SupplierInformation';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventoryForm" element={<InventoryForm />} />
        <Route path="/inventoryDashboard" element={<InventoryDashboard />} />
        <Route path="/supplierinformation" element={<SupplierInformation />} />
        <Route path="/editInventoryForm/:index" element={<EditInventoryForm />} /> 
      </Routes>
    </div>
  );
}

export default App;
