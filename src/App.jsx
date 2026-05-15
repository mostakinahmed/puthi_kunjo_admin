import { Routes, Route } from "react-router-dom";
import "./index.css";

import Layout from "./component/Layout";
import AdminDashboard from "./page/Dashboard";
import ManageBooks from "./page/ManageBooks";
import AddBook from "./page/AddBook";
import Categories from "./page/Categories";

function App() {
  

  return (
    <Routes>
      
      {/* Layout with Sidebar */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/manage-books" element={<ManageBooks />} />
                <Route path="/add-books" element={<AddBook />} />
                <Route path="/categories" element={<Categories />} />
      </Route>

    </Routes>
  );
}

export default App;