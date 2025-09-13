// js/footer.js
// JavaScript spécifique au footer de la Clinique Alirfane

function initFooter() {
    console.log('Footer initialisé');
    
    // ========================
    // Animation des liens sociaux
    // ========================
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.animation = 'bounce 0.5s ease';
        });
        
        link.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // ========================
    // Copier les coordonnées
    // ========================
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Si c'est un lien mailto ou tel, laisser le comportement par défaut
            if (this.href && (this.href.startsWith('tel:') || this.href.startsWith('mailto:'))) {
                return;
            }
            
            // Sinon, copier le texte
            e.preventDefault();
            const text = this.textContent.trim();
            navigator.clipboard.writeText(text).then(() => {
                showMessage('Copié : ' + text, 'success');
            });
        });
    });
    
    // ========================
    // Scroll to top (si bouton présent)
    // ========================
    const scrollTopBtn = document.querySelector('.scroll-to-top');
    if (scrollTopBtn) {
        // Afficher/Masquer le bouton
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        // Action au clic
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========================
    // Fonction pour afficher les messages
    // ========================
    function showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `footer-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
            color: white;
            border-radius: 8px;
            z-index: 9999;
            animation: slideInUp 0.3s ease;
            max-width: 300px;
        `;
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.animation = 'slideOutDown 0.3s ease';
            setTimeout(() => messageDiv.remove(), 300);
        }, 3000);
    }
    
    // ========================
    // Animations CSS à ajouter
    // ========================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes slideInUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideOutDown {
            to { transform: translateY(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Initialiser le footer si déjà chargé
if (document.querySelector('.footer-main')) {
    initFooter();
}