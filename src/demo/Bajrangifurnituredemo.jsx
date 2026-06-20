import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiPhone, 
  FiMapPin, 
  FiCheckCircle, 
  FiStar, 
  FiShoppingCart, 
  FiTruck, 
  FiInfo, 
  FiPlus, 
  FiX, 
  FiMessageSquare, 
  FiShield, 
  FiPackage,
  FiClock,
  FiChevronRight
} from 'react-icons/fi'

// Custom WhatsApp SVG icon
const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg 
    className={className} 
    fill="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const productsData = [
  {
    id: 1,
    name: "Luxury Royal 5-Seater Sofa",
    category: "furniture",
    price: 42500,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
    specs: [
      "Premium breathable velvet fabric upholstery",
      "Solid seasoned teakwood structure skeleton",
      "High-density 40-grade comfort foam core",
      "Includes 5 designer throw cushions"
    ]
  },
  {
    id: 2,
    name: "King Size Hydraulic Storage Bed",
    category: "furniture",
    price: 34800,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
    specs: [
      "Dual hydraulic cylinders for effortless lift",
      "Waterproof storage floor boards",
      "Inbuilt headboard charging slots",
      "Termite-resistant seasoned engineered wood"
    ]
  },
  {
    id: 3,
    name: "Modular 3-Door Wardrobe",
    category: "furniture",
    price: 28900,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80",
    specs: [
      "Full-height dressing mirror panel",
      "Godrej-grade high security keylocks",
      "Soft-close German hinge mechanisms",
      "Adjustable shelf columns & hanging rods"
    ]
  },
  {
    id: 4,
    name: "Smart Ultra-HD QLED TV 55\"",
    category: "electronics",
    price: 49990,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80",
    specs: [
      "Quantum Dot 4K Resolution at 120Hz",
      "Preloaded Google TV OS with assistant remote",
      "Dolby Atmos 30W front-facing speakers",
      "3x HDMI 2.1 Ports & eARC capability"
    ]
  }
]

const initialOrders = [
  {
    id: "BJ-9021",
    name: "Ramesh Kumar",
    phone: "9876543210",
    item: "Luxury Royal 5-Seater Sofa",
    price: 42500,
    address: "Juma Masjid Road, near Hanuman Temple, Deoghar, 814112",
    status: "Delivered",
    timestamp: "10 mins ago"
  },
  {
    id: "BJ-9022",
    name: "Anita Sharma",
    phone: "9123456789",
    item: "Smart Ultra-HD QLED TV 55\"",
    price: 49990,
    address: "Baidyanath Dham Station Lane, Williams Town, Deoghar, 814112",
    status: "Out for Local Delivery",
    timestamp: "45 mins ago"
  },
  {
    id: "BJ-9023",
    name: "Sanjay Gupta",
    phone: "9988776655",
    item: "King Size Hydraulic Storage Bed",
    price: 34800,
    address: "Shop No 4, Tower Chowk Market, Deoghar, 814112",
    status: "Order Confirmed",
    timestamp: "2 hours ago"
  }
]

export default function BajrangiFurnitureDemo() {
  const [orders, setOrders] = useState(initialOrders)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [filterCategory, setFilterCategory] = useState('all')

  // Form states for new orders
  const [orderForm, setOrderForm] = useState({ name: '', phone: '', address: '' })
  const [recentNotification, setRecentNotification] = useState(null)

  // WhatsApp redirection details
  const SHOP_PHONE = "919123461616"
  const getWhatsAppLink = (message) => {
    return `https://wa.me/${SHOP_PHONE}?text=${encodeURIComponent(message)}`
  }

  // Handle Order Form Submission
  const handlePlaceOrder = (e) => {
    e.preventDefault()
    if (!selectedProduct) return

    const newOrderId = `BJ-${Math.floor(1000 + Math.random() * 9000)}`
    const newOrder = {
      id: newOrderId,
      name: orderForm.name,
      phone: orderForm.phone,
      item: selectedProduct.name,
      price: selectedProduct.price,
      address: orderForm.address,
      status: "Order Confirmed",
      timestamp: "Just Now"
    }

    // Insert order locally
    setOrders([newOrder, ...orders])

    // Trigger Notification Banner
    setRecentNotification(`Success! Order ${newOrderId} has been logged in the delivery dashboard.`)
    setTimeout(() => setRecentNotification(null), 5000)

    // Construct WhatsApp message pre-fill invoice
    const waMessage = `*NEW ORDER SUBMITTED* 🛍️\n` +
      `- Order ID: ${newOrderId}\n` +
      `- Customer Name: ${orderForm.name}\n` +
      `- Phone: ${orderForm.phone}\n` +
      `- Ordered Item: ${selectedProduct.name}\n` +
      `- Total Price: ₹${selectedProduct.price.toLocaleString('en-IN')}\n` +
      `- Delivery Address: ${orderForm.address}\n\n` +
      `Please confirm my delivery schedule and dispatch details!`

    // Redirect to WhatsApp in a new tab
    window.open(getWhatsAppLink(waMessage), '_blank')

    // Reset states
    setOrderForm({ name: '', phone: '', address: '' })
    setModalOpen(false)
    setSelectedProduct(null)
  }

  // Add dummy test order helper
  const handleAddTestOrder = () => {
    const randomProduct = productsData[Math.floor(Math.random() * productsData.length)]
    const randomNames = ["Vijay Singh", "Priya Sen", "Deepak Verma", "Karan Das", "Sunita Mishra"]
    const randomAddresses = ["VIP Road, Deoghar", "Castairs Town, Deoghar", "Bela Garden Road, Deoghar", "Jasidih Chowk, Deoghar"]
    const randomPhones = ["9835012345", "9431198765", "9934154321", "9006123456"]
    
    const randomOrderId = `BJ-${Math.floor(1000 + Math.random() * 9000)}`
    
    const mockOrder = {
      id: randomOrderId,
      name: randomNames[Math.floor(Math.random() * randomNames.length)],
      phone: randomPhones[Math.floor(Math.random() * randomPhones.length)],
      item: randomProduct.name,
      price: randomProduct.price,
      address: randomAddresses[Math.floor(Math.random() * randomAddresses.length)] + ", Jharkhand 814112",
      status: "Order Confirmed",
      timestamp: "Just Now"
    }

    setOrders([mockOrder, ...orders])
    setRecentNotification(`Mock Test Order ${randomOrderId} successfully added to tracker.`)
    setTimeout(() => setRecentNotification(null), 4000)
  }

  // Cycle order delivery status locally
  const cycleStatus = (orderId) => {
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id === orderId) {
          const nextStatus = 
            order.status === "Order Confirmed" 
              ? "Out for Local Delivery" 
              : order.status === "Out for Local Delivery" 
              ? "Delivered" 
              : "Order Confirmed"
          return { ...order, status: nextStatus }
        }
        return order
      })
    )
  }

  // Smooth scroll helper
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const filteredProducts = filterCategory === 'all' 
    ? productsData 
    : productsData.filter(p => p.category === filterCategory)

  return (
    <div className="min-h-screen bg-[#070B19] text-[#E2E8F0] font-sans antialiased selection:bg-[#F59E0B] selection:text-[#070B19] pb-16">
      
      {/* Dynamic Order Toast Notification */}
      <AnimatePresence>
        {recentNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
          >
            <div className="bg-[#1E293B] border border-cyan-500/40 text-cyan-200 px-5 py-4 rounded-xl shadow-2xl flex items-center justify-between gap-3 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <FiCheckCircle className="text-[#F59E0B] shrink-0" size={20} />
                <p className="text-xs font-semibold leading-relaxed">{recentNotification}</p>
              </div>
              <button onClick={() => setRecentNotification(null)} className="text-white/40 hover:text-white">
                <FiX size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HEADER & BRANDING */}
      <header className="sticky top-0 z-40 bg-[#0B132B]/95 backdrop-blur-md border-b border-slate-800/80 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="flex flex-col items-start focus:outline-none"
          >
            <span className="font-display text-base md:text-lg font-black tracking-wide text-white uppercase">
              Bajrangi Furniture
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#F59E0B] font-bold">
              &amp; Electronic House
            </span>
          </button>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Collection', id: 'catalog' },
              { label: 'Live Orders', id: 'tracker' },
              { label: 'Delivery Status', id: 'tracker' },
              { label: 'Contact', id: 'contact' }
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.id)}
                className="text-xs uppercase tracking-widest text-slate-350 hover:text-[#F59E0B] transition-colors font-semibold"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Header WhatsApp Inquiry button */}
          <div>
            <a
              href={getWhatsAppLink("Hello Bajrangi Furniture, I have a general inquiry about your product collection and stock availability.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#F59E0B] hover:bg-[#D97706] text-[#070B19] font-bold text-xs tracking-wider uppercase px-4 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Inquire Now
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION & VALUE PROP */}
      <section className="relative overflow-hidden pt-12 pb-20 md:py-28 bg-gradient-to-b from-[#0B132B]/50 via-transparent to-transparent border-b border-slate-800/40">
        {/* Glow ambient background grid decoration */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{
            backgroundImage: `
              linear-gradient(to right, #60A5FA 1px, transparent 1px),
              linear-gradient(to bottom, #60A5FA 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} 
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 text-[10px] md:text-xs font-semibold tracking-wider uppercase mb-6">
            <FiTruck className="text-[#F59E0B] animate-bounce" /> Fast Local Hand-Delivery in Deoghar
          </span>

          <h1 className="font-display text-4xl md:text-6xl font-black leading-tight tracking-tight text-white max-w-4xl mx-auto mb-6">
            Premium Home Decor &amp; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-amber-400 to-[#D97706] drop-shadow-[0_0_30px_rgba(245,158,11,0.15)]">
              Modern Electronic Appliances
            </span>
          </h1>

          <p className="text-slate-350 text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            Explore our curated furniture layouts and premium electronic lines online. Place your order instantly via WhatsApp and trace local delivery logs live from our digital dispatch tracker.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('catalog')}
              className="w-full sm:w-auto bg-[#F59E0B] hover:bg-[#D97706] text-[#070B19] font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group hover:scale-[1.01]"
            >
              <FiShoppingCart size={16} />
              Browse Collection
              <FiChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => scrollToSection('tracker')}
              className="w-full sm:w-auto border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-300 text-slate-300 font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-xl transition-all duration-300 bg-transparent flex items-center justify-center gap-2"
            >
              <FiPackage size={16} />
              Track Live Deliveries
            </button>
          </div>

          {/* Trust Banner Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-16 pt-12 border-t border-slate-800/60 divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
            <div className="flex flex-col items-center p-4">
              <span className="text-xl md:text-2xl font-bold text-white">100% Teakwood</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Premium Quality</span>
            </div>
            <div className="flex flex-col items-center p-4">
              <span className="text-xl md:text-2xl font-bold text-white">Zero Extra Fees</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Direct Wholesale Rates</span>
            </div>
            <div className="flex flex-col items-center p-4">
              <span className="text-xl md:text-2xl font-bold text-white">Same-Day Dispatch</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Deoghar Wide Shipping</span>
            </div>
            <div className="flex flex-col items-center p-4">
              <span className="text-xl md:text-2xl font-bold text-white">Secure Warranty</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Brand Warranted Products</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE PRODUCT CATALOG */}
      <section id="catalog" className="py-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <span className="text-[#F59E0B] font-bold text-xs tracking-wider uppercase block mb-2">Curated Showroom</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Premium Inventory</h2>
            <div className="w-12 h-[2px] bg-[#F59E0B] mt-3" />
          </div>

          {/* Filtering tabs */}
          <div className="flex bg-[#0B132B]/80 border border-slate-800/60 p-1.5 rounded-xl shrink-0 self-start md:self-end">
            {[
              { key: 'all', label: 'All Items' },
              { key: 'furniture', label: 'Furniture' },
              { key: 'electronics', label: 'Electronics' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilterCategory(tab.key)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  filterCategory === tab.key 
                    ? 'bg-[#F59E0B] text-[#070B19] font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-[#111827]/70 border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col justify-between group shadow-xl hover:border-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div>
                {/* Product Image Section */}
                <div className="relative h-52 overflow-hidden bg-slate-950">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100" 
                  />
                  {/* Category badge */}
                  <span className="absolute top-3 left-3 bg-[#0B132B]/85 border border-slate-700/60 text-slate-300 text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-md font-bold">
                    {product.category}
                  </span>
                  {/* Rating badge */}
                  <span className="absolute bottom-3 right-3 bg-[#1F293B]/90 backdrop-blur-xs text-[#F59E0B] text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    <FiStar className="fill-current" size={10} />
                    {product.rating}
                  </span>
                </div>

                {/* Details Section */}
                <div className="p-6">
                  <div className="flex flex-col gap-1 mb-4 text-left">
                    <h3 className="font-display font-semibold text-lg text-white group-hover:text-[#F59E0B] transition-colors">
                      {product.name}
                    </h3>
                    <span className="font-display font-black text-xl text-[#F59E0B] mt-1">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Specs bullet points */}
                  <ul className="space-y-2 text-left mb-4 border-t border-slate-800/50 pt-4">
                    {product.specs.map((spec, i) => (
                      <li key={i} className="flex gap-2 text-xs text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/80 mt-1.5 shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    setSelectedProduct(product)
                    setModalOpen(true)
                  }}
                  className="w-full bg-cyan-950/20 hover:bg-[#F59E0B] border border-cyan-500/25 hover:border-[#F59E0B] text-cyan-300 hover:text-[#070B19] font-bold text-xs tracking-wider uppercase py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <FiShoppingCart size={13} />
                  Quick Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SIMULATED LOCAL ORDER & DELIVERY DASHBOARD */}
      <section id="tracker" className="py-20 bg-[#0B132B]/40 border-t border-b border-slate-800/40 relative">
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] rounded-full bg-[#F59E0B]/3 blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="text-left">
              <span className="text-cyan-400 font-bold text-xs tracking-wider uppercase block mb-2">Live Shop Operations</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Local Dispatch &amp; Delivery Log</h2>
              <div className="w-12 h-[2px] bg-cyan-400 mt-3" />
              <p className="text-slate-400 text-xs md:text-sm mt-3 max-w-lg leading-relaxed">
                Demonstrates how orders seamlessly populate and cycle status during dispatch. Real-time updates for shop operator and buyer coordinates.
              </p>
            </div>

            {/* Test Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleAddTestOrder}
                className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-350 hover:text-cyan-200 text-xs font-mono font-bold tracking-wide px-4 py-3 rounded-lg cursor-pointer transition-all shrink-0"
              >
                <FiPlus size={14} className="text-[#F59E0B]" />
                Simulate New Purchase
              </button>
            </div>
          </div>

          {/* Delivery Log Table */}
          <div className="bg-[#111827]/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
            
            {/* Table Header HUD */}
            <div className="bg-[#070B19]/80 px-6 py-4 border-b border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-white/40">
              <span className="uppercase tracking-widest font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10B981]" /> 
                DISPATCH PIPELINE
              </span>
              <span>Showing {orders.length} Active Shipments</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800/80 text-[10px] font-mono text-slate-450 uppercase tracking-widest bg-slate-950/20">
                    <th className="py-4 px-6 font-bold">Order ID</th>
                    <th className="py-4 px-6 font-bold">Recipient</th>
                    <th className="py-4 px-6 font-bold">Ordered Item</th>
                    <th className="py-4 px-6 font-bold">Value</th>
                    <th className="py-4 px-6 font-bold">Local Address</th>
                    <th className="py-4 px-6 font-bold text-center">Status (Click to toggle)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 font-sans text-xs">
                  <AnimatePresence initial={false}>
                    {orders.map((order) => {
                      // Status Badge coloring config
                      const badgeColors = {
                        "Order Confirmed": "bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.1)]",
                        "Out for Local Delivery": "bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.1)]",
                        "Delivered": "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.1)]"
                      }

                      return (
                        <motion.tr 
                          key={order.id}
                          layoutId={order.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="hover:bg-slate-900/30 transition-colors"
                        >
                          {/* Order ID */}
                          <td className="py-4 px-6 font-mono font-bold text-cyan-400">
                            {order.id}
                            <span className="block text-[8px] text-slate-500 font-mono font-normal mt-0.5">{order.timestamp}</span>
                          </td>

                          {/* Recipient Details */}
                          <td className="py-4 px-6 text-white font-medium">
                            {order.name}
                            <a href={`tel:${order.phone}`} className="block text-[10px] text-slate-450 mt-0.5 hover:text-[#F59E0B] transition-colors">{order.phone}</a>
                          </td>

                          {/* Ordered Item */}
                          <td className="py-4 px-6 text-slate-300">
                            {order.item}
                          </td>

                          {/* Price Value */}
                          <td className="py-4 px-6 font-semibold text-[#F59E0B] font-mono">
                            ₹{order.price.toLocaleString('en-IN')}
                          </td>

                          {/* Destination Address */}
                          <td className="py-4 px-6 text-slate-400 max-w-xs truncate" title={order.address}>
                            {order.address}
                          </td>

                          {/* Status Badge Toggle */}
                          <td className="py-4 px-6 text-center">
                            <button
                              onClick={() => cycleStatus(order.id)}
                              className={`px-3 py-1.5 rounded-full border text-[10px] font-semibold tracking-wider uppercase cursor-pointer transition-all duration-300 hover:scale-[1.02] ${badgeColors[order.status]}`}
                            >
                              {order.status}
                            </button>
                          </td>
                        </motion.tr>
                      )
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Empty check */}
            {orders.length === 0 && (
              <div className="py-12 text-center text-slate-500 font-mono text-xs">
                No active dispatch records. Click "Simulate New Purchase" to seed entries.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. CONTACT & FOOTER */}
      <section id="contact" className="py-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Info Block */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-[#F59E0B] font-bold text-xs tracking-wider uppercase block">Contact Showroom</span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-white leading-tight">
              Visit Bajrangi Showroom <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-[#F59E0B]">In Deoghar</span>
            </h2>
            <p className="text-slate-350 text-xs md:text-sm leading-relaxed">
              Step into our storefront house at Tower Chowk Road, Williams Town to explore furniture alignments and check physical electronics. Reach us directly for inquiries, customized furniture structures, or delivery status updates.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <div className="w-8 h-8 rounded bg-[#0B132B] border border-slate-800 flex items-center justify-center text-[#F59E0B]">
                  <FiMapPin size={15} />
                </div>
                <div>
                  <h4 className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Address</h4>
                  <p className="text-xs text-white/90 font-medium">Tower Chowk Road, Williams Town, Deoghar, Jharkhand 814112</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-8 h-8 rounded bg-[#0B132B] border border-slate-800 flex items-center justify-center text-[#F59E0B]">
                  <FiPhone size={15} />
                </div>
                <div>
                  <h4 className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Hotline Contact</h4>
                  <p className="text-xs text-white/90 font-medium">+91 91234 61616</p>
                </div>
              </div>
            </div>
          </div>

          {/* Direct WhatsApp Callout Block */}
          <div className="lg:col-span-7 bg-[#111827]/70 border border-slate-800/80 p-8 rounded-3xl text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] px-3.5 py-1 rounded text-[8px] uppercase font-bold tracking-wider font-mono">
              Live Chat Channel
            </div>
            <div className="w-16 h-16 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center mx-auto mb-6">
              <WhatsAppIcon className="w-7 h-7 text-[#F59E0B]" />
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2">Need a Customized Design?</h3>
            <p className="text-slate-350 text-xs md:text-sm max-w-md mx-auto mb-6 leading-relaxed">
              We construct customized sofa layouts, wooden cabinets, and custom dimensions. Send us a blueprint or layout design over WhatsApp to coordinate pricing estimates.
            </p>
            <a
              href={getWhatsAppLink("Hello Bajrangi Furniture, I am interested in coordinating custom layouts. Please guide.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs tracking-wider uppercase px-8 py-4 rounded-xl transition-all duration-300 inline-flex items-center gap-2.5 shadow-lg"
            >
              <WhatsAppIcon className="w-5 h-5 fill-current" />
              Chat on WhatsApp
            </a>
          </div>

        </div>
      </section>

      {/* FOOTER METADATA */}
      <footer className="max-w-7xl mx-auto px-4 md:px-8 pt-12 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[10px] uppercase text-white/30 tracking-widest">
          &copy; {new Date().getFullYear()} Bajrangi Furniture &amp; Electronic House. All Rights Reserved.
        </p>
        <div className="bg-[#111827] border border-slate-800 px-3.5 py-1.5 rounded-lg text-[9px] uppercase tracking-wider text-white/40 font-mono">
          Interactive Operations Dashboard Demonstration
        </div>
      </footer>

      {/* 3. QUICK ORDER MODAL */}
      <AnimatePresence>
        {modalOpen && selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setModalOpen(false)
                setSelectedProduct(null)
              }}
              className="absolute inset-0 bg-black/75 backdrop-blur-xs" 
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#111827] border border-slate-800 rounded-3xl w-full max-w-lg p-6 md:p-8 relative z-10 text-left overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
                <div>
                  <span className="text-[10px] text-[#F59E0B] uppercase font-bold tracking-widest font-mono">Order Process Initialization</span>
                  <h3 className="font-display font-semibold text-lg text-white mt-1">Quick Dispatch Details</h3>
                </div>
                <button 
                  onClick={() => {
                    setModalOpen(false)
                    setSelectedProduct(null)
                  }}
                  className="text-white/40 hover:text-white p-1 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Selected Product Summary Card */}
              <div className="flex items-center gap-4 bg-[#0B132B]/60 border border-slate-800/80 p-4 rounded-2xl mb-6 relative">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-display font-semibold text-sm text-white">{selectedProduct.name}</h4>
                  <p className="font-display font-black text-[#F59E0B] text-base mt-1">₹{selectedProduct.price.toLocaleString('en-IN')}</p>
                </div>
              </div>

              {/* Input Form */}
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                {/* Customer Name */}
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    1. Recipient Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-white/20 text-xs focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>

                {/* Recipient Phone */}
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    2. Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                    placeholder="e.g. 9876543210"
                    required
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit mobile number"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-white/20 text-xs focus:outline-none focus:border-cyan-500/50 transition-colors font-mono"
                  />
                </div>

                {/* Delivery Address */}
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    3. Local Delivery Address (Deoghar Area)
                  </label>
                  <textarea
                    name="address"
                    value={orderForm.address}
                    onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                    placeholder="Complete street details, nearby landmark, town..."
                    required
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-white/20 text-xs focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                  />
                </div>

                {/* Action Submit */}
                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setModalOpen(false)
                      setSelectedProduct(null)
                    }}
                    className="flex-1 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all cursor-pointer bg-slate-950/20 text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#F59E0B] hover:bg-[#D97706] text-[#070B19] font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(245,158,11,0.15)]"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    Place Order &amp; Invoice
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
