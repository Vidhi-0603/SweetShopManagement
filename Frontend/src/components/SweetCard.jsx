import { Plus, Edit2, Trash2, Package } from "lucide-react";

const SweetCard = ({
  sweet,
  isAdmin,
  onPurchase,
  onEdit,
  onRestock,
  onDelete,
}) => {
  const isOutOfStock = sweet.quantity === 0;
  const isLowStock = sweet.quantity > 0 && sweet.quantity <= 5;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 duration-300">
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 flex items-center justify-center">
          <Package className="w-20 h-20 text-white opacity-50" />
        </div>
        {isOutOfStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            Out of Stock
          </div>
        )}
        {isLowStock && !isOutOfStock && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            Low Stock
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
            {sweet.name}
          </h3>
          {sweet.category && (
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-semibold whitespace-nowrap ml-2">
              {sweet.category}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              ₹{sweet.price}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              <span
                className={`font-semibold ${
                  isOutOfStock
                    ? "text-red-600"
                    : isLowStock
                    ? "text-orange-600"
                    : "text-green-600"
                }`}
              >
                {sweet.quantity}
              </span>{" "}
              available
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => onPurchase(sweet)}
            disabled={isOutOfStock}
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100 shadow-md"
          >
            {isOutOfStock ? "Out of Stock" : "🛒 Purchase"}
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onEdit(sweet)}
              className="py-2 border-2 border-purple-500 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all flex items-center justify-center space-x-1"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit</span>
            </button>
            {isAdmin && (
              <button
                onClick={() => onRestock(sweet)}
                className="py-2 border-2 border-green-500 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-all flex items-center justify-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Restock</span>
              </button>
            )}
          </div>

          {isAdmin && (
            <button
              onClick={() => onDelete(sweet._id)}
              className="w-full py-2 border-2 border-red-500 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-all flex items-center justify-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SweetCard;
