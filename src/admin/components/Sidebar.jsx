import React from 'react';
import { Home, Package, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <aside className="w-64 bg-white border-r border-gray-200 min-h-screen hidden md:block">
    <div className="p-6 font-bold text-xl text-blue-600">Admin Panel</div>
    <nav className="flex flex-col gap-2 p-4">
      <Link to="/admin" className="flex items-center gap-2 p-2 rounded hover:bg-blue-50">
        <Home size={18} /> Dashboard
      </Link>
      {/* <Link to="/admin/products" className="flex items-center gap-2 p-2 rounded hover:bg-blue-50">
        <Package size={18} /> Products
      </Link>
      <Link to="/admin/users" className="flex items-center gap-2 p-2 rounded hover:bg-blue-50">
        <Users size={18} /> Users
      </Link> */}
    </nav>
  </aside>
);

export default Sidebar;
