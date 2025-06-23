// Application state
let currentView = 'dashboard';
let currentTemplate = 'quant';

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeTemplates();
    initializeAutoApply();
    initializeCharts();
    initializeFormInteractions();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav__link');
    const views = document.querySelectorAll('.view');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const targetView = this.getAttribute('data-view');
            if (targetView) {
                showView(targetView);
                updateActiveNavLink(this);
            }
        });
    });

    // Handle dashboard buttons
    const profileButton = document.querySelector('[data-view="profile"]');
    if (profileButton) {
        profileButton.addEventListener('click', function() {
            showView('profile');
            updateActiveNavLink(document.querySelector('.nav__link[data-view="profile"]'));
        });
    }
}

function showView(viewName) {
    const views = document.querySelectorAll('.view');
    views.forEach(view => {
        view.classList.remove('view--active');
    });

    const targetView = document.getElementById(viewName);
    if (targetView) {
        targetView.classList.add('view--active');
        currentView = viewName;
    }
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.classList.remove('nav__link--active');
    });
    activeLink.classList.add('nav__link--active');
}

// Template functionality
function initializeTemplates() {
    const templateButtons = document.querySelectorAll('.template__btn');
    const templateViews = document.querySelectorAll('.template__view');

    templateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const templateType = this.getAttribute('data-template');
            showTemplate(templateType);
            updateActiveTemplateButton(this);
        });
    });
}

function showTemplate(templateType) {
    const templateViews = document.querySelectorAll('.template__view');
    templateViews.forEach(view => {
        view.classList.remove('template__view--active');
    });

    const targetTemplate = document.getElementById(`template-${templateType}`);
    if (targetTemplate) {
        targetTemplate.classList.add('template__view--active');
        currentTemplate = templateType;
    }
}

function updateActiveTemplateButton(activeButton) {
    const templateButtons = document.querySelectorAll('.template__btn');
    templateButtons.forEach(button => {
        button.classList.remove('template__btn--active');
    });
    activeButton.classList.add('template__btn--active');
}

// Auto-apply functionality
function initializeAutoApply() {
    const startAutoApplyButton = document.getElementById('startAutoApply');
    if (startAutoApplyButton) {
        startAutoApplyButton.addEventListener('click', function() {
            startAutoApplyProcess();
        });
    }
}

function startAutoApplyProcess() {
    // Show loading modal
    showModal('loadingModal');
    
    // Simulate the auto-apply process
    setTimeout(() => {
        hideModal('loadingModal');
        showModal('successModal');
    }, 3000);
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('modal--active');
        // Force reflow to ensure display change takes effect
        modal.offsetHeight;
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('modal--active');
    }
}

function closeModal(modalId) {
    hideModal(modalId);
}

// Make closeModal globally available
window.closeModal = closeModal;

// Charts initialization
function initializeCharts() {
    // Wait for Chart.js to load and for analytics view to be available
    setTimeout(() => {
        if (typeof Chart !== 'undefined') {
            createCharts();
        }
    }, 500);
}

function createCharts() {
    createSuccessChart();
    createJobTypeChart();
    createTimelineChart();
}

function createSuccessChart() {
    const ctx = document.getElementById('successChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Interviews', 'No Response', 'Rejected'],
            datasets: [{
                data: [25, 60, 15],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

function createJobTypeChart() {
    const ctx = document.getElementById('jobTypeChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Quant Analyst', 'Fintech Eng', 'Algo Trading', 'Sales Eng', 'WealthTech'],
            datasets: [{
                label: 'Applications',
                data: [4, 3, 2, 2, 1],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function createTimelineChart() {
    const ctx = document.getElementById('timelineChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jun 1', 'Jun 5', 'Jun 10', 'Jun 15', 'Jun 20', 'Jun 23'],
            datasets: [{
                label: 'Applications Submitted',
                data: [0, 2, 5, 8, 10, 12],
                borderColor: '#1FB8CD',
                backgroundColor: 'rgba(31, 184, 205, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Responses Received',
                data: [0, 0, 1, 2, 3, 3],
                borderColor: '#FFC185',
                backgroundColor: 'rgba(255, 193, 133, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 2
                    }
                }
            }
        }
    });
}

// Form interactions
function initializeFormInteractions() {
    // Auto-save functionality for profile changes
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('change', function() {
            // Simulate auto-save
            showToast('Changes saved automatically');
        });
    });

    // Checkbox interactions
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updatePreferences();
        });
    });

    // Filter functionality for application tracker
    const trackerFilter = document.querySelector('.tracker__filters .form-control');
    if (trackerFilter) {
        trackerFilter.addEventListener('change', function() {
            filterApplications(this.value);
        });
    }
}

function showToast(message) {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--color-success);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 1001;
        font-size: 14px;
        box-shadow: var(--shadow-lg);
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

function updatePreferences() {
    // Simulate preference updates
    showToast('Preferences updated');
}

function filterApplications(status) {
    const tableRows = document.querySelectorAll('.table__row');
    
    tableRows.forEach(row => {
        if (status === 'All Applications') {
            row.style.display = 'contents';
        } else {
            const statusElement = row.querySelector('.status');
            if (statusElement && statusElement.textContent.trim() === status) {
                row.style.display = 'contents';
            } else {
                row.style.display = 'none';
            }
        }
    });
}

// Utility functions
function simulateJobApplication(company, position) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                company: company,
                position: position,
                appliedDate: new Date().toLocaleDateString()
            });
        }, Math.random() * 2000 + 1000);
    });
}

// Add CSS for toast animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Handle modal clicks outside content
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        hideModal(e.target.id);
    }
});

// Handle escape key to close modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal--active');
        if (activeModal) {
            hideModal(activeModal.id);
        }
    }
});

// Enhanced application tracking
function trackApplication(company, position, status) {
    const applications = getApplications();
    applications.push({
        id: Date.now(),
        company: company,
        position: position,
        status: status,
        appliedDate: new Date().toISOString(),
        salary: generateSalaryRange(position)
    });
    
    // In a real app, this would save to backend
    console.log('Application tracked:', { company, position, status });
}

function getApplications() {
    // In a real app, this would fetch from backend
    return [
        {
            id: 1,
            company: 'Goldman Sachs',
            position: 'Quantitative Analyst',
            status: 'Applied',
            appliedDate: '2025-06-20',
            salary: '$180,000 - $220,000'
        },
        {
            id: 2,
            company: 'JPMorgan Chase',
            position: 'Algorithmic Trading Developer',
            status: 'Phone Screen',
            appliedDate: '2025-06-19',
            salary: '$160,000 - $200,000'
        },
        {
            id: 3,
            company: 'Stripe',
            position: 'Fintech Engineer',
            status: 'Applied',
            appliedDate: '2025-06-18',
            salary: '$140,000 - $170,000'
        }
    ];
}

function generateSalaryRange(position) {
    const salaryRanges = {
        'Quantitative Analyst': '$150,000 - $300,000',
        'Fintech Engineer': '$95,000 - $180,000',
        'Algorithmic Trading Developer': '$130,000 - $250,000',
        'Sales Engineer': '$120,000 - $200,000',
        'WealthTech Product Manager': '$140,000 - $250,000'
    };
    
    return salaryRanges[position] || '$100,000 - $200,000';
}

// Market data updates
function updateMarketData() {
    // In a real app, this would fetch live market data
    const marketIndicators = {
        fintechGrowth: '61%',
        avgSalaryIncrease: '40%',
        jobOpenings: '1,000+',
        wealthTechMarket: '$28B'
    };
    
    return marketIndicators;
}

// Profile completion tracking
function calculateProfileCompletion() {
    const requiredFields = [
        'personal_info',
        'education',
        'certifications',
        'skills',
        'preferences'
    ];
    
    let completedFields = 0;
    requiredFields.forEach(field => {
        // Check if field is completed
        completedFields++;
    });
    
    return Math.round((completedFields / requiredFields.length) * 100);
}

// Export functions for testing
window.JobFlowApp = {
    showView,
    showTemplate,
    startAutoApplyProcess,
    trackApplication,
    updateMarketData,
    calculateProfileCompletion
};