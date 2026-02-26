/**
 * Component Loader
 * Dynamically loads HTML components into their containers
 */

/**
 * Load a component into a container
 * @param {string} id - Container element ID
 * @param {string} file - Path to component HTML file
 */
async function loadComponent(id, file) {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`Container element not found: ${id}`);
        return;
    }

    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${file}: ${response.status}`);
        }
        const html = await response.text();
        element.innerHTML = html;
        // Update i18n for newly loaded content
        if (window.i18n && window.i18n.get) {
            element.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                const value = window.i18n.get(key);
                if (value && value !== key) {
                    el.innerHTML = value;
                }
            });
        }
    } catch (error) {
        console.error(`Error loading component ${file}:`, error);
        element.innerHTML = `<p class="text-red-500">Failed to load ${file}</p>`;
    }
}

/**
 * Load all components when DOM is ready
 */
document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
        loadComponent('about-container', './components/about.html'),
        loadComponent('education-container', './components/education.html'),
        loadComponent('experience-container', './components/experience.html'),
        loadComponent('projects-container', './components/projects.html'),
        loadComponent('publications-container', './components/publications.html')
    ]);
});

/**
 * Re-apply i18n when language changes
 */
window.addEventListener('i18nLoaded', () => {
    const containers = [
        'about-container', 'education-container', 'experience-container',
        'projects-container', 'publications-container'
    ];

    containers.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                const value = window.i18n.get(key);
                if (value && value !== key) {
                    el.innerHTML = value;
                }
            });
        }
    });
});
