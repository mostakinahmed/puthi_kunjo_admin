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
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
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
      path: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      id: "products",
      label: "Manage Books",
      path: "/manage-books",
      icon: <BookOpen size={20} />,
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

  const handleNavigation = (item) => {
    setActiveTab(item.id);
    navigate(item.path);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
     

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
  

        {/* STATS GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  {stat.icon}
                </div>

                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    stat.growth.includes("+")
                      ? "bg-green-100 text-green-600"
                      : "bg-amber-100 text-amber-600"
                  }`}
                >
                  {stat.growth}
                </span>
              </div>

              <p className="text-gray-500 text-sm font-medium">
                {stat.label}
              </p>

              <h3 className="text-2xl font-bold mt-1">
                {stat.value}
              </h3>
            </div>
          ))}
        </section>

        {/* RECENT ORDERS TABLE */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">
              Recent Orders
            </h3>

            <button className="text-blue-600 hover:underline flex items-center gap-1 text-sm font-bold">
              View All <ChevronRight size={16} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-bold">
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Book Title</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {[1, 2, 3, 4, 5].map((order) => (
                  <tr
                    key={order}
                    className="hover:bg-gray-50/50 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                          MA
                        </div>

                        <span className="font-semibold text-gray-700">
                          Mostakin Ahmed
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-600 font-medium">
                      সহীহ্ হজ্জ ও উমরাহ্...
                    </td>

                    <td className="px-6 py-4 font-bold text-gray-800">
                      ৳ 249
                    </td>

                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                        Delivered
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-400 text-sm">
                      Oct 24, 2023
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;