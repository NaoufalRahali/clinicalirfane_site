// js/header.js
// JavaScript spécifique au header de la Clinique Alirfane

function initHeader() {
    console.log('Header initialisé');
    
    // ========================
    // Animation du header au scroll
    // ========================
    const header = document.querySelector('.header-wrapper');
    if (header) {
        let lastScroll = 0;
        let isScrolling = false;
        
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    const currentScroll = window.pageYOffset;
                    
                    // Masquer/Afficher le header selon le sens du scroll
                    if (currentScroll > lastScroll && currentScroll > 150) {
                        // Scroll vers le bas
                        header.style.transform = 'translateY(-100%)';
                        header.classList.add('hidden');
                    } else {
                        // Scroll vers le haut
                        header.style.transform = 'translateY(0)';
                        header.classList.remove('hidden');
                    }
                    
                    // Ajouter une ombre au header lors du scroll
                    if (currentScroll > 50) {
                        header.classList.add('scrolled');
                        header.style.boxShadow = '0 5px 30px rgba(0,0,0,0.15)';
                    } else {
                        header.classList.remove('scrolled');
                        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)';
                    }
                    
                    lastScroll = currentScroll;
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });
    }
    
    // ========================
    // Gestion du menu mobile
    // ========================
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-overlay';
    document.body.appendChild(mobileOverlay);
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Fermer le menu en cliquant sur l'overlay
        mobileOverlay.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            this.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    }
    
    // ========================
    // Activation du lien actif
    // ========================
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // Retirer toutes les classes active
        link.parentElement.classList.remove('active');
        
        // Ajouter la classe active au lien correspondant
        if (link.getAttribute('href') === currentPath) {
            link.parentElement.classList.add('active');
        }
        
        // Pour la page d'accueil
        if (currentPath === '/' && link.getAttribute('href') === '/') {
            link.parentElement.classList.add('active');
        }
    });
    
    // ========================
    // Gestion des dropdowns
    // ========================
    const dropdownItems = document.querySelectorAll('.has-dropdown');
    
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown-menu');
        let timeout;
        
        if (link && dropdown) {
            // Sur desktop - hover
            item.addEventListener('mouseenter', function() {
                clearTimeout(timeout);
                this.classList.add('show');
            });
            
            item.addEventListener('mouseleave', function() {
                timeout = setTimeout(() => {
                    this.classList.remove('show');
                }, 300);
            });
            
            // Sur mobile - click
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('show');
                    
                    // Fermer les autres dropdowns
                    dropdownItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('show');
                        }
                    });
                }
            });
        }
    });
    
    // ========================
    // Recherche rapide
    // ========================
    const searchBtn = document.querySelector('.quick-link[href="/recherche"]');
    const searchModal = document.createElement('div');
    searchModal.className = 'search-modal';
    searchModal.innerHTML = `
        <div class="search-modal-content">
            <button class="search-close">&times;</button>
            <form class="search-form">
                <input type="search" placeholder="Rechercher..." autofocus>
                <button type="submit">Rechercher</button>
            </form>
        </div>
    `;
    document.body.appendChild(searchModal);
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            searchModal.classList.add('active');
            searchModal.querySelector('input').focus();
        });
    }
    
    const searchClose = searchModal.querySelector('.search-close');
    searchClose.addEventListener('click', function() {
        searchModal.classList.remove('active');
    });
    
    // Fermer avec Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            searchModal.classList.remove('active');
        }
    });
    
    // ========================
    // Numéro de téléphone cliquable
    // ========================
    const phoneLinks = document.querySelectorAll('.quick-link.phone');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Sur mobile, permettre l'appel direct
            if (window.innerWidth <= 768) {
                return true;
            }
            // Sur desktop, copier le numéro
            e.preventDefault();
            const phoneNumber = this.querySelector('.quick-link-text').textContent;
            navigator.clipboard.writeText(phoneNumber).then(() => {
                showMessage('Numéro copié : ' + phoneNumber, 'success');
            });
        });
    });
    
    // ========================
    // Accessibilité - Navigation au clavier
    // ========================
    document.addEventListener('keydown', function(e) {
        // Tab navigation pour les dropdowns
        if (e.key === 'Tab') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('nav-link')) {
                const parent = focusedElement.parentElement;
                if (parent.classList.contains('has-dropdown')) {
                    if (!e.shiftKey) {
                        parent.classList.add('show');
                    }
                }
            }
        }
        
        // Escape pour fermer les dropdowns
        if (e.key === 'Escape') {
            dropdownItems.forEach(item => {
                item.classList.remove('show');
            });
        }
    });
    
    // ========================
    // Fonction de message pour le header
    // ========================
    function showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `header-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#4caf50' : '#2196f3'};
            color: white;
            border-radius: 8px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => messageDiv.remove(), 300);
        }, 3000);
    }
}

// Initialiser le header si déjà chargé
if (document.querySelector('.header-wrapper')) {
    initHeader();
}