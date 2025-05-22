// Chat Widget Functionality

// DOM Elements
const chatIcon = document.getElementById('chat-icon');
const chatContainer = document.getElementById('chat-container');
const minimizeChat = document.getElementById('minimize-chat');
const closeChat = document.getElementById('close-chat');
const chatMessages = document.getElementById('chat-messages');
const chatMessageInput = document.getElementById('chat-message-input');
const sendMessageBtn = document.getElementById('send-message');

// Default chat responses for demonstration purposes
const mysticalResponses = [
    "The universe speaks through symbols. What symbols have been appearing in your life lately?",
    "Your spiritual journey is uniquely yours. How can I help guide you on this path?",
    "The connection between mind, body, and spirit is sacred. How do you nurture this balance?",
    "Our apparel is designed to align with your energy and enhance your spiritual practice.",
    "Each tarot card holds wisdom waiting to be discovered. Have you explored our tarot reading feature?",
    "The answers you seek are often found within. Our designs help manifest that inner wisdom.",
    "Many customers report feeling a deeper connection to their spiritual practice when wearing our apparel.",
    "Our designs incorporate ancient symbols that resonate with different aspects of spiritual awakening.",
    "Would you like me to recommend items that align with your spiritual interests?",
    "The Trismegisto collection combines modern style with timeless spiritual wisdom."
];

// Product recommendations
const productRecommendations = [
    "You might resonate with our 'Seeker T-Shirt' - it's designed for those on a journey of spiritual discovery.",
    "Based on your interests, I'd recommend exploring the 'Flame Hoodie' - it represents inner transformation.",
    "Many with similar energies find connection to 'The Mirror Tank Top' - perfect for reflection practices.",
    "The 'Vessel Long Sleeve' could be a good match for you - it symbolizes your capacity for spiritual growth.",
    "Our 'High Priestess T-Shirt' is popular among those seeking to enhance their intuitive abilities.",
    "For your path, the 'Empress Hoodie' might be especially meaningful - it embodies creative spiritual energy."
];

// Animation and interactive features you can customize
const crystalAnimation = {
    play: () => {
        const chatCrystal = document.querySelector('.chat-crystal-inner');
        chatCrystal.style.animation = 'none';
        setTimeout(() => {
            chatCrystal.style.animation = 'chat-crystal-glow 4s infinite alternate';
        }, 10);
    }
};

// Chat event listeners
chatIcon.addEventListener('click', () => {
    chatContainer.classList.add('active');
    // Enhance crystal animation when chat opens
    crystalAnimation.play();
});

minimizeChat.addEventListener('click', () => {
    chatContainer.classList.remove('active');
});

closeChat.addEventListener('click', () => {
    chatContainer.classList.remove('active');
});

// Send message when Enter key is pressed in input field
chatMessageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Send message when send button is clicked
sendMessageBtn.addEventListener('click', sendMessage);

// Function to send user message and get response
function sendMessage() {
    const message = chatMessageInput.value.trim();
    
    if (message.length === 0) return;
    
    // Add user message to chat
    addMessage(message, 'sent');
    
    // Clear input field
    chatMessageInput.value = '';
    
    // Simulate typing indicator
    showTypingIndicator();
    
    // Process user message and respond after delay (simulating response time)
    setTimeout(() => {
        removeTypingIndicator();
        
        // Generate response based on user message
        const response = generateResponse(message);
        addMessage(response, 'received');
        
        // Scroll to latest message
        scrollToBottom();
        
        // Enhance crystal animation when response is sent
        crystalAnimation.play();
    }, 1500); // 1.5 second delay for realistic feel
    
    // Scroll to latest message
    scrollToBottom();
}

// Add message to chat
function addMessage(text, type) {
    const messageElement = document.createElement('div');
    messageElement.className = `message-bubble ${type}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = text;
    
    const messageTimestamp = document.createElement('div');
    messageTimestamp.className = 'message-timestamp';
    messageTimestamp.textContent = getTimeString();
    
    // Assemble message elements
    messageContent.appendChild(messageParagraph);
    messageElement.appendChild(messageContent);
    messageElement.appendChild(messageTimestamp);
    
    // Add to chat container
    chatMessages.appendChild(messageElement);
}

// Show typing indicator
function showTypingIndicator() {
    const typingElement = document.createElement('div');
    typingElement.className = 'message-bubble received typing-indicator';
    typingElement.id = 'typing-indicator';
    
    const typingContent = document.createElement('div');
    typingContent.className = 'typing-content';
    
    // Create the three dots for the typing animation
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        dot.className = 'typing-dot';
        typingContent.appendChild(dot);
    }
    
    typingElement.appendChild(typingContent);
    chatMessages.appendChild(typingElement);
    
    scrollToBottom();
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Generate response based on user message
function generateResponse(userMessage) {
    // Convert message to lowercase for easier matching
    const message = userMessage.toLowerCase();
    
    // Check for product inquiry keywords
    if (message.includes('product') || message.includes('buy') || message.includes('purchase') || 
        message.includes('shirt') || message.includes('hoodie') || message.includes('clothing') ||
        message.includes('recommend') || message.includes('suggest')) {
        return getRandomResponse(productRecommendations);
    }
    
    // Check for tarot-related keywords
    if (message.includes('tarot') || message.includes('reading') || message.includes('card') || 
        message.includes('fortune') || message.includes('future')) {
        return "Our tarot reading experience can provide spiritual insight. Visit our Tarot Reading page to discover your symbolic connection.";
    }
    
    // Check for shipping/order related keywords
    if (message.includes('ship') || message.includes('deliver') || message.includes('order') || 
        message.includes('track') || message.includes('return')) {
        return "For shipping and order inquiries, please allow 3-5 business days for delivery. You can track your order through the confirmation email. Feel free to ask if you need more specific information.";
    }
    
    // Check for contact or help keywords
    if (message.includes('contact') || message.includes('help') || message.includes('support') || 
        message.includes('phone') || message.includes('email') || message.includes('talk to')) {
        return "You can reach our support team at support@worldtrismegisto.com or through the Contact page. We're here to assist on your spiritual journey.";
    }
    
    // Default to a mystical response if no specific intent is detected
    return getRandomResponse(mysticalResponses);
}

// Helper to get random response from array
function getRandomResponse(responseArray) {
    const index = Math.floor(Math.random() * responseArray.length);
    return responseArray[index];
}

// Get current time string
function getTimeString() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Scroll chat to bottom
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add CSS for typing indicator
function addTypingIndicatorStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .typing-indicator {
            padding: 10px 20px;
        }
        
        .typing-content {
            display: flex;
            gap: 5px;
            align-items: center;
        }
        
        .typing-dot {
            width: 8px;
            height: 8px;
            background-color: var(--muted-gold);
            border-radius: 50%;
            opacity: 0.5;
            animation: typingAnimation 1.4s infinite ease-in-out;
        }
        
        .typing-dot:nth-child(1) {
            animation-delay: 0s;
        }
        
        .typing-dot:nth-child(2) {
            animation-delay: 0.4s;
        }
        
        .typing-dot:nth-child(3) {
            animation-delay: 0.8s;
        }
        
        @keyframes typingAnimation {
            0%, 100% {
                transform: translateY(0);
                opacity: 0.5;
            }
            50% {
                transform: translateY(-5px);
                opacity: 0.9;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize chat
document.addEventListener('DOMContentLoaded', () => {
    addTypingIndicatorStyles();
    
    // Optional: Auto-open chat after X seconds to engage users
    /* 
    setTimeout(() => {
        chatContainer.classList.add('active');
        crystalAnimation.play();
    }, 10000); // Open after 10 seconds - adjust as needed
    */
}); 