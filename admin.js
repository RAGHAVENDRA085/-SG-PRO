// ========== ADMIN CONFIG ==========
const ADMIN_CODE = "1234";
const RESTAURANT_LAT = 17.4437;
const RESTAURANT_LNG = 78.3772;
const ADMIN_SESSION_KEY = "spice_garden_admin_session";
const TOTAL_TABLES = 12;

// WhatsApp default country code
const ADMIN_WHATSAPP_COUNTRY_CODE = "91";

// ========== FALLBACK MENU DATA ==========
// This makes admin.js work even if script.js is not loaded.
(function setupAdminMenuData() {
    const chefs = [
        { id: 1, name: "Chef Raghavendra", title: "Executive Head Chef", specialty: "North Indian & Mughlai", emoji: "👨‍🍳", experience: "20+ years", bio: "Master of authentic Mughlai cuisine with expertise in royal biryanis and rich curries." },
        { id: 2, name: "Chef Priya Sharma", title: "Senior Sous Chef", specialty: "South Indian & Vegetarian", emoji: "👩‍🍳", experience: "15 years", bio: "Specialist in South Indian delicacies and innovative vegetarian dishes." },
        { id: 3, name: "Chef Arjun Reddy", title: "Tandoor & Fast Food Master", specialty: "Grills, Wraps & Fast Food", emoji: "👨‍🍳", experience: "12 years", bio: "Expert in tandoor cooking techniques, wraps, and fast food." },
        { id: 4, name: "Chef Meera Patel", title: "Pastry & Desserts Chef", specialty: "Desserts & Beverages", emoji: "👩‍🍳", experience: "10 years", bio: "Creative genius behind our ice creams, kulfi, and refreshing beverages." },
        { id: 5, name: "Chef Vikram Singh", title: "Seafood Specialist", specialty: "Coastal & Seafood", emoji: "👨‍🍳", experience: "14 years", bio: "Master of coastal cuisine specializing in fish and prawn preparations." }
    ];

    const items = [
        { id: 1, name: "Veg Biryani", price: 180, category: "veg", emoji: "🍚", chefId: 2, isSpecial: true, dietary: "jain", spice: "medium" },
        { id: 2, name: "Paneer Butter Masala", price: 200, category: "veg", emoji: "🧀", chefId: 2, dietary: "gluten-free", spice: "mild" },
        { id: 3, name: "Mixed Vegetable Curry", price: 170, category: "veg", emoji: "🥘", chefId: 2, dietary: "vegan", spice: "mild" },
        { id: 4, name: "Malai Kofta", price: 220, category: "veg", emoji: "🍛", chefId: 2, isSpecial: true, dietary: "nut-free", spice: "medium" },
        { id: 5, name: "Chole Bhature", price: 160, category: "veg", emoji: "🫓", chefId: 2, dietary: "low-calorie", spice: "medium" },
        { id: 6, name: "Aloo Gobi", price: 150, category: "veg", emoji: "🥔", chefId: 2, dietary: "vegan", spice: "mild" },
        { id: 7, name: "Dal Makhani", price: 180, category: "veg", emoji: "🍲", chefId: 2, dietary: "gluten-free", spice: "medium" },
        { id: 8, name: "Navratan Korma", price: 230, category: "veg", emoji: "🥗", chefId: 2, dietary: "jain", spice: "mild" },
        { id: 9, name: "Veg Manchurian", price: 190, category: "veg", emoji: "🥟", chefId: 2, dietary: "nut-free", spice: "hot" },
        { id: 10, name: "Mushroom Do Pyaza", price: 210, category: "veg", emoji: "🍄", chefId: 2, dietary: "low-calorie", spice: "medium" },

        { id: 11, name: "Chicken Biryani", price: 250, category: "nonveg", emoji: "🍗", chefId: 1, isSpecial: true, dietary: "low-calorie", spice: "hot" },
        { id: 12, name: "Mutton Rogan Josh", price: 320, category: "nonveg", emoji: "🍖", chefId: 1, dietary: "nut-free", spice: "hot" },
        { id: 13, name: "Butter Chicken", price: 280, category: "nonveg", emoji: "🍛", chefId: 1, isSpecial: true, dietary: "gluten-free", spice: "medium" },
        { id: 14, name: "Fish Fry", price: 260, category: "nonveg", emoji: "🐟", chefId: 5, dietary: "gluten-free", spice: "medium" },
        { id: 15, name: "Prawn Curry", price: 300, category: "nonveg", emoji: "🦐", chefId: 5, dietary: "low-calorie", spice: "hot" },
        { id: 16, name: "Egg Masala", price: 180, category: "nonveg", emoji: "🥚", chefId: 3, dietary: "nut-free", spice: "medium" },
        { id: 17, name: "Chicken 65", price: 240, category: "nonveg", emoji: "🍗", chefId: 3, dietary: "gluten-free", spice: "hot" },
        { id: 18, name: "Mutton Korma", price: 330, category: "nonveg", emoji: "🍖", chefId: 1, dietary: "nut-free", spice: "medium" },
        { id: 19, name: "Grilled Fish", price: 290, category: "nonveg", emoji: "🐠", chefId: 5, dietary: "low-calorie", spice: "mild" },
        { id: 20, name: "Pepper Chicken", price: 260, category: "nonveg", emoji: "🍗", chefId: 3, dietary: "gluten-free", spice: "hot" },

        { id: 21, name: "Chocolate Ice Cream", price: 120, category: "icecream", emoji: "🍫", chefId: 4, dietary: "nut-free", spice: "mild" },
        { id: 22, name: "Vanilla Ice Cream", price: 110, category: "icecream", emoji: "🍦", chefId: 4, dietary: "nut-free", spice: "mild" },
        { id: 23, name: "Butterscotch Sundae", price: 160, category: "icecream", emoji: "🍨", chefId: 4, dietary: "nut-free", spice: "mild" },
        { id: 24, name: "Mango Kulfi", price: 140, category: "icecream", emoji: "🥭", chefId: 4, isSpecial: true, dietary: "nut-free", spice: "mild" },
        { id: 25, name: "Strawberry Delight", price: 150, category: "icecream", emoji: "🍓", chefId: 4, dietary: "low-calorie", spice: "mild" },
        { id: 26, name: "Pista Kulfi", price: 145, category: "icecream", emoji: "🟢", chefId: 4, dietary: "nut-free", spice: "mild" },
        { id: 27, name: "Brownie Ice Cream", price: 170, category: "icecream", emoji: "🍫", chefId: 4, dietary: "nut-free", spice: "mild" },
        { id: 28, name: "Cold Coffee Float", price: 150, category: "icecream", emoji: "☕", chefId: 4, dietary: "low-calorie", spice: "mild" },

        { id: 29, name: "Mango Shake", price: 130, category: "juice", emoji: "🥭", chefId: 4, dietary: "vegan", spice: "mild" },
        { id: 30, name: "Orange Juice", price: 110, category: "juice", emoji: "🍊", chefId: 4, dietary: "vegan", spice: "mild" },
        { id: 31, name: "Mixed Fruit Juice", price: 120, category: "juice", emoji: "🍹", chefId: 4, dietary: "vegan", spice: "mild" },
        { id: 32, name: "Lemon Mint Cooler", price: 100, category: "juice", emoji: "🍋", chefId: 4, dietary: "vegan", spice: "mild" },
        { id: 33, name: "Watermelon Juice", price: 115, category: "juice", emoji: "🍉", chefId: 4, dietary: "vegan", spice: "mild" },
        { id: 34, name: "Pineapple Punch", price: 125, category: "juice", emoji: "🍍", chefId: 4, dietary: "vegan", spice: "mild" },
        { id: 35, name: "Strawberry Lemonade", price: 130, category: "juice", emoji: "🍓", chefId: 4, dietary: "vegan", spice: "mild" },
        { id: 36, name: "Apple Ginger Cooler", price: 135, category: "juice", emoji: "🍎", chefId: 4, dietary: "vegan", spice: "mild" },

        { id: 37, name: "Classic Margherita Pizza", price: 250, category: "pizza", emoji: "🍕", chefId: 3, dietary: "gluten-free", spice: "mild" },
        { id: 38, name: "Farmhouse Special Pizza", price: 290, category: "pizza", emoji: "🍕", chefId: 3, isSpecial: true, dietary: "gluten-free", spice: "medium" },
        { id: 39, name: "Pepperoni Feast Pizza", price: 320, category: "pizza", emoji: "🍕", chefId: 3, dietary: "gluten-free", spice: "hot" },
        { id: 40, name: "BBQ Chicken Pizza", price: 340, category: "pizza", emoji: "🍕", chefId: 3, dietary: "gluten-free", spice: "hot" },

        { id: 41, name: "Classic Veg Burger", price: 120, category: "burger", emoji: "🍔", chefId: 2, dietary: "nut-free", spice: "mild" },
        { id: 42, name: "Spicy Paneer Tikka Burger", price: 150, category: "burger", emoji: "🍔", chefId: 2, isSpecial: true, dietary: "nut-free", spice: "hot" },
        { id: 43, name: "Crispy Chicken Burger", price: 160, category: "burger", emoji: "🍔", chefId: 1, dietary: "nut-free", spice: "hot" },
        { id: 44, name: "Double Patty Chicken Burger", price: 220, category: "burger", emoji: "🍔", chefId: 1, dietary: "nut-free", spice: "hot" },

        { id: 45, name: "Grilled Cheese Sandwich", price: 130, category: "sandwich", emoji: "🥪", chefId: 2, dietary: "low-calorie", spice: "mild" },
        { id: 46, name: "Veg Club Sandwich", price: 160, category: "sandwich", emoji: "🥪", chefId: 2, dietary: "low-calorie", spice: "mild" },
        { id: 47, name: "Chicken Mayo Sandwich", price: 180, category: "sandwich", emoji: "🥪", chefId: 1, dietary: "low-calorie", spice: "medium" },

        { id: 48, name: "Classic Veg Kathi Roll", price: 140, category: "roll", emoji: "🌯", chefId: 3, dietary: "jain", spice: "mild" },
        { id: 49, name: "Paneer Tikka Kathi Roll", price: 170, category: "roll", emoji: "🌯", chefId: 2, isSpecial: true, dietary: "jain", spice: "medium" },
        { id: 50, name: "Chicken Tikka Kathi Roll", price: 190, category: "roll", emoji: "🌯", chefId: 1, dietary: "jain", spice: "hot" },
        { id: 51, name: "Spicy Egg Roll", price: 150, category: "roll", emoji: "🌯", chefId: 3, dietary: "jain", spice: "hot" }
    ];

    if (typeof masterChefs !== "undefined") {
        window.masterChefs = masterChefs;
    } else {
        window.masterChefs = chefs;
    }

    if (typeof menuItems !== "undefined") {
        window.menuItems = menuItems;
    } else {
        window.menuItems = items;
    }
})();

// ========== TABLE PRICING ==========
const DEFAULT_TABLE_PRICING = [
    { id: 1, min: 1000, max: 2000, tier: "Standard" },
    { id: 2, min: 1000, max: 2000, tier: "Standard" },
    { id: 3, min: 1000, max: 2000, tier: "Standard" },
    { id: 4, min: 1000, max: 2000, tier: "Standard" },
    { id: 5, min: 1500, max: 3000, tier: "Premium" },
    { id: 6, min: 1500, max: 3000, tier: "Premium" },
    { id: 7, min: 1500, max: 3000, tier: "Premium" },
    { id: 8, min: 1500, max: 3000, tier: "Premium" },
    { id: 9, min: 2500, max: 4000, tier: "Luxury" },
    { id: 10, min: 2500, max: 4000, tier: "Luxury" },
    { id: 11, min: 3500, max: 5000, tier: "Royal" },
    { id: 12, min: 5000, max: 5000, tier: "VIP" }
];

const savedTablePricing = JSON.parse(localStorage.getItem("tablePricing")) || [];

let tablePricing = DEFAULT_TABLE_PRICING.map(defaultTable => {
    const saved = savedTablePricing.find(t => t.id === defaultTable.id);
    return saved ? { ...defaultTable, ...saved } : { ...defaultTable };
});

function saveTablePricing() {
    localStorage.setItem("tablePricing", JSON.stringify(tablePricing));
}

function getTableDetails(tableNumber) {
    return tablePricing.find(t => t.id === tableNumber) || {
        min: 1000,
        max: 2000,
        tier: "Standard"
    };
}

// ========== DATA ==========
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
let deliveryMap = null;

let customMenuItems = JSON.parse(localStorage.getItem("customMenuItems")) || [];
let menuOverrides = JSON.parse(localStorage.getItem("menuOverrides")) || JSON.parse(localStorage.getItem("masterMenuOverrides")) || {};
let deletedMasterItems = JSON.parse(localStorage.getItem("deletedMasterItems")) || [];

// ========== DATE HELPERS ==========
function getDateFromId(id) {
    const d = new Date(id);
    return isNaN(d) ? null : d.toISOString().split("T")[0];
}

function getMonthFromId(id) {
    const d = new Date(id);
    return isNaN(d) ? null : d.toISOString().slice(0, 7);
}

// ========== WHATSAPP HELPERS ==========
function normalizeWhatsAppPhone(phone) {
    let digits = String(phone || "").replace(/[^0-9]/g, "");

    if (!digits) return "";

    digits = digits.replace(/^0+/, "");

    if (digits.length === 10) {
        return ADMIN_WHATSAPP_COUNTRY_CODE + digits;
    }

    if (digits.length >= 10 && digits.length <= 15) {
        return digits;
    }

    return "";
}

function openWhatsAppMessage(phone, message) {
    const whatsappNumber = normalizeWhatsAppPhone(phone);

    if (!whatsappNumber) {
        showToast("❌ Invalid customer mobile number for WhatsApp", "error");
        return false;
    }

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    const win = window.open(url, "_blank");

    if (!win) {
        showToast("⚠️ Popup blocked. Please allow popups to open WhatsApp.", "error");
        return false;
    }

    showToast("Opening WhatsApp customer update...", "success");
    return true;
}

function sendWhatsAppOrderStatusUpdate(order, status) {
    if (!order || !order.phone) {
        showToast("❌ No customer phone number found", "error");
        return false;
    }

    const shortId = String(order.id || "").slice(-6);

    const itemsText = (order.items || [])
        .map(item => `${item.emoji || "🍽️"} ${item.name} x ${item.qty} = ₹${item.price * item.qty}`)
        .join("\n") || "No items";

    let paymentText = order.paymentStatus || order.payment || "Pending";

    if (order.payment === "upi") {
        paymentText = `UPI (${order.paymentStatus || "Pending"})`;
    } else if (order.payment === "card") {
        paymentText = "Credit/Debit Card";
    } else if (order.payment === "cod") {
        paymentText = "Cash on Delivery";
    }

    let statusMessage = `Your order status is now: ${status}.`;

    if (status === "Placed") {
        statusMessage = "Your order has been placed successfully. ✅";
    } else if (status === "Preparing") {
        statusMessage = "Your order is being prepared by our chefs. 👨‍🍳";
    } else if (status === "Ready") {
        statusMessage = "Your order is ready! 🎉";
    } else if (status === "Delivered") {
        statusMessage = "Your order has been delivered. Enjoy your meal! 😋";
    } else if (status === "Cancelled") {
        statusMessage = `Your order has been cancelled. ❌${order.cancellationReason ? "\nReason: " + order.cancellationReason : ""}`;
    }

    const message =
`🍽️ *SPICE GARDEN ORDER UPDATE*

Hello ${order.name || "Customer"},

Your order has been updated.

🧾 Order ID: #${shortId}
📦 Status: ${status}
💳 Payment: ${paymentText}

${statusMessage}

*Order Items:*
${itemsText}

💰 Subtotal: ₹${order.subtotal || 0}
🎁 Discount: -₹${order.discount || 0}
🎁 Loyalty Discount: -₹${order.loyaltyDiscount || 0}
🧾 GST: ₹${order.gst || 0}
🚚 Delivery: ₹${order.delivery || 0}

✅ Total: ₹${order.total || 0}

📍 Delivery Address:
${order.address || "N/A"}

Thank you for choosing Spice Garden! 🍛`;

    return openWhatsAppMessage(order.phone, message);
}

function sendWhatsAppBookingStatusUpdate(booking, status) {
    if (!booking || !booking.phone) {
        showToast("❌ No customer phone number found", "error");
        return false;
    }

    const shortId = String(booking.id || "").slice(-6);

    let statusMessage = "Your reservation status has been updated.";

    if (status === "Approved") {
        statusMessage = "Your table reservation is confirmed. ✅";
    } else if (status === "Rejected") {
        statusMessage = `Sorry, your reservation request was rejected. ❌${booking.admin_remarks ? "\nReason: " + booking.admin_remarks : ""}`;
    } else if (status === "Cancelled") {
        statusMessage = `Your table reservation has been cancelled. ❌${booking.cancellationReason ? "\nReason: " + booking.cancellationReason : ""}`;
    } else if (status === "Pending") {
        statusMessage = "Your reservation request is pending. ⏳";
    }

    let tableInfo = "";

    if (booking.tableNumber) {
        const details = getTableDetails(booking.tableNumber);
        tableInfo = `
🪑 Table Type: ${details.tier || "Standard"}
💰 Billing Limit: ₹${details.min} - ₹${details.max}`;
    }

    const message =
`🍽️ *SPICE GARDEN RESERVATION UPDATE*

Hello ${booking.name || "Customer"},

Your table reservation has been updated.

🧾 Booking ID: #${shortId}
🪑 Table Number: #${booking.tableNumber || "N/A"}
📅 Date: ${booking.date || "N/A"}
⏰ Time: ${booking.time || "N/A"}
👥 Guests: ${booking.guests || "N/A"}
📦 Status: ${status}

${statusMessage}
${tableInfo}

Thank you for choosing Spice Garden! 🍛`;

    return openWhatsAppMessage(booking.phone, message);
}

function sendWhatsAppOrderManual(id) {
    const order = orders.find(o => o.id === id);

    if (!order) {
        showToast("Order not found", "error");
        return;
    }

    sendWhatsAppOrderStatusUpdate(order, order.status || "Placed");
}

function sendWhatsAppBookingManual(id) {
    const booking = bookings.find(b => b.id === id);

    if (!booking) {
        showToast("Booking not found", "error");
        return;
    }

    sendWhatsAppBookingStatusUpdate(booking, booking.status || "Pending");
}

// ========== BACKGROUND ANIMATION ==========
function initParticleNetwork() {
    const canvas = document.getElementById("particleCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", () => {
        resizeCanvas();
        initParticles();
    });

    resizeCanvas();

    window.addEventListener("mousemove", e => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener("mouseout", () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.hue = Math.random() * 45 + 315;
            this.color = `hsla(${this.hue}, 100%, 70%, 0.8)`;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x > canvas.width || this.x < 0) this.vx = -this.vx;
            if (this.y > canvas.height || this.y < 0) this.vy = -this.vy;

            if (mouse.x != null && mouse.y != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;

                if (force < 0) force = 0;

                this.x -= forceDirectionX * force * 1.5;
                this.y -= forceDirectionY * force * 1.5;
            }
        }
    }

    function initParticles() {
        particles = [];
        const numberOfParticles = Math.min((canvas.width * canvas.height) / 15000, 150);

        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    let opacity = 1 - distance / 120;
                    ctx.strokeStyle = `rgba(255, 79, 163, ${opacity * 0.4})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].draw();
            particles[i].update();
        }

        connectParticles();
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
}

// ========== TOAST & MODAL ==========
function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerText = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(100%)";
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

function showModal(title, message, onConfirm) {
    const container = document.getElementById("modal-container");
    const modal = document.createElement("div");
    modal.className = "modal";

    modal.innerHTML = `
        <div class="modal-content">
            <h3>${title}</h3>
            <p>${message}</p>
            <div class="modal-buttons">
                <button type="button" class="modal-cancel-btn">Cancel</button>
                <button type="button" class="modal-confirm-btn">Confirm</button>
            </div>
        </div>
    `;

    container.appendChild(modal);

    modal.querySelector(".modal-cancel-btn").addEventListener("click", () => {
        modal.remove();
    });

    modal.querySelector(".modal-confirm-btn").addEventListener("click", () => {
        modal.remove();
        if (typeof window[onConfirm] === "function") window[onConfirm]();
    });
}

// ========== ADMIN LOGIN ==========
function checkAdminSession() {
    const session = localStorage.getItem(ADMIN_SESSION_KEY);

    if (session === "active") {
        showDashboard();
    } else {
        document.getElementById("adminLoginGate").style.display = "flex";
        document.getElementById("adminDashboard").style.display = "none";
    }
}

function adminLogin() {
    const codeInput = document.getElementById("adminCodeInput");
    if (!codeInput) return;

    const code = codeInput.value.trim();

    if (code === ADMIN_CODE) {
        localStorage.setItem(ADMIN_SESSION_KEY, "active");
        showToast("Welcome, Admin! 🔓", "success");
        showDashboard();
    } else {
        showToast("❌ Wrong admin code!", "error");
        codeInput.value = "";
        codeInput.focus();
    }
}

function adminLogout() {
    showModal("Logout", "Are you sure you want to logout?", "confirmLogout");
}

function confirmLogout() {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    showToast("Logged out successfully.", "info");
    setTimeout(() => location.reload(), 500);
}

function showDashboard() {
    document.getElementById("adminLoginGate").style.display = "none";
    document.getElementById("adminDashboard").style.display = "block";
    refreshDashboard();
}

// ========== REFRESH ==========
function refreshDashboard() {
    orders = JSON.parse(localStorage.getItem("orders")) || [];
    bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    customMenuItems = JSON.parse(localStorage.getItem("customMenuItems")) || [];
    menuOverrides = JSON.parse(localStorage.getItem("menuOverrides")) || JSON.parse(localStorage.getItem("masterMenuOverrides")) || {};
    deletedMasterItems = JSON.parse(localStorage.getItem("deletedMasterItems")) || [];

    loadStats();
    renderSalesChart();
    renderPeakHoursChart();
    renderBestSellers();
    renderOrdersTable();
    renderBookingsTable();
    renderAdminSeatingChart();
    renderMenuManagement();
    renderTablePricingAdmin();
    renderRatingsSummary();
    renderReviewsList();

    if (document.getElementById("qrCodesGrid")) {
        generateTableQRCodes();
    }

    setTimeout(() => initDeliveryMap(), 100);

    showToast("Dashboard refreshed! 🔄", "success");
}

// ========== STATS ==========
function loadStats() {
    const today = new Date().toISOString().split("T")[0];
    const thisMonth = new Date().toISOString().slice(0, 7);

    const todayOrders = orders.filter(o => getDateFromId(o.id) === today);
    const monthOrders = orders.filter(o => getMonthFromId(o.id) === thisMonth);

    document.getElementById("todaySales").innerText = "₹" + todayOrders.reduce((sum, o) => sum + (o.total || 0), 0).toLocaleString("en-IN");
    document.getElementById("monthSales").innerText = "₹" + monthOrders.reduce((sum, o) => sum + (o.total || 0), 0).toLocaleString("en-IN");
    document.getElementById("totalOrders").innerText = orders.length;
    document.getElementById("totalBookings").innerText = bookings.length;
    document.getElementById("ordersCount").innerText = `${orders.length} orders`;
    document.getElementById("bookingsCount").innerText = `${bookings.length} bookings`;
    document.getElementById("mapOrderCount").innerText = `${orders.filter(o => o.lat && o.lng).length} orders with location`;
}

// ========== SEATING CHART ==========
function renderAdminSeatingChart() {
    const grid = document.getElementById("adminTablesGrid");
    if (!grid) return;

    const today = new Date().toISOString().split("T")[0];

    const todayBookings = bookings.filter(b =>
        b.date === today &&
        b.status !== "Rejected" &&
        b.status !== "Cancelled"
    );

    const tableStatus = {};

    for (let i = 1; i <= TOTAL_TABLES; i++) {
        tableStatus[i] = {
            status: "available",
            booking: null
        };
    }

    todayBookings.forEach(b => {
        if (b.tableNumber && tableStatus[b.tableNumber]) {
            tableStatus[b.tableNumber] = {
                status: "booked",
                booking: b
            };
        }
    });

    let html = "";

    for (let i = 1; i <= TOTAL_TABLES; i++) {
        const info = tableStatus[i];
        const isBooked = info.status === "booked";
        const tableDetails = getTableDetails(i);

        html += `
            <div class="table-icon ${isBooked ? "booked" : "available"}" title="Table #${i} - ${tableDetails.tier}">
                <div class="table-emoji">🪑</div>
                <div class="table-number">
                    #${i}
                    <span style="font-size:0.6rem; color:var(--accent);">(${tableDetails.tier})</span>
                </div>
                <div class="table-pricing">
                    ₹${tableDetails.min} - ₹${tableDetails.max}
                </div>
                <div class="table-status">
                    ${isBooked ? "Booked" : "Free"}
                </div>
                ${isBooked ? `<div class="table-guest">${info.booking.guests} Guests | ${info.booking.time}</div>` : ""}
            </div>
        `;
    }

    grid.innerHTML = html;
}

// ========== SALES CHART ==========
function renderSalesChart() {
    const last7Days = [];

    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);

        const dateStr = date.toISOString().split("T")[0];

        const dayOrders = orders.filter(o => getDateFromId(o.id) === dateStr);
        const total = dayOrders.reduce((sum, o) => sum + (o.total || 0), 0);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

        last7Days.push({ date: dayName, total });
    }

    const maxTotal = Math.max(...last7Days.map(d => d.total), 1);

    document.getElementById("salesChart").innerHTML = last7Days.map(d => `
        <div class="chart-bar" style="height:${(d.total / maxTotal) * 100}%;" title="${d.date}: ₹${d.total}">
            <div class="chart-bar-value">₹${d.total}</div>
            <div class="chart-bar-label">${d.date}</div>
        </div>
    `).join("");
}

// ========== PEAK HOURS ==========
function renderPeakHoursChart() {
    const hourCounts = new Array(24).fill(0);

    orders.forEach(order => {
        const d = new Date(order.id);
        if (!isNaN(d)) hourCounts[d.getHours()]++;
    });

    const operatingHours = [];

    for (let h = 11; h <= 22; h++) {
        operatingHours.push({ hour: h, count: hourCounts[h] });
    }

    const maxCount = Math.max(...operatingHours.map(h => h.count), 1);
    const chart = document.getElementById("peakHoursChart");

    if (!chart) return;

    chart.innerHTML = operatingHours.map(h => {
        const height = (h.count / maxCount) * 100;
        const label = h.hour > 12 ? `${h.hour - 12}PM` : h.hour === 12 ? "12PM" : `${h.hour}AM`;

        return `
            <div class="peak-bar" style="height:${height}%" title="${label}: ${h.count} orders">
                <div class="peak-bar-label">${label}</div>
            </div>
        `;
    }).join("");
}

// ========== BEST SELLERS ==========
function renderBestSellers() {
    const itemCounts = {};

    orders.forEach(order => {
        (order.items || []).forEach(item => {
            if (!itemCounts[item.id]) {
                itemCounts[item.id] = {
                    name: item.name,
                    emoji: item.emoji || "🍽️",
                    count: 0,
                    revenue: 0
                };
            }

            itemCounts[item.id].count += item.qty;
            itemCounts[item.id].revenue += item.qty * item.price;
        });
    });

    const sorted = Object.values(itemCounts)
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    const container = document.getElementById("bestSellersList");
    if (!container) return;

    if (sorted.length === 0) {
        container.innerHTML = `
            <p style="text-align:center; color:var(--text-secondary); padding:20px;">
                No sales data yet
            </p>
        `;
        return;
    }

    container.innerHTML = sorted.map((item, i) => `
        <div class="best-seller-item">
            <div class="best-seller-rank">${i + 1}</div>
            <div style="font-size:2rem;">${item.emoji}</div>
            <div class="best-seller-info">
                <h5>${item.name}</h5>
                <p>₹${item.revenue.toLocaleString("en-IN")} revenue</p>
            </div>
            <div class="best-seller-count">${item.count}×</div>
        </div>
    `).join("");
}

// ========== MENU MANAGEMENT ==========
function getAllMenuItems() {
    const masterMenu = Array.isArray(window.menuItems) ? window.menuItems : [];

    const masterWithOverrides = masterMenu.map(item => {
        if (deletedMasterItems.includes(item.id)) return null;

        const override = menuOverrides[item.id];
        return override ? { ...item, ...override } : item;
    }).filter(Boolean);

    return [...masterWithOverrides, ...customMenuItems];
}

function renderMenuManagement() {
    const searchTerm = (document.getElementById("menuSearchAdmin")?.value || "").toLowerCase();
    const categoryFilter = document.getElementById("menuCategoryFilter")?.value || "all";

    const allItems = getAllMenuItems();

    let filtered = allItems.filter(item => {
        const matchSearch = (item.name || "").toLowerCase().includes(searchTerm);
        const matchCategory = categoryFilter === "all" || item.category === categoryFilter;
        return matchSearch && matchCategory;
    });

    const grid = document.getElementById("menuManagementGrid");
    if (!grid) return;

    if (filtered.length === 0) {
        grid.innerHTML = `
            <p style="text-align:center; color:var(--text-secondary); padding:40px; grid-column:1/-1;">
                No items found
            </p>
        `;
        return;
    }

    grid.innerHTML = filtered.map(item => {
        const masterChefsList = Array.isArray(window.masterChefs) ? window.masterChefs : [];
        const chef = masterChefsList.find(c => c.id === item.chefId);

        const masterMenu = Array.isArray(window.menuItems) ? window.menuItems : [];
        const isCustom = !masterMenu.find(m => m.id === item.id);
        const isModified = menuOverrides[item.id] ? true : false;

        return `
            <div class="menu-manage-card ${isModified ? "modified" : ""}">
                ${isModified ? '<div class="modified-badge">✏️ Edited</div>' : ""}
                <div class="menu-manage-emoji">${item.emoji || "🍽️"}</div>
                <div class="menu-manage-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price} • ${item.category}</p>
                    <p style="font-size:0.7rem;">
                        ${isCustom ? "🎨 Custom" : "📋 Master"}
                        ${item.isSpecial ? "• ⭐ Special" : ""}
                        ${chef ? `• 👨‍🍳 ${chef.name}` : ""}
                    </p>
                </div>
                <div class="menu-manage-actions">
                    <button type="button" class="btn-edit" onclick="openEditItemModal(${item.id})">✏️ Edit</button>
                    <button type="button" class="btn-toggle" onclick="toggleSpecial(${item.id})">${item.isSpecial ? "⭐" : "☆"}</button>
                    <button type="button" class="btn-delete" onclick="deleteMenuItem(${item.id}, ${isCustom})">🗑️ Remove</button>
                </div>
            </div>
        `;
    }).join("");
}

function openEditItemModal(id) {
    const masterMenu = Array.isArray(window.menuItems) ? window.menuItems : [];
    const allItems = getAllMenuItems();
    const item = allItems.find(i => i.id === id);

    if (!item) return;

    const isCustom = !masterMenu.find(m => m.id === id);
    const masterChefsList = Array.isArray(window.masterChefs) ? window.masterChefs : [];

    const chefOptions = masterChefsList.map(c => `
        <option value="${c.id}" ${item.chefId === c.id ? "selected" : ""}>
            ${c.emoji} ${c.name}
        </option>
    `).join("");

    const dietaryValue = Array.isArray(item.dietary)
        ? item.dietary.join(", ")
        : item.dietary || "";

    const spiceValue = item.spice || item.spiceLevel || "mild";

    const container = document.getElementById("modal-container");
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "editItemModal";

    modal.innerHTML = `
        <div class="modal-content" style="max-width:550px;">
            <h3 style="color:var(--accent); margin-bottom:5px;">✏️ Edit Menu Item</h3>
            <p style="color:var(--text-secondary); font-size:0.8rem; margin-bottom:20px;">
                ${isCustom ? "🎨 Custom Item" : "📋 Master Item"} • ID: #${id}
            </p>

            <div class="edit-form-grid">
                <div class="edit-field full">
                    <label>Item Name</label>
                    <input type="text" id="editName" value="${item.name || ""}">
                </div>

                <div class="edit-field">
                    <label>Price (₹)</label>
                    <input type="number" id="editPrice" value="${item.price || 0}" min="0">
                </div>

                <div class="edit-field">
                    <label>Emoji</label>
                    <input type="text" id="editEmoji" value="${item.emoji || "🍽️"}" maxlength="4">
                </div>

                <div class="edit-field">
                    <label>Category</label>
                    <select id="editCategory">
                        <option value="veg" ${item.category === "veg" ? "selected" : ""}>🥬 Veg</option>
                        <option value="nonveg" ${item.category === "nonveg" ? "selected" : ""}>🍗 Non-Veg</option>
                        <option value="pizza" ${item.category === "pizza" ? "selected" : ""}>🍕 Pizza</option>
                        <option value="burger" ${item.category === "burger" ? "selected" : ""}>🍔 Burger</option>
                        <option value="sandwich" ${item.category === "sandwich" ? "selected" : ""}>🥪 Sandwich</option>
                        <option value="roll" ${item.category === "roll" ? "selected" : ""}>🌯 Roll</option>
                        <option value="icecream" ${item.category === "icecream" ? "selected" : ""}>🍦 Ice Cream</option>
                        <option value="juice" ${item.category === "juice" ? "selected" : ""}>🥤 Juice</option>
                    </select>
                </div>

                <div class="edit-field">
                    <label>Spice Level</label>
                    <select id="editSpice">
                        <option value="mild" ${spiceValue === "mild" ? "selected" : ""}>🟢 Mild</option>
                        <option value="medium" ${spiceValue === "medium" ? "selected" : ""}>🟡 Medium</option>
                        <option value="hot" ${spiceValue === "hot" ? "selected" : ""}>🔴 Hot</option>
                    </select>
                </div>

                <div class="edit-field">
                    <label>Chef</label>
                    <select id="editChef">
                        ${chefOptions}
                    </select>
                </div>

                <div class="edit-field">
                    <label>Calories</label>
                    <input type="number" id="editCalories" value="${item.calories || 300}" min="0">
                </div>

                <div class="edit-field full">
                    <label>Dietary Tags</label>
                    <input type="text" id="editDietary" value="${dietaryValue}" placeholder="vegan, gluten-free, nut-free">
                </div>

                <div class="edit-field full">
                    <label style="display:flex; align-items:center; gap:10px; cursor:pointer;">
                        <input type="checkbox" id="editSpecial" ${item.isSpecial ? "checked" : ""} style="width:auto; margin:0;">
                        ⭐ Mark as Chef's Special
                    </label>
                </div>
            </div>

            <div style="display:flex; gap:10px; margin-top:20px;">
                <button type="button" class="secondary-btn" style="flex:1;" onclick="document.getElementById('editItemModal').remove()">Cancel</button>
                <button type="button" style="flex:1;" onclick="saveEditedItem(${item.id}, ${isCustom})">💾 Save Changes</button>
            </div>
        </div>
    `;

    container.appendChild(modal);
}

function saveEditedItem(id, isCustom) {
    const name = document.getElementById("editName").value.trim();
    const price = parseInt(document.getElementById("editPrice").value, 10);
    const emoji = document.getElementById("editEmoji").value.trim() || "🍽️";
    const category = document.getElementById("editCategory").value;
    const spice = document.getElementById("editSpice").value;
    const chefId = parseInt(document.getElementById("editChef").value, 10) || 0;
    const calories = parseInt(document.getElementById("editCalories").value, 10) || 300;
    const dietary = document.getElementById("editDietary").value.split(",").map(s => s.trim()).filter(Boolean);
    const isSpecial = document.getElementById("editSpecial").checked;

    if (!name || !price || price <= 0) {
        showToast("Please fill name and valid price", "error");
        return;
    }

    const updatedData = {
        name,
        price,
        emoji,
        category,
        spice,
        chefId,
        calories,
        dietary,
        isSpecial
    };

    if (isCustom) {
        const idx = customMenuItems.findIndex(i => i.id === id);

        if (idx !== -1) {
            customMenuItems[idx] = {
                ...customMenuItems[idx],
                ...updatedData
            };

            localStorage.setItem("customMenuItems", JSON.stringify(customMenuItems));
        }
    } else {
        menuOverrides[id] = {
            ...menuOverrides[id],
            ...updatedData
        };

        localStorage.setItem("menuOverrides", JSON.stringify(menuOverrides));
    }

    document.getElementById("editItemModal").remove();
    showToast("✅ Menu item updated!", "success");
    renderMenuManagement();
}

function deleteMenuItem(id, isCustom) {
    if (!confirm("Delete this menu item? This will remove it from the customer menu.")) return;

    if (isCustom) {
        customMenuItems = customMenuItems.filter(i => i.id !== id);
        localStorage.setItem("customMenuItems", JSON.stringify(customMenuItems));
    } else {
        deletedMasterItems.push(id);
        localStorage.setItem("deletedMasterItems", JSON.stringify(deletedMasterItems));
    }

    showToast("🗑️ Item removed from menu", "info");
    renderMenuManagement();
}

function restoreAllDeleted() {
    if (deletedMasterItems.length === 0) {
        showToast("No deleted items to restore", "info");
        return;
    }

    if (!confirm(`Restore ${deletedMasterItems.length} deleted master items?`)) return;

    deletedMasterItems = [];
    localStorage.setItem("deletedMasterItems", JSON.stringify(deletedMasterItems));

    showToast("✅ All items restored!", "success");
    renderMenuManagement();
}

function resetAllOverrides() {
    if (!confirm("Reset ALL edited items to original? This cannot be undone.")) return;

    menuOverrides = {};
    localStorage.setItem("menuOverrides", JSON.stringify(menuOverrides));

    showToast("✅ All items reset to original!", "success");
    renderMenuManagement();
}

function toggleSpecial(id) {
    const allItems = getAllMenuItems();
    const item = allItems.find(i => i.id === id);

    if (!item) return;

    const masterMenu = Array.isArray(window.menuItems) ? window.menuItems : [];
    const isCustom = !masterMenu.find(m => m.id === id);
    const newSpecial = !item.isSpecial;

    if (isCustom) {
        const idx = customMenuItems.findIndex(i => i.id === id);

        if (idx !== -1) {
            customMenuItems[idx].isSpecial = newSpecial;
            localStorage.setItem("customMenuItems", JSON.stringify(customMenuItems));
        }
    } else {
        menuOverrides[id] = {
            ...menuOverrides[id],
            isSpecial: newSpecial
        };

        localStorage.setItem("menuOverrides", JSON.stringify(menuOverrides));
    }

    showToast(newSpecial ? "⭐ Marked as Special!" : "☆ Removed from Special", "success");
    renderMenuManagement();
}

function openAddItemModal() {
    const container = document.getElementById("modal-container");
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "addItemModal";

    const masterChefsList = Array.isArray(window.masterChefs) ? window.masterChefs : [];

    const chefOptions = masterChefsList.map(c => `
        <option value="${c.id}">${c.emoji} ${c.name}</option>
    `).join("");

    modal.innerHTML = `
        <div class="modal-content" style="max-width:550px;">
            <h3 style="color:var(--accent); margin-bottom:20px;">🍽️ Add New Menu Item</h3>

            <div class="edit-form-grid">
                <div class="edit-field full">
                    <label>Item Name *</label>
                    <input type="text" id="newItemName" placeholder="e.g., Truffle Pasta">
                </div>

                <div class="edit-field">
                    <label>Price (₹) *</label>
                    <input type="number" id="newItemPrice" placeholder="299" min="0">
                </div>

                <div class="edit-field">
                    <label>Emoji</label>
                    <input type="text" id="newItemEmoji" placeholder="🍝" maxlength="4">
                </div>

                <div class="edit-field">
                    <label>Category *</label>
                    <select id="newItemCategory">
                        <option value="veg">🥬 Veg</option>
                        <option value="nonveg">🍗 Non-Veg</option>
                        <option value="pizza">🍕 Pizza</option>
                        <option value="burger">🍔 Burger</option>
                        <option value="sandwich">🥪 Sandwich</option>
                        <option value="roll">🌯 Roll</option>
                        <option value="icecream">🍦 Ice Cream</option>
                        <option value="juice">🥤 Juice</option>
                    </select>
                </div>

                <div class="edit-field">
                    <label>Spice Level</label>
                    <select id="newItemSpice">
                        <option value="mild">🟢 Mild</option>
                        <option value="medium">🟡 Medium</option>
                        <option value="hot">🔴 Hot</option>
                    </select>
                </div>

                <div class="edit-field">
                    <label>Chef</label>
                    <select id="newItemChef">
                        ${chefOptions}
                    </select>
                </div>

                <div class="edit-field">
                    <label>Calories</label>
                    <input type="number" id="newItemCalories" value="300" min="0">
                </div>

                <div class="edit-field full">
                    <label>Dietary Tags</label>
                    <input type="text" id="newItemDietary" placeholder="vegan, gluten-free">
                </div>
            </div>

            <div style="display:flex; gap:10px; margin-top:20px;">
                <button type="button" class="secondary-btn" style="flex:1;" onclick="document.getElementById('addItemModal').remove()">Cancel</button>
                <button type="button" style="flex:1;" onclick="saveNewItem()">+ Add Item</button>
            </div>
        </div>
    `;

    container.appendChild(modal);
}

function saveNewItem() {
    const name = document.getElementById("newItemName").value.trim();
    const price = parseInt(document.getElementById("newItemPrice").value, 10);
    const emoji = document.getElementById("newItemEmoji").value.trim() || "🍽️";
    const category = document.getElementById("newItemCategory").value;
    const spice = document.getElementById("newItemSpice").value;
    const chefId = parseInt(document.getElementById("newItemChef").value, 10) || 0;
    const calories = parseInt(document.getElementById("newItemCalories").value, 10) || 300;
    const dietary = document.getElementById("newItemDietary").value.split(",").map(s => s.trim()).filter(Boolean);

    if (!name || !price || price <= 0) {
        showToast("Please fill name and valid price", "error");
        return;
    }

    const newItem = {
        id: Date.now(),
        name,
        price,
        emoji,
        category,
        spice,
        chefId,
        calories,
        dietary,
        isSpecial: false,
        isCustom: true
    };

    customMenuItems.push(newItem);
    localStorage.setItem("customMenuItems", JSON.stringify(customMenuItems));

    document.getElementById("addItemModal").remove();
    showToast("✅ New menu item added!", "success");
    renderMenuManagement();
}

function renderTablePricingAdmin() {
    const grid = document.getElementById("tablePricingGrid");
    if (!grid) return;

    grid.innerHTML = tablePricing.map(table => `
        <div class="menu-manage-card">
            <div class="menu-manage-emoji">🪑</div>
            <div class="menu-manage-info">
                <h4>Table #${table.id}</h4>
                <p>${table.tier}</p>
                <p style="color:var(--accent); font-weight:700;">
                    ₹${table.min} - ₹${table.max}
                </p>
            </div>
            <div class="menu-manage-actions">
                <button type="button" class="btn-edit" onclick="editTablePrice(${table.id})">✏️ Edit</button>
                <button type="button" class="btn-delete" onclick="resetTablePrice(${table.id})">♻️ Reset</button>
            </div>
        </div>
    `).join("");
}

function editTablePrice(id) {
    const table = tablePricing.find(t => t.id === id);
    if (!table) return;

    const container = document.getElementById("modal-container");
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "editTablePriceModal";

    modal.innerHTML = `
        <div class="modal-content" style="max-width:450px;">
            <h3 style="color:var(--accent); margin-bottom:15px;">
                💰 Edit Table #${table.id} Price
            </h3>

            <label>Table Tier</label>
            <input type="text" id="editTableTier" value="${table.tier}" placeholder="Standard / Premium / Luxury">

            <label>Minimum Billing (₹)</label>
            <input type="number" id="editTableMin" value="${table.min}" min="0">

            <label>Maximum Billing (₹)</label>
            <input type="number" id="editTableMax" value="${table.max}" min="0">

            <div style="display:flex; gap:10px; margin-top:20px;">
                <button type="button" class="secondary-btn" style="flex:1;" onclick="document.getElementById('editTablePriceModal').remove()">Cancel</button>
                <button type="button" style="flex:1;" onclick="saveTablePrice(${table.id})">💾 Save</button>
            </div>
        </div>
    `;

    container.appendChild(modal);
}

function saveTablePrice(id) {
    const tier = document.getElementById("editTableTier").value.trim();
    const min = parseInt(document.getElementById("editTableMin").value, 10);
    const max = parseInt(document.getElementById("editTableMax").value, 10);

    if (!tier || isNaN(min) || isNaN(max) || min <= 0 || max <= 0 || min > max) {
        showToast("Please enter valid table pricing details", "error");
        return;
    }

    const index = tablePricing.findIndex(t => t.id === id);
    if (index === -1) return;

    tablePricing[index] = {
        ...tablePricing[index],
        tier,
        min,
        max
    };

    saveTablePricing();

    const modal = document.getElementById("editTablePriceModal");
    if (modal) modal.remove();

    showToast(`Table #${id} price updated successfully`, "success");

    renderTablePricingAdmin();
    renderAdminSeatingChart();
}

function resetTablePrice(id) {
    if (!confirm(`Reset Table #${id} price to default?`)) return;

    const defaultTable = DEFAULT_TABLE_PRICING.find(t => t.id === id);
    const index = tablePricing.findIndex(t => t.id === id);

    if (!defaultTable || index === -1) return;

    tablePricing[index] = { ...defaultTable };

    saveTablePricing();

    showToast(`Table #${id} price reset to default`, "info");

    renderTablePricingAdmin();
    renderAdminSeatingChart();
}

function resetAllTablePrices() {
    if (!confirm("Reset ALL table prices to default?")) return;

    tablePricing = DEFAULT_TABLE_PRICING.map(table => ({ ...table }));

    saveTablePricing();

    showToast("All table prices reset to default", "info");

    renderTablePricingAdmin();
    renderAdminSeatingChart();
}

// ========== QR CODE TABLES ==========
function generateTableQRCodes() {
    const grid = document.getElementById("qrCodesGrid");
    if (!grid) return;

    const baseUrl = window.location.origin + window.location.pathname.replace("admin.html", "index.html");

    let html = "";

    for (let i = 1; i <= TOTAL_TABLES; i++) {
        const tableUrl = `${baseUrl}?table=${i}`;

        html += `
            <div class="qr-code-card">
                <div id="qr-table-${i}" style="display:flex; justify-content:center; margin-bottom:10px;"></div>
                <h4>Table #${i}</h4>
                <p style="font-size:0.7rem; word-break:break-all;">${tableUrl}</p>
                <button type="button" onclick="printQR(${i})">🖨️ Print</button>
            </div>
        `;
    }

    grid.innerHTML = html;

    setTimeout(() => {
        for (let i = 1; i <= TOTAL_TABLES; i++) {
            const tableUrl = `${baseUrl}?table=${i}`;

            if (document.getElementById(`qr-table-${i}`) && typeof QRCode !== "undefined") {
                new QRCode(document.getElementById(`qr-table-${i}`), {
                    text: tableUrl,
                    width: 128,
                    height: 128,
                    colorDark: "#ff6b35",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });
            }
        }
    }, 100);
}

function printQR(tableNum) {
    const qrElement = document.getElementById(`qr-table-${tableNum}`);
    const qrImage = qrElement?.querySelector("canvas") || qrElement?.querySelector("img");

    if (!qrImage) return;

    const printWindow = window.open("", "", "width=400,height=500");
    const imgSrc = qrImage.tagName === "CANVAS" ? qrImage.toDataURL() : qrImage.src;

    printWindow.document.write(`
        <html>
        <head><title>Table #${tableNum} QR</title></head>
        <body style="text-align:center; font-family:Arial; padding:20px;">
            <h2>🍽️ Spice Garden</h2>
            <h3>Table #${tableNum}</h3>
            <img src="${imgSrc}" style="width:250px; height:250px;">
            <p style="margin-top:15px; font-size:14px;">Scan to Order Directly!</p>
            <script>window.onload = () => { window.print(); }<\/script>
        </body>
        </html>
    `);

    printWindow.document.close();
}

// ========== DELIVERY MAP ==========
function initDeliveryMap() {
    const mapContainer = document.getElementById("deliveryMap");
    if (!mapContainer) return;

    if (typeof L === "undefined") {
        console.warn("Leaflet not loaded. Delivery map disabled.");
        return;
    }

    if (deliveryMap) {
        deliveryMap.remove();
        deliveryMap = null;
    }

    deliveryMap = L.map("deliveryMap").setView([RESTAURANT_LAT, RESTAURANT_LNG], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
        maxZoom: 19
    }).addTo(deliveryMap);

    const restaurantIcon = L.divIcon({
        html: `<div style="font-size:2.5rem; text-align:center;">🍽️</div>`,
        className: "",
        iconSize: [50, 50],
        iconAnchor: [25, 25]
    });

    L.marker([RESTAURANT_LAT, RESTAURANT_LNG], { icon: restaurantIcon })
        .addTo(deliveryMap)
        .bindPopup(`
            <div class="custom-marker-popup">
                <h3>🍽️ Spice Garden</h3>
                <p>Restaurant Location</p>
            </div>
        `);

    const ordersWithLocation = orders.filter(o => o.lat && o.lng);

    if (ordersWithLocation.length > 0) {
        const bounds = L.latLngBounds([[RESTAURANT_LAT, RESTAURANT_LNG]]);

        ordersWithLocation.forEach(order => {
            const customerIcon = L.divIcon({
                html: `<div style="font-size:1.8rem; text-align:center;">📍</div>`,
                className: "",
                iconSize: [40, 40],
                iconAnchor: [20, 20]
            });

            L.marker([order.lat, order.lng], { icon: customerIcon })
                .addTo(deliveryMap)
                .bindPopup(`
                    <div class="custom-marker-popup">
                        <h3>📦 Order #${String(order.id).slice(-6)}</h3>
                        <p><strong>Customer:</strong> ${order.name}</p>
                        <p><strong>Phone:</strong> ${order.phone}</p>
                        <p><strong>Total:</strong> ₹${order.total}</p>
                        <p><strong>Status:</strong> ${order.status}</p>
                    </div>
                `);

            bounds.extend([order.lat, order.lng]);

            L.polyline(
                [[RESTAURANT_LAT, RESTAURANT_LNG], [order.lat, order.lng]],
                {
                    color: "#d35400",
                    weight: 2,
                    dashArray: "5, 10",
                    opacity: 0.6
                }
            ).addTo(deliveryMap);
        });

        deliveryMap.fitBounds(bounds, { padding: [50, 50] });
    }

    setTimeout(() => deliveryMap.invalidateSize(), 200);
}

// ========== ORDERS TABLE ==========
function renderOrdersTable() {
    const statusFilter = document.getElementById("orderStatusFilter")?.value || "all";
    const searchTerm = (document.getElementById("orderSearchInput")?.value || "").toLowerCase();

    let filteredOrders = orders.slice().reverse();

    if (statusFilter !== "all") {
        filteredOrders = filteredOrders.filter(o => o.status === statusFilter);
    }

    if (searchTerm) {
        filteredOrders = filteredOrders.filter(o =>
            (o.name || "").toLowerCase().includes(searchTerm) ||
            String(o.phone || "").includes(searchTerm) ||
            (o.email || "").toLowerCase().includes(searchTerm)
        );
    }

    const container = document.getElementById("adminOrders");
    if (!container) return;

    if (filteredOrders.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding:40px; color:var(--text-secondary);">
                <div style="font-size:3rem; margin-bottom:10px;">📦</div>
                <p>No orders found</p>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Address</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${filteredOrders.map(o => {
                    const orderItems = (o.items || [])
                        .map(i => `${i.emoji || "🍽️"} ${i.name} x${i.qty}`)
                        .join("<br>");

                    const shortAddress = o.address ? o.address.substring(0, 50) + "..." : "N/A";

                    const mapLink = o.lat && o.lng
                        ? `<br><a href="https://www.google.com/maps?q=${o.lat},${o.lng}" target="_blank" style="color:#1976d2; font-size:0.75rem;">🗺️ View Map</a>`
                        : "";

                    const cancellationReason = o.status === "Cancelled" && o.cancellationReason
                        ? `<br><small style="color:#e74c3c; font-size:0.7rem; font-style:italic;">Reason: ${o.cancellationReason}</small>`
                        : "";

                    let actionButtons = `
                        <button type="button" style="background:linear-gradient(135deg,#25d366,#128c7e);" data-whatsapp-order="${o.id}">
                            📲 WhatsApp
                        </button>
                    `;

                    if (o.status === "Cancelled" || o.status === "Delivered") {
                        actionButtons += `
                            <span style="color:var(--text-secondary); font-size:0.8rem; font-style:italic;">
                                No status actions
                            </span>
                        `;
                    } else {
                        if (o.status !== "Preparing") {
                            actionButtons += `
                                <button type="button" class="btn-preparing" data-order-id="${o.id}" data-status="Preparing">
                                    Preparing
                                </button>
                            `;
                        }

                        if (o.status !== "Ready") {
                            actionButtons += `
                                <button type="button" class="btn-ready" data-order-id="${o.id}" data-status="Ready">
                                    Ready
                                </button>
                            `;
                        }

                        if (o.status !== "Delivered") {
                            actionButtons += `
                                <button type="button" class="btn-delivered" data-order-id="${o.id}" data-status="Delivered">
                                    Delivered
                                </button>
                            `;
                        }
                    }

                    return `
                        <tr>
                            <td>
                                <strong>#${String(o.id).slice(-6)}</strong><br>
                                <small style="color:var(--text-secondary);">
                                    ${new Date(o.id).toLocaleDateString()}
                                </small>
                            </td>
                            <td>
                                <strong>${o.name}</strong><br>
                                <small>📞 ${o.phone}</small><br>
                                <small>📧 ${o.email || "N/A"}</small>
                            </td>
                            <td style="max-width:180px; font-size:0.8rem;">
                                ${orderItems}
                            </td>
                            <td style="max-width:200px; font-size:0.8rem;">
                                ${shortAddress}
                                ${mapLink}
                            </td>
                            <td>
                                <strong style="color:var(--accent);">₹${o.total}</strong>
                            </td>
                            <td>
                                <span class="status-badge status-${o.paymentStatus || "PaymentPending"}">
                                    ${o.paymentStatus || "Pending"}
                                </span>
                            </td>
                            <td>
                                <span class="status-badge status-${o.status}">${o.status}</span>
                                ${cancellationReason}
                            </td>
                            <td>
                                <div class="table-actions">
                                    ${actionButtons}
                                </div>
                            </td>
                        </tr>
                    `;
                }).join("")}
            </tbody>
        </table>
    `;

    container.querySelectorAll("button[data-status]").forEach(btn => {
        btn.addEventListener("click", function () {
            updateOrderStatus(parseInt(this.dataset.orderId), this.dataset.status);
        });
    });

    container.querySelectorAll("button[data-whatsapp-order]").forEach(btn => {
        btn.addEventListener("click", function () {
            sendWhatsAppOrderManual(parseInt(this.dataset.whatsappOrder));
        });
    });
}

// ========== BOOKINGS TABLE ==========
// ========== BOOKINGS TABLE ==========
function renderBookingsTable() {
const container = document.getElementById("adminBookings");
if (!container) return;

const statusFilter = document.getElementById("bookingStatusFilter")?.value || "all";
const dateFilter = document.getElementById("bookingDateFilter")?.value || "";
const tableFilter = document.getElementById("bookingTableFilter")?.value || "all";
const searchTerm = (document.getElementById("bookingSearchInput")?.value || "").trim().toLowerCase();

let filteredBookings = bookings.slice().reverse();

if (statusFilter !== "all") {
    filteredBookings = filteredBookings.filter(b => b.status === statusFilter);
}

if (dateFilter) {
    filteredBookings = filteredBookings.filter(b => b.date === dateFilter);
}

if (tableFilter !== "all") {
    filteredBookings = filteredBookings.filter(b => String(b.tableNumber || "") === tableFilter);
}

if (searchTerm) {
    filteredBookings = filteredBookings.filter(b => {
        const tableDetails = getTableDetails(b.tableNumber);
        const searchable = [
            String(b.id || ""),
            String(b.id || "").slice(-6),
            `table ${b.tableNumber || ""}`,
            `table #${b.tableNumber || ""}`,
            `#${b.tableNumber || ""}`,
            String(b.tableNumber || ""),
            b.name || "",
            b.phone || "",
            b.email || "",
            b.date || "",
            b.time || "",
            b.status || "",
            tableDetails.tier || "",
            String(b.guests || "")
        ].join(" ").toLowerCase();
        return searchable.includes(searchTerm);
    });
}

const bookingsCountEl = document.getElementById("bookingsCount");
if (bookingsCountEl) {
    const isFiltered = statusFilter !== "all" || Boolean(dateFilter) || tableFilter !== "all" || Boolean(searchTerm);
    bookingsCountEl.innerText = isFiltered
        ? `${filteredBookings.length}/${bookings.length} bookings`
        : `${bookings.length} bookings`;
}

if (bookings.length === 0) {
    container.innerHTML = `
        <div style="text-align:center; padding:40px; color:var(--text-secondary);">
            <div style="font-size:3rem; margin-bottom:10px;">🪑</div>
            <p>No bookings found</p>
        </div>
    `;
    return;
}

if (filteredBookings.length === 0) {
    container.innerHTML = `
        <div style="text-align:center; padding:40px; color:var(--text-secondary);">
            <div style="font-size:3rem; margin-bottom:10px;">🔎</div>
            <p>No reservations match your search</p>
            <small>Try table number, customer name, phone, email, date, or status.</small>
        </div>
    `;
    return;
}

container.innerHTML = `
    <table>
        <thead>
            <tr>
                <th>Booking ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Table</th>
                <th>Customer</th>
                <th>Guests</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${filteredBookings.map(b => {
                const tableDetails = getTableDetails(b.tableNumber);

                let statusActions = "";

                if (b.status === "Approved" || b.status === "Rejected" || b.status === "Cancelled") {
                    statusActions = `
                        <span style="color:var(--text-secondary); font-size:0.8rem; font-style:italic;">
                            No status actions
                        </span>
                    `;
                } else {
                    statusActions += `
                        <button type="button" class="btn-approve" data-booking-id="${b.id}" data-status="Approved">
                            ✅ Approve
                        </button>
                        <button type="button" class="btn-reject" data-booking-id="${b.id}" data-status="Rejected">
                            ❌ Reject
                        </button>
                    `;
                }

                return `
                    <tr>
                        <td><strong>#${String(b.id).slice(-6)}</strong></td>
                        <td>${b.date}</td>
                        <td><strong>${b.time}</strong></td>
                        <td>
                            <strong>#${b.tableNumber || "N/A"}</strong><br>
                            <small>${tableDetails.tier}</small><br>
                            <small style="color:var(--accent);">
                                ₹${tableDetails.min} - ₹${tableDetails.max}
                            </small>
                        </td>
                        <td>
                            <strong>${b.name}</strong><br>
                            <small>📞 ${b.phone}</small><br>
                            <small>📧 ${b.email || "N/A"}</small>
                        </td>
                        <td>${b.guests}</td>
                        <td>
                            <span class="status-badge status-${b.status}">${b.status}</span>
                        </td>
                        <td>
                            <div class="table-actions">
                                <button type="button" style="background:linear-gradient(135deg,#25d366,#128c7e);" data-whatsapp-booking="${b.id}">
                                    📲 WhatsApp
                                </button>
                                ${statusActions}
                            </div>
                        </td>
                    </tr>
                `;
            }).join("")}
        </tbody>
    </table>
`;

// Approve / Reject buttons
container.querySelectorAll("button[data-status]").forEach(btn => {
    btn.addEventListener("click", function () {
        updateBookingStatus(parseInt(this.dataset.bookingId), this.dataset.status);
    });
});

// WhatsApp buttons
container.querySelectorAll("button[data-whatsapp-booking]").forEach(btn => {
    btn.addEventListener("click", function () {
        sendWhatsAppBookingManual(parseInt(this.dataset.whatsappBooking));
    });
});
}

// ========== BOOKING EDIT / REMOVE ==========
function editBooking(id) {
    const booking = bookings.find(b => b.id === id);
    if (!booking) return;

    const safeName = (booking.name || "").replace(/"/g, "&quot;");
    const safePhone = (booking.phone || "").replace(/"/g, "&quot;");
    const safeEmail = (booking.email || "").replace(/"/g, "&quot;");
    const safeTime = (booking.time || "").replace(/"/g, "&quot;");

    const tableOptions = tablePricing.map(table => `
        <option value="${table.id}" ${booking.tableNumber === table.id ? "selected" : ""}>
            Table #${table.id} (${table.tier})
        </option>
    `).join("");

    const statusOptions = ["Pending", "Approved", "Rejected", "Cancelled"].map(status => `
        <option value="${status}" ${booking.status === status ? "selected" : ""}>
            ${status}
        </option>
    `).join("");

    const container = document.getElementById("modal-container");
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "editBookingModal";

    modal.innerHTML = `
        <div class="modal-content" style="max-width:550px;">
            <h3 style="color:var(--accent); margin-bottom:15px;">
                ✏️ Edit Booking #${String(booking.id).slice(-6)}
            </h3>

            <label>Customer Name</label>
            <input type="text" id="editBookingName" value="${safeName}">

            <label>Phone</label>
            <input type="text" id="editBookingPhone" value="${safePhone}">

            <label>Email</label>
            <input type="email" id="editBookingEmail" value="${safeEmail}">

            <label>Date</label>
            <input type="date" id="editBookingDate" value="${booking.date || ""}">

            <label>Time</label>
            <input type="text" id="editBookingTime" value="${safeTime}" placeholder="Example: 6:00 PM">

            <label>Guests</label>
            <input type="number" id="editBookingGuests" value="${booking.guests || 1}" min="1">

            <label>Table</label>
            <select id="editBookingTable">
                ${tableOptions}
            </select>

            <label>Status</label>
            <select id="editBookingStatus">
                ${statusOptions}
            </select>

            <div style="display:flex; gap:10px; margin-top:20px;">
                <button type="button" class="secondary-btn" style="flex:1;" onclick="document.getElementById('editBookingModal').remove()">Cancel</button>
                <button type="button" style="flex:1;" onclick="saveBookingEdit(${booking.id})">💾 Save Booking</button>
            </div>
        </div>
    `;

    container.appendChild(modal);
}

function saveBookingEdit(id) {
    const name = document.getElementById("editBookingName").value.trim();
    const phone = document.getElementById("editBookingPhone").value.trim();
    const email = document.getElementById("editBookingEmail").value.trim();
    const date = document.getElementById("editBookingDate").value;
    const time = document.getElementById("editBookingTime").value.trim();
    const guests = parseInt(document.getElementById("editBookingGuests").value, 10);
    const tableNumber = parseInt(document.getElementById("editBookingTable").value, 10);
    const status = document.getElementById("editBookingStatus").value;

    
        if (!name || !phone || !date || !time || isNaN(guests) || isNaN(tableNumber)) {
    showToast("Please fill all required booking details", "error");
    return;
}

// ✅ NEW: Maximum 8 guests per table
if (guests > 8) {
    showToast("❌ Maximum 8 guests allowed per table", "error");
    return;
}
if (guests < 1) {
    showToast("❌ At least 1 guest is required", "error");
    return;
}
    

    const conflict = bookings.some(b =>
        b.id !== id &&
        b.date === date &&
        b.time === time &&
        b.tableNumber === tableNumber &&
        b.status !== "Rejected" &&
        b.status !== "Cancelled"
    );

    if (conflict) {
        showToast("This table is already booked for that date and time", "error");
        return;
    }

    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) return;

    bookings[index] = {
        ...bookings[index],
        name,
        phone,
        email,
        date,
        time,
        guests,
        tableNumber,
        status
    };

    localStorage.setItem("bookings", JSON.stringify(bookings));

    const modal = document.getElementById("editBookingModal");
    if (modal) modal.remove();

    showToast("Booking updated successfully", "success");

    loadStats();
    renderBookingsTable();
    renderAdminSeatingChart();
}

function removeBooking(id) {
    if (!confirm("Remove this reservation permanently? This cannot be undone.")) return;

    bookings = bookings.filter(b => b.id !== id);

    localStorage.setItem("bookings", JSON.stringify(bookings));

    showToast("Reservation removed successfully", "info");

    loadStats();
    renderBookingsTable();
    renderAdminSeatingChart();
}

// ========== UPDATE STATUS ==========
function updateOrderStatus(id, status) {
    const order = orders.find(o => o.id === id);
    if (!order) return;

    order.status = status;

    if (status === "Delivered" && order.paymentStatus === "PaymentPending") {
        order.paymentStatus = "Paid";
        showToast(`💰 Payment auto-completed for Order #${id.toString().slice(-6)}`, "success");
    }

    localStorage.setItem("orders", JSON.stringify(orders));

    showToast(`Order #${id.toString().slice(-6)} → ${status}`, "success");

    sendWhatsAppOrderStatusUpdate(order, status);

    loadStats();
    renderOrdersTable();
    initDeliveryMap();
}

function updateBookingStatus(id, status) {
    const booking = bookings.find(b => b.id === id);
    if (!booking) return;

    let remarks = booking.admin_remarks || "";

    if (status === "Rejected") {
        remarks = prompt("Enter rejection reason:") || "No reason provided";
    }

    booking.status = status;
    booking.admin_remarks = remarks;

    localStorage.setItem("bookings", JSON.stringify(bookings));

    showToast(`Booking #${id.toString().slice(-6)} → ${status}`, "success");

    sendWhatsAppBookingStatusUpdate(booking, status);

    loadStats();
    renderBookingsTable();
    renderAdminSeatingChart();
}

// ========== EXPORT CSV ==========
function exportToCSV(type) {
    const data = type === "orders" ? orders : bookings;

    if (data.length === 0) {
        showToast(`No ${type} to export`, "error");
        return;
    }

    try {
        const keys = Object.keys(data[0]);
        let csvContent = keys.join(",") + "\n";

        data.forEach(row => {
            const rowStr = keys.map(key => {
                let val = row[key];

                if (typeof val === "object") {
                    val = JSON.stringify(val);
                } else {
                    val = String(val);
                }

                val = val.replace(/"/g, '""');
                return `"${val}"`;
            }).join(",");

            csvContent += rowStr + "\n";
        });

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");

        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", `spice_garden_${type}_${new Date().toISOString().split("T")[0]}.csv`);
        link.style.visibility = "hidden";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} exported successfully! 📥`, "success");
    } catch (error) {
        console.error("Export error:", error);
        showToast("Error exporting data", "error");
    }
}

// ========== CLEAR DATA ==========
function clearAllData() {
    showModal(
        "⚠️ Clear All Data",
        "This will delete ALL orders and bookings. This cannot be undone!",
        "confirmClearData"
    );
}

function confirmClearData() {
    localStorage.removeItem("orders");
    localStorage.removeItem("bookings");

    orders = [];
    bookings = [];

    showToast("All data cleared!", "success");
    refreshDashboard();
}

// ========== THEME ==========
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("adminTheme", newTheme);

    const toggleBtn = document.querySelector(".theme-toggle");
    if (toggleBtn) toggleBtn.innerText = newTheme === "light" ? "🌙" : "☀️";
}

// ========== RATINGS & REVIEWS ==========
function renderRatingsSummary() {
    const ratingsSummary = document.getElementById("ratingsSummary");
    const reviewsList = document.getElementById("reviewsList");
    const ratingsCount = document.getElementById("ratingsCount");

    if (!ratingsSummary || !reviewsList) return;

    const ordersWithRatings = orders.filter(o => o.rating && o.rating > 0);
    const totalRatings = ordersWithRatings.length;

    if (totalRatings === 0) {
        ratingsSummary.innerHTML = `
            <div style="text-align:center; padding:40px; color:var(--text-secondary);">
                <div style="font-size:4rem; margin-bottom:15px; opacity:0.5;">⭐</div>
                <p>No ratings yet. Ratings will appear here once customers review their orders.</p>
            </div>
        `;

        reviewsList.innerHTML = "";

        if (ratingsCount) ratingsCount.innerText = "0 reviews";

        return;
    }

    const avgRating = ordersWithRatings.reduce((sum, o) => sum + o.rating, 0) / totalRatings;

    const distribution = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
    };

    ordersWithRatings.forEach(o => {
        distribution[o.rating]++;
    });

    const starBreakdown = [5, 4, 3, 2, 1].map(stars => {
        const count = distribution[stars];
        const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0;

        return `
            <div class="rating-bar-row">
                <span class="rating-bar-label">${stars} ★</span>
                <div class="rating-bar-container">
                    <div class="rating-bar-fill" style="width:${percentage}%"></div>
                </div>
                <span class="rating-bar-count">${count}</span>
            </div>
        `;
    }).join("");

    ratingsSummary.innerHTML = `
        <div class="ratings-overview">
            <div class="rating-average-card">
                <div class="rating-big-number">${avgRating.toFixed(1)}</div>
                <div class="rating-stars-display">
                    ${"★".repeat(Math.round(avgRating))}${"☆".repeat(5 - Math.round(avgRating))}
                </div>
                <div class="rating-total-count">
                    ${totalRatings} review${totalRatings !== 1 ? "s" : ""}
                </div>
            </div>
            <div class="rating-breakdown">
                ${starBreakdown}
            </div>
        </div>
    `;

    if (ratingsCount) {
        ratingsCount.innerText = `${totalRatings} review${totalRatings !== 1 ? "s" : ""}`;
    }
}

function renderReviewsList() {
    const reviewsList = document.getElementById("reviewsList");
    if (!reviewsList) return;

    const ordersWithReviews = orders
        .filter(o => o.rating && o.rating > 0)
        .sort((a, b) => new Date(b.ratingDate || b.id) - new Date(a.ratingDate || a.id));

    if (ordersWithReviews.length === 0) {
        reviewsList.innerHTML = "";
        return;
    }

    reviewsList.innerHTML = ordersWithReviews.map(o => {
        const reviewDate = o.ratingDate
            ? new Date(o.ratingDate).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric"
            })
            : new Date(o.id).toLocaleDateString("en-IN");

        const orderDate = new Date(o.id).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });

        const itemsText = (o.items || [])
            .map(i => `${i.emoji || "🍽️"} ${i.name} ×${i.qty}`)
            .join(", ");

        return `
            <div class="review-card-admin">
                <div class="review-header-admin">
                    <div class="reviewer-info">
                        <div class="reviewer-avatar">
                            ${o.name ? o.name.charAt(0).toUpperCase() : "👤"}
                        </div>
                        <div class="reviewer-details">
                            <h4>${o.name || "Customer"}</h4>
                            <p>Order #${String(o.id).slice(-6)} • ${orderDate}</p>
                        </div>
                    </div>

                    <div class="review-rating-display">
                        <div class="review-stars">
                            ${"★".repeat(o.rating)}${"☆".repeat(5 - o.rating)}
                        </div>
                        <span class="review-date">${reviewDate}</span>
                    </div>
                </div>

                ${o.review ? `
                    <div class="review-content">
                        <p>"${o.review}"</p>
                    </div>
                ` : ""}

                <div class="review-order-items">
                    <strong>Ordered:</strong> ${itemsText}
                </div>

                <div class="review-actions">
                    <button type="button" class="review-action-btn delete" onclick="deleteReview(${o.id})">
                        🗑️ Delete Review
                    </button>
                </div>
            </div>
        `;
    }).join("");
}

function deleteReview(orderId) {
    if (!confirm("Delete this review? The rating will be removed from the order.")) return;

    const orderIndex = orders.findIndex(o => o.id === orderId);

    if (orderIndex !== -1) {
        delete orders[orderIndex].rating;
        delete orders[orderIndex].review;
        delete orders[orderIndex].ratingDate;

        localStorage.setItem("orders", JSON.stringify(orders));

        showToast("Review deleted", "info");

        renderRatingsSummary();
        renderReviewsList();
    }
}

// ========== INIT ADMIN ==========
function initAdmin() {
    const savedTheme = localStorage.getItem("adminTheme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);

    const toggleBtn = document.querySelector(".theme-toggle");
    if (toggleBtn) toggleBtn.innerText = savedTheme === "light" ? "🌙" : "☀️";

    initParticleNetwork();

    const unlockBtn = document.getElementById("unlockBtn");
    if (unlockBtn) {
        unlockBtn.addEventListener("click", e => {
            e.preventDefault();
            adminLogin();
        });
    }

    const codeInput = document.getElementById("adminCodeInput");
    if (codeInput) {
        codeInput.addEventListener("keypress", e => {
            if (e.key === "Enter") {
                e.preventDefault();
                adminLogin();
            }
        });
    }

    const themeToggleBtn = document.getElementById("themeToggleBtn");
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", e => {
            e.preventDefault();
            toggleTheme();
        });
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", e => {
            e.preventDefault();
            adminLogout();
        });
    }

    const exportOrdersBtn = document.getElementById("exportOrdersBtn");
    if (exportOrdersBtn) {
        exportOrdersBtn.addEventListener("click", e => {
            e.preventDefault();
            exportToCSV("orders");
        });
    }

    const exportBookingsBtn = document.getElementById("exportBookingsBtn");
    if (exportBookingsBtn) {
        exportBookingsBtn.addEventListener("click", e => {
            e.preventDefault();
            exportToCSV("bookings");
        });
    }

    const refreshBtn = document.getElementById("refreshBtn");
    if (refreshBtn) {
        refreshBtn.addEventListener("click", e => {
            e.preventDefault();
            refreshDashboard();
        });
    }

    const clearBtn = document.getElementById("clearBtn");
    if (clearBtn) {
        clearBtn.addEventListener("click", e => {
            e.preventDefault();
            clearAllData();
        });
    }

    const orderStatusFilter = document.getElementById("orderStatusFilter");
    if (orderStatusFilter) {
        orderStatusFilter.addEventListener("change", renderOrdersTable);
    }

    const orderSearchInput = document.getElementById("orderSearchInput");
    if (orderSearchInput) {
        orderSearchInput.addEventListener("input", renderOrdersTable);
    }

    const bookingStatusFilter = document.getElementById("bookingStatusFilter");
    if (bookingStatusFilter) {
        bookingStatusFilter.addEventListener("change", renderBookingsTable);
    }

    const bookingSearchInput = document.getElementById("bookingSearchInput");
    if (bookingSearchInput) {
        bookingSearchInput.addEventListener("input", renderBookingsTable);
    }

    const menuSearchAdmin = document.getElementById("menuSearchAdmin");
    if (menuSearchAdmin) {
        menuSearchAdmin.addEventListener("input", renderMenuManagement);
    }

    const menuCategoryFilter = document.getElementById("menuCategoryFilter");
    if (menuCategoryFilter) {
        menuCategoryFilter.addEventListener("change", renderMenuManagement);
    }

    // Global functions
    window.adminLogin = adminLogin;
    window.adminLogout = adminLogout;
    window.confirmLogout = confirmLogout;
    window.refreshDashboard = refreshDashboard;
    window.exportToCSV = exportToCSV;
    window.clearAllData = clearAllData;
    window.confirmClearData = confirmClearData;
    window.updateOrderStatus = updateOrderStatus;
    window.updateBookingStatus = updateBookingStatus;
    window.toggleTheme = toggleTheme;
    window.showToast = showToast;

    window.renderPeakHoursChart = renderPeakHoursChart;
    window.renderBestSellers = renderBestSellers;

    window.renderMenuManagement = renderMenuManagement;
    window.openAddItemModal = openAddItemModal;
    window.saveNewItem = saveNewItem;
    window.deleteMenuItem = deleteMenuItem;
    window.toggleSpecial = toggleSpecial;
    window.openEditItemModal = openEditItemModal;
    window.saveEditedItem = saveEditedItem;
    window.restoreAllDeleted = restoreAllDeleted;
    window.resetAllOverrides = resetAllOverrides;

    window.renderTablePricingAdmin = renderTablePricingAdmin;
    window.editTablePrice = editTablePrice;
    window.saveTablePrice = saveTablePrice;
    window.resetTablePrice = resetTablePrice;
    window.resetAllTablePrices = resetAllTablePrices;

    window.editBooking = editBooking;
    window.saveBookingEdit = saveBookingEdit;
    window.removeBooking = removeBooking;

    window.generateTableQRCodes = generateTableQRCodes;
    window.printQR = printQR;

    window.deleteReview = deleteReview;

    window.normalizeWhatsAppPhone = normalizeWhatsAppPhone;
    window.openWhatsAppMessage = openWhatsAppMessage;
    window.sendWhatsAppOrderStatusUpdate = sendWhatsAppOrderStatusUpdate;
    window.sendWhatsAppBookingStatusUpdate = sendWhatsAppBookingStatusUpdate;
    window.sendWhatsAppOrderManual = sendWhatsAppOrderManual;
    window.sendWhatsAppBookingManual = sendWhatsAppBookingManual;

    checkAdminSession();

    setInterval(() => {
        if (document.getElementById("adminDashboard").style.display !== "none") {
            orders = JSON.parse(localStorage.getItem("orders")) || [];
            bookings = JSON.parse(localStorage.getItem("bookings")) || [];

            loadStats();
            renderOrdersTable();
            renderBookingsTable();
            renderAdminSeatingChart();
            renderPeakHoursChart();
            renderBestSellers();
            renderMenuManagement();
            renderTablePricingAdmin();
            renderRatingsSummary();
            renderReviewsList();

            if (document.getElementById("qrCodesGrid")) {
                generateTableQRCodes();
            }
        }
    }, 30000);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAdmin);
} else {
    initAdmin();
}
