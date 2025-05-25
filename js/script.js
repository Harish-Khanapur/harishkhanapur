document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const projectsGrid = document.getElementById('projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn'); // Get all filter buttons

    // Function to render projects based on a filter
    function renderProjects(filterTag) {
        projectsGrid.innerHTML = ''; // Clear current projects

        // Filter projectsData
        const filteredProjects = projectsData.filter(project => {
            if (filterTag === 'all') {
                return true; // Show all projects if 'all' is selected
            }
            // Check if the project's tags array includes the filterTag (case-insensitive)
            return project.tags.some(tag => tag.toLowerCase() === filterTag.toLowerCase());
        });

        if (filteredProjects.length === 0) {
            projectsGrid.innerHTML = '<p class="no-projects-message">No projects found for this filter. Please try another!</p>';
            return;
        }

        // Render filtered projects
        filteredProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');

            // Construct tags HTML
            const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

            projectCard.innerHTML = `
                <img src="${project.image}" alt="${project.title} Project Thumbnail">
                <div class="project-card-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tags">
                        ${tagsHtml}
                    </div>
                    <div class="project-links">
                        ${project.githubLink ? `<a href="${project.githubLink}" target="_blank">Code <i class="fab fa-github"></i></a>` : ''}
                        ${project.liveLink ? `<a href="${project.liveLink}" target="_blank">Live Demo <i class="fas fa-external-link-alt"></i></a>` : ''}
                        ${project.caseStudyLink ? `<a href="${project.caseStudyLink}" target="_blank">Case Study <i class="fas fa-book"></i></a>` : ''}
                    </div>
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        });
    }

    /// Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // STEP 1: Remove 'active' class from ALL buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
    
            // STEP 2: Add 'active' class ONLY to the clicked button
            this.classList.add('active'); // 'this' refers to the button that was clicked
    
            const filterValue = this.dataset.filter;
            renderProjects(filterValue);
        });
    });
    
    // Initial load: render all projects when the page loads, and 'All' button is already active
    renderProjects('all');
});