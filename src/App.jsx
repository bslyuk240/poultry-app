/* ========== PART 1: IMPORTS, STATE, LOGIN & MOCK DATA ========== */

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
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [purchases, setPurchases] = useState([]);
  const [sales, setSales] = useState([]);
  const [loans, setLoans] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [showSalesForm, setShowSalesForm] = useState(false);
  const [showLoanForm, setShowLoanForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Your Role</label>
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
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
                    <strong>Admin:</strong> Monitor all activities, view reports, track helper performance
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
        notes: "Good quality birds, delivered on time",
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
        notes: "",
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
        notes: "Regular customer, paid full amount",
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
        notes: "",
      },
    ]);

    setLoans([
      {
        id: 1,
        type: "loan_out",
        personName: "Mrs. Adeyemi",
        amount: 50000,
        date: "2024-01-10",
        time: "02:00 PM",
        dueDate: "2024-02-10",
        status: "pending",
        recordedBy: "Sales Helper 1",
        recordedById: "helper-001",
        notes: "To be paid back by end of month",
      },
      {
        id: 2,
        type: "pay_back",
        personName: "Mr. Bello",
        amount: 30000,
        date: "2024-01-12",
        time: "11:00 AM",
        status: "completed",
        recordedBy: "Sales Helper 1",
        recordedById: "helper-001",
        notes: "Payment received in full",
      },
    ]);

    setExpenses([
      {
        id: 1,
        description: "Transportation to market",
        amount: 5000,
        category: "Transport",
        date: "2024-01-15",
        time: "09:00 AM",
        recordedBy: "Sales Helper 1",
        recordedById: "helper-001",
        notes: "Fuel and bike repairs",
      },
      {
        id: 2,
        description: "Home items from market",
        amount: 8000,
        category: "Personal",
        date: "2024-01-16",
        time: "03:30 PM",
        recordedBy: "Sales Helper 2",
        recordedById: "helper-002",
        notes: "Groceries for family",
      },
    ]);
  };

/* ========== END OF PART 1 ========== */
/* ========== PART 2: FORMS (PURCHASE, SALES, LOAN, EXPENSE) ========== */

  const PurchaseForm = () => {
    const [formData, setFormData] = useState({
      supplier: "",
      contact: "",
      quantity: "",
      unitPrice: "",
      paymentMode: "Cash",
      paymentProof: null,
      notes: "",
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
      setFormData({ supplier: "", contact: "", quantity: "", unitPrice: "", paymentMode: "Cash", paymentProof: null, notes: "" });
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
              <button onClick={() => setShowPurchaseForm(false)} className="text-white hover:bg-white/20 p-2 rounded-lg transition">
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Supplier Name *</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  placeholder="Enter supplier name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number *</label>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity (Birds) *</label>
                <input
                  type="number"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Unit Price (₦) *</label>
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Mode *</label>
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Notes/Comments (Optional)</label>
              <textarea
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add any additional notes about this purchase..."
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Proof * (Required)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setFormData({ ...formData, paymentProof: e.target.files[0] })}
                  className="hidden"
                  id="payment-proof"
                />
                <label htmlFor="payment-proof" className="cursor-pointer">
                  <Upload className="mx-auto text-gray-400 mb-2" size={40} />
                  <p className="text-sm text-gray-600">
                    {formData.paymentProof ? (
                      <span className="text-green-600 font-semibold">✓ {formData.paymentProof.name}</span>
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
      notes: "",
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
      setFormData({ customerName: "", quantity: "", unitPrice: "2000", paymentMode: "Cash", notes: "" });
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
              <button onClick={() => setShowSalesForm(false)} className="text-white hover:bg-white/20 p-2 rounded-lg transition">
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Name *</label>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity (Birds) *</label>
                <input
                  type="number"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Unit Price (₦) *</label>
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Mode *</label>
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

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Notes/Comments (Optional)</label>
              <textarea
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add any additional notes about this sale..."
                rows="3"
              />
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

  const LoanForm = () => {
    const [formData, setFormData] = useState({
      type: "loan_out",
      personName: "",
      amount: "",
      dueDate: "",
      notes: "",
    });

    const handleSubmit = () => {
      const newLoan = {
        id: loans.length + 1,
        ...formData,
        amount: parseInt(formData.amount),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: formData.type === "loan_out" ? "pending" : "completed",
        recordedBy: currentUser.name,
        recordedById: currentUser.id,
      };
      setLoans([newLoan, ...loans]);
      setShowLoanForm(false);
      setFormData({ type: "loan_out", personName: "", amount: "", dueDate: "", notes: "" });
    };

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Record Loan Transaction</h2>
                <p className="text-orange-100 text-sm mt-1">Track money loaned out or paid back</p>
              </div>
              <button onClick={() => setShowLoanForm(false)} className="text-white hover:bg-white/20 p-2 rounded-lg transition">
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Transaction Type *</label>
              <select
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="loan_out">💸 Loan Out (Money Given)</option>
                <option value="pay_back">💰 Pay Back (Money Received)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Person Name *</label>
              <input
                type="text"
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                value={formData.personName}
                onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
                placeholder="Enter person's name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Amount (₦) *</label>
                <input
                  type="number"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0"
                />
              </div>

              {formData.type === "loan_out" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Due Date (Optional)</label>
                  <input
                    type="date"
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Notes/Comments (Optional)</label>
              <textarea
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add any additional notes..."
                rows="3"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowLoanForm(false)}
                className="flex-1 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
              >
                Record Transaction
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ExpenseForm = () => {
    const [formData, setFormData] = useState({
      description: "",
      amount: "",
      category: "Personal",
      notes: "",
    });

    const handleSubmit = () => {
      const newExpense = {
        id: expenses.length + 1,
        ...formData,
        amount: parseInt(formData.amount),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        recordedBy: currentUser.name,
        recordedById: currentUser.id,
      };
      setExpenses([newExpense, ...expenses]);
      setShowExpenseForm(false);
      setFormData({ description: "", amount: "", category: "Personal", notes: "" });
    };

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
          <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-6 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Record Expense</h2>
                <p className="text-pink-100 text-sm mt-1">Track market and personal expenses</p>
              </div>
              <button onClick={() => setShowExpenseForm(false)} className="text-white hover:bg-white/20 p-2 rounded-lg transition">
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
              <input
                type="text"
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="What was purchased?"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Amount (₦) *</label>
                <input
                  type="number"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                <select
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Personal">🏠 Personal/Home Items</option>
                  <option value="Transport">🚗 Transportation</option>
                  <option value="Food">🍽️ Food/Meals</option>
                  <option value="Medical">💊 Medical</option>
                  <option value="Other">📦 Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Notes/Comments (Optional)</label>
              <textarea
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add any additional details..."
                rows="3"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowExpenseForm(false)}
                className="flex-1 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
              >
                Record Expense
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

/* ========== END OF PART 2 ========== */
/* ========== PART 3: DASHBOARD COMPONENT ========== */

  const Dashboard = () => {
    const isAdmin = currentUser.role === "admin";
    const userPurchases = isAdmin ? purchases : purchases.filter((p) => p.recordedById === currentUser.id);
    const userSales = isAdmin ? sales : sales.filter((s) => s.soldById === currentUser.id);
    const userLoans = isAdmin ? loans : loans.filter((l) => l.recordedById === currentUser.id);
    const userExpenses = isAdmin ? expenses : expenses.filter((e) => e.recordedById === currentUser.id);

    const totalPurchaseAmount = userPurchases.reduce((sum, p) => sum + p.totalAmount, 0);
    const totalSalesAmount = userSales.reduce((sum, s) => sum + s.totalAmount, 0);
    const totalExpenses = userExpenses.reduce((sum, e) => sum + e.amount, 0);
    const totalLoansOut = userLoans.filter((l) => l.type === "loan_out").reduce((sum, l) => sum + l.amount, 0);
    const profit = totalSalesAmount - totalPurchaseAmount - totalExpenses;

    return (
      <div className="space-y-6">
        {isAdmin && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <Eye className="text-blue-600" size={24} />
              <div>
                <p className="font-semibold text-blue-900">Admin Monitor Mode</p>
                <p className="text-sm text-blue-700">You're viewing all business activities. No transaction permissions.</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Package size={32} />
              <div className="bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">Purchases</div>
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

          <div className={`bg-gradient-to-br ${profit >= 0 ? "from-purple-500 to-pink-600" : "from-red-500 to-orange-600"} rounded-2xl p-6 text-white shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
              <TrendingUp size={32} />
              <div className="bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">{profit >= 0 ? "Profit" : "Loss"}</div>
            </div>
            <p className="text-3xl font-bold mb-1">₦{Math.abs(profit).toLocaleString()}</p>
            <p className="text-purple-100 text-sm mb-2">{profit >= 0 ? "Net Profit" : "Net Loss"}</p>
            <p className="text-sm">{isAdmin ? "All Helpers" : "Your Performance"}</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-yellow-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 size={32} />
              <div className="bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">Stock</div>
            </div>
            <p className="text-3xl font-bold mb-1">
              {userPurchases.reduce((sum, p) => sum + p.quantity, 0) - userSales.reduce((sum, s) => sum + s.quantity, 0)}
            </p>
            <p className="text-orange-100 text-sm mb-2">Birds in Stock</p>
            <p className="text-sm">Current Inventory</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-6 border-2 border-pink-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Wallet className="text-pink-600" size={24} />
                <h3 className="text-lg font-bold text-gray-800">Total Expenses</h3>
              </div>
              <span className="text-2xl font-bold text-pink-600">₦{totalExpenses.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600">{userExpenses.length} expense records</p>
          </div>

          <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-6 border-2 border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ArrowUpCircle className="text-orange-600" size={24} />
                <h3 className="text-lg font-bold text-gray-800">Loans Out</h3>
              </div>
              <span className="text-2xl font-bold text-orange-600">₦{totalLoansOut.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600">
              {userLoans.filter((l) => l.type === "loan_out" && l.status === "pending").length} pending
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <p className="font-semibold text-yellow-900">Important Reminder</p>
              <p className="text-sm text-yellow-800 mt-1">
                All purchases must include payment proof. Record transactions promptly for accurate tracking and accountability.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
              <Activity className="text-blue-600" size={24} />
            </div>
            <div className="space-y-3">
              {[...userPurchases, ...userSales, ...userLoans, ...userExpenses]
                .sort((a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`))
                .slice(0, 5)
                .map((item, idx) => {
                  let color = "blue";
                  let icon = <Package size={16} />;
                  let title = "";

                  if (item.supplier) {
                    color = "blue";
                    icon = <Package size={16} />;
                    title = `Purchase from ${item.supplier}`;
                  } else if (item.customerName) {
                    color = "green";
                    icon = <ShoppingCart size={16} />;
                    title = `Sale to ${item.customerName}`;
                  } else if (item.type) {
                    color = "orange";
                    icon = item.type === "loan_out" ? <ArrowUpCircle size={16} /> : <ArrowDownCircle size={16} />;
                    title = `${item.type === "loan_out" ? "Loan to" : "Payment from"} ${item.personName}`;
                  } else {
                    color = "pink";
                    icon = <Wallet size={16} />;
                    title = item.description;
                  }

                  return (
                    <div key={idx} className={`border-l-4 border-${color}-500 bg-${color}-50 rounded-lg p-3 hover:shadow-md transition`}>
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-2">
                          <div className={`text-${color}-600 mt-1`}>{icon}</div>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">{title}</p>
                            <p className="text-xs text-gray-500 mt-1">{item.date} at {item.time}</p>
                          </div>
                        </div>
                        <p className={`font-bold text-${color}-600`}>₦{(item.totalAmount || item.amount).toLocaleString()}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">{isAdmin ? "Business Overview" : "Quick Actions"}</h3>
            </div>
            {!isAdmin ? (
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setShowPurchaseForm(true)} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl hover:shadow-lg transition flex flex-col items-center gap-2">
                  <Package size={24} />
                  <span className="text-sm font-semibold">Record Purchase</span>
                </button>
                <button onClick={() => setShowSalesForm(true)} className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl hover:shadow-lg transition flex flex-col items-center gap-2">
                  <ShoppingCart size={24} />
                  <span className="text-sm font-semibold">Record Sale</span>
                </button>
                <button onClick={() => setShowLoanForm(true)} className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 rounded-xl hover:shadow-lg transition flex flex-col items-center gap-2">
                  <Wallet size={24} />
                  <span className="text-sm font-semibold">Loan/Payback</span>
                </button>
                <button onClick={() => setShowExpenseForm(true)} className="bg-gradient-to-r from-pink-500 to-rose-600 text-white p-4 rounded-xl hover:shadow-lg transition flex flex-col items-center gap-2">
                  <CreditCard size={24} />
                  <span className="text-sm font-semibold">Add Expense</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="text-purple-600" size={20} />
                    <h4 className="font-semibold text-gray-800">Top Performer</h4>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">Helper 1</p>
                  <p className="text-sm text-gray-600 mt-1">Highest sales value</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="text-orange-600" size={20} />
                    <h4 className="font-semibold text-gray-800">Pending Loans</h4>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{loans.filter((l) => l.type === "loan_out" && l.status === "pending").length}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    ₦{loans.filter((l) => l.type === "loan_out" && l.status === "pending").reduce((sum, l) => sum + l.amount, 0).toLocaleString()} outstanding
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="text-blue-600" size={20} />
                    <h4 className="font-semibold text-gray-800">Today's Activity</h4>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-lg font-bold text-blue-600">
                        {[...purchases, ...sales].filter((t) => t.date === new Date().toLocaleDateString()).length}
                      </p>
                      <p className="text-xs text-gray-600">Transactions</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-600">
                        ₦{[...purchases, ...sales].filter((t) => t.date === new Date().toLocaleDateString()).reduce((sum, t) => sum + t.totalAmount, 0).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-600">Total Value</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="text-yellow-600" size={20} />
                    <h4 className="font-semibold text-gray-800">Stock Level</h4>
                  </div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {purchases.reduce((sum, p) => sum + p.quantity, 0) - sales.reduce((sum, s) => sum + s.quantity, 0)}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {purchases.reduce((sum, p) => sum + p.quantity, 0) - sales.reduce((sum, s) => sum + s.quantity, 0) < 20
                      ? "⚠️ Low stock - reorder soon"
                      : "✓ Stock level good"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

/* ========== END OF PART 3 ========== */
/* ========== PART 4: PURCHASE/SALES LISTS & LOANS/EXPENSES PAGES ========== */

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
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Date & Time</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Supplier</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Quantity</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Unit Price</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Total Amount</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Payment</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Recorded By</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Notes</th>
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
                      <span className="text-sm font-medium">₦{purchase.unitPrice.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-lg font-bold text-blue-600">₦{purchase.totalAmount.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {purchase.paymentMode}
                      </span>
                      <button className="flex items-center gap-1 text-green-600 hover:text-green-700 text-xs mt-1">
                        <CheckCircle size={12} />
                        <span>Proof</span>
                      </button>
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
                      {purchase.notes ? (
                        <p className="text-sm text-gray-600 italic max-w-xs">{purchase.notes}</p>
                      ) : (
                        <span className="text-xs text-gray-400">No notes</span>
                      )}
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
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Date & Time</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Customer</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Quantity</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Unit Price</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Total Amount</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Payment</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Sold By</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Notes</th>
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
                      <span className="text-sm font-medium">₦{sale.unitPrice.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-lg font-bold text-green-600">₦{sale.totalAmount.toLocaleString()}</span>
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
                    <td className="px-4 py-4">
                      {sale.notes ? (
                        <p className="text-sm text-gray-600 italic max-w-xs">{sale.notes}</p>
                      ) : (
                        <span className="text-xs text-gray-400">No notes</span>
                      )}
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

  const LoansExpensesTab = () => {
    const isAdmin = currentUser.role === "admin";

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                Loans & Paybacks
                {isAdmin && (
                  <span className="text-sm font-normal bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    View Only
                  </span>
                )}
              </h2>
              <p className="text-gray-600 text-sm mt-1">Track money loaned out and received back</p>
            </div>
            {!isAdmin && (
              <button
                onClick={() => setShowLoanForm(true)}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition flex items-center gap-2"
              >
                <Plus size={20} /> Record Loan
              </button>
            )}
          </div>

          {loans.length === 0 ? (
            <div className="text-center py-12">
              <Wallet className="mx-auto text-gray-300 mb-3" size={48} />
              <p className="text-gray-500">No loan transactions yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-50 to-red-50 border-b-2 border-orange-200">
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Type</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Person</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Amount</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Date</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Due Date</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Recorded By</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loans.map((loan) => (
                    <tr key={loan.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-4">
                        <span className={`flex items-center gap-2 ${loan.type === "loan_out" ? "text-red-600" : "text-green-600"} font-semibold`}>
                          {loan.type === "loan_out" ? (
                            <>
                              <ArrowUpCircle size={16} /> Loan Out
                            </>
                          ) : (
                            <>
                              <ArrowDownCircle size={16} /> Pay Back
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-gray-800">{loan.personName}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-lg font-bold text-orange-600">₦{loan.amount.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm">
                          <p className="font-medium">{loan.date}</p>
                          <p className="text-xs text-gray-500">{loan.time}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {loan.dueDate ? (
                          <span className="text-sm font-medium">{loan.dueDate}</span>
                        ) : (
                          <span className="text-xs text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${loan.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                          {loan.status === "pending" ? "⏳ Pending" : "✓ Completed"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="bg-gray-200 rounded-full p-1">
                            <User size={14} className="text-gray-600" />
                          </div>
                          <span className="text-sm text-gray-700">{loan.recordedBy}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {loan.notes ? (
                          <p className="text-sm text-gray-600 italic max-w-xs">{loan.notes}</p>
                        ) : (
                          <span className="text-xs text-gray-400">No notes</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                Expenses
                {isAdmin && (
                  <span className="text-sm font-normal bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    View Only
                  </span>
                )}
              </h2>
              <p className="text-gray-600 text-sm mt-1">Personal and market expenses from business funds</p>
            </div>
            {!isAdmin && (
              <button
                onClick={() => setShowExpenseForm(true)}
                className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition flex items-center gap-2"
              >
                <Plus size={20} /> Add Expense
              </button>
            )}
          </div>

          {expenses.length === 0 ? (
            <div className="text-center py-12">
              <CreditCard className="mx-auto text-gray-300 mb-3" size={48} />
              <p className="text-gray-500">No expenses recorded yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-pink-50 to-rose-50 border-b-2 border-pink-200">
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Date & Time</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Description</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Category</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Amount</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Recorded By</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {expenses.map((expense) => (
                    <tr key={expense.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar size={14} className="text-gray-400" />
                          <span className="font-medium">{expense.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <Clock size={12} />
                          <span>{expense.time}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-gray-800">{expense.description}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {expense.category}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-lg font-bold text-pink-600">₦{expense.amount.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="bg-gray-200 rounded-full p-1">
                            <User size={14} className="text-gray-600" />
                          </div>
                          <span className="text-sm text-gray-700">{expense.recordedBy}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {expense.notes ? (
                          <p className="text-sm text-gray-600 italic max-w-xs">{expense.notes}</p>
                        ) : (
                          <span className="text-xs text-gray-400">No notes</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

/* ========== END OF PART 4 ========== */
/* ========== PART 5: NAVIGATION, MAIN RETURN & EXPORT (FINAL) ========== */

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
                <p className="text-xs text-gray-500">{isAdmin ? "👤 Admin" : "👥 Sales Helper"}</p>
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
          <button
            onClick={() => setActiveTab("loans-expenses")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition transform hover:scale-105 ${
              activeTab === "loans-expenses"
                ? "bg-gradient-to-r from-orange-600 to-pink-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 shadow"
            }`}
          >
            <Wallet size={20} /> Loans & Expenses {isAdmin && "(View)"}
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
        {activeTab === "loans-expenses" && <LoansExpensesTab />}
        {activeTab === "monitoring" && isAdmin && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Helper Monitoring</h2>
            <p className="text-gray-600">Helper performance metrics and detailed monitoring will appear here</p>
          </div>
        )}
      </div>

      {showPurchaseForm && <PurchaseForm />}
      {showSalesForm && <SalesForm />}
      {showLoanForm && <LoanForm />}
      {showExpenseForm && <ExpenseForm />}
    </div>
  );
};

export default App;

/* ========== END OF PART 5 - COMPLETE APP ========== */