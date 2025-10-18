import React, { useState } from "react";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  Clock,
  AlertTriangle,
  Eye,
  Plus,
  X,
  Upload,
  FileText,
  Activity,
  LogOut,
  CheckCircle,
  AlertCircle,
  User,
  CreditCard,
  BarChart3,
} from "lucide-react";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [purchases, setPurchases] = useState([]);
  const [sales, setSales] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [showSalesForm, setShowSalesForm] = useState(false);

  const LoginModal = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("admin");

    const handleLogin = () => {
      if (email && password) {
        setCurrentUser({
          id: userType === "admin" ? "admin-001" : "helper-001",
          email,
          role: userType,
          name: userType === "admin" ? "Admin User" : "Sales Helper 1",
        });
        setShowLoginModal(false);
        loadMockData();
      }
    };

    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Poultry Business</h2>
            <p className="text-gray-500 mt-2">Sign in to continue</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Your Role
              </label>
              <select
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="admin">👤 Admin (Monitor Only)</option>
                <option value="helper">👥 Sales Helper (Make Transactions)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition"
            >
              Sign In
            </button>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-xs text-blue-800 text-center">
                {userType === "admin" ? (
                  <>
                    <strong>Admin:</strong> Monitor all activities, view reports, track helper
                    performance
                  </>
                ) : (
                  <>
                    <strong>Helper:</strong> Record purchases & sales, manage daily transactions
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const loadMockData = () => {
    setPurchases([
      {
        id: 1,
        supplier: "Farm Fresh Poultry Ltd",
        contact: "08012345678",
        quantity: 100,
        unitPrice: 1500,
        totalAmount: 150000,
        date: "2024-01-15",
        time: "09:30 AM",
        recordedBy: "Sales Helper 1",
        recordedById: "helper-001",
        paymentMode: "Transfer",
        paymentProof: "receipt_001.pdf",
      },
      {
        id: 2,
        supplier: "Green Valley Farms",
        contact: "08098765432",
        quantity: 150,
        unitPrice: 1400,
        totalAmount: 210000,
        date: "2024-01-16",
        time: "08:15 AM",
        recordedBy: "Sales Helper 2",
        recordedById: "helper-002",
        paymentMode: "Cash",
        paymentProof: "receipt_002.pdf",
      },
    ]);

    setSales([
      {
        id: 1,
        customerName: "Mrs. Johnson",
        quantity: 10,
        unitPrice: 2000,
        totalAmount: 20000,
        paymentMode: "Cash",
        date: "2024-01-15",
        time: "10:30 AM",
        soldBy: "Sales Helper 1",
        soldById: "helper-001",
      },
      {
        id: 2,
        customerName: "Mr. Ahmed",
        quantity: 5,
        unitPrice: 2000,
        totalAmount: 10000,
        paymentMode: "Transfer",
        date: "2024-01-15",
        time: "11:45 AM",
        soldBy: "Sales Helper 2",
        soldById: "helper-002",
      },
    ]);
  };

  const PurchaseForm = () => {
    const [formData, setFormData] = useState({
      supplier: "",
      contact: "",
      quantity: "",
      unitPrice: "",
      paymentMode: "Cash",
      paymentProof: null,
    });

    const handleSubmit = () => {
      if (!formData.paymentProof) {
        alert("Please upload payment proof!");
        return;
      }

      const newPurchase = {
        id: purchases.length + 1,
        ...formData,
        quantity: parseInt(formData.quantity),
        unitPrice: parseInt(formData.unitPrice),
        totalAmount: parseInt(formData.quantity) * parseInt(formData.unitPrice),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        recordedBy: currentUser.name,
        recordedById: currentUser.id,
        paymentProof: formData.paymentProof.name,
      };
      setPurchases([newPurchase, ...purchases]);
      setShowPurchaseForm(false);
    };

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Record New Purchase</h2>
                <p className="text-blue-100 text-sm mt-1">Fill in all required details</p>
              </div>
              <button
                onClick={() => setShowPurchaseForm(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Supplier Name *
                </label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  placeholder="Enter supplier name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="080XXXXXXXX"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity (Birds) *
                </label>
                <input
                  type="number"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Unit Price (₦) *
                </label>
                <input
                  type="number"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  value={formData.unitPrice}
                  onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Payment Mode *
              </label>
              <select
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                value={formData.paymentMode}
                onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
              >
                <option value="Cash">💵 Cash</option>
                <option value="Transfer">🏦 Bank Transfer</option>
                <option value="POS">💳 POS</option>
                <option value="Cheque">📝 Cheque</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Payment Proof * (Required for accountability)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    setFormData({ ...formData, paymentProof: e.target.files[0] })
                  }
                  className="hidden"
                  id="payment-proof"
                />
                <label htmlFor="payment-proof" className="cursor-pointer">
                  <Upload className="mx-auto text-gray-400 mb-2" size={40} />
                  <p className="text-sm text-gray-600">
                    {formData.paymentProof ? (
                      <span className="text-green-600 font-semibold">
                        ✓ {formData.paymentProof.name}
                      </span>
                    ) : (
                      "Click to upload receipt/proof"
                    )}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG or PDF (Max 5MB)</p>
                </label>
              </div>
            </div>

            {formData.quantity && formData.unitPrice && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-semibold">Total Amount:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₦{(formData.quantity * formData.unitPrice).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowPurchaseForm(false)}
                className="flex-1 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
              >
                Record Purchase
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SalesForm = () => {
    const [formData, setFormData] = useState({
      customerName: "",
      quantity: "",
      unitPrice: "2000",
      paymentMode: "Cash",
    });

    const handleSubmit = () => {
      const newSale = {
        id: sales.length + 1,
        ...formData,
        quantity: parseInt(formData.quantity),
        unitPrice: parseInt(formData.unitPrice),
        totalAmount: parseInt(formData.quantity) * parseInt(formData.unitPrice),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        soldBy: currentUser.name,
        soldById: currentUser.id,
      };
      setSales([newSale, ...sales]);
      setShowSalesForm(false);
    };

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Record New Sale</h2>
                <p className="text-green-100 text-sm mt-1">Complete the sale transaction</p>
              </div>
              <button
                onClick={() => setShowSalesForm(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Customer Name *
              </label>
              <input
                type="text"
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="Enter customer name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity (Birds) *
                </label>
                <input
                  type="number"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Unit Price (₦) *
                </label>
                <input
                  type="number"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  value={formData.unitPrice}
                  onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                  placeholder="2000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Payment Mode *
              </label>
              <select
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                value={formData.paymentMode}
                onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
              >
                <option value="Cash">💵 Cash</option>
                <option value="Transfer">🏦 Bank Transfer</option>
                <option value="POS">💳 POS</option>
              </select>
            </div>

            {formData.quantity && formData.unitPrice && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-semibold">Total Amount:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₦{(formData.quantity * formData.unitPrice).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowSalesForm(false)}
                className="flex-1 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
              >
                Record Sale
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Dashboard = () => {
    const isAdmin = currentUser.role === "admin";
    
    // Filter data for helpers to show only their transactions
    const userPurchases = isAdmin
      ? purchases
      : purchases.filter((p) => p.recordedById === currentUser.id);
    const userSales = isAdmin ? sales : sales.filter((s) => s.soldById === currentUser.id);

    const totalPurchaseAmount = userPurchases.reduce((sum, p) => sum + p.totalAmount, 0);
    const totalSalesAmount = userSales.reduce((sum, s) => sum + s.totalAmount, 0);
    const profit = totalSalesAmount - totalPurchaseAmount;

    return (
      <div className="space-y-6">
        {isAdmin && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <Eye className="text-blue-600" size={24} />
              <div>
                <p className="font-semibold text-blue-900">Admin Monitor Mode</p>
                <p className="text-sm text-blue-700">
                  You're viewing all business activities. No transaction permissions.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Package size={32} />
              <div className="bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">
                Purchases
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">{userPurchases.length}</p>
            <p className="text-blue-100 text-sm mb-2">Total Transactions</p>
            <p className="text-lg font-semibold">₦{totalPurchaseAmount.toLocaleString()}</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <ShoppingCart size={32} />
              <div className="bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">Sales</div>
            </div>
            <p className="text-3xl font-bold mb-1">{userSales.length}</p>
            <p className="text-green-100 text-sm mb-2">Total Transactions</p>
            <p className="text-lg font-semibold">₦{totalSalesAmount.toLocaleString()}</p>
          </div>

          <div
            className={`bg-gradient-to-br ${
              profit >= 0 ? "from-purple-500 to-pink-600" : "from-red-500 to-orange-600"
            } rounded-2xl p-6 text-white shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp size={32} />
              <div className="bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">
                {profit >= 0 ? "Profit" : "Loss"}
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">₦{Math.abs(profit).toLocaleString()}</p>
            <p className="text-purple-100 text-sm mb-2">
              {profit >= 0 ? "Net Profit" : "Net Loss"}
            </p>
            <p className="text-sm">{isAdmin ? "All Helpers" : "Your Performance"}</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-yellow-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 size={32} />
              <div className="bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">Stock</div>
            </div>
            <p className="text-3xl font-bold mb-1">
              {userPurchases.reduce((sum, p) => sum + p.quantity, 0) -
                userSales.reduce((sum, s) => sum + s.quantity, 0)}
            </p>
            <p className="text-orange-100 text-sm mb-2">Birds in Stock</p>
            <p className="text-sm">Current Inventory</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <p className="font-semibold text-yellow-900">Important Reminder</p>
              <p className="text-sm text-yellow-800 mt-1">
                All purchases must include payment proof. Record transactions promptly for accurate
                tracking and accountability.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Recent Purchases</h3>
              <Package className="text-blue-600" size={24} />
            </div>
            {userPurchases.length === 0 ? (
              <div className="text-center py-8">
                <Package className="mx-auto text-gray-300 mb-3" size={48} />
                <p className="text-gray-500">No purchases yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {userPurchases.slice(0, 5).map((purchase) => (
                  <div
                    key={purchase.id}
                    className="border-l-4 border-blue-500 bg-blue-50 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-800">{purchase.supplier}</p>
                        <p className="text-sm text-gray-600">
                          {purchase.quantity} birds @ ₦{purchase.unitPrice.toLocaleString()}
                        </p>
                      </div>
                      <p className="font-bold text-blue-600">
                        ₦{purchase.totalAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <User size={12} /> {purchase.recordedBy}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {purchase.date} {purchase.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Recent Sales</h3>
              <ShoppingCart className="text-green-600" size={24} />
            </div>
            {userSales.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="mx-auto text-gray-300 mb-3" size={48} />
                <p className="text-gray-500">No sales yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {userSales.slice(0, 5).map((sale) => (
                  <div
                    key={sale.id}
                    className="border-l-4 border-green-500 bg-green-50 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-800">{sale.customerName}</p>
                        <p className="text-sm text-gray-600">
                          {sale.quantity} birds @ ₦{sale.unitPrice.toLocaleString()}
                        </p>
                      </div>
                      <p className="font-bold text-green-600">
                        ₦{sale.totalAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <User size={12} /> {sale.soldBy}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {sale.date} {sale.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const PurchasesList = () => {
    const isAdmin = currentUser.role === "admin";

    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              All Purchases
              {isAdmin && (
                <span className="text-sm font-normal bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  View Only
                </span>
              )}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {isAdmin ? "Monitoring all purchase transactions" : "Your purchase history"}
            </p>
          </div>
          {!isAdmin && (
<button
              onClick={() => setShowPurchaseForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition flex items-center gap-2"
            >
              <Plus size={20} /> Record Purchase
            </button>
          )}
        </div>

        {purchases.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="text-blue-600" size={48} />
            </div>
            <p className="text-gray-600 text-lg mb-2">No purchases recorded yet</p>
            {!isAdmin && (
              <button
                onClick={() => setShowPurchaseForm(true)}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Record First Purchase
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-purple-50 border-b-2 border-blue-200">
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                    Date & Time
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                    Supplier
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                    Quantity
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                    Unit Price
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                    Total Amount
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                    Payment
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                    Recorded By
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                    Proof
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {purchases.map((purchase) => (
                  <tr key={purchase.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar size={14} className="text-gray-400" />
                        <span className="font-medium">{purchase.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <Clock size={12} />
                        <span>{purchase.time}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-gray-800">{purchase.supplier}</p>
                      <p className="text-xs text-gray-500">{purchase.contact}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {purchase.quantity} birds
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-medium">
                        ₦{purchase.unitPrice.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-lg font-bold text-blue-600">
                        ₦{purchase.totalAmount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {purchase.paymentMode}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-200 rounded-full p-1">
                          <User size={14} className="text-gray-600" />
                        </div>
                        <span className="text-sm text-gray-700">{purchase.recordedBy}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <button className="flex items-center gap-1 text-green-600 hover:text-green-700 text-sm font-medium">
                        <CheckCircle size={16} />
                        <span>{purchase.paymentProof}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  const SalesList = () => {
    const isAdmin = currentUser.role === "admin";

    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              All Sales
              {isAdmin && (
                <span className="text-sm font-normal bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  View Only
                </span>
              )}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {isAdmin ? "Monitoring all sales transactions" : "Your sales history"}
            </p>
          </div>
          {!isAdmin && (
            <button
              onClick={() => setShowSalesForm(true)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition flex items-center gap-2"
            >
              <Plus size={20} /> Record Sale
            </button>
          )}
        </div>

        {sales.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="text-green-600" size={48} />
            </div>
            <p className="text-gray-600 text-lg mb-2">No sales recorded yet</p>
            {!isAdmin && (
              <button
                onClick={() => setShowSalesForm(true)}
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
              >
                Record First Sale
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-200">
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                    Date & Time
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                    Customer
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                    Quantity
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                    Unit Price
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                    Total Amount
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                    Payment
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                    Sold By
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar size={14} className="text-gray-400" />
                        <span className="font-medium">{sale.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <Clock size={12} />
                        <span>{sale.time}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-gray-800">{sale.customerName}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {sale.quantity} birds
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-medium">
                        ₦{sale.unitPrice.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-lg font-bold text-green-600">
                        ₦{sale.totalAmount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {sale.paymentMode}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-200 rounded-full p-1">
                          <User size={14} className="text-gray-600" />
                        </div>
                        <span className="text-sm text-gray-700">{sale.soldBy}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  const HelperMonitoring = () => {
    const helpers = [
      { id: "helper-001", name: "Sales Helper 1" },
      { id: "helper-002", name: "Sales Helper 2" },
    ];

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Users size={32} />
            <div>
              <h2 className="text-2xl font-bold">Helper Performance Monitoring</h2>
              <p className="text-purple-100 text-sm">
                Track individual helper activities and accountability
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {helpers.map((helper) => {
            const helperPurchases = purchases.filter((p) => p.recordedById === helper.id);
            const helperSales = sales.filter((s) => s.soldById === helper.id);
            const totalPurchases = helperPurchases.reduce((sum, p) => sum + p.totalAmount, 0);
            const totalSales = helperSales.reduce((sum, s) => sum + s.totalAmount, 0);

            return (
              <div key={helper.id} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-3">
                    <User className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{helper.name}</h3>
                    <p className="text-sm text-gray-500">Transaction Overview</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Purchases</p>
                    <p className="text-2xl font-bold text-blue-600">{helperPurchases.length}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      ₦{totalPurchases.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Sales</p>
                    <p className="text-2xl font-bold text-green-600">{helperSales.length}</p>
                    <p className="text-xs text-gray-500 mt-1">₦{totalSales.toLocaleString()}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Activity size={16} /> Recent Activity
                  </h4>
                  <div className="space-y-2">
                    {[...helperPurchases, ...helperSales]
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .slice(0, 3)
                      .map((transaction, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-3"
                        >
                          <div className="flex items-center gap-2">
                            {transaction.supplier ? (
                              <Package size={14} className="text-blue-600" />
                            ) : (
                              <ShoppingCart size={14} className="text-green-600" />
                            )}
                            <span className="text-gray-700">
                              {transaction.supplier || transaction.customerName}
                            </span>
                          </div>
                          <span className="font-semibold text-gray-800">
                            ₦{transaction.totalAmount.toLocaleString()}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Clock size={24} className="text-purple-600" />
            Complete Transaction Timeline
          </h3>
          <div className="space-y-3">
            {[...purchases, ...sales]
              .sort((a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`))
              .map((transaction, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 border-l-4 border-purple-500 bg-purple-50 rounded-lg p-4"
                >
                  <div className="bg-white rounded-full p-2 shadow">
                    {transaction.supplier ? (
                      <Package size={20} className="text-blue-600" />
                    ) : (
                      <ShoppingCart size={20} className="text-green-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {transaction.supplier
                            ? `Purchase from ${transaction.supplier}`
                            : `Sale to ${transaction.customerName}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {transaction.quantity} birds @ ₦{transaction.unitPrice.toLocaleString()}
                        </p>
                      </div>
                      <p className="font-bold text-purple-600">
                        ₦{transaction.totalAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <User size={12} />
                        {transaction.recordedBy || transaction.soldBy}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {transaction.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {transaction.time}
                      </span>
                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                        {transaction.paymentMode}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

  if (showLoginModal) return <LoginModal />;

  const isAdmin = currentUser.role === "admin";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-2">
                <Home className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Poultry Business</h1>
                <p className="text-xs text-gray-500">Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">{currentUser.name}</p>
                <p className="text-xs text-gray-500">
                  {isAdmin ? "👤 Admin" : "👥 Sales Helper"}
                </p>
              </div>
              <button
                onClick={() => {
                  setCurrentUser(null);
                  setShowLoginModal(true);
                  setActiveTab("dashboard");
                }}
                className="bg-red-100 text-red-600 hover:bg-red-200 p-2 rounded-lg transition"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition transform hover:scale-105 ${
              activeTab === "dashboard"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 shadow"
            }`}
          >
            <Home size={20} /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab("purchases")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition transform hover:scale-105 ${
              activeTab === "purchases"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 shadow"
            }`}
          >
            <Package size={20} /> Purchases {isAdmin && "(View)"}
          </button>
          <button
            onClick={() => setActiveTab("sales")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition transform hover:scale-105 ${
              activeTab === "sales"
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 shadow"
            }`}
          >
            <ShoppingCart size={20} /> Sales {isAdmin && "(View)"}
          </button>
          {isAdmin && (
            <button
              onClick={() => setActiveTab("monitoring")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition transform hover:scale-105 ${
                activeTab === "monitoring"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow"
              }`}
            >
              <Users size={20} /> Helper Monitoring
            </button>
          )}
        </div>

        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "purchases" && <PurchasesList />}
        {activeTab === "sales" && <SalesList />}
        {activeTab === "monitoring" && isAdmin && <HelperMonitoring />}
      </div>

      {showPurchaseForm && <PurchaseForm />}
      {showSalesForm && <SalesForm />}
    </div>
  );
};

export default App;