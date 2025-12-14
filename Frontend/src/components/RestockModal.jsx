import React, { useState } from "react";
import {
  X,
  AlertCircle,
} from "lucide-react";
import axiosInstance from "../Utils/axiosInstance";

const RestockModal = ({ sweet, onClose, onSuccess }) => {
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!quantity || parseInt(quantity) <= 0) {
      setError("Please enter a valid quantity");
      return;
    }

    setLoading(true);

    try {
      await axiosInstance.post(`/sweets/${sweet._id}/restock`, {
        quantity: parseInt(quantity),
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Restock failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-slideUp">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Restock Sweet</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Sweet Name</p>
            <p className="text-lg font-bold text-gray-800">{sweet.name}</p>
            <p className="text-sm text-gray-600 mt-2">Current Stock</p>
            <p className="text-2xl font-bold text-green-600">
              {sweet.quantity}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity to Add *
            </label>
            <input
              type="number"
              required
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Enter quantity to add"
              autoFocus
            />
          </div>

          {quantity && parseInt(quantity) > 0 && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-gray-600">New Stock After Restock</p>
              <p className="text-2xl font-bold text-green-600">
                {sweet.quantity + parseInt(quantity)}
              </p>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all disabled:opacity-50 shadow-md"
            >
              {loading ? "Restocking..." : "Restock"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RestockModal;
