// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if the href is not empty
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                // Get the target element
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                // If target element exists, scroll to it
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = '#2c3e50';
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// Add fade-in animation to sections
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Form submission handling
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Initialize tooltips if Bootstrap is loaded
if (typeof bootstrap !== 'undefined') {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Gallery Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    // Add fade-in animation
                    item.classList.add('fade-in');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fade-in');
                }
            });
        });
    });
});

// Chat Widget Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.getElementById('chatButton');
    const chatContainer = document.getElementById('chatContainer');
    const closeChat = document.getElementById('closeChat');
    const sendMessage = document.getElementById('sendMessage');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    if (chatButton && chatContainer && closeChat && sendMessage && chatInput && chatMessages) {
        // Toggle chat container
        chatButton.addEventListener('click', function() {
            chatContainer.classList.toggle('active');
        });

        // Close chat
        closeChat.addEventListener('click', function() {
            chatContainer.classList.remove('active');
        });

        // Send message
        function sendChatMessage() {
            const message = chatInput.value.trim();
            if (message) {
                // Add user message
                chatMessages.innerHTML += `
                    <div class="message user">
                        <p>${message}</p>
                    </div>
                `;
                
                // Clear input
                chatInput.value = '';
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Simulate bot response
                setTimeout(() => {
                    chatMessages.innerHTML += `
                        <div class="message bot">
                            <p>Thank you for your message. Our team will get back to you shortly.</p>
                        </div>
                    `;
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        }

        // Send message on button click
        sendMessage.addEventListener('click', sendChatMessage);

        // Send message on Enter key
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
});

// Estimator Calculator Logic
document.addEventListener('DOMContentLoaded', function() {
    const estimatorForm = document.getElementById('estimator-form');
    const estimateResult = document.getElementById('estimateResult');
    if (estimatorForm) {
        const packagePrices = {
            'Basic': 1500,
            'Standard': 1800,
            'Premium': 2200,
            'Luxury': 2800
        };
        // Additional rates
        const rates = {
            sump: 15, // per liter
            septic: 12, // per liter
            compound: 400, // per sqft (length * height)
            kitchen: {
                'U-Shaped':    { Basic: 1800, Standard: 2000, Premium: 2200, Luxury: 2500 },
                'Parallel':    { Basic: 1600, Standard: 1800, Premium: 2000, Luxury: 2300 },
                'L-Shaped':    { Basic: 1400, Standard: 1600, Premium: 1800, Luxury: 2100 },
                'Straight':    { Basic: 1200, Standard: 1400, Premium: 1600, Luxury: 1900 }
            },
            wardrobe: {
                Basic: 30000,
                Standard: 40000,
                Premium: 50000,
                Luxury: 60000
            },
            tvunit: {
                Basic: 25000,
                Standard: 35000,
                Premium: 45000,
                Luxury: 55000
            }
        };
        estimatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const packageType = document.getElementById('packageType').value;
            const area = parseFloat(document.getElementById('area').value);
            const sump = parseFloat(document.getElementById('sump').value) || 0;
            const septic = parseFloat(document.getElementById('septic').value) || 0;
            const compoundLength = parseFloat(document.getElementById('compoundLength').value) || 0;
            const compoundHeight = parseFloat(document.getElementById('compoundHeight').value) || 0;
            // Modular Kitchen
            const kitchenType = document.getElementById('kitchenType').value;
            const kitchenPlan = document.getElementById('kitchenPlan').value;
            const kitchenSqft = parseFloat(document.getElementById('kitchenSqft').value) || 0;
            // Wardrobe/TV Unit
            const wardrobeUnits = parseInt(document.getElementById('wardrobeUnits').value) || 0;
            const wardrobePlan = document.getElementById('wardrobePlan').value;
            const tvunitUnits = parseInt(document.getElementById('tvunitUnits').value) || 0;
            const tvunitPlan = document.getElementById('tvunitPlan').value;

            if (packageType in packagePrices && area > 0) {
                const pricePerSqft = packagePrices[packageType];
                const mainEstimate = pricePerSqft * area;
                const sumpCost = sump * rates.sump;
                const septicCost = septic * rates.septic;
                const compoundCost = compoundLength * compoundHeight * rates.compound;
                const kitchenCost = kitchenSqft * rates.kitchen[kitchenType][kitchenPlan];
                const wardrobeCost = wardrobeUnits * rates.wardrobe[wardrobePlan];
                const tvunitCost = tvunitUnits * rates.tvunit[tvunitPlan];
                const total = mainEstimate + sumpCost + septicCost + compoundCost + kitchenCost + wardrobeCost + tvunitCost;
                estimateResult.innerHTML = `
                    <div class='text-start'>
                        <div><strong>Construction Estimate:</strong> ₹${mainEstimate.toLocaleString()}</div>
                        ${sump ? `<div><strong>Sump:</strong> ₹${sumpCost.toLocaleString()}</div>` : ''}
                        ${septic ? `<div><strong>Septic Tank:</strong> ₹${septicCost.toLocaleString()}</div>` : ''}
                        ${(compoundLength && compoundHeight) ? `<div><strong>Compound Wall:</strong> ₹${compoundCost.toLocaleString()}</div>` : ''}
                        ${kitchenSqft ? `<div><strong>Modular Kitchen (${kitchenType}, ${kitchenPlan}, ${kitchenSqft} sq.ft):</strong> ₹${kitchenCost.toLocaleString()}</div>` : ''}
                        ${wardrobeUnits ? `<div><strong>Room Wardrobes (${wardrobePlan}):</strong> ₹${wardrobeCost.toLocaleString()}</div>` : ''}
                        ${tvunitUnits ? `<div><strong>Hall TV Unit (${tvunitPlan}):</strong> ₹${tvunitCost.toLocaleString()}</div>` : ''}
                        <hr>
                        <div class='h4'><strong>Total Estimate:</strong> ₹${total.toLocaleString()}</div>
                    </div>
                `;
            } else {
                estimateResult.textContent = 'Please enter valid details.';
            }
        });
    }
});

// Counter Animation
document.addEventListener('DOMContentLoaded', function() {
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                        counter.classList.add('animated');
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe all counter elements
    document.querySelectorAll('.counter-value').forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Testimonial Carousel
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    let currentIndex = 0;
    let autoSlideInterval;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.testimonial-dot');
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        goToSlide(currentIndex);
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(currentIndex);
    }
    
    // Event listeners for buttons
    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
    
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });
    
    // Auto slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Start auto sliding
    startAutoSlide();
    
    // Pause auto sliding when hovering over the carousel
    const carousel = document.querySelector('.testimonial-carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    carousel.addEventListener('mouseleave', startAutoSlide);
}); 