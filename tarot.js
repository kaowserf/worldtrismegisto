// Tarot.js - Handles the interactive tarot experience

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const beginReadingBtn = document.getElementById('begin-reading-btn');
    const tarotIntro = document.getElementById('tarot-intro');
    const tarotReadingArea = document.getElementById('tarot-reading-area');
    const secondaryCards = document.querySelectorAll('.secondary-card');
    const cardDetailOverlay = document.getElementById('card-detail-overlay');
    const closeDetailBtn = document.getElementById('close-detail-btn');
    const detailCardImage = document.getElementById('detail-card-image');
    const detailCardTitle = document.getElementById('detail-card-title');
    const detailCardMeaning = document.getElementById('detail-card-meaning');
    const detailCardReading = document.getElementById('detail-card-reading');
    const buyCardBtn = document.getElementById('buy-card-btn');
    const relatedDesignsSection = document.querySelector('.related-designs .product-grid');
    const prevCardsBtn = document.getElementById('prev-cards');
    const nextCardsBtn = document.getElementById('next-cards');
    const cardContainer = document.querySelector('.secondary-card-container');
    
    // Particles for mystical effect
    createParticles();
    
    // Tarot Card Database
    const tarotCards = [
        {
            id: 0,
            name: "The Fool",
            imagePath: "22 Card/card (22).jpeg",
            meaning: "The Fool represents new beginnings, innocence, and spontaneity. This card suggests taking a leap of faith and embarking on a new journey without fear.",
            reading: "You are at the precipice of a new adventure. Trust your instincts and be open to new experiences. Don't be afraid to take risks—your innocence and spontaneity will guide you to unexpected opportunities.",
            products: [
                { name: "The Fool T-Shirt", price: "$35.00", image: "22 Card/card (22).jpeg" },
                { name: "The Fool Hoodie", price: "$59.99", image: "22 Card/card (22).jpeg" },
                { name: "The Fool Tank Top", price: "$29.95", image: "22 Card/card (22).jpeg" }
            ]
        },
        {
            id: 1,
            name: "The Magician",
            imagePath: "22 Card/card (1).jpeg",
            meaning: "The Magician represents manifestation, resourcefulness, and inspired action. As the first numbered card of the Major Arcana, it signifies the beginning of a journey where you harness your personal power to manifest your desires.",
            reading: "You currently possess all the tools and resources needed to manifest your intentions. This is a powerful time to focus your energy on creating what you desire. Trust your abilities and take inspired action to bring your vision into reality.",
            products: [
                { name: "The Magician T-Shirt", price: "$35.00", image: "22 Card/card (1).jpeg" },
                { name: "The Magician Hoodie", price: "$59.99", image: "22 Card/card (1).jpeg" },
                { name: "The Magician Tank Top", price: "$29.95", image: "22 Card/card (1).jpeg" }
            ]
        },
        {
            id: 2,
            name: "The High Priestess",
            imagePath: "22 Card/card (2).jpeg",
            meaning: "The High Priestess symbolizes intuition, unconscious knowledge, and inner voice. She sits between the realms of consciousness and unconsciousness, representing the bridge between the physical and spiritual worlds.",
            reading: "Your intuition is especially strong at this time. Trust your inner voice and pay attention to your dreams and synchronicities. There may be hidden information coming to the surface. Take time for meditation and self-reflection to access your deeper wisdom.",
            products: [
                { name: "The High Priestess T-Shirt", price: "$35.00", image: "22 Card/card (2).jpeg" },
                { name: "The High Priestess Hoodie", price: "$59.99", image: "22 Card/card (2).jpeg" },
                { name: "The High Priestess Tank Top", price: "$29.95", image: "22 Card/card (2).jpeg" }
            ]
        },
        {
            id: 3,
            name: "The Empress",
            imagePath: "22 Card/card (3).jpeg",
            meaning: "The Empress embodies abundance, nurturing, and connection with Mother Earth. She represents fertility, creativity, and the sensual enjoyment of life's pleasures. The Empress encourages growth and the nurturing of new ideas.",
            reading: "This is a time of abundance and fertility in your life. Creative projects will flourish under your care, and your nurturing energy is powerful. Connect with nature, enjoy sensual pleasures, and trust in the natural growth process happening in your life.",
            products: [
                { name: "The Empress T-Shirt", price: "$35.00", image: "22 Card/card (3).jpeg" },
                { name: "The Empress Hoodie", price: "$59.99", image: "22 Card/card (3).jpeg" },
                { name: "The Empress Long Sleeve", price: "$42.00", image: "22 Card/card (3).jpeg" }
            ]
        },
        {
            id: 4,
            name: "The Emperor",
            imagePath: "22 Card/card (4).jpeg",
            meaning: "The Emperor symbolizes authority, structure, and leadership. He represents masculine energy, stability, and the establishment of order and rules.",
            reading: "It's time to establish clear boundaries and take charge of your situation. Embrace your inner authority and create structure in your life. A disciplined approach will help you build solid foundations for future success.",
            products: [
                { name: "The Emperor T-Shirt", price: "$35.00", image: "22 Card/card (4).jpeg" },
                { name: "The Emperor Hoodie", price: "$59.99", image: "22 Card/card (4).jpeg" },
                { name: "The Emperor Tank Top", price: "$29.95", image: "22 Card/card (4).jpeg" }
            ]
        },
        {
            id: 5,
            name: "The Hierophant",
            imagePath: "22 Card/card (5).jpeg",
            meaning: "The Hierophant represents spiritual wisdom, religious beliefs, and tradition. He is the connection to the divine and established institutions that provide guidance and education.",
            reading: "You may benefit from traditional wisdom or spiritual guidance at this time. Consider seeking advice from a mentor, teacher, or established institution. Connecting with your spiritual beliefs can provide the structure and guidance you need now.",
            products: [
                { name: "The Hierophant T-Shirt", price: "$35.00", image: "22 Card/card (5).jpeg" },
                { name: "The Hierophant Hoodie", price: "$59.99", image: "22 Card/card (5).jpeg" },
                { name: "The Hierophant Long Sleeve", price: "$42.00", image: "22 Card/card (5).jpeg" }
            ]
        },
        {
            id: 6,
            name: "The Lovers",
            imagePath: "22 Card/card (6).jpeg",
            meaning: "The Lovers represents relationships, choices, and harmony. Beyond romantic connections, this card symbolizes alignment with your values and making important life decisions.",
            reading: "You're facing important choices about relationships or core values. Listen to your heart but also use your rational mind to make decisions aligned with your highest self. This is a time for creating harmony between different aspects of yourself or your life.",
            products: [
                { name: "The Lovers T-Shirt", price: "$35.00", image: "22 Card/card (6).jpeg" },
                { name: "The Lovers Hoodie", price: "$59.99", image: "22 Card/card (6).jpeg" },
                { name: "The Lovers Tank Top", price: "$29.95", image: "22 Card/card (6).jpeg" }
            ]
        },
        {
            id: 7,
            name: "The Chariot",
            imagePath: "22 Card/card (7).jpeg",
            meaning: "The Chariot symbolizes willpower, determination, and victory. It represents the ability to overcome obstacles through focus, conviction, and maintaining control over opposing forces.",
            reading: "Now is the time to harness your willpower and determination. You have the strength to overcome obstacles and achieve victory. Stay focused on your goal and maintain control over conflicting energies or desires to move forward successfully.",
            products: [
                { name: "The Chariot T-Shirt", price: "$35.00", image: "22 Card/card (7).jpeg" },
                { name: "The Chariot Hoodie", price: "$59.99", image: "22 Card/card (7).jpeg" },
                { name: "The Chariot Long Sleeve", price: "$42.00", image: "22 Card/card (7).jpeg" }
            ]
        },
        {
            id: 8,
            name: "Strength",
            imagePath: "22 Card/card (8).jpeg",
            meaning: "Strength represents inner power, courage, and compassion. It symbolizes the ability to overcome challenges not through force but through patience, soft control, and emotional intelligence.",
            reading: "Your true power lies in your inner strength and compassion. Approach challenges with patience and emotional intelligence rather than brute force. By gently taming your impulses and fears, you'll achieve lasting victory.",
            products: [
                { name: "Strength T-Shirt", price: "$35.00", image: "22 Card/card (8).jpeg" },
                { name: "Strength Hoodie", price: "$59.99", image: "22 Card/card (8).jpeg" },
                { name: "Strength Tank Top", price: "$29.95", image: "22 Card/card (8).jpeg" }
            ]
        },
        {
            id: 9,
            name: "The Hermit",
            imagePath: "22 Card/card (9).jpeg",
            meaning: "The Hermit symbolizes introspection, solitude, and inner guidance. He represents the need to withdraw from the noise of the world to find wisdom and truth within.",
            reading: "This is a time for soul-searching and introspection. Step back from the hustle of daily life and seek solitude to hear your inner voice. The answers you seek are within—take this period of contemplation to connect with your higher wisdom.",
            products: [
                { name: "The Hermit T-Shirt", price: "$35.00", image: "22 Card/card (9).jpeg" },
                { name: "The Hermit Hoodie", price: "$59.99", image: "22 Card/card (9).jpeg" },
                { name: "The Hermit Long Sleeve", price: "$42.00", image: "22 Card/card (9).jpeg" }
            ]
        },
        {
            id: 10,
            name: "Wheel of Fortune",
            imagePath: "22 Card/card (10).jpeg",
            meaning: "The Wheel of Fortune represents cycles, fate, and sudden change. It symbolizes the ever-turning wheel of life with its ups and downs, and reminds us that change is the only constant.",
            reading: "A significant change is coming your way. Remember that cycles are natural—what goes up must come down, and after darkness comes light. Embrace the turning wheel and adapt to new circumstances with flexibility and optimism.",
            products: [
                { name: "Wheel of Fortune T-Shirt", price: "$35.00", image: "22 Card/card (10).jpeg" },
                { name: "Wheel of Fortune Hoodie", price: "$59.99", image: "22 Card/card (10).jpeg" },
                { name: "Wheel of Fortune Tank Top", price: "$29.95", image: "22 Card/card (10).jpeg" }
            ]
        },
        {
            id: 11,
            name: "Justice",
            imagePath: "22 Card/card (11).jpeg",
            meaning: "Justice represents fairness, truth, and law. It symbolizes the need for balance, accountability, and making decisions based on clear discernment and what is ethically right.",
            reading: "You're in a period where balance and fairness are highlighted. Consider the consequences of your actions and ensure they align with your ethical standards. Truth and accountability will bring the best outcomes—you'll receive what you've earned.",
            products: [
                { name: "Justice T-Shirt", price: "$35.00", image: "22 Card/card (11).jpeg" },
                { name: "Justice Hoodie", price: "$59.99", image: "22 Card/card (11).jpeg" },
                { name: "Justice Long Sleeve", price: "$42.00", image: "22 Card/card (11).jpeg" }
            ]
        },
        {
            id: 12,
            name: "The Hanged Man",
            imagePath: "22 Card/card (12).jpeg",
            meaning: "The Hanged Man represents surrender, letting go, and gaining new perspectives. It symbolizes the paradox of gaining through giving up and finding enlightenment through surrender.",
            reading: "This is a time to surrender control and see things from a different perspective. By letting go of your usual patterns and preconceptions, you'll gain unexpected insights. This period of pause may feel like sacrifice but will lead to spiritual growth.",
            products: [
                { name: "The Hanged Man T-Shirt", price: "$35.00", image: "22 Card/card (12).jpeg" },
                { name: "The Hanged Man Hoodie", price: "$59.99", image: "22 Card/card (12).jpeg" },
                { name: "The Hanged Man Tank Top", price: "$29.95", image: "22 Card/card (12).jpeg" }
            ]
        },
        {
            id: 13,
            name: "Death",
            imagePath: "22 Card/card (13).jpeg",
            meaning: "Death represents transformation, endings, and rebirth. Far from being frightening, this card symbolizes necessary endings that make way for new beginnings and profound transformation.",
            reading: "You're experiencing a significant transformation. Something in your life needs to end to make way for new growth. Embrace this change rather than resisting it—by letting go of what no longer serves you, you create space for rebirth and renewal.",
            products: [
                { name: "Death T-Shirt", price: "$35.00", image: "22 Card/card (13).jpeg" },
                { name: "Death Hoodie", price: "$59.99", image: "22 Card/card (13).jpeg" },
                { name: "Death Long Sleeve", price: "$42.00", image: "22 Card/card (13).jpeg" }
            ]
        },
        {
            id: 14,
            name: "Temperance",
            imagePath: "22 Card/card (14).jpeg",
            meaning: "Temperance represents balance, moderation, and patience. It symbolizes the middle path, finding harmony between extremes, and the alchemy of combining different elements into something greater.",
            reading: "This is a time to find balance and practice moderation. Avoid extremes and instead seek the middle path. Patience and a measured approach will serve you well now. By harmoniously blending different aspects of your life, you'll create something greater than the sum of its parts.",
            products: [
                { name: "Temperance T-Shirt", price: "$35.00", image: "22 Card/card (14).jpeg" },
                { name: "Temperance Hoodie", price: "$59.99", image: "22 Card/card (14).jpeg" },
                { name: "Temperance Tank Top", price: "$29.95", image: "22 Card/card (14).jpeg" }
            ]
        },
        {
            id: 15,
            name: "The Devil",
            imagePath: "22 Card/card (15).jpeg",
            meaning: "The Devil represents bondage, materialism, and shadow aspects. It symbolizes the attachments and illusions that keep us trapped, as well as confronting our darkest impulses and dependencies.",
            reading: "You may be feeling trapped by materialism, negative patterns, or unhealthy attachments. Recognize that these bonds are often self-imposed illusions. By acknowledging your shadow side and dependencies, you can begin to free yourself and reclaim your power.",
            products: [
                { name: "The Devil T-Shirt", price: "$35.00", image: "22 Card/card (15).jpeg" },
                { name: "The Devil Hoodie", price: "$59.99", image: "22 Card/card (15).jpeg" },
                { name: "The Devil Long Sleeve", price: "$42.00", image: "22 Card/card (15).jpeg" }
            ]
        },
        {
            id: 16,
            name: "The Tower",
            imagePath: "22 Card/card (16).jpeg",
            meaning: "The Tower represents sudden upheaval, revelation, and awakening. It symbolizes the collapse of false structures, disruptive change, and the breaking down of illusions to reveal truth.",
            reading: "Prepare for sudden change that may feel disruptive initially. Structures built on false premises are destined to fall. While this upheaval may be challenging, it's clearing the way for truth and a stronger foundation. Embrace this awakening rather than resisting it.",
            products: [
                { name: "The Tower T-Shirt", price: "$35.00", image: "22 Card/card (16).jpeg" },
                { name: "The Tower Hoodie", price: "$59.99", image: "22 Card/card (16).jpeg" },
                { name: "The Tower Tank Top", price: "$29.95", image: "22 Card/card (16).jpeg" }
            ]
        },
        {
            id: 17,
            name: "The Star",
            imagePath: "22 Card/card (17).jpeg",
            meaning: "The Star represents hope, inspiration, and serenity. It symbolizes renewal of faith, spiritual connection, and the promise that comes after difficulty.",
            reading: "After a period of challenge, hope and inspiration are returning to your life. This is a time of healing, renewed faith, and spiritual connection. Trust in the universe and remain open to divine guidance. Your optimism now will light the path forward.",
            products: [
                { name: "The Star T-Shirt", price: "$35.00", image: "22 Card/card (17).jpeg" },
                { name: "The Star Hoodie", price: "$59.99", image: "22 Card/card (17).jpeg" },
                { name: "The Star Long Sleeve", price: "$42.00", image: "22 Card/card (17).jpeg" }
            ]
        },
        {
            id: 18,
            name: "The Moon",
            imagePath: "22 Card/card (18).jpeg",
            meaning: "The Moon represents illusion, intuition, and the unconscious. It symbolizes the realm of dreams, hidden emotions, and the mysterious journey through the darkness of the unknown.",
            reading: "You're navigating through uncertainty and may feel disoriented by illusions or fears arising from your subconscious. Trust your intuition during this mysterious phase. Pay attention to your dreams and emotions—they contain important messages that will help guide you through the darkness.",
            products: [
                { name: "The Moon T-Shirt", price: "$35.00", image: "22 Card/card (18).jpeg" },
                { name: "The Moon Hoodie", price: "$59.99", image: "22 Card/card (18).jpeg" },
                { name: "The Moon Tank Top", price: "$29.95", image: "22 Card/card (18).jpeg" }
            ]
        },
        {
            id: 19,
            name: "The Sun",
            imagePath: "22 Card/card (19).jpeg",
            meaning: "The Sun represents success, joy, and vitality. It symbolizes enlightenment, clarity, and the warmth of achievement and happiness.",
            reading: "A period of success and joy is illuminating your life. Clarity has replaced confusion, and vitality is returning. Celebrate your achievements and allow yourself to experience true happiness. Your authentic self is shining through, bringing warmth and positive energy to all areas of your life.",
            products: [
                { name: "The Sun T-Shirt", price: "$35.00", image: "22 Card/card (19).jpeg" },
                { name: "The Sun Hoodie", price: "$59.99", image: "22 Card/card (19).jpeg" },
                { name: "The Sun Long Sleeve", price: "$42.00", image: "22 Card/card (19).jpeg" }
            ]
        },
        {
            id: 20,
            name: "Judgement",
            imagePath: "22 Card/card (20).jpeg",
            meaning: "Judgement represents rebirth, inner calling, and reckoning. It symbolizes awakening to your true purpose, hearing the call to a higher path, and the evaluation of past actions.",
            reading: "You're experiencing a spiritual awakening or hearing a call to your true purpose. This is a time of honest self-evaluation and rebirth. Reflect on your past actions but focus on redemption and renewal. You're being called to rise up and embrace a higher version of yourself.",
            products: [
                { name: "Judgement T-Shirt", price: "$35.00", image: "22 Card/card (20).jpeg" },
                { name: "Judgement Hoodie", price: "$59.99", image: "22 Card/card (20).jpeg" },
                { name: "Judgement Tank Top", price: "$29.95", image: "22 Card/card (20).jpeg" }
            ]
        },
        {
            id: 21,
            name: "The World",
            imagePath: "22 Card/card (21).jpeg",
            meaning: "The World represents completion, fulfillment, and wholeness. As the final card of the Major Arcana, it symbolizes the successful conclusion of a cycle, integration of life lessons, and a sense of cosmic unity.",
            reading: "You've reached a significant completion point in your journey. Celebrate this achievement and the sense of wholeness it brings. You've integrated important lessons and are experiencing fulfillment. While one cycle ends, a new beginning awaits—you're ready to start the next phase of your journey with all the wisdom you've gained.",
            products: [
                { name: "The World T-Shirt", price: "$35.00", image: "22 Card/card (21).jpeg" },
                { name: "The World Hoodie", price: "$59.99", image: "22 Card/card (21).jpeg" },
                { name: "The World Long Sleeve", price: "$42.00", image: "22 Card/card (21).jpeg" }
            ]
        }
    ];
    
    // Enhanced image loading for better quality
    const preloadImages = () => {
        // Preload all tarot card images for smoother experience
        tarotCards.forEach(card => {
            const img = new Image();
            img.src = card.imagePath;
            img.onload = () => {
                // Once image is loaded, add quality class
                document.querySelectorAll(`img[src="${card.imagePath}"]`).forEach(cardImg => {
                    cardImg.classList.add('high-quality-loaded');
                });
            };
        });
    };
    
    // Apply image enhancement for sharp rendering
    const enhanceCardImageRendering = (cardImg) => {
        if (!cardImg) return;
        
        // Apply specific styles for crisp images
        cardImg.style.imageRendering = '-webkit-optimize-contrast';
        cardImg.style.imageRendering = 'crisp-edges';
        
        // Force a repaint for better rendering
        cardImg.style.transform = 'translateZ(0)';
    };
    
    // Function to handle card detail image enhancement
    const enhanceDetailCardImage = () => {
        if (detailCardImage) {
            enhanceCardImageRendering(detailCardImage);
            
            // Apply additional quality settings
            detailCardImage.style.backfaceVisibility = 'hidden';
            detailCardImage.style.willChange = 'transform';
        }
    };

    // Generate all tarot cards dynamically
    function generateTarotCards() {
        // Clear any existing cards
        if (cardContainer) {
            cardContainer.innerHTML = '';
            
            // Loop through all tarot cards and create elements
            tarotCards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.className = 'secondary-card';
                cardElement.setAttribute('data-card', card.id);
                
                cardElement.innerHTML = `
                    <div class="card-inner">
                        <div class="card-front">
                            <img src="${card.imagePath}" alt="${card.name}">
                        </div>
                        <div class="card-back">
                            <h3>${card.name}</h3>
                            <p>${card.meaning.split('.')[0]}.</p>
                        </div>
                    </div>
                `;
                
                // Add click event to open card detail
                cardElement.addEventListener('click', () => {
                    openCardDetail(card.id);
                });
                
                cardContainer.appendChild(cardElement);
            });
        }
    }
    
    // Call the function to generate cards
    generateTarotCards();
    
    // Event Listeners
    beginReadingBtn.addEventListener('click', startTarotReading);
    closeDetailBtn.addEventListener('click', closeCardDetail);
    
    // Card navigation event listeners
    if (prevCardsBtn && nextCardsBtn && cardContainer) {
        prevCardsBtn.addEventListener('click', () => {
            scrollCards('prev');
        });
        
        nextCardsBtn.addEventListener('click', () => {
            scrollCards('next');
        });
    }
    
    // Functions
    function startTarotReading() {
        tarotIntro.style.display = 'none';
        tarotReadingArea.classList.add('active');
        
        // Generate tarot cards
        generateTarotCards();
        
        // Preload images for better quality
        preloadImages();
        
        // Add event listeners for card navigation
        prevCardsBtn.addEventListener('click', () => scrollCards('left'));
        nextCardsBtn.addEventListener('click', () => scrollCards('right'));
    }
    
    function openCardDetail(cardId) {
        // Find the selected card in the database
        const selectedCard = tarotCards.find(card => card.id === parseInt(cardId));
        
        if (!selectedCard) return;
        
        // Update the card detail modal with the selected card's info
        detailCardImage.src = selectedCard.imagePath;
        detailCardTitle.textContent = selectedCard.name;
        detailCardMeaning.textContent = selectedCard.meaning;
        detailCardReading.textContent = selectedCard.reading;
        
        // Update the buy button link
        buyCardBtn.href = `shop.html?card=${selectedCard.id}`;
        
        // Show the related products
        loadRelatedProducts(selectedCard);
        
        // Show the card detail overlay
        cardDetailOverlay.classList.add('active');
        
        // Apply image enhancements
        setTimeout(enhanceDetailCardImage, 100);
    }
    
    function closeCardDetail() {
        document.querySelector('.card-detail-container').style.opacity = '0';
        document.querySelector('.card-detail-container').style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            cardDetailOverlay.classList.remove('active');
        }, 500);
    }
    
    function loadRelatedProducts(card) {
        // Clear previous products
        relatedDesignsSection.innerHTML = '';
        
        // Add products related to the card
        card.products.forEach(product => {
            const productHTML = `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="product-overlay">
                            <a href="product.html?card=${card.id}" class="view-btn">View Details</a>
                        </div>
                    </div>
                    <h3>${product.name}</h3>
                    <p class="price">${product.price}</p>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            `;
            
            relatedDesignsSection.innerHTML += productHTML;
        });
        
        // Add event listeners to the newly created "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productName = this.parentNode.querySelector('h3').textContent;
                addToCart(productName);
            });
        });
    }
    
    function addToCart(productName) {
        // This would typically interact with a cart system
        // For now, just show an alert
        alert(`Added ${productName} to your cart!`);
        
        // Update cart count in the navbar (demo purposes)
        const cartCount = document.querySelector('.cart-count');
        cartCount.textContent = parseInt(cartCount.textContent) + 1;
    }
    
    // Function to scroll cards
    function scrollCards(direction) {
        const cardWidth = document.querySelector('.secondary-card').offsetWidth;
        const gap = 15; // Gap between cards in pixels
        const scrollAmount = (cardWidth + gap) * 3; // Scroll 3 cards at a time
        
        if (direction === 'prev') {
            cardContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        } else {
            cardContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    }
    
    // Create particles
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random styles for each particle
            particle.style.width = `${Math.random() * 4 + 1}px`;
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(${193 + Math.random() * 20}, ${161 + Math.random() * 20}, ${98 + Math.random() * 20}, ${Math.random() * 0.5 + 0.1})`;
            
            // Random positioning
            particle.style.top = `${Math.random() * 100}vh`;
            particle.style.left = `${Math.random() * 100}vw`;
            
            // Animation properties
            const duration = Math.random() * 50 + 30;
            const delay = Math.random() * 10;
            
            particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Add particle styles if not already defined
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            .particle {
                position: absolute;
                border-radius: 50%;
                pointer-events: none;
                z-index: 0;
            }
            
            @keyframes float {
                0%, 100% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0.2;
                }
                25% {
                    transform: translate(100px, 50px) rotate(90deg);
                    opacity: 0.5;
                }
                50% {
                    transform: translate(50px, 100px) rotate(180deg);
                    opacity: 0.3;
                }
                75% {
                    transform: translate(-50px, 50px) rotate(270deg);
                    opacity: 0.4;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Apply image enhancements to all card images
    function applyImageEnhancements() {
        // Enhance all card front images
        document.querySelectorAll('.card-front img').forEach(img => {
            enhanceCardImageRendering(img);
        });
        
        // Enhance main card
        const mainCard = document.querySelector('.main-card');
        if (mainCard) enhanceCardImageRendering(mainCard);
    }
    
    // Apply image enhancements after cards are generated
    const originalGenerateTarotCards = generateTarotCards;
    generateTarotCards = function() {
        originalGenerateTarotCards();
        setTimeout(applyImageEnhancements, 100);
    };
}); 