// dark-mode.js
class DarkModeManager {
    constructor() {
        this.darkModeToggle = document.getElementById('darkModeToggle');
        this.darkIcon = document.getElementById('darkIcon');
        this.lightIcon = document.getElementById('lightIcon');
        this.userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.currentTheme = localStorage.getItem('theme');
        
        this.init();
        this.setupEventListeners();
    }

    init() {
        try {
            if (this.currentTheme === 'dark' || (!this.currentTheme && this.userPrefersDark)) {
                this.enableDarkMode();
            }
        } catch (error) {
            console.error('Error initializing dark mode:', error);
        }
    }

    setupEventListeners() {
        if (!this.darkModeToggle) {
            console.error('Dark mode toggle button not found');
            return;
        }

        this.darkModeToggle.addEventListener('click', () => this.toggleDarkMode());

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!this.currentTheme) { // Only auto-switch if user hasn't manually set a theme
                if (e.matches) {
                    this.enableDarkMode();
                } else {
                    this.disableDarkMode();
                }
            }
        });
    }

    enableDarkMode() {
        document.documentElement.classList.add('dark');
        this.darkIcon.classList.add('hidden');
        this.lightIcon.classList.remove('hidden');
        localStorage.setItem('theme', 'dark');
    }

    disableDarkMode() {
        document.documentElement.classList.remove('dark');
        this.darkIcon.classList.remove('hidden');
        this.lightIcon.classList.add('hidden');
        localStorage.setItem('theme', 'light');
    }

    toggleDarkMode() {
        try {
            if (document.documentElement.classList.contains('dark')) {
                this.disableDarkMode();
            } else {
                this.enableDarkMode();
            }
        } catch (error) {
            console.error('Error toggling dark mode:', error);
        }
    }
}

// Initialize dark mode manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DarkModeManager();
});