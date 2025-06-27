import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://fashionhub-backend-production.up.railway.app';

const initialState = {
  name: '', price: '', originalPrice: '', image: '', rating: '', reviews: '', category: '', isNew: false, colors: ''
};

const ProductForm = ({ onClose, mode = 'create', product = {}, onUpdated }) => {
  const [form, setForm] = useState(product._id ? { ...product, colors: product.colors.join(', ') } : initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = { ...form, colors: form.colors.split(',').map(c => c.trim()) };
      if (mode === 'create') {
        await axios.post('/api/products', payload);
      } else {
        await axios.put(`/api/products/${product._id}`, payload);
      }
      if (onUpdated) onUpdated();
      onClose();
    } catch (err) {
      setError('Failed to save product');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg space-y-4"
      >
        <h2 className="text-xl font-bold mb-2 text-slate-900">
          {mode === 'create' ? 'Add New Product' : 'Edit Product'}
        </h2>
        {error && <div className="text-red-500">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" value={form.name} onChange={handleChange} required placeholder="Name" className="input" />
          <input name="price" value={form.price} onChange={handleChange} required placeholder="Price" type="number" className="input" />
          <input name="originalPrice" value={form.originalPrice} onChange={handleChange} required placeholder="Original Price" type="number" className="input" />
          <input name="image" value={form.image} onChange={handleChange} required placeholder="Image URL" className="input" />
          <input name="rating" value={form.rating} onChange={handleChange} required placeholder="Rating" type="number" step="0.1" className="input" />
          <input name="reviews" value={form.reviews} onChange={handleChange} required placeholder="Reviews" type="number" className="input" />
          <input name="category" value={form.category} onChange={handleChange} required placeholder="Category" className="input" />
          <input name="colors" value={form.colors} onChange={handleChange} required placeholder="Colors (comma separated)" className="input" />
        </div>
        <label className="flex items-center gap-2 mt-2">
          <input type="checkbox" name="isNew" checked={form.isNew} onChange={handleChange} />
          <span className="text-slate-700">Is New?</span>
        </label>
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? 'Saving...' : mode === 'create' ? 'Create' : 'Update'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 text-slate-700 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
