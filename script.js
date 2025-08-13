document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(targetTab) {
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });

        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        const activeButton = document.querySelector(`[data-tab="${targetTab}"]`);
        const activeContent = document.getElementById(targetTab);

        if (activeButton && activeContent) {
            activeButton.classList.add('active');
            activeContent.classList.add('active');
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });

    tabButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const targetTab = this.getAttribute('data-tab');
                switchTab(targetTab);
            }
        });
    });

    // Removed slow scroll animations - elements appear immediately

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const timelineItems = document.querySelectorAll('.timeline-content');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        });
    });

    const skillTags = document.querySelectorAll('.skill-tag, .project-tag, .interest-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.background = '#1e293b';
            this.style.color = 'white';
            this.style.transform = 'scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.background = '#f1f5f9';
            this.style.color = '#475569';
            this.style.transform = 'scale(1)';
        });
    });

    // Image Modal Functionality
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalClose = document.querySelector('.modal-close');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    let currentImageIndex = 0;
    const projectImages = [
        {
            src: '1. Supervised Machine Learning - Twitter Surveillance System in Python.png',
            title: 'Twitter Surveillance System',
            description: 'Real-time sentiment analysis system predicting COVID vaccine hesitancy from Twitter data with daily visualization outputs and classification model performance tracking.'
        },
        {
            src: '2. Climate Change Dashboard constructed using Python_s matplotlib library.png',
            title: 'Climate Change Dashboard',
            description: 'Interactive Python dashboard visualizing global greenhouse gas emissions, regional CO2 trends, and top emitters per capita using matplotlib with multi-panel layout and time series analysis.'
        },
        {
            src: '3. SQL Cleansing and SAS Statistical Analysis of COVID-19 Data.png',
            title: 'COVID-19 Data Analysis',
            description: 'Comprehensive SQL and SAS analysis examining the association between COVID-19 deaths and vaccination rates using Ontario Open Data Catalogue with statistical correlation analysis.'
        },
        {
            src: '4. Data Wrangling Synthetic Medical Records in RapidMiner.png',
            title: 'Medical Records Processing',
            description: 'Advanced data wrangling pipeline for processing synthetic medical records using RapidMiner, focusing on data quality improvement and analytical readiness for healthcare research.'
        }
    ];

    function openModal(index) {
        currentImageIndex = index;
        updateModalContent();
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        imageModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Remove the old updateModalContent function as it's now redefined below

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % projectImages.length;
        updateModalContent();
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + projectImages.length) % projectImages.length;
        updateModalContent();
    }

    // Event listeners for clickable images
    const clickableImages = document.querySelectorAll('.clickable-image');
    clickableImages.forEach((image, index) => {
        image.addEventListener('click', () => openModal(index));
    });

    // Modal controls
    modalClose.addEventListener('click', closeModal);
    nextButton.addEventListener('click', nextImage);
    prevButton.addEventListener('click', prevImage);

    // Close modal when clicking outside
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            closeModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!imageModal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                prevImage(); // Swipe right -> previous image
            } else {
                nextImage(); // Swipe left -> next image
            }
        }
    }

    modalImage.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    modalImage.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    // Simple image modal without zoom
    // Images are displayed as-is in the modal

    function updateModalContent() {
        const project = projectImages[currentImageIndex];
        modalImage.src = project.src;
        modalImage.alt = project.title;
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
    }
});

// Collapsible sections functionality
function toggleSection(sectionId) {
    const content = document.getElementById(sectionId);
    const header = content.previousElementSibling;
    const icon = header.querySelector('.toggle-icon');
    
    if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        icon.style.transform = 'rotate(0deg)';
        icon.textContent = '▼';
    } else {
        content.classList.add('expanded');
        icon.style.transform = 'rotate(180deg)';
        icon.textContent = '▲';
    }
}