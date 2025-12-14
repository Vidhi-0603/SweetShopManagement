import React, { useState, useEffect } from "react";
import { ShoppingCart, LogOut, Menu, X, Search, Filter, Plus, Package, TrendingUp, AlertCircle } from "lucide-react";
import SweetCard from "../components/SweetCard";
import SweetFormModal from "../components/SweetFormModal";
import RestockModal from "../components/RestockModal";
import axiosInstance from "../Utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    loadSweets();
  }, []);

  useEffect(() => {
    filterSweets();
  }, [sweets, searchTerm, filters]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const loadSweets = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/sweets");
      setSweets(response.data.sweets || response.data || []);
    } catch (error) {
      console.error("Error loading sweets:", error);
      showNotification(
        error.response?.data?.message || "Failed to load sweets",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const filterSweets = () => {
    let filtered = sweets;

    if (searchTerm) {
      filtered = filtered.filter(
        (sweet) =>
          sweet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (sweet.category &&
            sweet.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filters.category) {
      filtered = filtered.filter(
        (sweet) => sweet.category === filters.category
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(
        (sweet) => sweet.price >= parseFloat(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(
        (sweet) => sweet.price <= parseFloat(filters.maxPrice)
      );
    }

    setFilteredSweets(filtered);
  };

  const handleSearch = async () => {
    if (
      !searchTerm &&
      !filters.category &&
      !filters.minPrice &&
      !filters.maxPrice
    ) {
      loadSweets();
      return;
    }

    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append("name", searchTerm);
      if (filters.category) params.append("category", filters.category);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

      const response = await axiosInstance.get(`/sweets/search?${params.toString()}`);
      setSweets(response.data.sweets || response.data || []);
    } catch (error) {
      console.error("Search error:", error);
      showNotification(
        error.response?.data?.message || "Search failed",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (sweet) => {
    if (sweet.quantity <= 0) return;

    const quantity = prompt(
      `How many ${sweet.name} would you like to purchase?`,
      "1"
    );
    if (!quantity || isNaN(quantity) || quantity <= 0) return;

    try {
      await axiosInstance.post(`/sweets/${sweet._id}/purchase`, {
        quantity: parseInt(quantity),
      });
      showNotification(`Successfully purchased ${quantity} ${sweet.name}!`);
      await loadSweets();
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Purchase failed",
        "error"
      );
    }
  };

  const handleRestock = (sweet) => {
    setSelectedSweet(sweet);
    setShowRestockModal(true);
  };

  const handleDelete = async (sweetId) => {
    if (!confirm("Are you sure you want to delete this sweet?")) return;

    try {
      await axiosInstance.delete(`/sweets/${sweetId}`);
      showNotification("Sweet deleted successfully!");
      await loadSweets();
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Delete failed",
        "error"
      );
    }
  };

  const categories = [
    ...new Set(sweets.map((s) => s.category).filter(Boolean)),
  ];
  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg animate-slideIn ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Sweet Shop</h1>
                <p className="text-xs text-gray-500">
                  Delicious sweets delivered fresh
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">
                  {user?.username || user?.email}
                </p>
                <p className="text-xs text-purple-600 capitalize font-medium">
                  {isAdmin ? "👑 Admin" : "🛍️ Customer"}
                </p>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-200 mt-2 pt-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    {user?.username || user?.email}
                  </p>
                  <p className="text-xs text-purple-600 capitalize font-medium">
                    {isAdmin ? "👑 Admin" : "🛍️ Customer"}
                  </p>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Sweets
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {sweets.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">In Stock</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {sweets.filter((s) => s.quantity > 0).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Out of Stock
                </p>
                <p className="text-3xl font-bold text-red-600 mt-1">
                  {sweets.filter((s) => s.quantity === 0).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search sweets by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-semibold"
            >
              Search
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>Add Sweet</span>
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 animate-fadeIn">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="1000"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
            </div>
          )}
        </div>

        {/* Sweets Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 mt-4">Loading delicious sweets...</p>
          </div>
        ) : filteredSweets.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No sweets found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilters({ category: "", minPrice: "", maxPrice: "" });
                loadSweets();
              }}
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSweets.map((sweet) => (
              <SweetCard
                key={sweet._id}
                sweet={sweet}
                isAdmin={isAdmin}
                onPurchase={handlePurchase}
                onEdit={(sweet) => {
                  setSelectedSweet(sweet);
                  setShowEditModal(true);
                }}
                onRestock={handleRestock}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      {showAddModal && (
        <SweetFormModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            loadSweets();
            showNotification("Sweet added successfully!");
          }}
        />
      )}

      {showEditModal && selectedSweet && (
        <SweetFormModal
          sweet={selectedSweet}
          onClose={() => {
            setShowEditModal(false);
            setSelectedSweet(null);
          }}
          onSuccess={() => {
            setShowEditModal(false);
            setSelectedSweet(null);
            loadSweets();
            showNotification("Sweet updated successfully!");
          }}
        />
      )}

      {showRestockModal && selectedSweet && (
        <RestockModal
          sweet={selectedSweet}
          onClose={() => {
            setShowRestockModal(false);
            setSelectedSweet(null);
          }}
          onSuccess={() => {
            setShowRestockModal(false);
            setSelectedSweet(null);
            loadSweets();
            showNotification("Sweet restocked successfully!");
          }}
        />
      )}
    </div>
  );
};
export default DashboardPage;
