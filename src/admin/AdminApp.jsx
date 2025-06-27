import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';

const PREFILL_PRODUCT = {
  name: "Hyperloop Sneakers",
  image: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
  price: 179,
  originalPrice: 229,
  rating: 4.7,
  reviews: 87,
  category: "Footwear",
  isNew: false,
  colors: ["#ffffff", "#1e3a8a", "#10b981"]
};

const AdminApp = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [prefill, setPrefill] = useState(null);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-white">
      <Sidebar />
      <main className="flex-1 p-6 flex flex-col items-center justify-start">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 mt-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Product Management</h1>
            <div className="flex gap-2">
              {/* <button
                onClick={() => { setPrefill(PREFILL_PRODUCT); setShowCreate(true); }}
                className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition font-semibold"
              >
                + Pre-fill Product
              </button> */}
              <button
                onClick={() => { setPrefill(null); setShowCreate(true); }}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded shadow hover:from-blue-500 hover:to-cyan-400 transition font-semibold"
              >
                + Add Product
              </button>
            </div>
          </div>
          <ProductTable />
        </div>
        {showCreate && (
          <ProductForm
            onClose={() => setShowCreate(false)}
            mode="create"
            product={prefill ? { ...prefill, colors: prefill.colors.join(', ') } : undefined}
          />
        )}
      </main>
    </div>
  );
};

export default AdminApp;
