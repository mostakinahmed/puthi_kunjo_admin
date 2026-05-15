import React, { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  ShoppingBag,
  Users,
  Settings,
  PlusCircle,
  Search,
  Bell,
  LogOut,
  ChevronRight,
  Layers3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const stats = [
    {
      label: "Total Sales",
      value: "৳ 128,430",
      growth: "+12%",
      icon: <ShoppingBag className="text-blue-600" />,
    },
    {
      label: "Books Sold",
      value: "1,240",
      growth: "+5%",
      icon: <BookOpen className="text-purple-600" />,
    },
    {
      label: "Active Users",
      value: "856",
      growth: "+18%",
      icon: <Users className="text-green-600" />,
    },
    {
      label: "Pending Orders",
      value: "23",
      growth: "Needs attention",
      icon: <Bell className="text-amber-600" />,
    },
  ];

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      id: "products",
      label: "Manage Books",
      path: "/manage-books",
      icon: <BookOpen size={20} />,
    },
    {
      id: "categories",
      label: "Categories",
      path: "/categories",
      icon: <Layers3 size={20} />,
    },
    {
      id: "orders",
      label: "Orders",
      path: "/orders",
      icon: <ShoppingBag size={20} />,
    },
    {
      id: "customers",
      label: "Customers",
      path: "/customers",
      icon: <Users size={20} />,
    },
    {
      id: "settings",
      label: "Settings",
      path: "/settings",
      icon: <Settings size={20} />,
    },
  ];

  const categories = [
    {
      name: "Islamic",
      books: 120,
      color: "bg-green-100 text-green-700",
    },
    {
      name: "Programming",
      books: 85,
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "History",
      books: 45,
      color: "bg-orange-100 text-orange-700",
    },
    {
      name: "Science",
      books: 60,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  const handleNavigation = (item) => {
    setActiveTab(item.id);
    navigate(item.path);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-50">
        <div className="p-4 text-center border-b border-slate-800">
          <h1 className="text-3xl font-bold tracking-tight text-blue-400">
            পুঁথিকুঞ্জ
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            Admin Panel
          </p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                  : "text-gray-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.icon}

              <span className="font-medium">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all">
            <LogOut size={20} />

            <span className="font-medium">
              Logout
            </span>
          </button>
        </div>
      </aside>

   
    </div>
  );
};

export default Home;