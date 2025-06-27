import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditProductModal from './EditProductModal';
import LoadingSpinner from './LoadingSpinner';
import ErrorAlert from './ErrorAlert';
import { motion, AnimatePresence } from 'framer-motion';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/api/products');
      const data = res.data;
      const productsArray = Array.isArray(data) ? data : (Array.isArray(data.products) ? data.products : []);
      setProducts(productsArray);
      if (!Array.isArray(productsArray)) {
        setError('Products data is not an array');
      }
    } catch (err) {
      setError('Failed to fetch products');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch {
      setError('Failed to delete product');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;
  if (!Array.isArray(products)) return <ErrorAlert message="Products data is not an array" />;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-auto bg-white rounded-xl shadow"
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <motion.tr
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Name</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Price</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Category</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Actions</th>
          </motion.tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {products.map((p, index) => (
              <motion.tr 
                key={p._id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ 
                  delay: index * 0.05, 
                  duration: 0.3,
                  type: 'spring',
                  stiffness: 100
                }}
                className="hover:bg-blue-50 transition-colors duration-200"
              >
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">₹{p.price}</td>
                <td className="px-4 py-2">{p.category}</td>
                <td className="px-4 py-2 flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 rounded bg-cyan-500 text-white hover:bg-cyan-600 transition-colors duration-200"
                    onClick={() => setEditProduct(p)}
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
      <AnimatePresence>
        {editProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <EditProductModal
              product={editProduct}
              onClose={() => setEditProduct(null)}
              onUpdated={fetchProducts}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductTable;
