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
  Trash,
} from "lucide-react";
import { supabase } from './supabaseClient';

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
  const [showMortalityForm, setShowMortalityForm] = useState(false);
  const [mortality, setMortality] = useState([]);
  React.useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // User is logged in, get their profile
        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (userData) {
          setCurrentUser({
            id: userData.id,
            email: userData.email,
            role: userData.role,
            name: userData.name,
          });
          localStorage.setItem('currentUser', JSON.stringify({
            id: userData.id,
            email: userData.email,
            role: userData.role,
            name: userData.name,
          }));
          setShowLoginModal(false);
          loadMockData();
        }
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
        setShowLoginModal(true);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const LoginModal = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [signUpData, setSignUpData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "helper"
    });

    const handleLogin = async () => {
      if (!email || !password) {
        alert('Please enter email and password');
        return;
      }

      setLoading(true);
      try {
        // Sign in with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (authError) {
          alert('Login failed: ' + authError.message);
          setLoading(false);
          return;
        }

        // Get user profile from users table
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', authData.user.id)
          .single();

        if (userError || !userData) {
          alert('User profile not found');
          await supabase.auth.signOut();
          setLoading(false);
          return;
        }

        setCurrentUser({
          id: userData.id,
          email: userData.email,
          role: userData.role,
          name: userData.name,
        });
        
        localStorage.setItem('currentUser', JSON.stringify({
          id: userData.id,
          email: userData.email,
          role: userData.role,
          name: userData.name,
        }));
        
        setShowLoginModal(false);
        loadMockData();
        setLoading(false);
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
        setLoading(false);
      }
    };

    const handleSignUp = async () => {
      if (!signUpData.name || !signUpData.email || !signUpData.password) {
        alert('Please fill in all fields');
        return;
      }

      if (signUpData.password !== signUpData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      if (signUpData.password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
      }

      setLoading(true);
      try {
        // Sign up with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: signUpData.email,
          password: signUpData.password,
          options: {
            data: {
              name: signUpData.name,
              role: signUpData.role
            }
          }
        });

        if (authError) {
          alert('Sign up failed: ' + authError.message);
          setLoading(false);
          return;
        }

        alert('Account created successfully! Please log in.');
        setIsSignUp(false);
        setEmail(signUpData.email);
        setSignUpData({ name: "", email: "", password: "", confirmPassword: "", role: "helper" });
        setLoading(false);
      } catch (error) {
        console.error('Sign up error:', error);
        alert('Sign up failed. Please try again.');
        setLoading(false);
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
            <p className="text-gray-500 mt-2">{isSignUp ? 'Create new account' : 'Sign in to continue'}</p>
          </div>

          {!isSignUp ? (
            // LOGIN FORM
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={loading}
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
                  disabled={loading}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <div className="text-center mt-4">
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                >
                  Don't have an account? Sign up
                </button>
              </div>
            </div>
          ) : (
            // SIGNUP FORM
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                  value={signUpData.name}
                  onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                  placeholder="Your full name"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                  value={signUpData.email}
                  onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                  placeholder="your@email.com"
                  disabled={loading}
                />
              </div>

              {/* Role is automatically set to helper - no selection needed */}
              <input type="hidden" value="helper" />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                  value={signUpData.password}
                  onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                  placeholder="At least 6 characters"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                  value={signUpData.confirmPassword}
                  onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                  placeholder="Re-enter password"
                  disabled={loading}
                />
              </div>

              <button
                onClick={handleSignUp}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>

              <div className="text-center mt-4">
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                >
                  Already have an account? Sign in
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const loadMockData = async () => {
    try {
      // Fetch all data from Supabase
      const { data: purchasesData, error: purchasesError } = await supabase
        .from('purchases')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: salesData, error: salesError } = await supabase
        .from('sales')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: loansData, error: loansError } = await supabase
        .from('loans')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: expensesData, error: expensesError } = await supabase
        .from('expenses')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: mortalityData, error: mortalityError } = await supabase
        .from('mortality')
        .select('*')
        .order('created_at', { ascending: false });

      if (purchasesError) console.error('Error loading purchases:', purchasesError);
      if (salesError) console.error('Error loading sales:', salesError);
      if (loansError) console.error('Error loading loans:', loansError);
      if (expensesError) console.error('Error loading expenses:', expensesError);
      if (mortalityError) console.error('Error loading mortality:', mortalityError);

      // Convert snake_case to camelCase for compatibility
      const mapPurchase = (p) => ({
        ...p,
        unitPrice: p.unit_price,
        totalAmount: p.total_amount,
        paymentMode: p.payment_mode,
        paymentProof: p.payment_proof,
        recordedBy: p.recorded_by,
        recordedById: p.recorded_by_id,
      });

      const mapSale = (s) => ({
        ...s,
        customerName: s.customer_name,
        unitPrice: s.unit_price,
        totalAmount: s.total_amount,
        paymentMode: s.payment_mode,
        soldBy: s.sold_by,
        soldById: s.sold_by_id,
      });

      const mapLoan = (l) => ({
        ...l,
        personName: l.person_name,
        dueDate: l.due_date,
        recordedBy: l.recorded_by,
        recordedById: l.recorded_by_id,
      });

      const mapExpense = (e) => ({
        ...e,
        recordedBy: e.recorded_by,
        recordedById: e.recorded_by_id,
      });

      const mapMortality = (m) => ({
        ...m,
        recordedBy: m.recorded_by,
        recordedById: m.recorded_by_id,
      });

      // Set data with mapped fields
      setPurchases(purchasesData ? purchasesData.map(mapPurchase) : []);
      setSales(salesData ? salesData.map(mapSale) : []);
      setLoans(loansData ? loansData.map(mapLoan) : []);
      setExpenses(expensesData ? expensesData.map(mapExpense) : []);
      setMortality(mortalityData ? mortalityData.map(mapMortality) : []);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleDelete = async (table, id, label) => {
    if (currentUser?.role !== "admin") return;

    const confirmed = window.confirm(`Delete this ${label}? This cannot be undone.`);
    if (!confirmed) return;

    const { error } = await supabase.from(table).delete().eq('id', id);

    if (error) {
      console.error(`Error deleting ${label}:`, error);
      alert(`Could not delete ${label}. Please try again.`);
      return;
    }

    await loadMockData();
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
      paymentStatus: "Paid",
      paymentProof: null,
      notes: "",
    });

    const handleSubmit = async () => {
      if (formData.paymentStatus === "Paid" && !formData.paymentProof) {
        alert("Please upload payment proof for paid purchases!");
        return;
      }

      try {
        const newPurchase = {
          supplier: formData.supplier,
          contact: formData.contact,
          quantity: parseInt(formData.quantity),
          unit_price: parseInt(formData.unitPrice),
          total_amount: parseInt(formData.quantity) * parseInt(formData.unitPrice),
          payment_mode: formData.paymentMode,
          payment_status: formData.paymentStatus,
          payment_proof: formData.paymentProof?.name || null,
          notes: formData.notes,
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          recorded_by: currentUser.name,
          recorded_by_id: currentUser.id,
        };

        const { data, error } = await supabase
          .from('purchases')
          .insert([newPurchase])
          .select();

        if (error) {
          console.error('Error saving purchase:', error);
          alert('Error saving purchase. Please try again.');
          return;
        }

        // Add to local state
        await loadMockData();
        setShowPurchaseForm(false);
        setFormData({ supplier: "", contact: "", quantity: "", unitPrice: "", paymentMode: "Cash", paymentStatus: "Paid", paymentProof: null, notes: "" });
      } catch (error) {
        console.error('Error:', error);
        alert('Error saving purchase. Please try again.');
      }
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Status *</label>
              <select
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                value={formData.paymentStatus}
                onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
              >
                <option value="Paid">✅ Paid (Cash/Transfer received)</option>
                <option value="Credit">📝 On Credit (Pay later)</option>
              </select>
              {formData.paymentStatus === "Credit" && (
                <p className="text-xs text-orange-600 mt-2">⚠️ This will be recorded as Accounts Payable</p>
              )}
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Payment Proof {formData.paymentStatus === "Paid" ? "* (Required)" : "(Optional)"}
              </label>
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
                      `Click to upload ${formData.paymentStatus === "Paid" ? "receipt/proof" : "invoice/agreement (optional)"}`
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

    const handleSubmit = async () => {
      try {
        const newSale = {
          customer_name: formData.customerName,
          quantity: parseInt(formData.quantity),
          unit_price: parseInt(formData.unitPrice),
          total_amount: parseInt(formData.quantity) * parseInt(formData.unitPrice),
          payment_mode: formData.paymentMode,
          notes: formData.notes,
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          sold_by: currentUser.name,
          sold_by_id: currentUser.id,
        };

        const { data, error } = await supabase
          .from('sales')
          .insert([newSale])
          .select();

        if (error) {
          console.error('Error saving sale:', error);
          alert('Error saving sale. Please try again.');
          return;
        }

        // Add to local state
        await loadMockData(); // Replace: setSales([data[0], ...sales]);
        setShowSalesForm(false);
        setFormData({ customerName: "", quantity: "", unitPrice: "2000", paymentMode: "Cash", notes: "" });
      } catch (error) {
        console.error('Error:', error);
        alert('Error saving sale. Please try again.');
      }
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
      loanId: "", // NEW: For tracking which loan is being paid back
      amount: "",
      dueDate: "",
      notes: "",
    });

    // Get list of people with pending loans
    const pendingLoans = loans.filter(l => l.type === "loan_out" && l.status === "pending");
    const uniqueDebtors = [...new Set(pendingLoans.map(l => l.personName))];

    const handleSubmit = async () => {
      try {
        if (formData.type === "pay_back") {
          // Find the loan being paid back
          const loanToPay = loans.find(l => 
            l.personName === formData.personName && 
            l.type === "loan_out" && 
            l.status === "pending"
          );

          if (!loanToPay) {
            alert("No pending loan found for this person!");
            return;
          }

          // Record the payback
          const newPayback = {
            type: "pay_back",
            person_name: formData.personName,
            amount: parseInt(formData.amount),
            due_date: null,
            status: "completed",
            notes: formData.notes,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            recorded_by: currentUser.name,
            recorded_by_id: currentUser.id,
          };

          const { data: paybackData, error: paybackError } = await supabase
            .from('loans')
            .insert([newPayback])
            .select();

          if (paybackError) {
            console.error('Error saving payback:', paybackError);
            alert('Error saving payback. Please try again.');
            return;
          }

          // Check if loan is fully paid
          const totalPaidBack = loans
            .filter(l => l.personName === formData.personName && l.type === "pay_back")
            .reduce((sum, l) => sum + l.amount, 0) + parseInt(formData.amount);

          if (totalPaidBack >= loanToPay.amount) {
            // Mark original loan as completed
            await supabase
              .from('loans')
              .update({ status: 'completed' })
              .eq('id', loanToPay.id);
          }
        } else {
          // Loan out
          const newLoan = {
            type: "loan_out",
            person_name: formData.personName,
            amount: parseInt(formData.amount),
            due_date: formData.dueDate || null,
            status: "pending",
            notes: formData.notes,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            recorded_by: currentUser.name,
            recorded_by_id: currentUser.id,
          };

          const { data, error } = await supabase
            .from('loans')
            .insert([newLoan])
            .select();

          if (error) {
            console.error('Error saving loan:', error);
            alert('Error saving loan. Please try again.');
            return;
          }
        }

        await loadMockData();
        setShowLoanForm(false);
        setFormData({ type: "loan_out", personName: "", loanId: "", amount: "", dueDate: "", notes: "" });
      } catch (error) {
        console.error('Error:', error);
        alert('Error saving loan transaction. Please try again.');
      }
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
                onChange={(e) => setFormData({ ...formData, type: e.target.value, personName: "", amount: "" })}
              >
                <option value="loan_out">💸 Loan Out (Give Money)</option>
                <option value="pay_back">💰 Pay Back (Receive Money)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Person Name *</label>
              {formData.type === "pay_back" && uniqueDebtors.length > 0 ? (
                <select
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                  value={formData.personName}
                  onChange={(e) => {
                    const selectedPerson = e.target.value;
                    const loan = pendingLoans.find(l => l.personName === selectedPerson);
                    setFormData({ 
                      ...formData, 
                      personName: selectedPerson,
                      amount: loan ? loan.amount.toString() : ""
                    });
                  }}
                >
                  <option value="">Select person with pending loan...</option>
                  {uniqueDebtors.map((person, idx) => {
                    const totalOwed = pendingLoans
                      .filter(l => l.personName === person)
                      .reduce((sum, l) => sum + l.amount, 0);
                    return (
                      <option key={idx} value={person}>
                        {person} - Owes ₦{totalOwed.toLocaleString()}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                  value={formData.personName}
                  onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
                  placeholder={formData.type === "pay_back" ? "No pending loans" : "Enter person's name"}
                  disabled={formData.type === "pay_back" && uniqueDebtors.length === 0}
                />
              )}
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

    const handleSubmit = async () => {
      try {
        const newExpense = {
          description: formData.description,
          amount: parseInt(formData.amount),
          category: formData.category,
          notes: formData.notes,
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          recorded_by: currentUser.name,
          recorded_by_id: currentUser.id,
        };

        const { data, error } = await supabase
          .from('expenses')
          .insert([newExpense])
          .select();

        if (error) {
          console.error('Error saving expense:', error);
          alert('Error saving expense. Please try again.');
          return;
        }

        // Add to local state
        await loadMockData(); // Replace: setExpenses([data[0], ...expenses]);
        setShowExpenseForm(false);
        setFormData({ description: "", amount: "", category: "Personal", notes: "" });
      } catch (error) {
        console.error('Error:', error);
        alert('Error saving expense. Please try again.');
      }
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

  const MortalityForm = () => {
    const [formData, setFormData] = useState({
      quantity: "",
      reason: "Disease",
      notes: "",
    });

    const handleSubmit = async () => {
      try {
        const newMortality = {
          quantity: parseInt(formData.quantity),
          reason: formData.reason,
          notes: formData.notes,
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          recorded_by: currentUser.name,
          recorded_by_id: currentUser.id,
        };

        const { data, error } = await supabase
          .from('mortality')
          .insert([newMortality])
          .select();

        if (error) {
          console.error('Error saving mortality:', error);
          alert('Error saving mortality record. Please try again.');
          return;
        }

        await loadMockData();
        setShowMortalityForm(false);
        setFormData({ quantity: "", reason: "Disease", notes: "" });
      } catch (error) {
        console.error('Error:', error);
        alert('Error saving mortality record. Please try again.');
      }
    };

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Record Bird Mortality</h2>
                <p className="text-red-100 text-sm mt-1">Track deceased birds to adjust inventory</p>
              </div>
              <button onClick={() => setShowMortalityForm(false)} className="text-white hover:bg-white/20 p-2 rounded-lg transition">
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Birds Lost *</label>
              <input
                type="number"
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Reason/Cause *</label>
              <select
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              >
                <option value="Disease">🦠 Disease</option>
                <option value="Accident">⚠️ Accident</option>
                <option value="Predator">🦅 Predator Attack</option>
                <option value="Weather">🌧️ Weather/Environment</option>
                <option value="Unknown">❓ Unknown</option>
                <option value="Other">📋 Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Notes/Details (Optional)</label>
              <textarea
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add any additional details about the mortality..."
                rows="3"
              />
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                <div className="text-sm text-red-800">
                  <p className="font-semibold mb-1">Inventory Impact</p>
                  <p>Recording mortality will reduce your available stock and profit.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowMortalityForm(false)}
                className="flex-1 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
              >
                Record Mortality
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
    const userMortality = isAdmin ? mortality : mortality.filter((m) => m.recordedById === currentUser.id);

    // Separate paid and credit purchases
    const paidPurchases = userPurchases.filter(p => p.payment_status === "Paid" || !p.payment_status);
    const creditPurchases = userPurchases.filter(p => p.payment_status === "Credit");
    
    const totalPurchaseAmount = paidPurchases.reduce((sum, p) => sum + p.totalAmount, 0);
    const totalCreditAmount = creditPurchases.reduce((sum, p) => sum + p.totalAmount, 0);
    const totalSalesAmount = userSales.reduce((sum, s) => sum + s.totalAmount, 0);
    const totalExpenses = userExpenses.reduce((sum, e) => sum + e.amount, 0);
    const totalMortality = userMortality.reduce((sum, m) => sum + m.quantity, 0);
    
    // Loans out (money given) - this REDUCES profit until paid back
    const totalLoansOut = userLoans.filter((l) => l.type === "loan_out").reduce((sum, l) => sum + l.amount, 0);
    const totalLoansIn = userLoans.filter((l) => l.type === "pay_back").reduce((sum, l) => sum + l.amount, 0);
    const netLoansOut = totalLoansOut - totalLoansIn; // Money still owed to you
    
    // NEW PROFIT CALCULATION: When you loan money out, it reduces your cash (reduces profit)
    // When money comes back, it increases profit
    const profit = totalSalesAmount - totalPurchaseAmount - totalExpenses - netLoansOut;
    
    // Calculate current stock
    const totalPurchased = userPurchases.reduce((sum, p) => sum + p.quantity, 0);
    const totalSold = userSales.reduce((sum, s) => sum + s.quantity, 0);
    const currentStock = totalPurchased - totalSold - totalMortality;

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
            <p className="text-3xl font-bold mb-1">{currentStock}</p>
            <p className="text-orange-100 text-sm mb-2">Birds in Stock</p>
            <p className="text-sm">Current Inventory</p>
            {totalMortality > 0 && (
              <p className="text-xs mt-2 bg-red-500/20 rounded px-2 py-1">⚠️ {totalMortality} lost to mortality</p>
            )}
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
                <CreditCard className="text-orange-600" size={24} />
                <h3 className="text-lg font-bold text-gray-800">Accounts Payable</h3>
              </div>
              <span className="text-2xl font-bold text-orange-600">₦{totalCreditAmount.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600">{creditPurchases.length} credit purchases</p>
            <p className="text-xs text-gray-500 mt-1">⚠️ Need to pay suppliers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-6 border-2 border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ArrowUpCircle className="text-blue-600" size={24} />
                <h3 className="text-lg font-bold text-gray-800">Money Loaned Out</h3>
              </div>
              <span className="text-2xl font-bold text-blue-600">₦{netLoansOut.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600">
              {userLoans.filter((l) => l.type === "loan_out" && l.status === "pending").length} pending loans
            </p>
            <p className="text-xs text-gray-500 mt-1">💡 Reduces current profit until repaid</p>
          </div>

          <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl p-6 border-2 border-red-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="text-red-600" size={24} />
                <h3 className="text-lg font-bold text-gray-800">Bird Mortality</h3>
              </div>
              <span className="text-2xl font-bold text-red-600">{totalMortality}</span>
            </div>
            <p className="text-sm text-gray-600">{userMortality.length} mortality events</p>
            <p className="text-xs text-gray-500 mt-1">📉 Reduces inventory value</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <p className="font-semibold text-blue-900">How Profit is Calculated</p>
              <p className="text-sm text-blue-800 mt-1">
                <strong>Profit</strong> = Sales - Paid Purchases - Expenses - Money Loaned Out (until repaid). 
                When loans are repaid, your profit increases. Credit purchases don't affect profit until you pay them.
              </p>
            </div>
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
                <button onClick={() => setShowMortalityForm(true)} className="bg-gradient-to-r from-red-500 to-orange-600 text-white p-4 rounded-xl hover:shadow-lg transition flex flex-col items-center gap-2 col-span-2">
                  <AlertCircle size={24} />
                  <span className="text-sm font-semibold">Record Mortality</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="text-purple-600" size={20} />
                    <h4 className="font-semibold text-gray-800">Top Performer</h4>
                  </div>
                  {(() => {
                    // Calculate sales by helper
                    const helperSales = {};
                    sales.forEach(sale => {
                      const helper = sale.soldBy || 'Unknown';
                      if (!helperSales[helper]) {
                        helperSales[helper] = 0;
                      }
                      helperSales[helper] += sale.totalAmount;
                    });
                    
                    // Find top performer
                    const topHelper = Object.keys(helperSales).length > 0 
                      ? Object.keys(helperSales).reduce((a, b) => helperSales[a] > helperSales[b] ? a : b)
                      : 'No sales yet';
                    const topAmount = helperSales[topHelper] || 0;
                    
                    return (
                      <>
                        <p className="text-2xl font-bold text-purple-600">{topHelper}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {topAmount > 0 ? `₦${topAmount.toLocaleString()} in sales` : 'No sales recorded'}
                        </p>
                      </>
                    );
                  })()}
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="text-orange-600" size={20} />
                    <h4 className="font-semibold text-gray-800">Net Loans Out</h4>
                  </div>
                  {(() => {
                    // Calculate total loans out
                    const totalLoansOut = loans
                      .filter((l) => l.type === "loan_out")
                      .reduce((sum, l) => sum + l.amount, 0);
                    
                    // Calculate total paid back
                    const totalPaidBack = loans
                      .filter((l) => l.type === "pay_back")
                      .reduce((sum, l) => sum + l.amount, 0);
                    
                    // Net amount still owed
                    const netOwed = totalLoansOut - totalPaidBack;
                    
                    // Count unique people with pending loans
                    const pendingDebtors = loans
                      .filter((l) => l.type === "loan_out" && l.status === "pending")
                      .map(l => l.personName);
                    const uniqueDebtors = [...new Set(pendingDebtors)].length;
                    
                    return (
                      <>
                        <p className="text-2xl font-bold text-orange-600">
                          ₦{netOwed.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {uniqueDebtors} {uniqueDebtors === 1 ? 'person owes' : 'people owe'} money
                        </p>
                      </>
                    );
                  })()}
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="text-blue-600" size={20} />
                    <h4 className="font-semibold text-gray-800">Today's Activity</h4>
                  </div>
                  {(() => {
                    // Get today's date in multiple formats to match database
                    const today = new Date();
                    const todayISO = today.toISOString().split('T')[0]; // 2025-01-20
                    const todayLocal = today.toLocaleDateString('en-CA'); // 2025-01-20 (Canada format = ISO)
                    
                    // Filter transactions from today
                    const todayTransactions = [...purchases, ...sales].filter((t) => {
                      // Check if date matches in any format
                      return t.date === todayISO || t.date === todayLocal || t.date.startsWith(todayISO);
                    });
                    
                    const todayPurchases = purchases.filter((t) => 
                      t.date === todayISO || t.date === todayLocal || t.date.startsWith(todayISO)
                    );
                    const todaySales = sales.filter((t) => 
                      t.date === todayISO || t.date === todayLocal || t.date.startsWith(todayISO)
                    );
                    
                    const purchaseValue = todayPurchases.reduce((sum, t) => sum + (t.totalAmount || 0), 0);
                    const salesValue = todaySales.reduce((sum, t) => sum + (t.totalAmount || 0), 0);
                    
                    return (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">Purchases:</span>
                          <span className="text-sm font-bold text-blue-600">
                            {todayPurchases.length} (₦{purchaseValue.toLocaleString()})
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">Sales:</span>
                          <span className="text-sm font-bold text-green-600">
                            {todaySales.length} (₦{salesValue.toLocaleString()})
                          </span>
                        </div>
                        <div className="border-t pt-1 flex justify-between items-center">
                          <span className="text-xs font-semibold text-gray-700">Total:</span>
                          <span className="text-lg font-bold text-purple-600">
                            {todayTransactions.length}
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="text-yellow-600" size={20} />
                    <h4 className="font-semibold text-gray-800">Stock Level</h4>
                  </div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {purchases.reduce((sum, p) => sum + p.quantity, 0) - sales.reduce((sum, s) => sum + s.quantity, 0) - mortality.reduce((sum, m) => sum + m.quantity, 0)}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {purchases.reduce((sum, p) => sum + p.quantity, 0) - sales.reduce((sum, s) => sum + s.quantity, 0) - mortality.reduce((sum, m) => sum + m.quantity, 0) < 20
                      ? "⚠️ Low stock - reorder soon"
                      : "✓ Stock level good"}
                  </p>
                  {mortality.reduce((sum, m) => sum + m.quantity, 0) > 0 && (
                    <p className="text-xs text-red-600 mt-1">
                      ({mortality.reduce((sum, m) => sum + m.quantity, 0)} lost to mortality)
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  const HelperMonitoring = () => {
    // Get real helpers from the database
    const [helpers, setHelpers] = React.useState([]);

    React.useEffect(() => {
      const loadHelpers = async () => {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('role', 'helper')
          .order('created_at', { ascending: false });

        if (!error && data) {
          setHelpers(data);
        }
      };

      loadHelpers();
    }, []);

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
            const helperLoans = loans.filter((l) => l.recordedById === helper.id);
            const helperExpenses = expenses.filter((e) => e.recordedById === helper.id);

            const totalPurchases = helperPurchases.reduce((sum, p) => sum + (p.totalAmount || 0), 0);
            const totalSales = helperSales.reduce((sum, s) => sum + (s.totalAmount || 0), 0);
            const totalExpenses = helperExpenses.reduce((sum, e) => sum + (e.amount || 0), 0);

            return (
              <div key={helper.id} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-3">
                    <User className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{helper.name}</h3>
                    <p className="text-sm text-gray-500">{helper.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Purchases</p>
                    <p className="text-2xl font-bold text-blue-600">{helperPurchases.length}</p>
                    <p className="text-xs text-gray-500 mt-1">₦{totalPurchases.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Sales</p>
                    <p className="text-2xl font-bold text-green-600">{helperSales.length}</p>
                    <p className="text-xs text-gray-500 mt-1">₦{totalSales.toLocaleString()}</p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Loans</p>
                    <p className="text-2xl font-bold text-orange-600">{helperLoans.length}</p>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Expenses</p>
                    <p className="text-2xl font-bold text-pink-600">{helperExpenses.length}</p>
                    <p className="text-xs text-gray-500 mt-1">₦{totalExpenses.toLocaleString()}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Activity size={16} /> Recent Activity
                  </h4>
                  <div className="space-y-2">
                    {[...helperPurchases, ...helperSales, ...helperLoans, ...helperExpenses]
                      .sort((a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`))
                      .slice(0, 3)
                      .map((transaction, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            {transaction.supplier ? (
                              <Package size={14} className="text-blue-600" />
                            ) : transaction.customerName ? (
                              <ShoppingCart size={14} className="text-green-600" />
                            ) : transaction.type ? (
                              <Wallet size={14} className="text-orange-600" />
                            ) : (
                              <CreditCard size={14} className="text-pink-600" />
                            )}
                            <span className="text-gray-700">
                              {transaction.supplier || transaction.customerName || transaction.personName || transaction.description}
                            </span>
                          </div>
                          <span className="font-semibold text-gray-800">
                            ₦{(transaction.totalAmount || transaction.amount || 0).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    {[...helperPurchases, ...helperSales, ...helperLoans, ...helperExpenses].length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">No activity yet</p>
                    )}
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
            {[...purchases, ...sales, ...loans, ...expenses]
              .sort((a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`))
              .map((transaction, idx) => (
                <div key={idx} className="flex items-start gap-4 border-l-4 border-purple-500 bg-purple-50 rounded-lg p-4">
                  <div className="bg-white rounded-full p-2 shadow">
                    {transaction.supplier ? (
                      <Package size={20} className="text-blue-600" />
                    ) : transaction.customerName ? (
                      <ShoppingCart size={20} className="text-green-600" />
                    ) : transaction.type ? (
                      <Wallet size={20} className="text-orange-600" />
                    ) : (
                      <CreditCard size={20} className="text-pink-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {transaction.supplier
                            ? `Purchase from ${transaction.supplier}`
                            : transaction.customerName
                            ? `Sale to ${transaction.customerName}`
                            : transaction.type
                            ? `${transaction.type === "loan_out" ? "Loan to" : "Payment from"} ${transaction.personName}`
                            : transaction.description}
                        </p>
                        {transaction.notes && (
                          <p className="text-sm text-gray-600 italic mt-1">{transaction.notes}</p>
                        )}
                      </div>
                      <p className="font-bold text-purple-600">
                        ₦{(transaction.totalAmount || transaction.amount || 0).toLocaleString()}
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
                    </div>
                  </div>
                </div>
              ))}
            {[...purchases, ...sales, ...loans, ...expenses].length === 0 && (
              <p className="text-center text-gray-500 py-8">No transactions yet</p>
            )}
          </div>
        </div>

        {helpers.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Users className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Helpers Yet</h3>
            <p className="text-gray-600">Create helper accounts and their activities will appear here.</p>
          </div>
        )}
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
                  Admin Mode
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
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Recorded By</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Notes</th>
                  {isAdmin && (
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Actions</th>
                  )}
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
                      {purchase.paymentProof && (
                        <button className="flex items-center gap-1 text-green-600 hover:text-green-700 text-xs mt-1">
                          <CheckCircle size={12} />
                          <span>Proof</span>
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        purchase.payment_status === "Credit" 
                          ? "bg-orange-100 text-orange-700" 
                          : "bg-green-100 text-green-700"
                      }`}>
                        {purchase.payment_status === "Credit" ? "📝 On Credit" : "✅ Paid"}
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
                      {purchase.notes ? (
                        <p className="text-sm text-gray-600 italic max-w-xs">{purchase.notes}</p>
                      ) : (
                        <span className="text-xs text-gray-400">No notes</span>
                      )}
                    </td>
                    {isAdmin && (
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleDelete('purchases', purchase.id, 'purchase record')}
                          className="flex items-center gap-1 text-red-600 hover:text-red-700 text-xs font-semibold bg-red-50 border border-red-200 px-3 py-1 rounded-lg"
                        >
                          <Trash size={14} />
                          Delete
                        </button>
                      </td>
                    )}
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
                  Admin Mode
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
                  {isAdmin && (
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Actions</th>
                  )}
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
                    {isAdmin && (
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleDelete('sales', sale.id, 'sale record')}
                          className="flex items-center gap-1 text-red-600 hover:text-red-700 text-xs font-semibold bg-red-50 border border-red-200 px-3 py-1 rounded-lg"
                        >
                          <Trash size={14} />
                          Delete
                        </button>
                      </td>
                    )}
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
                    Admin Mode
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
                    {isAdmin && (
                      <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Actions</th>
                    )}
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
                      {isAdmin && (
                        <td className="px-4 py-4">
                          <button
                            onClick={() => handleDelete('loans', loan.id, 'loan entry')}
                            className="flex items-center gap-1 text-red-600 hover:text-red-700 text-xs font-semibold bg-red-50 border border-red-200 px-3 py-1 rounded-lg"
                          >
                            <Trash size={14} />
                            Delete
                          </button>
                        </td>
                      )}
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
                    Admin Mode
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
                    {isAdmin && (
                      <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Actions</th>
                    )}
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
                      {isAdmin && (
                        <td className="px-4 py-4">
                          <button
                            onClick={() => handleDelete('expenses', expense.id, 'expense record')}
                            className="flex items-center gap-1 text-red-600 hover:text-red-700 text-xs font-semibold bg-red-50 border border-red-200 px-3 py-1 rounded-lg"
                          >
                            <Trash size={14} />
                            Delete
                          </button>
                        </td>
                      )}
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
                onClick={async () => {
                  await supabase.auth.signOut();
                  localStorage.removeItem('currentUser');
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
            <Package size={20} /> Purchases {isAdmin && "(Admin)"}
          </button>
          <button
            onClick={() => setActiveTab("sales")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition transform hover:scale-105 ${
              activeTab === "sales"
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 shadow"
            }`}
          >
            <ShoppingCart size={20} /> Sales {isAdmin && "(Admin)"}
          </button>
          <button
            onClick={() => setActiveTab("loans-expenses")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition transform hover:scale-105 ${
              activeTab === "loans-expenses"
                ? "bg-gradient-to-r from-orange-600 to-pink-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 shadow"
            }`}
          >
            <Wallet size={20} /> Loans & Expenses {isAdmin && "(Admin)"}
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
        {activeTab === "monitoring" && isAdmin && <HelperMonitoring />}
      </div>

      {showPurchaseForm && <PurchaseForm />}
      {showSalesForm && <SalesForm />}
      {showLoanForm && <LoanForm />}
      {showExpenseForm && <ExpenseForm />}
      {showMortalityForm && <MortalityForm />}
    </div>
  );
};

export default App;

/* ========== END OF PART 5 - COMPLETE APP ========== */
