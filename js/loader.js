async function loadComponent(id, file) {
    const element = document.getElementById(id);
    if (element) {
        try {
            const response = await fetch(file);
            const html = await response.text();
            element.innerHTML = html;
        } catch (error) {
            console.error(`Error loading component ${file}:`, error);
            element.innerHTML = `<p class="text-red-500">Failed to load ${file}</p>`;
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
        loadComponent('about-container', './components/about.html'),
        loadComponent('education-container', './components/education.html'),
        loadComponent('experience-container', './components/experience.html'),
        loadComponent('projects-container', './components/projects.html'),
        loadComponent('publications-container', './components/publications.html')
    ]);
});
