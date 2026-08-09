// ========== CONFIG ==========
const UPI_ID = "spicegarden@upi";
const UPI_MERCHANT_NAME = "Spice Garden Restaurant";
const RESTAURANT_LAT = 17.4437;
const RESTAURANT_LNG = 78.3772;
const TOTAL_TABLES = 12;
const CANCELLATION_FEE = 100;

// ========== TABLE PRICING & LIMITS ==========
const DEFAULT_TABLE_PRICING = [
    { id: 1, min: 1000, max: 2000, tier: 'Standard' },
    { id: 2, min: 1000, max: 2000, tier: 'Standard' },
    { id: 3, min: 1000, max: 2000, tier: 'Standard' },
    { id: 4, min: 1000, max: 2000, tier: 'Standard' },
    { id: 5, min: 1500, max: 3000, tier: 'Premium' },
    { id: 6, min: 1500, max: 3000, tier: 'Premium' },
    { id: 7, min: 1500, max: 3000, tier: 'Premium' },
    { id: 8, min: 1500, max: 3000, tier: 'Premium' },
    { id: 9, min: 2500, max: 4000, tier: 'Luxury' },
    { id: 10, min: 2500, max: 4000, tier: 'Luxury' },
    { id: 11, min: 3500, max: 5000, tier: 'Royal' },
    { id: 12, min: 5000, max: 5000, tier: 'VIP' }
];

const savedTablePricing = JSON.parse(localStorage.getItem('tablePricing')) || [];
let tablePricing = DEFAULT_TABLE_PRICING.map(defaultTable => {
    const saved = savedTablePricing.find(t => t.id === defaultTable.id);
    return saved ? { ...defaultTable, ...saved } : { ...defaultTable };
});

function getTableDetails(tableNumber) {
    return tablePricing.find(t => t.id === tableNumber) || { min: 1000, max: 2000, tier: 'Standard' };
}

const COUPONS = {
    "ANY10": { discount: 0.10, minAmount: 100, desc: "10% off on ANY order (Min ₹100)" },
    "SAVE15": { discount: 0.15, minAmount: 1000, desc: "15% off on orders above ₹1000" },
    "MEGA20": { discount: 0.20, minAmount: 1500, desc: "20% off on orders above ₹1500" }
};

const SAMPLE_REVIEWS = [
    { name: "Rahul Sharma", rating: 5, text: "Best biryani in town! The flavors are authentic and delivery was super fast.", avatar: "👨" },
    { name: "Priya Patel", rating: 5, text: "Amazing butter chicken! The ambiance is perfect for family dinners.", avatar: "👩" },
    { name: "Amit Kumar", rating: 4, text: "Great food quality. The live location tracking feature is very helpful!", avatar: "👨" },
    { name: "Sneha Reddy", rating: 5, text: "Loved the ice cream section! Mango kulfi is to die for. Will order again.", avatar: "👩" }
];

const FAQS = [
    { q: "What are your delivery timings?", a: "We deliver from 11 AM to 10 PM, 7 days a week." },
    { q: "Do you offer vegetarian options?", a: "Yes! We have 20+ pure vegetarian dishes including vegan options." },
    { q: "How does the loyalty program work?", a: "Earn 1 point per ₹100 spent. Redeem points for discounts on future orders." },
    { q: "Can I schedule an order in advance?", a: "Yes! Use the schedule option in cart to order for later." },
    { q: "What payment methods do you accept?", a: "We accept Cash on Delivery, Credit/Debit Cards, and all UPI payments." }
];

// ========== DATA ==========
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let currentDiscount = 0;
let currentCategory = 'all';
let upiPaymentConfirmed = false;
let currentUPIAmount = 0;
let detectedLocation = null;
let miniMap = null;
let isLoyaltyRedeemed = false;
let recognition = null;
let userSelectedTable = null;

// ========== RESTAURANT TIMING RESTRICTIONS ==========
const RESTAURANT_OPEN_HOUR = 11;
const RESTAURANT_CLOSE_HOUR = 22;

function isRestaurantOpen() {
    const currentHour = new Date().getHours();
    return currentHour >= RESTAURANT_OPEN_HOUR && currentHour < RESTAURANT_CLOSE_HOUR;
}

function getRestaurantStatusMessage() {
    const currentHour = new Date().getHours();
    if (currentHour < RESTAURANT_OPEN_HOUR) {
        return `We open at 11:00 AM. Please come back later!`;
    } else {
        return `We are closed for the day. We open tomorrow at 11:00 AM!`;
    }
}

function updateRestaurantStatusBanner() {
    let banner = document.getElementById('restaurantStatusBanner');
    const menuContainer = document.getElementById('menu');
    
    if (!banner && menuContainer) {
        banner = document.createElement('div');
        banner.id = 'restaurantStatusBanner';
        banner.style.cssText = 'padding: 15px; border-radius: 12px; text-align: center; font-weight: 600; margin-bottom: 20px; font-size: 1rem; transition: all 0.3s;';
        menuContainer.parentNode.insertBefore(banner, menuContainer);
    }
    
    if (!banner) return;
    
    if (isRestaurantOpen()) {
        banner.style.background = 'rgba(46, 204, 113, 0.15)';
        banner.style.color = '#2ecc71';
        banner.style.border = '1px solid rgba(46, 204, 113, 0.3)';
        banner.innerHTML = '✅ We are OPEN! Delivering from 11:00 AM to 10:00 PM.';
    } else {
        banner.style.background = 'rgba(231, 76, 60, 0.15)';
        banner.style.color = '#e74c3c';
        banner.style.border = '1px solid rgba(231, 76, 60, 0.3)';
        banner.innerHTML = `🚫 We are currently CLOSED. ${getRestaurantStatusMessage()}`;
    }
}

// ========== MENU DATA ==========
const masterChefs = [
    { id: 1, name: "Chef Raghavendra", title: "Executive Head Chef", specialty: "North Indian & Mughlai", emoji: "👨‍🍳", experience: "20+ years", bio: "Master of authentic Mughlai cuisine with expertise in royal biryanis and rich curries." },
    { id: 2, name: "Chef Priya Sharma", title: "Senior Sous Chef", specialty: "South Indian & Vegetarian", emoji: "👩‍🍳", experience: "15 years", bio: "Specialist in South Indian delicacies and innovative vegetarian dishes." },
    { id: 3, name: "Chef Arjun Reddy", title: "Tandoor & Fast Food Master", specialty: "Grills, Wraps & Fast Food", emoji: "👨‍🍳", experience: "12 years", bio: "Expert in tandoor cooking techniques, wraps, and fast food. Creates perfect naans, rolls, and burgers." },
    { id: 4, name: "Chef Meera Patel", title: "Pastry & Desserts Chef", specialty: "Desserts & Beverages", emoji: "👩‍🍳", experience: "10 years", bio: "Creative genius behind our ice creams, kulfi, and refreshing beverages." },
    { id: 5, name: "Chef Vikram Singh", title: "Seafood Specialist", specialty: "Coastal & Seafood", emoji: "👨‍🍳", experience: "14 years", bio: "Master of coastal cuisine specializing in fish and prawn preparations." }
];

const menuItems = [
    {id:1, name: "Veg Biryani", price:180, category: "veg", emoji: "🍚", chefId:2, isSpecial: true, dietary: "jain", spiceLevel: "medium"},
    {id:2, name: "Paneer Butter Masala", price:200, category: "veg", emoji: "🧀", chefId:2, dietary: "gluten-free", spiceLevel: "mild"},
    {id:3, name: "Mixed Vegetable Curry", price:170, category: "veg", emoji: "🥘", chefId:2, dietary: "vegan", spiceLevel: "mild"},
    {id:4, name: "Malai Kofta", price:220, category: "veg", emoji: "🍛", chefId:2, isSpecial: true, dietary: "nut-free", spiceLevel: "medium"},
    {id:5, name: "Chole Bhature", price:160, category: "veg", emoji: "🫓", chefId:2, dietary: "low-calorie", spiceLevel: "medium"},
    {id:6, name: "Aloo Gobi", price:150, category: "veg", emoji: "🥔", chefId:2, dietary: "vegan", spiceLevel: "mild"},
    {id:7, name: "Dal Makhani", price:180, category: "veg", emoji: "🍲", chefId:2, dietary: "gluten-free", spiceLevel: "medium"},
    {id:8, name: "Navratan Korma", price:230, category: "veg", emoji: "🥗", chefId:2, dietary: "jain", spiceLevel: "mild"},
    {id:9, name: "Veg Manchurian", price:190, category: "veg", emoji: "🥟", chefId:2, dietary: "nut-free", spiceLevel: "hot"},
    {id:10, name: "Mushroom Do Pyaza", price:210, category: "veg", emoji: "🍄", chefId:2, dietary: "low-calorie", spiceLevel: "medium"},
    {id:11, name: "Chicken Biryani", price:250, category: "nonveg", emoji: "🍗", chefId:1, isSpecial: true, dietary: "low-calorie", spiceLevel: "hot"},
    {id:12, name: "Mutton Rogan Josh", price:320, category: "nonveg", emoji: "🍖", chefId:1, dietary: "nut-free", spiceLevel: "hot"},
    {id:13, name: "Butter Chicken", price:280, category: "nonveg", emoji: "🍛", chefId:1, isSpecial: true, dietary: "gluten-free", spiceLevel: "medium"},
    {id:14, name: "Fish Fry", price:260, category: "nonveg", emoji: "🐟", chefId:5, dietary: "gluten-free", spiceLevel: "medium"},
    {id:15, name: "Prawn Curry", price:300, category: "nonveg", emoji: "🦐", chefId:5, dietary: "low-calorie", spiceLevel: "hot"},
    {id:16, name: "Egg Masala", price:180, category: "nonveg", emoji: "🥚", chefId:3, dietary: "nut-free", spiceLevel: "medium"},
    {id:17, name: "Chicken 65", price:240, category: "nonveg", emoji: "🍗", chefId:3, dietary: "gluten-free", spiceLevel: "hot"},
    {id:18, name: "Mutton Korma", price:330, category: "nonveg", emoji: "🍖", chefId:1, dietary: "nut-free", spiceLevel: "medium"},
    {id:19, name: "Grilled Fish", price:290, category: "nonveg", emoji: "🐠", chefId:5, dietary: "low-calorie", spiceLevel: "mild"},
    {id:20, name: "Pepper Chicken", price:260, category: "nonveg", emoji: "🍗", chefId:3, dietary: "gluten-free", spiceLevel: "hot"},
    {id:21, name: "Chocolate Ice Cream", price:120, category: "icecream", emoji: "🍫", chefId:4, dietary: "nut-free", spiceLevel: "mild"},
    {id:22, name: "Vanilla Ice Cream", price:110, category: "icecream", emoji: "🍦", chefId:4, dietary: "nut-free", spiceLevel: "mild"},
    {id:23, name: "Butterscotch Sundae", price:160, category: "icecream", emoji: "🍨", chefId:4, dietary: "nut-free", spiceLevel: "mild"},
    {id:24, name: "Mango Kulfi", price:140, category: "icecream", emoji: "🥭", chefId:4, isSpecial: true, dietary: "nut-free", spiceLevel: "mild"},
    {id:25, name: "Strawberry Delight", price:150, category: "icecream", emoji: "🍓", chefId:4, dietary: "low-calorie", spiceLevel: "mild"},
    {id:26, name: "Pista Kulfi", price:145, category: "icecream", emoji: "🟢", chefId:4, dietary: "nut-free", spiceLevel: "mild"},
    {id:27, name: "Brownie Ice Cream", price:170, category: "icecream", emoji: "🍫", chefId:4, dietary: "nut-free", spiceLevel: "mild"},
    {id:28, name: "Cold Coffee Float", price:150, category: "icecream", emoji: "☕", chefId:4, dietary: "low-calorie", spiceLevel: "mild"},
    {id:29, name: "Mango Shake", price:130, category: "juice", emoji: "🥭", chefId:4, dietary: "vegan", spiceLevel: "mild"},
    {id:30, name: "Orange Juice", price:110, category: "juice", emoji: "🍊", chefId:4, dietary: "vegan", spiceLevel: "mild"},
    {id:31, name: "Mixed Fruit Juice", price:120, category: "juice", emoji: "🍹", chefId:4, dietary: "vegan", spiceLevel: "mild"},
    {id:32, name: "Lemon Mint Cooler", price:100, category: "juice", emoji: "🍋", chefId:4, dietary: "vegan", spiceLevel: "mild"},
    {id:33, name: "Watermelon Juice", price:115, category: "juice", emoji: "🍉", chefId:4, dietary: "vegan", spiceLevel: "mild"},
    {id:34, name: "Pineapple Punch", price:125, category: "juice", emoji: "🍍", chefId:4, dietary: "vegan", spiceLevel: "mild"},
    {id:35, name: "Strawberry Lemonade", price:130, category: "juice", emoji: "🍓", chefId:4, dietary: "vegan", spiceLevel: "mild"},
    {id:36, name: "Apple Ginger Cooler", price:135, category: "juice", emoji: "🍎", chefId:4, dietary: "vegan", spiceLevel: "mild"},
    {id:37, name: "Classic Margherita Pizza", price:250, category: "pizza", emoji: "🍕", chefId:3, dietary: "gluten-free", spiceLevel: "mild"},
    {id:38, name: "Farmhouse Special Pizza", price:290, category: "pizza", emoji: "🍕", chefId:3, isSpecial: true, dietary: "gluten-free", spiceLevel: "medium"},
    {id:39, name: "Pepperoni Feast Pizza", price:320, category: "pizza", emoji: "🍕", chefId:3, dietary: "gluten-free", spiceLevel: "hot"},
    {id:40, name: "BBQ Chicken Pizza", price:340, category: "pizza", emoji: "🍕", chefId:3, dietary: "gluten-free", spiceLevel: "hot"},
    {id:41, name: "Classic Veg Burger", price:120, category: "burger", emoji: "🍔", chefId:2, dietary: "nut-free", spiceLevel: "mild"},
    {id:42, name: "Spicy Paneer Tikka Burger", price:150, category: "burger", emoji: "🍔", chefId:2, isSpecial: true, dietary: "nut-free", spiceLevel: "hot"},
    {id:43, name: "Crispy Chicken Burger", price:160, category: "burger", emoji: "🍔", chefId:1, dietary: "nut-free", spiceLevel: "hot"},
    {id:44, name: "Double Patty Chicken Burger", price:220, category: "burger", emoji: "🍔", chefId:1, dietary: "nut-free", spiceLevel: "hot"},
    {id:45, name: "Grilled Cheese Sandwich", price:130, category: "sandwich", emoji: "🥪", chefId:2, dietary: "low-calorie", spiceLevel: "mild"},
    {id:46, name: "Veg Club Sandwich", price:160, category: "sandwich", emoji: "🥪", chefId:2, dietary: "low-calorie", spiceLevel: "mild"},
    {id:47, name: "Chicken Mayo Sandwich", price:180, category: "sandwich", emoji: "🥪", chefId:1, dietary: "low-calorie", spiceLevel: "medium"},
    {id:48, name: "Classic Veg Kathi Roll", price:140, category: "roll", emoji: "🌯", chefId:3, dietary: "jain", spiceLevel: "mild"},
    {id:49, name: "Paneer Tikka Kathi Roll", price:170, category: "roll", emoji: "🌯", chefId:2, isSpecial: true, dietary: "jain", spiceLevel: "medium"},
    {id:50, name: "Chicken Tikka Kathi Roll", price:190, category: "roll", emoji: "🌯", chefId:1, dietary: "jain", spiceLevel: "hot"},
    {id:51, name: "Spicy Egg Roll", price:150, category: "roll", emoji: "🌯", chefId:3, dietary: "jain", spiceLevel: "hot"}
];

// ========== TOAST & MODAL ==========
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = message;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

function showModal(title, message, onConfirm) {
    const container = document.getElementById('modal-container');
    const existing = container.querySelector('.modal');
    if (existing) existing.remove();
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `<div class="modal-content"> <h3 style="margin-bottom:15px; color:var(--accent);">${title}</h3> <div style="margin-bottom:15px; line-height:1.6;">${message}</div> <div class="modal-buttons"> <button class="secondary-btn" onclick="this.closest('.modal').remove()">Close</button> ${onConfirm ? `<button onclick="this.closest('.modal').remove(); ${onConfirm}">Login Now</button>` : ''} </div> </div>`;
    container.appendChild(modal);
}

// ========== AUTO-FILL HELPERS ==========
function autoFillCustomerDetails() {
    if (currentUser) {
        const nameEl = document.getElementById('custName');
        const emailEl = document.getElementById('custEmail');
        const phoneEl = document.getElementById('custPhone');
        if (nameEl && !nameEl.value) nameEl.value = currentUser.name;
        if (emailEl && !emailEl.value) emailEl.value = currentUser.email;
        if (phoneEl && !phoneEl.value) phoneEl.value = currentUser.phone;
    }
}

function autoFillBookingDetails() {
    if (currentUser) {
        const nameEl = document.getElementById('resName');
        const emailEl = document.getElementById('resEmail');
        const phoneEl = document.getElementById('resPhone');
        if (nameEl && !nameEl.value) nameEl.value = currentUser.name;
        if (emailEl && !emailEl.value) emailEl.value = currentUser.email;
        if (phoneEl && !phoneEl.value) phoneEl.value = currentUser.phone;
    }
}

// ========== AUTH FUNCTIONS ==========
function switchAuthTab(tab, btn) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');
    if (tab === 'login') {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
    } else {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const pwdInput = document.getElementById('regPassword');
    if (pwdInput) {
        pwdInput.addEventListener('input', function(e) {
            const val = e.target.value;
            const bar = document.querySelector('.strength-bar');
            const text = document.querySelector('.strength-text');
            let strength = 0;
            if (val.length >= 6) strength++;
            if (val.match(/[A-Z]/)) strength++;
            if (val.match(/[0-9]/)) strength++;
            if (val.match(/[^A-Za-z0-9]/)) strength++;
            
            bar.className = 'strength-bar';
            if (val.length === 0) { 
                bar.style.width = '0%'; text.innerText = 'Password Strength'; text.style.color = 'var(--text-secondary)'; 
            } else if (strength <= 1) { 
                bar.classList.add('weak'); text.innerText = 'Weak'; text.style.color = '#e74c3c'; 
            } else if (strength === 2 || strength === 3) { 
                bar.classList.add('medium'); text.innerText = 'Medium'; text.style.color = '#f39c12'; 
            } else if (strength >= 4) { 
                bar.classList.add('strong'); text.innerText = 'Strong'; text.style.color = '#2ecc71'; 
            }
        });
    }
});

function registerUser() {
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const phone = document.getElementById('regPhone').value.trim();
    const dob = document.getElementById('regDob').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    if (!name || !email || !phone || !dob || !password || !confirmPassword) return showToast('Please fill all fields', 'error');
    if (!/^\S+@\S+\.\S+$/.test(email)) return showToast('Please enter a valid email', 'error');
    if (!/^\d{10}$/.test(phone)) return showToast('Please enter a valid 10-digit phone', 'error');
    if (password.length < 6) return showToast('Password must be at least 6 characters', 'error');
    if (password !== confirmPassword) return showToast('Passwords do not match', 'error');
    if (users.find(u => u.email === email || u.phone === phone)) return showToast('User with this email or phone already exists', 'error');
    
    const newUser = { id: Date.now(), name, email, phone, dob, password, loyaltyPoints: 100, totalOrders: 0, totalSpent: 0, totalBookings: 0, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showToast('🎉 Registration successful! Welcome bonus: 100 points!', 'success');
    ['regName','regEmail','regPhone','regDob','regPassword','regConfirmPassword'].forEach(id => document.getElementById(id).value = '');
    updateProfileUI();
}

function loginUser() {
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) return showToast('Please fill all fields', 'error');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return showToast('Invalid email or password', 'error');
    
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showToast(`Welcome back, ${user.name}! 👋`, 'success');
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
    updateProfileUI();
}

function showForgotPasswordModal() {
    const container = document.getElementById('modal-container');
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'forgotPasswordModal';
    modal.innerHTML = `<div class="modal-content"> <h3 style="margin-bottom:15px; color:var(--accent);">🔐 Reset Password</h3> <p style="margin-bottom:15px; color:var(--text-secondary); font-size:0.9rem;">Enter your registered Email and Date of Birth to generate a new secure password.</p> <input type="email" id="fpEmail" placeholder="Registered Email *" style="width:100%; margin-bottom:10px;"> <input type="date" id="fpDob" placeholder="Date of Birth *" style="width:100%; margin-bottom:15px;"> <div style="display:flex; gap:10px;"> <button class="secondary-btn" onclick="document.getElementById('forgotPasswordModal').remove()" style="flex:1;">Cancel</button> <button onclick="generateNewPassword()" style="flex:1;">Generate Password</button> </div> </div>`;
    container.appendChild(modal);
}

function generateNewPassword() {
    const email = document.getElementById('fpEmail').value.trim().toLowerCase();
    const dob = document.getElementById('fpDob').value;
    
    if (!email || !dob) return showToast('Please fill all fields', 'error');
    const userIndex = users.findIndex(u => u.email === email && u.dob === dob);
    if (userIndex === -1) return showToast('❌ Email or Date of Birth does not match our records.', 'error');
    
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$";
    let newPassword = "";
    for (let i = 0; i < 8; i++) newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    
    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    document.getElementById('forgotPasswordModal').remove();
    
    const container = document.getElementById('modal-container');
    const successModal = document.createElement('div');
    successModal.className = 'modal';
    successModal.innerHTML = `
        <div class="modal-content" style="text-align:center;">
            <h3 style="color:#2ecc71; margin-bottom:15px;">✅ Password Reset Successful!</h3>
            <p style="color:var(--text-secondary); margin-bottom:10px;">Your new temporary password is:</p>
            <div style="background:var(--bg-card); padding:15px; border-radius:12px; border:1px dashed var(--accent); margin:15px 0;">
                <strong style="font-size:1.4rem; color:var(--accent); letter-spacing:3px;" id="generatedPwd">${newPassword}</strong>
            </div>
            <button class="copy-btn" onclick="copyToClipboard('generatedPwd')">📋 Copy Password</button>
            <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:15px;">Please save it securely.</p>
            <button onclick="this.closest('.modal').remove()" style="width:100%; margin-top:15px;">Got it!</button>
        </div>
    `;
    container.appendChild(successModal);
    showToast('Password reset successfully!', 'success');
}

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => showToast('Password copied to clipboard!', 'success')).catch(() => showToast('Failed to copy', 'error'));
}

function changePassword() {
    if (!currentUser) return showToast('Please login first', 'error');
    const currentPwd = document.getElementById('currentPassword').value;
    const newPwd = document.getElementById('newPassword').value;
    const confirmPwd = document.getElementById('confirmNewPassword').value;
    
    if (!currentPwd || !newPwd || !confirmPwd) return showToast('Please fill all fields', 'error');
    if (currentPwd !== currentUser.password) return showToast('Current password is incorrect', 'error');
    if (newPwd.length < 6) return showToast('New password must be at least 6 characters', 'error');
    if (newPwd !== confirmPwd) return showToast('New passwords do not match', 'error');
    
    currentUser.password = newPwd;
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    ['currentPassword','newPassword','confirmNewPassword'].forEach(id => document.getElementById(id).value = '');
    showToast('✅ Password updated successfully!', 'success');
}

function logoutUser() {
    showModal('Logout', 'Are you sure you want to logout?', 'confirmLogout()');
}

function confirmLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showToast('Logged out successfully', 'info');
    updateProfileUI();
}

function updateProfileUI() {
    const authSection = document.getElementById('authSection');
    const profileContent = document.getElementById('profileContent');
    
    if (currentUser) {
        const freshUser = users.find(u => u.id === currentUser.id);
        if (freshUser) currentUser = freshUser;
        authSection.style.display = 'none';
        profileContent.style.display = 'block';
        document.getElementById('userName').innerText = currentUser.name;
        document.getElementById('userEmail').innerText = '📧 ' + currentUser.email;
        document.getElementById('userPhone').innerText = '📞 ' + currentUser.phone;
        document.getElementById('userAvatar').innerText = currentUser.name.charAt(0).toUpperCase();
        
        const userOrders = orders.filter(o => o.userId === currentUser.id);
        const userBookings = bookings.filter(b => b.userId === currentUser.id);
        const totalSpent = userOrders.reduce((sum, o) => sum + (o.total || 0), 0);
        
        document.getElementById('profileOrders').innerText = userOrders.length;
        document.getElementById('profileSpent').innerText = '₹' + totalSpent.toLocaleString('en-IN');
        document.getElementById('profilePoints').innerText = currentUser.loyaltyPoints || 0;
        document.getElementById('profileBookings').innerText = userBookings.length;
        
        updateLoyaltyTier(currentUser.loyaltyPoints || 0);
        loadProfileOrders();
        loadProfileBookings();
        document.getElementById('loyaltySection').style.display = (currentUser.loyaltyPoints || 0) > 0 ? 'block' : 'none';
    } else {
        authSection.style.display = 'block';
        profileContent.style.display = 'none';
        document.getElementById('loyaltySection').style.display = 'none';
    }
}

function rateOrder(orderId, rating) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    const review = prompt(`You rated ${rating} stars! 🌟\n\nWould you like to add a short review? (Optional)\n(e.g., "Amazing food, super fast delivery!")`);
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
        orders[orderIndex].rating = rating;
        orders[orderIndex].review = review ? review.trim() : "";
        orders[orderIndex].ratingDate = new Date().toISOString();
        localStorage.setItem('orders', JSON.stringify(orders));
        showToast(`Thank you for your ${rating}-star review! 🎉`, 'success');
        loadProfileOrders();
    }
}

function loadProfileOrders() {
    const container = document.getElementById('profileOrdersList');
    if (!container) return;
    const userOrders = orders.filter(o => o.userId === currentUser.id).sort((a, b) => b.id - a.id);
    
    if (userOrders.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📦</div><p>No orders yet. Start ordering to see your history!</p></div>';
        return;
    }
    
    container.innerHTML = userOrders.map(o => {
        const isDelivered = o.status === 'Delivered';
        const hasRating = o.rating ? true : false;
        const isCancellable = o.status === 'Placed' || o.status === 'Preparing';
        
        return `
            <div class="order-history-card">
                <div class="order-history-header">
                    <div>
                        <strong>Order #${o.id.toString().slice(-6)}</strong>
                        <p style="font-size:0.8rem; color:var(--text-secondary);">${new Date(o.id).toLocaleString()}</p>
                    </div>
                    <span class="status-badge status-${o.status}">${o.status}</span>
                </div>
                <div class="order-history-items">
                    ${o.items.map(i => `<span>${i.emoji} ${i.name} ×${i.qty}</span>`).join('')}
                </div>
                ${isCancellable ? `
                    <button class="cancel-btn" onclick="openCancelOrderModal(${o.id})">❌ Cancel Order</button>
                ` : ''}
                ${o.status === 'Cancelled' && o.cancellationReason ? `
                    <div style="margin-top:12px; padding:12px; background:rgba(231,76,60,0.08); border:1px solid rgba(231,76,60,0.2); border-radius:8px; font-size:0.85rem; color:#e74c3c;">
                        <strong>❌ Cancelled:</strong> ${o.cancellationReason}
                    </div>
                ` : ''}
                ${isDelivered && !hasRating ? `
                    <div style="margin-top:15px; padding-top:15px; border-top:1px dashed var(--border);">
                        <p style="font-size:0.9rem; margin-bottom:8px; font-weight:600;">How was your experience?</p>
                        <div class="rating-stars" id="rating-${o.id}">
                            ${[5,4,3,2,1].map(star => `<span class="rating-star" onclick="rateOrder(${o.id}, ${star})">★</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
                ${hasRating ? `
                    <div style="margin-top:15px; padding-top:15px; border-top:1px dashed var(--border);">
                        <div style="display:flex; align-items:center; gap:5px; color:var(--gold); font-size:1.1rem; margin-bottom:5px;">
                            ${'★'.repeat(o.rating)}${'☆'.repeat(5 - o.rating)}
                            <span style="font-size:0.8rem; color:var(--text-secondary); margin-left:5px;">(Your Rating)</span>
                        </div>
                        ${o.review ? `<div class="order-review-display">"${o.review}"</div>` : ''}
                    </div>
                ` : ''}
                <div class="order-history-footer">
                    <strong style="color:var(--accent);">₹${o.total}</strong>
                    <span style="color:var(--text-secondary); font-size:0.85rem;">+${o.loyaltyPointsEarned || 0} pts</span>
                </div>
            </div>`;
    }).join('');
}

function loadProfileBookings() {
    const container = document.getElementById('profileBookingsList');
    if (!container) return;
    const userBookings = bookings.filter(b => b.userId === currentUser.id).sort((a, b) => b.id - a.id);
    
    if (userBookings.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🪑</div><p>No bookings yet. Reserve a table to see them here!</p></div>';
        return;
    }
    
    container.innerHTML = userBookings.map(b => {
        const isApproved = b.status === 'Approved';
        const isCancellable = b.status === 'Pending' || b.status === 'Approved';
        const qrData = JSON.stringify({
            type: 'SPICE_GARDEN_BOOKING',
            id: b.id,
            table: b.tableNumber,
            date: b.date,
            time: b.time,
            guests: b.guests,
            name: b.name,
            phone: b.phone
        });
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}&color=d35400&bgcolor=ffffff`;
        
        return `
            <div class="booking-history-card">
                <div class="booking-history-header">
                    <div>
                        <strong>Table #${b.tableNumber}</strong>
                        <p style="font-size:0.8rem; color:var(--text-secondary);">${b.date} at ${b.time}</p>
                    </div>
                    <span class="status-badge status-${b.status}">${b.status}</span>
                </div>
                ${isApproved ? `
                    <div class="booking-qr-section">
                        <div class="qr-mini-container">
                            <img src="${qrUrl}" alt="Booking QR" class="booking-qr-img">
                        </div>
                        <div class="qr-info">
                            <p style="font-weight:700; margin:0 0 5px; color:var(--accent);">🎫 Show at Entrance</p>
                            <p style="font-size:0.8rem; color:var(--text-secondary); margin:0;">
                                Booking ID: #${b.id.toString().slice(-6)}<br>
                                ${b.qrSent ? '✅ QR sent to your email' : '📧 QR will be emailed soon'}
                            </p>
                        </div>
                    </div>
                ` : ''}
                ${isCancellable ? `
                    <button class="cancel-btn" onclick="openCancelBookingModal(${b.id})">❌ Cancel Reservation</button>
                ` : ''}
                ${b.status === 'Cancelled' && b.cancellationReason ? `
                    <div style="margin-top:12px; padding:12px; background:rgba(231,76,60,0.08); border:1px solid rgba(231,76,60,0.2); border-radius:8px; font-size:0.85rem; color:#e74c3c;">
                        <strong>❌ Cancelled:</strong> ${b.cancellationReason}
                    </div>
                ` : ''}
                <div class="booking-history-footer">
                    <span>👥 ${b.guests} guests</span>
                    ${b.admin_remarks ? `<span style="font-size:0.8rem; color:var(--text-secondary);">Note: ${b.admin_remarks}</span>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// ========== ORDER CANCELLATION SYSTEM ==========
function openCancelOrderModal(orderId) {
    const container = document.getElementById('modal-container');
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'cancelOrderModal';
    modal.innerHTML = `<div class="modal-content" style="text-align:left;"> <h3 style="color:#e74c3c; margin-bottom:10px;">❌ Cancel Order</h3> <p style="margin-bottom:15px; color:var(--text-secondary); font-size:0.9rem;">Are you sure you want to cancel Order #${orderId.toString().slice(-6)}?</p> <label style="font-size:0.85rem; font-weight:600; margin-bottom:5px; display:block;">Select Reason:</label> <select id="cancelOrderReason" class="cancel-reason-select"> <option value="Ordered by mistake">Ordered by mistake</option> <option value="Found better option">Found a better option</option> <option value="Delivery too late">Delivery taking too long</option> <option value="Change of plans">Change of plans</option> <option value="Other">Other</option> </select> <label style="font-size:0.85rem; font-weight:600; margin-bottom:5px; display:block;">Additional Details (Optional):</label> <textarea id="cancelOrderDetails" class="cancel-reason-textarea" placeholder="Tell us more..."></textarea> <div style="display:flex; gap:10px; margin-top:15px;"> <button class="secondary-btn" onclick="document.getElementById('cancelOrderModal').remove()" style="flex:1;">Keep Order</button> <button onclick="confirmCancelOrder(${orderId})" style="flex:1; background:linear-gradient(135deg, #e74c3c, #c0392b);">Confirm Cancel</button> </div> </div>`;
    container.appendChild(modal);
}

function confirmCancelOrder(orderId) {
    const reason = document.getElementById('cancelOrderReason').value;
    const details = document.getElementById('cancelOrderDetails').value.trim();
    const fullReason = details ? `${reason}: ${details}` : reason;
    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex !== -1) {
        orders[orderIndex].status = 'Cancelled';
        orders[orderIndex].cancellationReason = fullReason;
        orders[orderIndex].cancelledAt = new Date().toISOString();
        orders[orderIndex].cancellationFee = CANCELLATION_FEE;
        localStorage.setItem('orders', JSON.stringify(orders));
        document.getElementById('cancelOrderModal').remove();
        showToast('Order cancelled successfully', 'info');
        
        // ✅ Add ₹100 cancellation fee to cart
        addCancellationFeeToCart(`Order #${orderId.toString().slice(-6)}`);
        loadProfileOrders();
    }
}

// ========== BOOKING CANCELLATION SYSTEM ==========
function openCancelBookingModal(bookingId) {
    const container = document.getElementById('modal-container');
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'cancelBookingModal';
    modal.innerHTML = `<div class="modal-content" style="text-align:left;"> <h3 style="color:#e74c3c; margin-bottom:10px;">❌ Cancel Reservation</h3> <p style="margin-bottom:15px; color:var(--text-secondary); font-size:0.9rem;">Are you sure you want to cancel your table reservation?</p> <label style="font-size:0.85rem; font-weight:600; margin-bottom:5px; display:block;">Select Reason:</label> <select id="cancelBookingReason" class="cancel-reason-select"> <option value="Change of plans">Change of plans</option> <option value="Emergency">Emergency</option> <option value="Found another restaurant">Found another restaurant</option> <option value="Wrong date/time selected">Wrong date/time selected</option> <option value="Other">Other</option> </select> <label style="font-size:0.85rem; font-weight:600; margin-bottom:5px; display:block;">Additional Details (Optional):</label> <textarea id="cancelBookingDetails" class="cancel-reason-textarea" placeholder="Tell us more..."></textarea> <div style="display:flex; gap:10px; margin-top:15px;"> <button class="secondary-btn" onclick="document.getElementById('cancelBookingModal').remove()" style="flex:1;">Keep Reservation</button> <button onclick="confirmCancelBooking(${bookingId})" style="flex:1; background:linear-gradient(135deg, #e74c3c, #c0392b);">Confirm Cancel</button> </div> </div>`;
    container.appendChild(modal);
}

function confirmCancelBooking(bookingId) {
    const reason = document.getElementById('cancelBookingReason').value;
    const details = document.getElementById('cancelBookingDetails').value.trim();
    const fullReason = details ? `${reason}: ${details}` : reason;
    const booking = bookings.find(b => b.id === bookingId);
    
    if (!booking) return;
    
    // ✅ Remove booking completely
    bookings = bookings.filter(b => b.id !== bookingId);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    document.getElementById('cancelBookingModal').remove();
    showToast('Reservation cancelled and removed', 'info');
    
    // ✅ Add ₹100 cancellation fee to cart
    addCancellationFeeToCart(`Table Booking #${bookingId.toString().slice(-6)}`);
    loadProfileBookings();
    
    // ✅ Refresh table slots and seating chart
    const dateEl = document.getElementById('resDate');
    const timeEl = document.getElementById('resTime');
    if (dateEl) {
        renderSlots(dateEl.value);
        renderSeatingChart(dateEl.value, timeEl ? timeEl.value : '');
    }
}

// ========== ADD CANCELLATION FEE TO CART ==========
function addCancellationFeeToCart(label) {
    const feeItem = {
        id: Date.now(),
        name: `Cancellation Fee - ${label}`,
        price: CANCELLATION_FEE,
        qty: 1,
        emoji: "⚠️",
        category: "fee",
        isCancellationFee: true
    };
    cart.push(feeItem);
    saveCart();
    showToast(`₹${CANCELLATION_FEE} cancellation fee added to cart`, "error");
}

function updateLoyaltyTier(points) {
    let tier = { name: 'Bronze Member', icon: '🥉', badge: 'BRONZE', next: 500, current: 0 };
    if (points >= 2000) tier = { name: 'Platinum Member', icon: '💎', badge: 'PLATINUM', next: 5000, current: 2000 };
    else if (points >= 1000) tier = { name: 'Gold Member', icon: '🥇', badge: 'GOLD', next: 2000, current: 1000 };
    else if (points >= 500) tier = { name: 'Silver Member', icon: '🥈', badge: 'SILVER', next: 1000, current: 500 };
    
    document.getElementById('tierIcon').innerText = tier.icon;
    document.getElementById('tierName').innerText = tier.name;
    document.getElementById('tierPoints').innerText = points + ' Loyalty Points';
    document.getElementById('tierBadge').innerText = tier.badge;
    document.getElementById('tierNext').innerText = points >= 5000 ? '🎉 You have reached the highest tier!' : `Earn ${tier.next - points} more points to reach next tier!`;
    
    const progress = points >= 5000 ? 100 : ((points - tier.current) / (tier.next - tier.current)) * 100;
    document.getElementById('tierProgressBar').style.width = Math.min(progress, 100) + '%';
}

function redeemPoints(pointsNeeded, discountAmount) {
    if (!currentUser) return showToast('Please login first', 'error');
    if ((currentUser.loyaltyPoints || 0) < pointsNeeded) return showToast(`You need ${pointsNeeded} points to redeem this offer`, 'error');
    showModal('Redeem Points', `Redeem ${pointsNeeded} points for ₹${discountAmount} off on your next order?`, `confirmRedeemPoints(${pointsNeeded}, ${discountAmount})`);
}

function confirmRedeemPoints(pointsNeeded, discountAmount) {
    currentUser.loyaltyPoints -= pointsNeeded;
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showToast(`🎉 ₹${discountAmount} voucher added to your account!`, 'success');
    updateProfileUI();
}

// ========== THEME & NAVIGATION ==========
function toggleTheme() {
    const html = document.documentElement;
    const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    const toggleBtn = document.querySelector('.theme-toggle .toggle-icon');
    if (toggleBtn) toggleBtn.innerText = newTheme === 'light' ? '🌙' : '☀️';
}

function showPage(id) {
    document.querySelectorAll('.page-section').forEach(el => el.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (id === 'profilePage') updateProfileUI();
    if (id === 'reservePage') autoFillBookingDetails();
}

function toggleMobileMenu() {
    if (window.innerWidth <= 768) document.getElementById('mainNav').classList.toggle('active');
}

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

// ========== VOICE SEARCH ==========
function startVoiceSearch() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return showToast('Voice search not supported', 'error');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    document.getElementById('voiceSearchOverlay').style.display = 'flex';
    
    recognition.onresult = (event) => {
        document.getElementById('menuSearch').value = event.results[0][0].transcript.toLowerCase();
        document.getElementById('voiceSearchOverlay').style.display = 'none';
        loadMenu();
        showToast(`Searching for: ${event.results[0][0].transcript}`, 'success');
    };
    recognition.onerror = () => { document.getElementById('voiceSearchOverlay').style.display = 'none'; showToast('Voice search failed', 'error'); };
    recognition.onend = () => { document.getElementById('voiceSearchOverlay').style.display = 'none'; };
    recognition.start();
}

function stopVoiceSearch() { if (recognition) recognition.stop(); document.getElementById('voiceSearchOverlay').style.display = 'none'; }

// ========== CUSTOMER HELP ==========
function toggleHelp() {
const helpWindow = document.getElementById('helpWindow');
helpWindow.style.display = helpWindow.style.display === 'none' ? 'block' : 'none';
document.getElementById('helpBadge').style.display = 'none';
}

function openWhatsApp() {
const phoneNumber = "919876543210"; // Replace with your WhatsApp number
const message = encodeURIComponent("Hello! I need help with my order/query.");
window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

function openEmail() {
const email = "support@spicegarden.com"; // Replace with your email
const subject = encodeURIComponent("Customer Support Request");
const body = encodeURIComponent("Hello,\n\nI need help with:\n\nThank you!");
window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
}

function openPhone() {
const phoneNumber = "+918500545520"; // Replace with your phone number
window.open(`tel:${phoneNumber}`, '_blank');
}

// ========== WEATHER RECOMMENDATIONS ==========
async function loadWeatherRecommendation() {
    try {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&current_weather=true`);
            const data = await response.json();
            const temp = data.current_weather.temperature;
            
            let icon = '☀️', title = '', desc = '', dishes = [];
            if (temp > 30) { icon = '🌞'; title = 'Hot Day! Cool Down With...'; desc = 'Try our refreshing juices and ice creams!'; dishes = ['Mango Shake', 'Lemon Mint Cooler', 'Mango Kulfi']; }
            else if (temp < 20) { icon = '🌧️'; title = 'Cool Weather! Warm Up With...'; desc = 'Perfect for hot soups and spicy curries!'; dishes = ['Butter Chicken', 'Mutton Rogan Josh', 'Dal Makhani']; }
            else { icon = '⛅'; title = 'Perfect Weather for...'; desc = "Try our chef's special biryanis or pizzas!"; dishes = ['Chicken Biryani', 'Farmhouse Special Pizza', 'Paneer Tikka Burger']; }
            
            document.getElementById('weatherIcon').innerText = icon;
            document.getElementById('weatherTitle').innerText = title;
            document.getElementById('weatherDesc').innerText = desc + ' Recommended: ' + dishes.join(', ');
            document.getElementById('weatherBanner').style.display = 'block';
            document.getElementById('weatherBanner').dataset.dishes = JSON.stringify(dishes);
        });
    } catch (error) { console.log('Weather not available'); }
}

function showRecommendedDishes() {
    const dishes = JSON.parse(document.getElementById('weatherBanner').dataset.dishes || '[]');
    if (dishes.length === 0) return;
    document.getElementById('menuSearch').value = dishes[0];
    showPage('menuPage');
    loadMenu();
}

// ========== SEATING CHART ==========
function renderSeatingChart(date, time) {
    const grid = document.getElementById('tablesGrid');
    if (!grid) return;
    let bookedTableNumbers = [];
    
    if (date && time) {
        bookedTableNumbers = bookings
            .filter(b => b.date === date && b.time === time && b.status !== 'Rejected' && b.status !== 'Cancelled')
            .map(b => b.tableNumber);
    }
    
    let html = '';
    for (let i = 1; i <= TOTAL_TABLES; i++) {
        const isBooked = bookedTableNumbers.includes(i);
        const isSelected = userSelectedTable === i;
        const tableDetails = getTableDetails(i);
        
        html += `
            <div class="table-icon ${isBooked ? 'booked' : 'available'} ${isSelected ? 'selected' : ''}" 
                 ${!isBooked ? `onclick="selectTableForBooking(${i})"` : ''}
                 title="Table #${i} - ${tableDetails.tier}">
                <div class="table-emoji">🪑</div>
                <div class="table-number">#${i} <span style="font-size:0.6rem; color:var(--gold);">(${tableDetails.tier})</span></div>
                <div class="table-pricing" style="font-size:0.65rem; color:var(--text-secondary); margin:2px 0;">
                    Min: ₹${tableDetails.min} | Max: ₹${tableDetails.max}
                </div>
                <div class="table-status">${isBooked ? 'Booked' : (isSelected ? '✅ Selected' : 'Free')}</div>
            </div>`;
    }
    grid.innerHTML = html;
}

function selectTableForBooking(tableNum) {
    userSelectedTable = tableNum;
    const date = document.getElementById('resDate').value;
    const time = document.getElementById('resTime').value;
    renderSeatingChart(date, time);
    showToast(`Table #${tableNum} selected!`, 'success');
}

// ========== TODAY'S SPECIAL ==========
function loadTodaySpecial() {
    const specials = menuItems.filter(m => m.isSpecial);
    if (specials.length === 0) return;
    const special = specials[new Date().getDate() % specials.length];
    const chef = masterChefs.find(c => c.id === special.chefId);
    
    document.getElementById('todaySpecial').innerHTML = `
        <div class="special-content">
            <div class="special-emoji">${special.emoji}</div>
            <div class="special-info">
                <span class="special-badge">⭐ TODAY'S SPECIAL</span>
                <h3>${special.name}</h3>
                <p>By ${chef ? chef.name : 'Chef'}</p>
                <div class="special-price">₹${special.price}</div>
                <button onclick="addToCart(${special.id})" class="magnetic">Add to Cart</button>
            </div>
        </div>`;
}

// ========== GALLERY, REVIEWS & FAQ ==========
function loadGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    grid.innerHTML = menuItems.slice(0, 12).map(item => `<div class="gallery-item"><div class="gallery-emoji">${item.emoji}</div><div class="gallery-overlay"><div class="gallery-title">${item.name}</div></div></div>`).join('');
}

function loadReviews() {
    const grid = document.getElementById('reviewsGrid');
    if (!grid) return;
    grid.innerHTML = SAMPLE_REVIEWS.map(r => `<div class="review-card"><div class="review-header"><div class="review-avatar">${r.avatar}</div><div class="review-info"><div class="review-name">${r.name}</div><div class="review-date">${new Date().toLocaleDateString()}</div></div></div><div class="review-rating">${'⭐'.repeat(r.rating)}</div><p class="review-text">"${r.text}"</p></div>`).join('');
}

function loadFAQ() {
    const list = document.getElementById('faqList');
    if (!list) return;
    list.innerHTML = FAQS.map((f, i) => `<div class="faq-item" onclick="toggleFAQ(${i})"><div class="faq-question"><span>${f.q}</span><span class="faq-toggle">+</span></div><div class="faq-answer">${f.a}</div></div>`).join('');
}

function toggleFAQ(index) { document.querySelectorAll('.faq-item')[index].classList.toggle('active'); }

// ========== LIVE LOCATION ==========
function getLiveLocation() {
    const btn = document.getElementById('getLocationBtn');
    const status = document.getElementById('locationStatus');
    
    if (!navigator.geolocation) {
        status.innerHTML = "<span style='color:red;'>❌ Geolocation not supported.</span>";
        document.getElementById('manualAddress').style.display = 'block';
        return;
    }
    
    btn.disabled = true; btn.classList.add('loading'); btn.innerHTML = '📡 Detecting Location...';
    status.innerHTML = "<span style='color:#1976d2;'>📍 Please allow location access...</span>";
    
    navigator.geolocation.getCurrentPosition(async (position) => {
        status.innerHTML = "<span style='color:#1976d2;'>🔄 Converting to address...</span>";
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1`);
            const data = await response.json();
            const fullAddress = data.display_name || `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
            
            detectedLocation = { lat: position.coords.latitude, lng: position.coords.longitude, address: fullAddress };
            document.getElementById('detectedAddressBox').style.display = 'block'; 
            document.getElementById('detectedAddressText').innerText = fullAddress;
            document.getElementById('custLat').value = position.coords.latitude;
            document.getElementById('custLng').value = position.coords.longitude;
            document.getElementById('custAddress').value = fullAddress;
            status.innerHTML = "<span style='color:#2e7d32;'>✅ Location detected!</span>";
            btn.innerHTML = '🔄 Update Location'; btn.classList.remove('loading'); btn.disabled = false;
            showMiniMap(position.coords.latitude, position.coords.longitude, fullAddress);
            showToast("Location detected!", "success");
        } catch (error) { 
            btn.innerHTML = '🔄 Update Location'; btn.classList.remove('loading'); btn.disabled = false; 
        }
    }, (error) => { 
        status.innerHTML = `<span style='color:red;'>❌ Location error.</span>`; 
        document.getElementById('manualAddress').style.display = 'block'; 
        btn.innerHTML = '📍 Get My Live Location'; btn.classList.remove('loading'); btn.disabled = false; 
    }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 });
}

function showMiniMap(lat, lng, address) {
    const mapContainer = document.getElementById('locationMiniMap');
    if (!mapContainer) return;
    if (miniMap) { miniMap.remove(); miniMap = null; }
    
    miniMap = L.map('locationMiniMap').setView([lat, lng], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap', maxZoom: 19 }).addTo(miniMap);
    
    const customerIcon = L.divIcon({ html: `<div style="font-size:2rem; text-align:center;">📍</div>`, className: 'custom-customer-marker', iconSize: [40, 40], iconAnchor: [20, 20] });
    L.marker([lat, lng], { icon: customerIcon }).addTo(miniMap).bindPopup(`<div class="custom-marker-popup"><h3>📍 Delivery Location</h3><p>${address || `${lat.toFixed(5)}, ${lng.toFixed(5)}`}</p></div>`).openPopup();
    
    setTimeout(() => miniMap.invalidateSize(), 200);
}

function clearLocation() {
    detectedLocation = null;
    document.getElementById('detectedAddressBox').style.display = 'none';
    ['custLat','custLng','custAddress'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('locationStatus').innerHTML = '';
    document.getElementById('getLocationBtn').innerHTML = '📍 Get My Live Location';
    if (miniMap) { miniMap.remove(); miniMap = null; }
}

// ========== CHEFS & MENU ==========
function loadChefs() {
    const grid = document.getElementById('chefsGrid');
    if (!grid) return;
    grid.innerHTML = masterChefs.map(chef => `<div class="chef-card"><div class="chef-experience">${chef.experience}</div><span class="chef-avatar">${chef.emoji}</span><h3 class="chef-name">${chef.name}</h3><p class="chef-title">${chef.title}</p><div class="chef-specialty">${chef.specialty}</div><p class="chef-bio">${chef.bio}</p></div>`).join("");
}

function getChefById(id) { return masterChefs.find(c => c.id === id); }

function filterCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
    loadMenu();
}

function resetFilters() {
    document.getElementById('menuSearch').value = '';
    document.getElementById('priceFilter').value = 'all';
    document.getElementById('sortFilter').value = 'default';
    document.getElementById('dietaryFilter').value = 'all';
    document.getElementById('spiceFilter').value = 'all';
    loadMenu();
}

function loadMenu() {
    const search = document.getElementById('menuSearch')?.value.trim().toLowerCase() || '';
    const priceFilter = document.getElementById('priceFilter')?.value || 'all';
    const sortFilter = document.getElementById('sortFilter')?.value || 'default';
    const dietaryFilter = document.getElementById('dietaryFilter')?.value || 'all';
    const spiceFilter = document.getElementById('spiceFilter')?.value || 'all';
    
    let filtered = menuItems.filter(item => {
        const matchSearch = item.name.toLowerCase().includes(search) || item.category.toLowerCase().includes(search);
        const matchCategory = currentCategory === 'all' || item.category === currentCategory;
        let matchPrice = true;
        if (priceFilter === 'low') matchPrice = item.price < 200;
        else if (priceFilter === 'mid') matchPrice = item.price >= 200 && item.price <= 300;
        else if (priceFilter === 'high') matchPrice = item.price > 300;
        
        let matchDietary = true;
        if (dietaryFilter !== 'all') {
            const dietaryValues = Array.isArray(item.dietary) ? item.dietary : (item.dietary ? [item.dietary] : []);
            matchDietary = dietaryValues.includes(dietaryFilter);
        }
        
        let matchSpice = true;
        if (spiceFilter !== 'all') {
            const spiceValue = item.spice || item.spiceLevel || '';
            matchSpice = spiceValue === spiceFilter;
        }
        
        return matchSearch && matchCategory && matchPrice && matchDietary && matchSpice;
    });
    
    if (sortFilter === 'price-low') filtered.sort((a, b) => a.price - b.price);
    else if (sortFilter === 'price-high') filtered.sort((a, b) => b.price - a.price);
    else if (sortFilter === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
    
    const makeCard = (item) => {
        const isWishlisted = wishlist.includes(item.id);
        const cartItem = cart.find(c => c.id === item.id);
        const qty = cartItem ? cartItem.qty : 0;
        const chef = getChefById(item.chefId);
        const spiceValue = item.spice || item.spiceLevel || '';
        const spiceMap = { mild: '🟢', medium: '🟡', hot: '🔴' };
        const spiceIndicator = spiceValue ? `<span class="spice-indicator" title="${spiceValue}">${spiceMap[spiceValue] || ''}</span>` : '';
        const dietaryValues = Array.isArray(item.dietary) ? item.dietary : (item.dietary ? [item.dietary] : []);
        const dietaryBadges = dietaryValues.map(d => `<span class="dietary-badge ${d}">${getDietaryLabel(d)}</span>`).join('');
        
        return `
            <div class="card menu-card">
                ${item.isSpecial ? '<div class="chef-special-badge">🔥 Chef\'s Special</div>' : ''}
                <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${item.id})">${isWishlisted ? '❤️' : '🤍'}</button>
                <div class="menu-card-image">${item.emoji}</div>
                <div class="category-tag ${item.category}-badge">${item.category}</div>
                <h3>${item.name} ${spiceIndicator}</h3>
                <div class="dietary-badges">${dietaryBadges}</div>
                <p style="font-size:0.85rem; color:var(--text-secondary); margin:5px 0;">👨‍🍳 ${chef ? chef.name : 'Chef'}${item.calories ? ` • ${item.calories} cal` : ''}</p>
                <p style="font-size:1.3rem; color:var(--accent); font-weight:bold; margin:10px 0;">₹${item.price}</p>
                ${qty > 0 ? `
                    <div class="quantity-selector">
                        <button class="qty-btn" onclick="decreaseQty(${item.id})">-</button>
                        <span style="font-weight:700; font-size:1.1rem;">${qty}</span>
                        <button class="qty-btn" onclick="increaseQty(${item.id})" ${!isRestaurantOpen() ? 'disabled style="opacity:0.5; cursor:not-allowed; background:#555;"' : ''}>+</button>
                    </div>` : `<button onclick="addToCart(${item.id})" style="width:100%; ${!isRestaurantOpen() ? 'opacity:0.5; cursor:not-allowed; background:#555; box-shadow:none;' : ''}" ${!isRestaurantOpen() ? 'disabled' : ''}>${isRestaurantOpen() ? 'Add to Cart' : '🚫 Closed'}</button>`}
            </div>`;
    };
    
    document.getElementById("menu").innerHTML = filtered.length === 0 ? '<p style="text-align:center; padding:40px; color:var(--text-secondary);">No items match your filters</p>' : filtered.map(makeCard).join("");
}

function getDietaryLabel(type) {
    const labels = {
        'vegan': '🌱 Vegan',
        'vegetarian': '🥬 Veg',
        'gluten-free': '🌾 GF',
        'nut-free': '🥜 NF',
        'jain': '🕉️ Jain',
        'low-calorie': '🔥 Low-Cal'
    };
    return labels[type] || type;
}

function addToCart(id) {
    if (!isRestaurantOpen()) {
        showToast("🚫 Restaurant is closed! We deliver from 11 AM to 10 PM only.", "error");
        return;
    }
    const item = menuItems.find(m => m.id == id);
    const existing = cart.find(i => i.id == id);
    if (existing) { existing.qty++; } else { cart.push({ ...item, qty: 1 }); }
    saveCart();
    showToast(`${item.name} added to cart!`, 'success');
    loadMenu();
}

function increaseQty(id) {
    if (!isRestaurantOpen()) {
        showToast("🚫 Restaurant is closed! We deliver from 11 AM to 10 PM only.", "error");
        return;
    }
    const it = cart.find(i => i.id == id);
    if (it) { it.qty++; saveCart(); loadMenu(); }
}

function decreaseQty(id) {
    const it = cart.find(i => i.id == id);
    if (!it) return;
    if (it.qty > 1) { it.qty--; } else { cart = cart.filter(x => x.id != id); }
    saveCart(); loadMenu();
}

function removeItem(id) { cart = cart.filter(x => x.id != id); saveCart(); loadMenu(); }

// ========== WISHLIST ==========
function toggleWishlist(id) {
    if (wishlist.includes(id)) { wishlist = wishlist.filter(w => w !== id); showToast("Removed from wishlist", "info"); }
    else { wishlist.push(id); showToast("Added to wishlist ❤️", "success"); }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    loadMenu(); loadWishlist();
}

function loadWishlist() {
    const items = menuItems.filter(m => wishlist.includes(m.id));
    const grid = document.getElementById("wishlistGrid");
    if (!grid) return;
    if (items.length === 0) { grid.innerHTML = '<p style="text-align:center; padding:40px; color:var(--text-secondary);">Your wishlist is empty</p>'; }
    else { grid.innerHTML = items.map(item => `<div class="card menu-card"><button class="wishlist-btn active" onclick="toggleWishlist(${item.id})">❤️</button><div class="menu-card-image">${item.emoji}</div><h3>${item.name}</h3><p style="font-size:1.3rem; color:var(--accent); font-weight:bold; margin:10px 0;">₹${item.price}</p><button onclick="addToCart(${item.id})" style="width:100%;">Add to Cart</button></div>`).join(""); }
}

// ========== CART & LOYALTY ==========
function updateCartUI() {
    const count = cart.reduce((a, b) => a + b.qty, 0);
    document.getElementById("cartCount").innerText = count;
    document.getElementById("floatingCartCount").innerText = count;
    document.getElementById("floatingCart").style.display = count > 0 ? 'flex' : 'none';
    
    let html = ""; 
    let subtotal = 0;
    
    if (cart.length === 0) {
        document.getElementById("cartItems").innerHTML = "<p style='text-align:center; color:var(--text-secondary); margin-top:20px;'>Your cart is empty 🛒</p>";
        document.getElementById("loyaltySection").style.display = 'none';
    } else {
        cart.forEach(i => {
            subtotal += i.price * i.qty;
            
            // ✅ Cancellation fee item - cannot be changed or removed
            if (i.isCancellationFee) {
                html += `
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border:1px solid rgba(231,76,60,0.3); background:rgba(231,76,60,0.08); padding:10px; border-radius:10px;">
                        <div style="text-align:left; flex:1;">
                            <strong>${i.emoji || '⚠️'} ${i.name}</strong><br>
                            <small>₹${i.price} x ${i.qty} • Cancellation charge</small>
                        </div>
                        <div style="font-weight:bold; min-width:60px; text-align:right; color:#e74c3c;">
                            ₹${i.price * i.qty}
                        </div>
                    </div>
                `;
            }
            // Normal cart items
            else {
                html += `
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid var(--border); padding-bottom:8px;">
                        <div style="text-align:left; flex:1;">
                            <strong>${i.emoji} ${i.name}</strong><br>
                            <small>₹${i.price} x ${i.qty}</small>
                        </div>
                        <div style="display:flex; align-items:center; gap:8px;">
                            <button onclick="decreaseQty(${i.id})" style="padding:5px 10px; font-size:0.8rem;">-</button>
                            <span>${i.qty}</span>
                            <button onclick="increaseQty(${i.id})" style="padding:5px 10px; font-size:0.8rem;">+</button>
                            <button onclick="removeItem(${i.id})" style="background:#e74c3c; padding:5px 10px; font-size:0.8rem;">×</button>
                        </div>
                        <div style="font-weight:bold; min-width:60px; text-align:right;">
                            ₹${i.price * i.qty}
                        </div>
                    </div>
                `;
            }
        });
        document.getElementById("cartItems").innerHTML = html;
        document.getElementById("loyaltySection").style.display = (currentUser?.loyaltyPoints || 0) > 0 ? 'block' : 'none';
    }
    
    const discountAmount = Math.round(subtotal * currentDiscount);
    let loyaltyDiscount = 0;
    const loyaltyPoints = currentUser?.loyaltyPoints || 0;
    
    if (isLoyaltyRedeemed && loyaltyPoints > 0) {
        const maxRedeemable = Math.floor(loyaltyPoints / 100) * 10;
        loyaltyDiscount = Math.min(maxRedeemable, Math.floor((subtotal - discountAmount) * 0.5));
    }
    
    const taxableAmount = Math.max(0, subtotal - discountAmount - loyaltyDiscount);
    const gst = Math.round(taxableAmount * 0.18);
    const deliveryFee = subtotal > 0 ? 40 : 0;
    const grand = Math.max(0, taxableAmount + gst + deliveryFee);
    const newLoyaltyPoints = Math.floor(grand / 100);
    
    document.getElementById("cartSubtotal").innerText = subtotal;
    document.getElementById("cartDiscount").innerText = discountAmount;
    document.getElementById("discountRow").style.display = currentDiscount > 0 ? 'block' : 'none';
    document.getElementById("cartLoyaltyDiscount").innerText = loyaltyDiscount;
    document.getElementById("loyaltyRow").style.display = loyaltyDiscount > 0 ? 'block' : 'none';
    document.getElementById("cartGst").innerText = gst;
    document.getElementById("deliveryFee").innerText = deliveryFee;
    document.getElementById("cartTotal").innerText = grand;
    document.getElementById("loyaltyPointsEarned").innerText = newLoyaltyPoints;
    document.getElementById("availableLoyaltyPoints").innerText = loyaltyPoints;
    document.getElementById("loyaltyDiscountValue").innerText = Math.min(Math.floor(loyaltyPoints / 100) * 10, Math.floor((subtotal - discountAmount) * 0.5));
    
    currentUPIAmount = grand;
    const upiAmountEl = document.getElementById("upiAmount");
    if (upiAmountEl) upiAmountEl.innerText = grand;
    
    const paymentMethod = document.getElementById("paymentMethod")?.value;
    if (paymentMethod === 'upi' && document.getElementById("upiQRSection").style.display !== 'none') generateUPIQR(grand);
}

function saveCart() { localStorage.setItem("cart", JSON.stringify(cart)); updateCartUI(); }

function toggleCart() {
    document.getElementById("cartSidebar").classList.toggle("open");
    autoFillCustomerDetails();
}

function applyCoupon() {
    const code = document.getElementById("couponCode").value.trim().toUpperCase();
    const msgEl = document.getElementById("couponMsg");
    const subtotal = cart.reduce((s, it) => s + (it.price * it.qty), 0);
    
    if (!code) { currentDiscount = 0; msgEl.innerText = ""; saveCart(); return; }
    const coupon = COUPONS[code];
    
    if (!coupon) { currentDiscount = 0; msgEl.innerText = "❌ Invalid coupon code."; msgEl.style.color = "red"; }
    else if (subtotal < coupon.minAmount) { currentDiscount = 0; msgEl.innerText = `❌ Add ₹${coupon.minAmount - subtotal} more.`; msgEl.style.color = "red"; }
    else { currentDiscount = coupon.discount; msgEl.innerText = `✅ Applied: ${coupon.desc}`; msgEl.style.color = "green"; showToast("Coupon applied!", "success"); }
    
    isLoyaltyRedeemed = false;
    document.getElementById("redeemLoyaltyCheck").checked = false;
    saveCart();
}

function toggleLoyaltyRedemption() { isLoyaltyRedeemed = document.getElementById("redeemLoyaltyCheck").checked; saveCart(); }

function handleDeliveryTimeChange() { document.getElementById('scheduleDateTime').style.display = document.getElementById('deliveryTimeOption').value === 'schedule' ? 'block' : 'none'; }

// ========== UPI QR CODE ==========
function generateUPIQR(amount) {
    const qrContainer = document.getElementById("upiQRCode");
    if (!qrContainer) return;
    const upiLink = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(UPI_MERCHANT_NAME)}&am=${amount}&cu=INR&tn=Order-${Date.now().toString().slice(-6)}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}&color=d35400&bgcolor=ffffff`;
    qrContainer.innerHTML = `<img src="${qrUrl}" alt="UPI QR Code" style="width:200px; height:200px; display:block;">`;
    document.getElementById("upiIdDisplay").innerText = UPI_ID;
    document.getElementById("upiAmount").innerText = amount;
}

function handlePaymentMethodChange() {
    const paymentMethod = document.getElementById("paymentMethod").value;
    const upiSection = document.getElementById("upiQRSection");
    if (paymentMethod === 'upi') { upiSection.style.display = 'block'; upiPaymentConfirmed = false; generateUPIQR(currentUPIAmount); }
    else { upiSection.style.display = 'none'; upiPaymentConfirmed = false; }
}

function openPaymentConfirmation() {
    if (currentUPIAmount <= 0) return showToast("Add items first", "error");
    const container = document.getElementById('modal-container');
    const modal = document.createElement('div');
    modal.className = 'upi-modal';
    modal.innerHTML = `<div class="upi-modal-content"><h3>💳 UPI Payment Confirmation</h3><p>Amount: <strong>₹${currentUPIAmount}</strong></p><input type="text" id="upiTransactionId" placeholder="Enter UTR Number" style="width:100%; margin:15px 0;"><div style="display:flex; gap:10px;"><button class="secondary-btn" onclick="this.closest('.upi-modal').remove()" style="flex:1;">Cancel</button><button onclick="confirmUPIPayment()" style="flex:1; background:#27ae60;">✅ Confirm</button></div></div>`;
    container.appendChild(modal);
}

function confirmUPIPayment() {
    const utr = document.getElementById("upiTransactionId").value.trim();
    if (!utr || utr.length < 6) return showToast("Enter valid UTR", "error");
    document.querySelector('.upi-modal').remove();
    upiPaymentConfirmed = true;
    showToast("Payment confirmed!", "success");
}

// ========== PLACE ORDER ==========
function placeOrder() {
    if (!isRestaurantOpen()) {
        showToast("🚫 Restaurant is currently closed. Orders can only be placed between 11 AM and 10 PM.", "error");
        return;
    }
    
    if (!currentUser) {
        showModal("🔒 Login Required", "You must be logged in to place an order. This ensures we can send you order updates and loyalty rewards!", "showPage('profilePage')");
        return;
    }
    
    let name = document.getElementById("custName").value.trim();
    let email = document.getElementById("custEmail").value.trim();
    let phone = document.getElementById("custPhone").value.trim();
    let payment = document.getElementById("paymentMethod").value;
    let instructions = document.getElementById("specialInstructions").value.trim();
    let address = document.getElementById("custAddress").value.trim();
    let lat = document.getElementById("custLat").value;
    let lng = document.getElementById("custLng").value;
    
    if (!address) { 
        const manualAddr = document.getElementById("manualAddress").value.trim(); 
        if (manualAddr) { address = manualAddr; lat = ''; lng = ''; } 
    }
    
    if (!name || !email || !phone) return showToast("Fill name, email, phone.", "error");
    if (!/^\d{10}$/.test(phone)) return showToast("Valid 10-digit phone required.", "error");
    if (!address) return showToast("📍 Enter delivery address.", "error");
    if (cart.length === 0) return showToast("Cart is empty!", "error");
    if (payment === 'upi' && !upiPaymentConfirmed) return showToast("Complete UPI payment first!", "error");
    
    const subtotal = cart.reduce((s, it) => s + (it.price * it.qty), 0);
    const discountAmount = Math.round(subtotal * currentDiscount);
    let loyaltyDiscount = 0;
    
    if (isLoyaltyRedeemed && currentUser && currentUser.loyaltyPoints > 0) {
        const maxRedeemable = Math.floor(currentUser.loyaltyPoints / 100) * 10;
        loyaltyDiscount = Math.min(maxRedeemable, Math.floor((subtotal - discountAmount) * 0.5));
    }
    
    const taxableAmount = Math.max(0, subtotal - discountAmount - loyaltyDiscount);
    const gst = Math.round(taxableAmount * 0.18);
    const deliveryFee = 40;
    const grand = Math.max(0, taxableAmount + gst + deliveryFee);
    const earnedPoints = Math.floor(grand / 100);
    
    if (isLoyaltyRedeemed && loyaltyDiscount > 0 && currentUser) {
        currentUser.loyaltyPoints = Math.max(0, currentUser.loyaltyPoints - ((loyaltyDiscount / 10) * 100));
    }
    
    if (currentUser) {
        currentUser.loyaltyPoints = (currentUser.loyaltyPoints || 0) + earnedPoints;
        currentUser.totalOrders = (currentUser.totalOrders || 0) + 1;
        currentUser.totalSpent = (currentUser.totalSpent || 0) + grand;
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) { users[userIndex] = currentUser; localStorage.setItem('users', JSON.stringify(users)); }
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    
    let upiTransactionId = '';
    if (payment === 'upi') { const utrEl = document.getElementById("upiTransactionId"); upiTransactionId = utrEl ? utrEl.value : ''; }
    
    const order = { 
        id: Date.now(), userId: currentUser.id, name, email, phone, address, lat, lng, payment, instructions, 
        items: [...cart], subtotal, discount: discountAmount, loyaltyDiscount, gst, delivery: deliveryFee, total: grand, 
        status: 'Placed', paymentStatus: payment === 'upi' ? 'Paid' : 'PaymentPending', upiTransactionId, 
        date: new Date().toISOString(), loyaltyPointsEarned: earnedPoints 
    };
    
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    showModal("Order Placed! 🎉", `Order #${order.id.toString().slice(-6)}<br>Total: ₹${grand}<br>You earned ${earnedPoints} points! 🎁`, "");
    
    cart = []; currentDiscount = 0; isLoyaltyRedeemed = false; upiPaymentConfirmed = false; detectedLocation = null;
    saveCart(); toggleCart();
    document.getElementById("upiQRSection").style.display = 'none';
    document.getElementById("paymentMethod").value = 'cod';
    ["custName", "custEmail", "custPhone", "custAddress", "custLat", "custLng", "specialInstructions"].forEach(id => { const el = document.getElementById(id); if (el) el.value = ""; });
    document.getElementById("detectedAddressBox").style.display = 'none';
    document.getElementById("manualAddress").value = '';
    document.getElementById("manualAddress").style.display = 'none';
    document.getElementById("locationStatus").innerHTML = '';
    document.getElementById("getLocationBtn").innerHTML = '📍 Get My Live Location';
    if (miniMap) { miniMap.remove(); miniMap = null; }
}

// ========== BOOKING ==========
function submitBooking() {
    if (!currentUser) {
        showModal("🔒 Login Required", "You must be logged in to reserve a table. Please login or create an account to continue!", "showPage('profilePage')");
        return;
    }
    
    const resMsg = document.getElementById('resMsg');
    const slot = document.getElementById('resTime').value;
    const name = document.getElementById('resName').value.trim();
    const phone = document.getElementById('resPhone').value.trim();
    const email = document.getElementById('resEmail').value.trim();
    const date = document.getElementById('resDate').value;
    const guests = document.getElementById('resGuests').value;
    resMsg.innerHTML = "";
    
    if (!name || !phone || !email || !date || !slot || !guests) return resMsg.innerHTML = "<span style='color:red;'>Fill all fields.</span>";
    if (!/^\d{10}$/.test(phone)) return resMsg.innerHTML = "<span style='color:red;'>Valid phone required.</span>";
    
    const today = new Date().toISOString().split('T')[0];
    if (date < today) return resMsg.innerHTML = "<span style='color:red;'>Select future date.</span>";
    
    const bookedTableNumbers = bookings
        .filter(b => b.date === date && b.time === slot && b.status !== 'Rejected' && b.status !== 'Cancelled')
        .map(b => b.tableNumber);
    let assignedTable = null;
    
    for (let i = 1; i <= TOTAL_TABLES; i++) {
        if (!bookedTableNumbers.includes(i)) {
            assignedTable = i;
            break;
        }
    }
    
    if (!assignedTable) {
        return resMsg.innerHTML = "<span style='color:red;'>❌ All tables are booked for this slot. Please choose another time.</span>";
    }
    
    const b = { 
        id: Date.now(), 
        userId: currentUser.id, 
        name, phone, email, date, time: slot, guests, 
        status: 'Pending', 
        admin_remarks: '', 
        tableNumber: assignedTable 
    };
    
    bookings.push(b);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    
    if (currentUser) {
        currentUser.totalBookings = (currentUser.totalBookings || 0) + 1;
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) { users[userIndex] = currentUser; localStorage.setItem('users', JSON.stringify(users)); }
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    
    const tableDetails = getTableDetails(assignedTable);
    resMsg.innerHTML = `
        <span style='color:green;'>✅ Booked! Table #${assignedTable} (${tableDetails.tier}) assigned to you.</span>
        <div style="margin-top:10px; padding:10px; background:rgba(243,156,18,0.1); border:1px solid var(--gold); border-radius:8px; font-size:0.85rem; color:var(--gold);">
            ⚠️ <strong>Billing Requirement:</strong> Minimum ₹${tableDetails.min} - Maximum ₹${tableDetails.max}
        </div>
    `;
    showToast("Booking submitted!", "success");
    renderSlots(date);
    renderSeatingChart(date, slot);
    document.querySelectorAll('#reservePage input').forEach(i => i.value = '');
    document.getElementById('resTime').value = '';
}

function parseSlotToMinutes(s) {
    const m = (s || '').match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!m) return null;
    let h = parseInt(m[1], 10), min = parseInt(m[2], 10), ap = m[3].toUpperCase();
    if (ap === 'PM' && h < 12) h += 12;
    if (ap === 'AM' && h === 12) h = 0;
    return h * 60 + min;
}

function formatMinutesToSlot(totalMin) {
    totalMin = ((totalMin % (24 * 60)) + (24 * 60)) % (24 * 60);
    let h = Math.floor(totalMin / 60), m = totalMin % 60;
    const ap = h >= 12 ? 'PM' : 'AM';
    if (h === 0) h = 12; else if (h > 12) h = h - 12;
    return `${h}:${m.toString().padStart(2, '0')} ${ap}`;
}

function generateSlots(start, end, step = 30) {
    const a = parseSlotToMinutes(start), b = parseSlotToMinutes(end);
    if (a === null || b === null) return [];
    const slots = [];
    for (let t = a; t <= b; t += step) slots.push(formatMinutesToSlot(t));
    return slots;
}

const allTimeSlots = [...generateSlots('6:00 AM', '9:00 AM'), ...generateSlots('6:00 PM', '9:00 PM')];

function renderSlots(date) {
    const slotsEl = document.getElementById('slots');
    if (!slotsEl) return;
    const today = new Date().toISOString().split('T')[0];
    const currentMinutes = new Date().getHours() * 60 + new Date().getMinutes();
    let slotsToShow = date === today ? allTimeSlots.filter(s => parseSlotToMinutes(s) > currentMinutes + 30) : allTimeSlots;
    
    if (slotsToShow.length === 0) { 
        slotsEl.innerHTML = '<p style="color:red; font-weight:700;">No slots available</p>'; 
        return; 
    }
    
    slotsEl.innerHTML = slotsToShow.map(s => {
        const bookedCount = bookings.filter(b => b.date === date && b.time === s && b.status !== 'Rejected' && b.status !== 'Cancelled').length;
        const availableTables = TOTAL_TABLES - bookedCount;
        const isFull = availableTables === 0;
        let availabilityClass = 'available', availabilityText = `${availableTables}/${TOTAL_TABLES} tables`;
        if (isFull) { availabilityClass = 'full'; availabilityText = 'FULL'; }
        else if (availableTables <= 2) { availabilityClass = 'limited'; availabilityText = `${availableTables} left!`; }
        return `<button ${isFull ? 'disabled' : ''} class="slot-btn ${availabilityClass}" onclick="selectSlot(this, '${s}')"><span class="slot-time">${s}</span><span class="slot-availability">${availabilityText}</span></button>`;
    }).join("");
    
    const selectedTime = document.getElementById('resTime').value;
    if (selectedTime && slotsToShow.includes(selectedTime)) {
        renderSeatingChart(date, selectedTime);
    } else if (slotsToShow.length > 0) {
        renderSeatingChart(date, slotsToShow[0]);
    }
}

function selectSlot(btn, slot) {
    document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('selected'));
    if (btn.disabled) return showToast('All tables booked', 'error');
    btn.classList.add('selected');
    document.getElementById('resTime').value = slot;
    const date = document.getElementById('resDate').value;
    renderSeatingChart(date, slot);
}

// ========== TRACK ORDER ==========
function trackOrder() {
    const phone = document.getElementById("trackPhone").value.trim();
    const resultDiv = document.getElementById("trackResult");
    if (!/^\d{10}$/.test(phone)) { resultDiv.innerHTML = "<p style='color:red;'>Valid phone required.</p>"; return; }
    const userOrders = orders.filter(o => o.phone === phone).sort((a, b) => b.id - a.id);
    if (userOrders.length === 0) { resultDiv.innerHTML = "<p>No orders found.</p>"; }
    else {
        let html = "<h3>Your Orders:</h3>";
        userOrders.forEach(o => { html += `<div class="card" style="text-align:left; margin-bottom:20px;"><strong>Order #${o.id.toString().slice(-6)}</strong><span class="status-badge status-${o.status}">${o.status}</span><p>Total: ₹${o.total}</p></div>`; });
        resultDiv.innerHTML = html;
    }
}

function trackMyBookings() {
    const phone = document.getElementById("bookingTrackPhone").value.trim();
    const resultDiv = document.getElementById("myBookingsResult");
    if (!/^\d{10}$/.test(phone)) { resultDiv.innerHTML = "<p style='color:red;'>Valid phone required.</p>"; return; }
    const userBookings = bookings.filter(b => b.phone === phone);
    if (userBookings.length === 0) { resultDiv.innerHTML = "<p>No bookings found.</p>"; }
    else { resultDiv.innerHTML = userBookings.map(b => `<div class="card" style="margin-bottom:15px;"><strong>${b.date} at ${b.time}</strong><span class="status-badge status-${b.status}">${b.status}</span><p>Table #${b.tableNumber} | ${b.guests} guests</p></div>`).join(''); }
}

function buyVoucher(amount) { showToast(`Voucher of ₹${amount} added! 🎁`, 'success'); }

// ========== PROMO CAROUSEL ==========
let currentPromoSlide = 0;

function initPromoCarousel() {
    const slides = document.querySelectorAll('.promo-slide');
    const dotsContainer = document.getElementById('promoDots');
    if (slides.length === 0) return;
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'promo-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToPromoSlide(i);
        dotsContainer.appendChild(dot);
    });
    setInterval(() => { currentPromoSlide = (currentPromoSlide + 1) % slides.length; goToPromoSlide(currentPromoSlide); }, 5000);
}

function goToPromoSlide(index) {
    const slides = document.querySelectorAll('.promo-slide');
    const dots = document.querySelectorAll('.promo-dot');
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentPromoSlide = index;
}

// ========== INITIALIZATION ==========
function initPage() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const toggleBtn = document.querySelector('.theme-toggle .toggle-icon');
    if (toggleBtn) toggleBtn.innerText = savedTheme === 'light' ? '🌙' : '☀️';
    
    loadMenu(); loadChefs(); loadWishlist(); loadReviews(); loadFAQ(); loadTodaySpecial(); loadGallery(); 
    initPromoCarousel(); loadWeatherRecommendation(); updateProfileUI(); saveCart();
    
    // 🆕 Show Open/Closed Banner
    updateRestaurantStatusBanner();
    
    // 🆕 Check status every 60 seconds
    setInterval(() => {
        updateRestaurantStatusBanner();
        if (document.getElementById('menu').innerHTML !== '') {
            loadMenu();
        }
    }, 60000);
    
    const paymentSelect = document.getElementById("paymentMethod");
    if (paymentSelect) paymentSelect.addEventListener('change', handlePaymentMethodChange);
    
    const resDateEl = document.getElementById('resDate');
    if (resDateEl) {
        const today = new Date().toISOString().split('T')[0];
        resDateEl.min = today; 
        resDateEl.value = today;
        resDateEl.addEventListener('change', () => {
            renderSlots(resDateEl.value);
            const selectedTime = document.getElementById('resTime').value;
            renderSeatingChart(resDateEl.value, selectedTime);
        });
        renderSlots(resDateEl.value);
        renderSeatingChart(today, '');
    }
    
    const scheduleDate = document.getElementById('scheduleDate');
    if (scheduleDate) scheduleDate.min = new Date().toISOString().split('T')[0];
    
    window.addEventListener('scroll', () => {
        const backToTop = document.getElementById('backToTop');
        if (backToTop) { if (window.scrollY > 300) backToTop.classList.add('visible'); else backToTop.classList.remove('visible'); }
    });
}

// ========== 🆕 ROBUST PRELOADER HANDLER ==========
let pageInitialized = false;

function hidePreloader() {
    if (pageInitialized) return;
    pageInitialized = true;
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.transition = 'opacity 0.8s ease, visibility 0.8s';
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        preloader.style.pointerEvents = 'none';
        setTimeout(() => {
            preloader.style.display = 'none';
            initPage();
        }, 800);
    } else {
        initPage();
    }
}

window.addEventListener('load', () => {
    setTimeout(hidePreloader, 800);
});

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(hidePreloader, 1500);
});

setTimeout(hidePreloader, 5000);

// ✅ FIXED: Single sendCustomerEmail with correct syntax
function sendCustomerEmail(order) {
    if(!order.email) return;
    const templateParams = {
        to_name: order.name,
        to_email: order.email,
        order_id: order.id.toString().slice(-6),
        order_total: order.total,
        order_items: order.items.map(i => `${i.name} x ${i.qty} = ₹${i.price * i.qty}`).join('\n')
    };
    emailjs.send('service_tos6ezb', 'template_booking_qr', templateParams)
    .then(() => {
        showToast("Receipt sent to your email! 📧", "success");
    }, (err) => {
        console.log("EmailJS Error:", err);
        showToast("Email failed to send", "error");
    });
}

function sendWhatsAppAlertToAdmin(type, data) {
    const adminNumber = "8500545520";
    let message = `🚨 NEW ORDER ALERT 🚨 Order ID: #${data.id.toString().slice(-6)} Customer: ${data.name} Total: ₹${data.total}`;
    window.open(`https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

// ========== PWA INSTALL PROMPT ==========
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (!localStorage.getItem('pwaDismissed')) {
        setTimeout(() => {
            document.getElementById('pwaInstallPrompt').style.display = 'block';
        }, 10000);
    }
});

function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choice) => {
            if (choice.outcome === 'accepted') {
                showToast('🎉 App installed successfully!', 'success');
            }
            deferredPrompt = null;
            document.getElementById('pwaInstallPrompt').style.display = 'none';
        });
    }
}

function dismissPWA() {
    document.getElementById('pwaInstallPrompt').style.display = 'none';
    localStorage.setItem('pwaDismissed', 'true');
}

// ========== DINE-IN QR CODE DETECTION ==========
function checkDineInMode() {
    const urlParams = new URLSearchParams(window.location.search);
    const tableNum = urlParams.get('table');
    if (tableNum) {
        showPage('dineInPage');
        document.getElementById('dineInTableNum').innerText = tableNum;
        localStorage.setItem('dineInTable', tableNum);
        localStorage.setItem('dineInMode', 'true');
        showToast(`🍽️ Welcome! Ordering for Table #${tableNum}`, 'success');
    }
}

// ========== SERVICE WORKER REGISTRATION ==========
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('✅ SW registered:', reg.scope))
        .catch((err) => console.log('❌ SW failed:', err));
    });
}

function initNewFeatures() {
    checkDineInMode();
}

// ===== 🎛️ REAL-TIME STYLE CUSTOMIZER =====
const root = document.documentElement;

document.querySelector('.customizer-toggle')?.addEventListener('click', () => {
    document.querySelector('.customizer-panel').classList.toggle('open');
});

document.querySelector('.customizer-close')?.addEventListener('click', () => {
    document.querySelector('.customizer-panel').classList.remove('open');
});

function setLiveVar(name, value) {
    root.style.setProperty(name, value);
    localStorage.setItem('userStyle_' + name, value);
}

document.querySelectorAll('.color-swatch').forEach(sw => {
    sw.addEventListener('click', () => {
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        sw.classList.add('active');
        setLiveVar('--user-accent', sw.dataset.accent);
        setLiveVar('--user-accent-2', sw.dataset.accent2);
    });
});

document.getElementById('accentPicker')?.addEventListener('input', e => setLiveVar('--user-accent', e.target.value));
document.getElementById('accent2Picker')?.addEventListener('input', e => setLiveVar('--user-accent-2', e.target.value));

document.getElementById('radiusSlider')?.addEventListener('input', e => {
    setLiveVar('--card-radius', e.target.value + 'px');
    document.getElementById('radiusValue').textContent = e.target.value + 'px';
});

document.getElementById('fontSlider')?.addEventListener('input', e => {
    setLiveVar('--font-scale', e.target.value);
    document.getElementById('fontValue').textContent = Math.round(e.target.value * 100) + '%';
});

document.getElementById('speedSlider')?.addEventListener('input', e => {
    setLiveVar('--anim-speed', e.target.value);
    document.getElementById('speedValue').textContent = e.target.value + 'x';
});

document.getElementById('glowSlider')?.addEventListener('input', e => {
    setLiveVar('--glow-opacity', e.target.value);
    document.getElementById('glowValue').textContent = Math.round(e.target.value * 100) + '%';
});

document.getElementById('blurSlider')?.addEventListener('input', e => {
    setLiveVar('--blur-strength', e.target.value + 'px');
    document.getElementById('blurValue').textContent = e.target.value + 'px';
});

document.getElementById('animToggle')?.addEventListener('change', e => {
    root.setAttribute('data-animations', e.target.checked ? 'on' : 'off');
    localStorage.setItem('userStyle_animations', e.target.checked ? 'on' : 'off');
});

document.querySelector('.customizer-reset')?.addEventListener('click', () => {
    ['--user-accent','--user-accent-2','--card-radius','--btn-radius','--font-scale','--anim-speed','--glow-opacity','--blur-strength']
    .forEach(v => { root.style.removeProperty(v); localStorage.removeItem('userStyle_' + v); });
    location.reload();
});

['--user-accent','--user-accent-2','--card-radius','--btn-radius','--font-scale','--anim-speed','--glow-opacity','--blur-strength']
.forEach(v => {
    const saved = localStorage.getItem('userStyle_' + v);
    if (saved) root.style.setProperty(v, saved);
});

// ========== 🆕 ADDRESS SEARCH & UPDATE ==========
function searchAddress() {
    const query = document.getElementById('addressSearchInput').value.trim();
    const statusEl = document.getElementById('locationStatus');
    
    if (!query) {
        showToast('Please enter an address to search', 'error');
        return;
    }
    
    if (statusEl) statusEl.innerHTML = "<span style='color:#1976d2;'>🔍 Searching for address...</span>";
    
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const result = data[0];
                const fullAddress = result.display_name;
                const lat = parseFloat(result.lat);
                const lng = parseFloat(result.lon);
                
                const latEl = document.getElementById('custLat');
                const lngEl = document.getElementById('custLng');
                const addrEl = document.getElementById('custAddress');
                if (latEl) latEl.value = lat;
                if (lngEl) lngEl.value = lng;
                if (addrEl) addrEl.value = fullAddress;
                
                const detectedBox = document.getElementById('detectedAddressBox');
                const detectedText = document.getElementById('detectedAddressText');
                if (detectedBox) detectedBox.style.display = 'block';
                if (detectedText) detectedText.innerText = fullAddress;
                
                const searchInput = document.getElementById('addressSearchInput');
                if (searchInput) searchInput.value = '';
                if (statusEl) statusEl.innerHTML = "<span style='color:#2e7d32;'>✅ Address updated successfully!</span>";
                
                showMiniMap(lat, lng, fullAddress);
                showToast("Delivery address updated! 📍", "success");
            } else {
                if (statusEl) statusEl.innerHTML = "<span style='color:red;'>❌ Address not found. Please try again.</span>";
                showToast("Could not find that address", "error");
            }
        })
        .catch(error => {
            console.error(error);
            if (statusEl) statusEl.innerHTML = "<span style='color:red;'>❌ Search failed. Check your connection.</span>";
            showToast("Address search failed", "error");
        });
}

// ========== 🆕 SEND LOCATION TO ADMIN VIA WHATSAPP ==========
function sendLocationToAdmin() {
    const lat = document.getElementById('custLat')?.value;
    const lng = document.getElementById('custLng')?.value;
    const address = document.getElementById('custAddress')?.value || 'Location shared via map';
    const adminNumber = "8500545520";
    
    if (!lat || !lng) {
        showToast("Please detect or search your location first!", "error");
        return;
    }
    
    const mapLink = `https://www.google.com/maps?q=${lat},${lng}`;
    const message = `📍 *Delivery Location Update*\n\n*Address:* ${address}\n*Map Link:* ${mapLink}\n\nPlease deliver my order here!`;
    
    const whatsappNumber = normalizeWhatsAppPhone(adminNumber);
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    showToast("Opening WhatsApp to send location...", "success");
}

// Helper function for WhatsApp phone normalization
function normalizeWhatsAppPhone(phone) {
    let digits = String(phone || "").replace(/[^0-9]/g, "");
    if (!digits) return "";
    digits = digits.replace(/^0+/, "");
    if (digits.length === 10) return "91" + digits;
    if (digits.length >= 10 && digits.length <= 15) return digits;
    return "";
}