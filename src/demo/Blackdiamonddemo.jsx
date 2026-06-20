import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiPhone, 
  FiMapPin, 
  FiCheckCircle, 
  FiStar, 
  FiShoppingCart, 
  FiTruck, 
  FiPlus, 
  FiX, 
  FiChevronRight, 
  FiUser, 
  FiActivity, 
  FiAward
} from 'react-icons/fi'

// WhatsApp SVG Icon
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

const foodMenu = [
  {
    id: 1,
    name: "Special Chicken Biryani",
    category: "Biryani",
    price: 220,
    rating: "4.9",
    tagline: "Gomoh's Royal Treat",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    description: "Aromatic basmati rice layered with tender pieces of spiced chicken, saffron, and farm ghee. Slow dum-cooked to perfection.",
    features: ["Aromatic Basmati Rice", "Traditional Dum Cooking", "Serves 1-2 with Raita"]
  },
  {
    id: 2,
    name: "Signature Chicken Crispy",
    category: "Starters",
    price: 180,
    rating: "4.8",
    tagline: "Unmatched Crunch",
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=600&q=80",
    description: "Marinated crispy chicken strips wok-tossed in a golden tangy glaze with sesame seeds, green chillies, and bell peppers.",
    features: ["Ultimate Crunch Coating", "Tangy Hot Glaze", "Perfect Starter Plating"]
  },
  {
    id: 3,
    name: "Paneer Butter Masala",
    category: "Main Course",
    price: 160,
    rating: "4.7",
    tagline: "Rich & Creamiest",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
    description: "Fresh cubes of cottage cheese simmered in a luscious tomato-butter gravy, topped with fresh cream and aromatic herbs.",
    features: ["Velvety Butter Gravy", "Soft Local Paneer", "Pairs best with Naan"]
  },
  {
    id: 4,
    name: "Black Diamond Special Combo",
    category: "Combos",
    price: 340,
    rating: "4.9",
    tagline: "The Elite Feast",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=600&q=80",
    description: "The ultimate culinary assembly: A regular portion of Special Dum Biryani, 1 plate Chicken Crispy, and a refreshing chilled drink.",
    features: ["Biryani + Crispy + Cold Drink", "Best Value Guarantee", "Massive Dinner Pack"]
  },
  {
    id: 5,
    name: "Mutton Dum Biryani",
    category: "Biryani",
    price: 320,
    rating: "4.9",
    tagline: "Royal Mutton Dum",
    image: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=600&q=80",
    description: "Slow-cooked premium goat meat layered with saffron Basmati rice, cooked under steam pressure.",
    features: ["Tender mutton joints", "Ghee-roasted spices", "Comes with gravy & salad"]
  },
  {
    id: 6,
    name: "Kadhai Chicken",
    category: "Main Course",
    price: 240,
    rating: "4.8",
    tagline: "Chef's Special Curry",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
    description: "Juicy chicken pieces tossed with bell peppers and onions in a traditional thick iron kadhai masala gravy.",
    features: ["Rich bell pepper aroma", "Spiced to preference", "Serves 2 guests"]
  },
  {
    id: 7,
    name: "Tandoori Butter Naan",
    category: "Sides & Breads",
    price: 45,
    rating: "4.8",
    tagline: "Fresh Clay-Oven Bread",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80",
    description: "Soft, leavened flatbread brushed with premium melted butter, baked fresh in clay tandoor oven.",
    features: ["100% clay tandoor baked", "Glazed with salted butter", "Soft and chewy texture"]
  },
  {
    id: 8,
    name: "Crispy Chilli Baby Corn",
    category: "Starters",
    price: 150,
    rating: "4.7",
    tagline: "Perfect Veg Starter",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    description: "Crispy baby corn fritters tossed with fresh bell peppers, onions, and spring greens in a spicy Chinese sauce.",
    features: ["Crispy golden baby corn", "Spicy Chinese seasoning", "Perfect veg starter choice"]
  }
]

const initialOrders = [
  {
    id: "BD-7402",
    name: "Rahul Prasad",
    phone: "9835054321",
    address: "Loco Colony Road No. 3, Gomoh",
    item: "1x Special Chicken Biryani",
    type: "Home Delivery",
    status: "Kitchen Preparing",
    amount: 220,
    timestamp: "5 mins ago"
  },
  {
    id: "BD-7401",
    name: "Neha Kumari",
    phone: "9430112233",
    address: "Table No. 5, AC Lounge Section",
    item: "1x Signature Chicken Crispy",
    type: "Dine-in",
    status: "Order Received",
    amount: 180,
    timestamp: "12 mins ago"
  },
  {
    id: "BD-7399",
    name: "Suresh Mahato",
    phone: "9931448899",
    address: "Station Chowk near Post Office, Gomoh",
    item: "1x Black Diamond Special Combo",
    type: "Home Delivery",
    status: "Out for Delivery",
    amount: 340,
    timestamp: "25 mins ago"
  }
]

export default function BlackDiamondDemo() {
  const [orders, setOrders] = useState(initialOrders)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [filterCategory, setFilterCategory] = useState('All')

  // Form states
  const [inquiryForm, setInquiryForm] = useState({ 
    name: '', 
    phone: '', 
    address: '', 
    type: 'Home Delivery' 
  })
  const [recentNotification, setRecentNotification] = useState(null)

  const SHOP_PHONE = "919123461616" // Demo WhatsApp direct desk
  const getWhatsAppLink = (message) => {
    return `https://wa.me/${SHOP_PHONE}?text=${encodeURIComponent(message)}`
  }

  // Handle booking form submission
  const handlePlaceOrder = (e) => {
    e.preventDefault()
    if (!selectedProduct) return

    const newOrderId = `BD-${Math.floor(7410 + Math.random() * 590)}`
    const newOrder = {
      id: newOrderId,
      name: inquiryForm.name,
      phone: inquiryForm.phone,
      address: inquiryForm.address || (inquiryForm.type === 'Dine-in' ? 'Table Order' : 'Gomoh Town'),
      item: `1x ${selectedProduct.name}`,
      type: inquiryForm.type,
      status: "Order Received",
      amount: selectedProduct.price,
      timestamp: "Just Now"
    }

    setOrders([newOrder, ...orders])

    // Trigger toast notification
    setRecentNotification(`Order ${newOrderId} successfully placed! Sending message via WhatsApp...`)
    setTimeout(() => setRecentNotification(null), 5000)

    // Formulate WhatsApp Message
    const formattedPrice = `₹${selectedProduct.price}`

    const waMessage = `*BLACK DIAMOND RESTAURANT & HOTEL* 🍽️🏨\n` +
      `-----------------------------------------\n` +
      `*New Live Order Request*\n` +
      `- Order ID: ${newOrderId}\n` +
      `- Customer Name: ${inquiryForm.name}\n` +
      `- Contact Phone: ${inquiryForm.phone}\n` +
      `- Item Ordered: ${selectedProduct.name} (${formattedPrice})\n` +
      `- Order Type: ${inquiryForm.type}\n` +
      `- Destination Address/Table: ${inquiryForm.address}\n\n` +
      `Please accept this request and confirm prep timing immediately. Thank you!`

    window.open(getWhatsAppLink(waMessage), '_blank')

    // Reset Form & Close Modal
    setInquiryForm({ name: '', phone: '', address: '', type: 'Home Delivery' })
    setModalOpen(false)
    setSelectedProduct(null)
  }

  // Simulate Walk-in/Online request
  const handleSimulateRequest = () => {
    const foodItems = foodMenu
    const randomProduct = foodItems[Math.floor(Math.random() * foodItems.length)]
    
    const mockNames = ["Rohan Roy", "Komal Sharma", "Prakash Gupta", "Aman Singh", "Shweta Pathak"]
    const mockAddresses = [
      "Loco Colony, Gomoh",
      "Table No. 4, Ground Floor",
      "Subhash Chowk Crossing, Gomoh",
      "Station Road, Main Gate Area",
      "VIP AC Cabin 3"
    ]
    const randomPhones = ["9822334455", "9470123456", "9900998877", "9123456780", "8210345678"]
    
    const mockName = mockNames[Math.floor(Math.random() * mockNames.length)]
    const mockAddress = mockAddresses[Math.floor(Math.random() * mockAddresses.length)]
    const isDineIn = mockAddress.includes("Table") || mockAddress.includes("Cabin")

    const newOrderId = `BD-${Math.floor(7410 + Math.random() * 590)}`
    
    const mockOrder = {
      id: newOrderId,
      name: mockName,
      phone: randomPhones[Math.floor(Math.random() * randomPhones.length)],
      address: mockAddress,
      item: `1x ${randomProduct.name}`,
      type: isDineIn ? "Dine-in" : "Home Delivery",
      status: "Order Received",
      amount: randomProduct.price,
      timestamp: "Just Now"
    }

    setOrders([mockOrder, ...orders])
    setRecentNotification(`Simulated live order registered for ${mockOrder.name}!`)
    setTimeout(() => setRecentNotification(null), 4000)
  }

  // Cycle request status locally to demonstrate active updates
  const cycleStatus = (orderId) => {
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id === orderId) {
          const statusCycle = ["Order Received", "Kitchen Preparing", "Out for Delivery", "Delivered"]
          const currentIndex = statusCycle.indexOf(order.status)
          const nextIndex = (currentIndex + 1) % statusCycle.length
          return { ...order, status: statusCycle[nextIndex] }
        }
        return order
      })
    )
  }

  // Smooth scroll
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

  const uniqueCategories = ['All', 'Biryani', 'Starters', 'Main Course', 'Combos', 'Sides & Breads']
  const filteredProducts = filterCategory === 'All' 
    ? foodMenu 
    : foodMenu.filter(p => p.category === filterCategory)

  return (
    <div className="min-h-screen bg-[#FCFAF6] text-zinc-700 font-sans antialiased overflow-x-hidden selection:bg-[#D97706] selection:text-white">
      
      {/* Dynamic Warm Light Mesh Background Gradients */}
      <div className="fixed top-0 left-0 right-0 h-screen pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[50%] rounded-full bg-gradient-to-br from-amber-500/5 to-orange-700/[0.02] blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[60%] rounded-full bg-gradient-to-tr from-amber-900/[0.03] to-[#FAF9F5] blur-[130px]" />
        <div className="absolute top-[40%] left-[35%] w-[40%] h-[35%] rounded-full bg-gradient-to-br from-orange-600/[0.02] via-transparent to-transparent blur-[140px]" />
      </div>

      {/* Dynamic Toast Panel */}
      <AnimatePresence>
        {recentNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -70, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -70, scale: 0.9 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
          >
            <div className="bg-white border-2 border-[#D97706]/40 text-[#B45309] px-5 py-4 rounded-2xl shadow-[0_15px_30px_rgba(217,119,6,0.08)] flex items-center justify-between gap-4 backdrop-blur-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <FiCheckCircle className="text-[#D97706]" size={18} />
                </div>
                <p className="text-xs font-semibold leading-relaxed text-zinc-800">{recentNotification}</p>
              </div>
              <button 
                onClick={() => setRecentNotification(null)} 
                className="text-zinc-400 hover:text-zinc-650 transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HEADER & BRANDING */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-zinc-200/60 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
          
          {/* Logo Brand Signature */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="flex flex-col items-start focus:outline-none relative group"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#D97706] to-amber-500 shadow-[0_0_8px_rgba(217,119,6,0.4)] group-hover:scale-125 transition-transform" />
              <span className="font-display text-lg md:text-xl font-black tracking-wider text-zinc-900 uppercase group-hover:text-black transition-colors">
                Black Diamond
              </span>
            </div>
            <span className="text-[8px] uppercase tracking-[0.3em] text-[#D97706] font-bold mt-0.5 ml-4">
              Restaurant &amp; Hotel • Gomoh
            </span>
          </button>

          {/* Luxury Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { label: 'Menu Highlights', id: 'catalog' },
              { label: 'Quick Order', id: 'catalog' },
              { label: 'Live Order Tracker', id: 'tracker' },
              { label: 'Contact Details', id: 'contact' }
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.id)}
                className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 hover:text-[#D97706] transition-all font-black hover:translate-y-[-1px]"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Dynamic CTA */}
          <a
            href={getWhatsAppLink("Hello Black Diamond, I am visiting Gomoh and want to place a quick dinner order from your special menu.")}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white font-black text-[10px] tracking-wider uppercase px-5 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-[0_4px_15px_rgba(217,119,6,0.25)] hover:scale-[1.03] group"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>Direct Order</span>
          </a>
        </div>
      </header>

      {/* 2. HERO SECTION & VALUE PROP (Interactive Split Design) */}
      <section className="relative overflow-hidden pt-20 pb-28 lg:py-36 border-b border-zinc-200/60 z-10">
        
        {/* Ambient Ring in Background */}
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-dashed border-zinc-200 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
            
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7 text-left space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-zinc-200 text-zinc-650 text-[10px] font-black tracking-widest uppercase shadow-sm">
                <FiAward className="text-[#D97706] animate-pulse" size={12} /> GOMOH'S PREMIER DESTINATION
              </span>

              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-zinc-900">
                Taste the Elite. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-[#D97706] to-[#B45309] drop-shadow-[0_0_35px_rgba(217,119,6,0.15)]">
                  Famous Chicken Crispy &amp; Biryani!
                </span>
              </h1>

              <p className="text-zinc-600 text-sm md:text-base lg:text-lg max-w-2xl leading-relaxed">
                Welcome to Gomoh's landmark for gourmet dining and premium lodging. Skip the busy phone lines entirely—browse our digital menu, tap to place your order directly via WhatsApp, and monitor the live preparation tracker instantly.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  onClick={() => scrollToSection('catalog')}
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white font-black text-xs tracking-widest uppercase px-8 py-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-[1.02] cursor-pointer shadow-[0_4px_15px_rgba(217,119,6,0.25)]"
                >
                  <FiShoppingCart size={15} />
                  Open Gourmet Menu
                  <FiChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => scrollToSection('tracker')}
                  className="w-full sm:w-auto bg-white border border-zinc-200 hover:border-zinc-350 text-zinc-700 hover:text-black font-bold text-xs tracking-widest uppercase px-8 py-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <FiActivity size={15} className="text-[#D97706] animate-pulse" />
                  Live Prep Board
                </button>
              </div>
            </div>

            {/* Right Column: Dynamic Enlarge Overlapping Gallery Stack */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] sm:min-h-[480px] md:min-h-[580px]">
              
              {/* Outer Glow Ring */}
              <div className="absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] rounded-full border border-dashed border-zinc-200 animate-[spin_70s_linear_infinite]" />
              <div className="absolute w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[300px] md:h-[300px] rounded-full bg-gradient-to-tr from-amber-500/5 to-transparent blur-2xl" />

              {/* Main Floating Showcase Card (Chicken Crispy - LARGE SIZE) */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: [0, -12, 0], opacity: 1 }}
                transition={{
                  y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                  opacity: { duration: 1 }
                }}
                className="absolute z-20 w-[240px] h-[310px] sm:w-[300px] sm:h-[380px] md:w-[370px] md:h-[450px] bg-white border border-zinc-200 rounded-3xl p-4 shadow-[0_20px_45px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_45px_rgba(217,119,6,0.1)] cursor-pointer group transition-all"
                onClick={() => scrollToSection('catalog')}
              >
                <div className="w-full h-[72%] rounded-2xl overflow-hidden bg-zinc-100">
                  <img 
                    src="https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=500&q=80" 
                    alt="Chicken Crispy"
                    className="w-full h-full object-cover filter brightness-[0.95] group-hover:brightness-100 transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 text-left px-1">
                  <span className="text-[8px] uppercase tracking-widest text-[#D97706] font-black block mb-0.5">Signature Starter</span>
                  <h4 className="text-zinc-900 text-sm md:text-base font-black truncate">Chicken Crispy</h4>
                  <div className="flex items-center justify-between mt-2.5">
                    <span className="text-sm font-black text-[#D97706] font-mono">₹180</span>
                    <span className="text-[9px] bg-amber-50 text-[#D97706] px-2 py-0.5 rounded-lg font-black">4.8 ★</span>
                  </div>
                </div>
              </motion.div>

              {/* Overlapping Background Card (Biryani - LARGE SIZE) */}
              <motion.div
                initial={{ x: 30, y: 40, opacity: 0 }}
                animate={{ x: [30, 45, 30], y: [25, 35, 25], opacity: 0.9 }}
                transition={{
                  x: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                  y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                  opacity: { duration: 1, delay: 0.5 }
                }}
                className="absolute z-10 w-[200px] h-[260px] sm:w-[250px] sm:h-[320px] md:w-[310px] md:h-[380px] bg-white border border-zinc-200/80 rounded-3xl p-4 shadow-xl cursor-pointer group transition-all"
                onClick={() => scrollToSection('catalog')}
              >
                <div className="w-full h-[65%] rounded-2xl overflow-hidden bg-zinc-100">
                  <img 
                    src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80" 
                    alt="Chicken Biryani"
                    className="w-full h-full object-cover filter brightness-[0.85] group-hover:brightness-100 transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 text-left">
                  <span className="text-[7px] uppercase tracking-widest text-[#D97706] font-bold block mb-0.5">Special Dum</span>
                  <h4 className="text-zinc-800 text-[11px] md:text-xs font-bold truncate group-hover:text-[#D97706]">Chicken Biryani</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-bold text-zinc-550 font-mono">₹220</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Horizontal Highlights Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-24 pt-12 border-t border-zinc-200">
            {[
              { title: "Famous Chicken Crispy", desc: "Perfect crunch & glaze recipe" },
              { title: "Special Dum Biryani", desc: "Slow cooked local basmati" },
              { title: "Gomoh Hot Delivery", desc: "Served fresh to your table/home" },
              { title: "WhatsApp Checkout", desc: "Zero booking markups or logs" }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                <span className="text-xs font-black uppercase tracking-wider mb-1 text-[#D97706]">
                  {item.title}
                </span>
                <span className="text-[10px] text-zinc-550 font-mono tracking-wide">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DIGITAL FOOD CATALOG (MENU HIGHLIGHTS) */}
      <section id="catalog" className="relative z-10 py-24 max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Floating background glowing mesh */}
        <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-amber-500/[0.03] blur-[100px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="text-left">
            <span className="font-black text-xs tracking-widest uppercase block mb-3.5 text-[#D97706]">
              Curated Specialties
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight leading-none">
              Gourmet Food Catalog
            </h2>
            <div className="w-16 h-[3px] bg-gradient-to-r from-amber-500 to-[#D97706] mt-4" />
          </div>

          {/* Premium Pill Selectors */}
          <div className="flex flex-wrap gap-2 bg-white border border-zinc-200 p-1.5 rounded-2xl shadow-sm">
            {uniqueCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                  filterCategory === cat 
                    ? 'bg-[#D97706] text-white shadow-md'
                    : 'text-zinc-500 hover:text-[#D97706]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={product.id}
                className="bg-white border border-zinc-200 rounded-3xl overflow-hidden flex flex-col justify-between group shadow-md hover:border-[#D97706]/40 transition-all duration-300"
                whileHover={{
                  y: -5,
                  boxShadow: `0 15px 30px rgba(0,0,0,0.06), 0 0 20px rgba(217,119,6,0.05)`
                }}
              >
                <div>
                  {/* Image Display */}
                  <div className="relative h-56 bg-zinc-100 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.95] group-hover:brightness-100" 
                    />
                    
                    {/* Floating tags */}
                    <span className="absolute top-3.5 left-3.5 bg-white/95 border border-zinc-250 text-zinc-700 text-[8px] uppercase tracking-widest px-2.5 py-1.5 rounded-lg font-black shadow-sm">
                      {product.category}
                    </span>
                    
                    <span className="absolute bottom-3.5 right-3.5 bg-white/95 border border-zinc-250 text-zinc-800 text-[10px] font-black px-2.5 py-1.5 rounded-xl flex items-center gap-1 shadow-sm">
                      <FiStar className="fill-current text-[#D97706]" size={10} />
                      <span className="text-[#D97706]">{product.rating}</span> ★
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 text-left space-y-4">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-[#D97706] font-bold block mb-1">
                        {product.tagline}
                      </span>
                      <h3 className="font-display font-black text-base md:text-lg text-zinc-900 group-hover:text-[#D97706] transition-colors leading-tight">
                        {product.name}
                      </h3>
                      <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-xl font-black text-zinc-900 font-mono">
                          ₹{product.price}
                        </span>
                      </div>
                    </div>

                    <p className="text-zinc-650 text-xs leading-relaxed min-h-[50px]">
                      {product.description}
                    </p>

                    {/* Features list */}
                    <div className="border-t border-zinc-150 pt-4 space-y-2">
                      {product.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-[10px] text-zinc-550">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => {
                      setSelectedProduct(product)
                      setInquiryForm({ 
                        name: '', 
                        phone: '', 
                        address: '', 
                        type: 'Home Delivery' 
                      })
                      setModalOpen(true)
                    }}
                    className="w-full bg-zinc-100 hover:bg-[#D97706] border border-zinc-200 hover:border-[#D97706] text-zinc-700 hover:text-white font-black text-[10px] tracking-wider uppercase py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <FiShoppingCart size={13} />
                    Order Now
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* GOOGLE MAPS REVIEWS SECTION */}
      <section className="relative z-10 py-24 max-w-7xl mx-auto px-4 md:px-8 border-t border-zinc-200/60">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-left">
          <div>
            <span className="font-black text-xs tracking-widest uppercase block mb-3.5 text-[#D97706]">
              Verified Feedback
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight leading-none">
              What Our Guests Say
            </h2>
            <div className="w-16 h-[3px] bg-gradient-to-r from-amber-500 to-[#D97706] mt-4" />
            <p className="text-zinc-650 text-xs md:text-sm mt-5 max-w-xl leading-relaxed">
              Real reviews from visitors who ordered our famous Chicken Crispy and Biryani on Google Maps. We maintain a 4.1★ average based on community ratings.
            </p>
          </div>

          {/* Rating Summary Card */}
          <a
            href="https://www.google.com/maps/place/BLACK+DIAMOND+RESTAURANT+%26+HOTEL/@23.8054747,86.2050608,16.51z/data=!4m6!3m5!1s0x39f41f4e2cf5233b:0x238bacb0f7c4880f!8m2!3d23.8053916!4d86.2085051"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white border border-zinc-200 p-4 rounded-2xl shadow-sm hover:border-[#D97706]/40 transition-all shrink-0 hover:scale-[1.01]"
          >
            <div className="text-left">
              <span className="text-2xl font-black text-zinc-900 block font-mono">4.1 ★</span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">100+ Google Reviews</span>
            </div>
            <div className="w-[1px] h-10 bg-zinc-200" />
            <span className="text-[10px] font-black uppercase tracking-wider text-[#D97706] flex items-center gap-1.5">
              View on Maps <FiChevronRight />
            </span>
          </a>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Anand Kumar",
              avatar: "A",
              stars: 5,
              date: "2 weeks ago",
              text: "Best Chicken Biryani in the Gomoh-Baghmara area! The meat was extremely tender and spiced perfectly. The Chicken Crispy starter was delicious too. Fast WhatsApp ordering desk."
            },
            {
              name: "Riya Sen",
              avatar: "R",
              stars: 4,
              date: "1 month ago",
              text: "Paneer Butter Masala has a great rich gravy and the Tandoori Butter Naan is baked fresh and soft. Perfect place to dine in with family. Clean atmosphere and good staff behavior."
            },
            {
              name: "Vikram Singh",
              avatar: "V",
              stars: 5,
              date: "3 days ago",
              text: "Ordered a Special Combo package for delivery. Chicken Crispy was perfectly crunchy and the packaging was robust. Zero hassle order flow directly on WhatsApp, dispatcher tracking is super helpful."
            }
          ].map((review, i) => (
            <div 
              key={i}
              className="bg-white border border-zinc-200 rounded-3xl p-6 text-left shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Reviewer Meta */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-[#D97706] font-black flex items-center justify-center text-xs">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-zinc-900 leading-normal">{review.name}</h4>
                    <span className="text-[9px] text-zinc-400 font-mono">{review.date}</span>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <FiStar 
                      key={idx} 
                      className={idx < review.stars ? "fill-current" : "text-zinc-200"} 
                      size={12} 
                    />
                  ))}
                </div>

                {/* Text Content */}
                <p className="text-zinc-650 text-xs leading-relaxed break-words">
                  "{review.text}"
                </p>
              </div>

              {/* Verified review indicator footer */}
              <div className="mt-6 pt-3.5 border-t border-zinc-150 flex flex-wrap items-center justify-between gap-2 text-[8px] font-mono text-zinc-450 uppercase tracking-wider">
                <span className="truncate">Google Maps Review</span>
                <span className="text-[#D97706] font-bold shrink-0">✓ Verified Guest</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. AUTOMATED LIVE ORDER TRACKER */}
      <section id="tracker" className="relative z-10 py-24 bg-white border-t border-b border-zinc-200/60 shadow-xs">
        
        {/* Subtle orange mesh flare */}
        <div className="absolute top-[5%] left-[10%] w-[320px] h-[320px] rounded-full bg-amber-500/[0.02] blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Header & Simulator Control */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 text-left">
            <div>
              <span className="font-black text-xs tracking-widest uppercase block mb-3.5 text-[#D97706]">
                Dynamic Prep Board
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight leading-none">
                Live Kitchen Dispatcher
              </h2>
              <div className="w-16 h-[3px] bg-gradient-to-r from-amber-500 to-[#D97706] mt-4" />
              <p className="text-zinc-650 text-xs md:text-sm mt-5 max-w-xl leading-relaxed">
                Watch orders arrive in real-time. Test the interface during client demos by adding simulated orders and clicking status steps to advance preparation states.
              </p>
            </div>

            {/* Sim Button */}
            <div className="shrink-0">
              <button
                onClick={handleSimulateRequest}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white text-xs font-mono font-black tracking-widest uppercase px-6 py-4 rounded-xl cursor-pointer transition-all hover:scale-[1.01] shadow-[0_4px_15px_rgba(217,119,6,0.25)]"
              >
                <FiPlus size={15} />
                Simulate Guest Order
              </button>
            </div>
          </div>

          {/* Interactive Hanger Queue Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence initial={false}>
              {orders.map((order) => {
                
                // Timeline progress calculations
                const stages = ["Order Received", "Kitchen Preparing", "Out for Delivery", "Delivered"]
                const stageIndex = stages.indexOf(order.status)

                return (
                  <motion.div
                    key={order.id}
                    layoutId={order.id}
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="relative bg-[#FCFAF6] border border-zinc-200/80 rounded-3xl p-6 text-left shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    {/* Metal ticket hanger clip look */}
                    <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-16 h-3 bg-zinc-200 border-t border-r border-l border-zinc-300 rounded-t-lg flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 shadow-inner" />
                    </div>

                    <div className="space-y-4">
                      {/* Ticket header */}
                      <div className="flex items-center justify-between border-b border-zinc-200 pb-3 font-mono">
                        <div>
                          <span className="text-[10px] text-zinc-400 block font-bold">TICKET ID</span>
                          <span className="text-xs font-black text-[#D97706]">{order.id}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-zinc-400 block font-bold">RECEIVED</span>
                          <span className="text-[9px] text-zinc-550 font-bold">{order.timestamp}</span>
                        </div>
                      </div>

                      {/* Items Details */}
                      <div>
                        <span className="text-[9px] text-zinc-400 font-mono font-bold block uppercase tracking-wider mb-1">
                          Items &amp; Charge
                        </span>
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-zinc-900 text-sm font-black">{order.item}</h4>
                          <span className="text-xs text-zinc-650 font-mono">₹{order.amount}</span>
                        </div>
                      </div>

                      {/* Customer Details */}
                      <div className="space-y-1">
                        <span className="text-[9px] text-zinc-400 font-mono font-bold block uppercase tracking-wider">
                          Customer
                        </span>
                        <h5 className="text-xs text-zinc-800 font-bold">{order.name}</h5>
                        <p className="text-[11px] text-zinc-650 flex items-center gap-1">
                          <FiPhone size={10} className="text-[#D97706]" />
                          {order.phone}
                        </p>
                        <p className="text-[11px] text-zinc-500 font-mono truncate leading-normal" title={order.address}>
                          <FiMapPin size={10} className="inline mr-1" />
                          {order.address}
                        </p>
                      </div>

                      {/* Stepper Timeline Progress */}
                      <div className="space-y-2 pt-2 border-t border-zinc-250">
                        <div className="flex justify-between text-[8px] font-mono font-black text-zinc-400 uppercase tracking-widest">
                          <span>Prep Timeline</span>
                          <span className="text-[#D97706]">{order.status}</span>
                        </div>
                        
                        {/* Progressive Dots */}
                        <div className="flex items-center justify-between relative px-2">
                          <div className="absolute left-3 right-3 h-[2px] bg-zinc-200 z-0 top-1/2 -translate-y-1/2" />
                          
                          {/* Active Line Fill */}
                          <div 
                            className="absolute left-3 h-[2px] bg-gradient-to-r from-amber-500 to-[#D97706] z-0 top-1/2 -translate-y-1/2 transition-all duration-500" 
                            style={{ width: `${(stageIndex / 3) * 88}%` }}
                          />

                          {stages.map((stage, idx) => {
                            const isPassed = idx <= stageIndex
                            const isActive = idx === stageIndex

                            return (
                              <div key={stage} className="relative z-10">
                                <div 
                                  className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                    isActive 
                                      ? "bg-[#FCFAF6] scale-110" 
                                      : isPassed 
                                      ? "" 
                                      : "bg-[#FCFAF6] border-zinc-300"
                                  }`}
                                  style={{
                                    borderColor: (isActive || isPassed) ? '#D97706' : undefined,
                                    backgroundColor: isPassed ? '#D97706' : undefined,
                                    boxShadow: isActive ? `0 0 8px #D97706` : undefined
                                  }}
                                />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Cycle Action */}
                    <div className="mt-5 pt-3.5 border-t border-zinc-200 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-black text-zinc-450 font-mono">
                        <FiTruck size={10} className={order.status === 'Out for Delivery' ? 'animate-bounce' : ''} />
                        {order.type}
                      </span>
                      
                      <button
                        onClick={() => cycleStatus(order.id)}
                        className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border transition-all cursor-pointer"
                        style={{
                          borderColor: order.status === 'Delivered' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(217, 119, 6, 0.3)',
                          backgroundColor: order.status === 'Delivered' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(217, 119, 6, 0.05)',
                          color: order.status === 'Delivered' ? '#10B981' : '#D97706'
                        }}
                      >
                        {order.status === 'Delivered' ? 'Completed' : 'Next Step'}
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {orders.length === 0 && (
              <div className="col-span-full py-16 text-center text-zinc-400 border border-dashed border-zinc-200 rounded-3xl bg-white font-mono text-xs">
                Preparation board is currently empty. Tap "Simulate Guest Order" to create order logs.
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 5. CONTACT & LOCATION */}
      <section id="contact" className="relative z-10 py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Address coordinates details */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="font-black text-xs tracking-widest uppercase block text-[#D97706]">
              Directions &amp; Booking
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight">
              Locate Our Venue <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 to-zinc-500">In Gomoh</span>
            </h2>
            <p className="text-zinc-600 text-sm leading-relaxed">
              We are located on the main artery connecting Gomoh with Baghmara. Visit us directly for private dining, or coordinate wedding buffet quotes over WhatsApp.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-[#D97706] shrink-0 shadow-sm">
                  <FiMapPin size={16} />
                </div>
                <div>
                  <h4 className="text-[9px] text-zinc-450 uppercase font-black tracking-wider">Hotel Address</h4>
                  <p className="text-xs text-zinc-800 font-bold">Gomoh Road, Harina Bazar, Baghmara, Gomoh, Dhanbad, Jharkhand 828306</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-[#D97706] shrink-0 shadow-sm">
                  <FiPhone size={16} />
                </div>
                <div>
                  <h4 className="text-[9px] text-zinc-450 uppercase font-black tracking-wider">Highway Concierge Desk</h4>
                  <p className="text-xs text-zinc-800 font-bold">+91 91234 61616</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Chat card callout */}
          <div className="lg:col-span-7 bg-white border border-zinc-200 p-8 rounded-3xl text-center shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-zinc-50 border-b border-l border-zinc-250 text-zinc-500 px-4 py-1.5 rounded-bl-2xl text-[8px] uppercase font-black tracking-widest font-mono">
              Live Link
            </div>
            
            <div className="w-16 h-16 rounded-3xl bg-amber-50 border border-[#D97706]/10 flex items-center justify-center mx-auto mb-6">
              <WhatsAppIcon className="w-8 h-8 text-[#D97706]" />
            </div>
            
            <h3 className="text-xl md:text-3xl font-black text-zinc-900 mb-2">Want to Book Event Catering?</h3>
            <p className="text-zinc-655 text-xs md:text-sm max-w-md mx-auto mb-6 leading-relaxed">
              We arrange customized hot handi biryani delivery setups, bulk starter packs, and custom menus. Submit details via WhatsApp to receive custom pricing.
            </p>
            
            <a
              href={getWhatsAppLink("Hello Black Diamond, I would like to request custom buffet menu catering layouts and menu prices for an event.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#1fbc54] text-white font-black text-xs tracking-widest uppercase px-8 py-4 rounded-xl transition-all duration-300 inline-flex items-center gap-2.5 shadow-[0_5px_15px_rgba(37,211,102,0.25)] hover:scale-[1.01]"
            >
              <WhatsAppIcon className="w-5 h-5 fill-current" />
              WhatsApp Helpdesk
            </a>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-450 border-t border-zinc-200 font-mono text-[9px]">
        <p className="uppercase tracking-widest text-center md:text-left">
          &copy; {new Date().getFullYear()} Black Diamond Restaurant &amp; Hotel. All Rights Reserved.
        </p>
        <div className="bg-white border border-zinc-200 px-4 py-2 rounded-xl text-[9px] uppercase tracking-wider text-zinc-555">
          Client Pitch Demonstration Platform
        </div>
      </footer>

      {/* INQUIRY/ORDER MODAL */}
      <AnimatePresence>
        {modalOpen && selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setModalOpen(false)
                setSelectedProduct(null)
              }}
              className="absolute inset-0 bg-black/85 backdrop-blur-xs" 
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-white border border-zinc-200 rounded-3xl w-full max-w-lg p-6 md:p-8 relative z-10 text-left overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => {
                  setModalOpen(false)
                  setSelectedProduct(null)
                }}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-800 p-2 rounded-xl border border-zinc-205 hover:border-zinc-300 bg-zinc-50 transition-colors"
              >
                <FiX size={16} />
              </button>

              {/* Title info */}
              <div className="pb-4 border-b border-zinc-200 mb-6">
                <span className="text-[9px] uppercase font-black tracking-widest font-mono text-[#D97706]">Immediate Setup Portal</span>
                <h3 className="text-lg font-black text-zinc-900 mt-1">Configure Order Details</h3>
              </div>

              {/* Selected Product card summary */}
              <div className="flex items-center gap-4 bg-zinc-50 border border-zinc-200 p-4 rounded-2xl mb-6">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-16 h-16 rounded-xl object-cover filter brightness-95 shrink-0"
                />
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 leading-normal">{selectedProduct.name}</h4>
                  <p className="font-black text-base mt-1.5 text-[#D97706]">
                    ₹{selectedProduct.price}
                  </p>
                </div>
              </div>

              {/* Form Input fields */}
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                
                {/* Customer Name */}
                <div>
                  <label className="block text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    1. Customer Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400">
                      <FiUser size={13} />
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      placeholder="e.g. Rahul Prasad"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-800 placeholder-zinc-400 text-xs focus:outline-none focus:border-[#D97706] transition-colors font-sans"
                    />
                  </div>
                </div>

                {/* Customer Phone */}
                <div>
                  <label className="block text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    2. WhatsApp Number (10 digits)
                  </label>
                  <div className="relative font-mono">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-500 text-xs">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                      placeholder="9876543210"
                      required
                      pattern="[0-9]{10}"
                      title="Please enter a valid 10-digit mobile number"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-800 placeholder-zinc-400 text-xs focus:outline-none focus:border-[#D97706] transition-colors"
                    />
                  </div>
                </div>

                {/* Delivery Mode Choice */}
                <div>
                  <label className="block text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    3. Service Mode
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: 'Home Delivery', label: 'Home Delivery' },
                      { key: 'Dine-in', label: 'Dine-in Order' }
                    ].map((mode) => (
                      <button
                        key={mode.key}
                        type="button"
                        onClick={() => setInquiryForm({ ...inquiryForm, type: mode.key })}
                        className={`py-3.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all text-center cursor-pointer ${
                          inquiryForm.type === mode.key
                            ? 'border-[#D97706] bg-amber-50/50 text-[#D97706]'
                            : 'border-zinc-200 bg-zinc-50 text-zinc-500 hover:text-zinc-800'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Address Input */}
                <div>
                  <label className="block text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    {inquiryForm.type === 'Dine-in' 
                      ? "4. Dine-in details (Table Number / Special spice instructions)" 
                      : "4. Full Delivery Address in Gomoh Area"}
                  </label>
                  <textarea
                    name="address"
                    value={inquiryForm.address}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, address: e.target.value })}
                    placeholder={
                      inquiryForm.type === 'Dine-in'
                        ? "e.g. Table No. 4, serve food mid-spicy."
                        : "e.g. Near Kalyan Mandap, Loco Colony, Gomoh"
                    }
                    required
                    rows={2.5}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-800 placeholder-zinc-400 text-xs focus:outline-none focus:border-[#D97706] transition-colors resize-none font-sans"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setModalOpen(false)
                      setSelectedProduct(null)
                    }}
                    className="flex-1 border border-zinc-200 hover:border-zinc-300 text-zinc-550 hover:text-zinc-800 font-bold text-xs uppercase tracking-wider py-4 rounded-xl transition-all cursor-pointer bg-zinc-50 text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-amber-500 to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white font-black text-xs uppercase tracking-wider py-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_15px_rgba(217,119,6,0.25)]"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    Place Order
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
