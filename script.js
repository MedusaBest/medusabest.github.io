// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    console.log('CyberHacker Profile loaded!');
    
    // Initialize animations and effects
    initTerminalEffects();
    initScrollEffects();
    initGlitchEffects();
    
    // Handle navigation menu
    initNavigation();
});

/**
 * Terminal typing effect and cursor blink
 */
function initTerminalEffects() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    
    terminalLines.forEach(line => {
        // Skip if it's a small terminal line in section headers
        if (line.classList.contains('small')) return;
        
        // Get the command element
        const commandElement = line.querySelector('.command');
        if (!commandElement) return;
        
        // Store original text
        const originalText = commandElement.textContent;
        // Clear it initially
        commandElement.textContent = '';
        
        // Type out the command character by character
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < originalText.length) {
                commandElement.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);
    });
}

/**
 * Add scroll effects for sections
 */
function initScrollEffects() {
    // Get all sections
    const sections = document.querySelectorAll('section.section');
    
    // Set up Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add/remove visible class based on intersection
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bar animation if it's the skills section
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, { threshold: 0.1 }); // Trigger when at least 10% of the section is visible
    
    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
        // Set initial state (hidden)
        section.classList.add('fade-in');
    });
}

/**
 * Animate skill bars when skills section is visible
 */
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        // Get width value from style
        const width = bar.style.width;
        
        // Temporarily set to 0
        bar.style.width = '0%';
        
        // Animate to actual width with delay based on index
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-out';
            bar.style.width = width;
        }, index * 100);
    });
}

/**
 * Handle smooth scrolling for navigation
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section id from the href
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to the section
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // 70px offset for the navbar
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Add random glitch effects to elements
 */
function initGlitchEffects() {
    // Target elements with glitch class
    const glitchElements = document.querySelectorAll('.glitch');
    
    // Apply random glitch effect every few seconds
    glitchElements.forEach(element => {
        // Random timing for natural effect
        setInterval(() => {
            // Add glitching class for a brief moment
            element.classList.add('glitching');
            
            // Remove after a short time
            setTimeout(() => {
                element.classList.remove('glitching');
            }, 200);
        }, Math.random() * 5000 + 2000); // Random interval between 2-7 seconds
    });
    
    // Special effect for avatar
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        setInterval(() => {
            avatar.classList.add('glitch-effect');
            
            setTimeout(() => {
                avatar.classList.remove('glitch-effect');
            }, 300);
        }, Math.random() * 7000 + 3000); // Random interval between 3-10 seconds
    }
}

// Update copyright year
function updateCopyright() {
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        const year = new Date().getFullYear();
        copyrightElement.textContent = `© ${year} CyberHacker. All rights reserved.`;
    }
}

// Call update copyright
updateCopyright(); 