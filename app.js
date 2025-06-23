// FinTech Career Automation Platform - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeNavigation();
    initializeCharts();
    initializeInteractiveElements();
    initializeFormHandlers();
    updateDashboardData();
});

// Navigation System
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetSection = this.getAttribute('data-section');
            const section = document.getElementById(targetSection);
            if (section) {
                section.classList.add('active');
                
                // Initialize charts if analytics section is opened
                if (targetSection === 'analytics') {
                    setTimeout(() => {
                        initializeCharts();
                    }, 100);
                }
            }
        });
    });
}

// Chart Initialization using Chart.js
function initializeCharts() {
    // Platform Chart
    const platformCtx = document.getElementById('platformChart');
    if (platformCtx) {
        new Chart(platformCtx, {
            type: 'doughnut',
            data: {
                labels: ['LinkedIn', 'Indeed', 'Glassdoor'],
                datasets: [{
                    data: [52, 43, 32],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                    borderWidth: 2,
                    borderColor: '#fff'
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

    // Response Rate Chart
    const responseCtx = document.getElementById('responseChart');
    if (responseCtx) {
        new Chart(responseCtx, {
            type: 'bar',
            data: {
                labels: ['Quantitative Analyst', 'Algo Trading Dev', 'WealthTech PM'],
                datasets: [{
                    label: 'Response Rate (%)',
                    data: [22.5, 19.8, 15.2],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 30,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Trends Chart
    const trendsCtx = document.getElementById('trendsChart');
    if (trendsCtx) {
        new Chart(trendsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Applications',
                        data: [25, 32, 28, 35, 42, 38],
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Responses',
                        data: [4, 6, 5, 7, 8, 6],
                        borderColor: '#FFC185',
                        backgroundColor: 'rgba(255, 193, 133, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Interviews',
                        data: [1, 2, 1, 2, 3, 2],
                        borderColor: '#B4413C',
                        backgroundColor: 'rgba(180, 65, 60, 0.1)',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }
}

// Interactive Elements
function initializeInteractiveElements() {
    // Template Selection
    const templateOptions = document.querySelectorAll('.template-option');
    templateOptions.forEach(option => {
        option.addEventListener('click', function() {
            templateOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            updateResumePreview(this.querySelector('h4').textContent);
        });
    });

    // Priority Role Items
    const roleItems = document.querySelectorAll('.role-item');
    roleItems.forEach(item => {
        item.addEventListener('click', function() {
            const priority = this.classList.contains('priority-high') ? 'Medium' : 'High';
            const badge = this.querySelector('.priority-badge');
            const isHigh = priority === 'High';
            
            this.classList.toggle('priority-high', isHigh);
            this.classList.toggle('priority-medium', !isHigh);
            badge.classList.toggle('high', isHigh);
            badge.classList.toggle('medium', !isHigh);
            badge.textContent = priority;
        });
    });

    // Automation Controls
    const startBtn = document.querySelector('.automation-controls .btn--primary');
    const pauseBtn = document.querySelector('.automation-controls .btn--secondary');
    const testBtn = document.querySelector('.automation-controls .btn--outline');
    
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            toggleAutomation(true);
            showNotification('Automation started successfully', 'success');
        });
    }
    
    if (pauseBtn) {
        pauseBtn.addEventListener('click', function() {
            toggleAutomation(false);
            showNotification('Automation paused', 'warning');
        });
    }
    
    if (testBtn) {
        testBtn.addEventListener('click', function() {
            runTestAutomation();
        });
    }

    // Quick Action Buttons
    const quickActionBtns = document.querySelectorAll('.quick-actions .btn');
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            handleQuickAction(action);
        });
    });

    // Application Action Buttons
    const applicationActionBtns = document.querySelectorAll('.applications-table .btn');
    applicationActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            const row = this.closest('tr');
            const company = row.cells[1].textContent;
            handleApplicationAction(action, company);
        });
    });
}

// Form Handlers
function initializeFormHandlers() {
    // Profile form updates
    const profileInputs = document.querySelectorAll('#profile input, #profile select');
    profileInputs.forEach(input => {
        input.addEventListener('change', function() {
            saveProfileData();
            showNotification('Profile updated', 'success');
        });
    });

    // Automation settings
    const automationInputs = document.querySelectorAll('#automation input, #automation select');
    automationInputs.forEach(input => {
        input.addEventListener('change', function() {
            updateAutomationSettings();
        });
    });

    // Filter controls
    const filterControls = document.querySelectorAll('.filter-controls select');
    filterControls.forEach(control => {
        control.addEventListener('change', function() {
            filterApplications();
        });
    });

    // Skills and certifications
    const addCertBtn = document.querySelector('.cert-tags .btn');
    if (addCertBtn) {
        addCertBtn.addEventListener('click', function() {
            addCertification();
        });
    }
}

// Update Dashboard Data
function updateDashboardData() {
    // Update stat cards with real-time data
    const stats = {
        totalApplications: 127,
        pendingResponses: 23,
        interviews: 5,
        successRate: 18.1
    };

    // Update progress bar
    const progressFill = document.querySelector('.progress-fill');
    const weeklyProgress = (15 / 30) * 100; // 15 out of 30 applications
    if (progressFill) {
        progressFill.style.width = weeklyProgress + '%';
    }

    // Update automation status
    updateAutomationStatus();
}

// Utility Functions
function updateResumePreview(templateType) {
    const resumeContent = document.querySelector('.resume-content');
    if (!resumeContent) return;

    let previewHTML = '';
    switch(templateType) {
        case 'Quantitative Analyst':
            previewHTML = `
                <div class="resume-header">
                    <h2>Your Name</h2>
                    <p>Quantitative Analyst | Mathematical Finance Professional</p>
                </div>
                <div class="resume-section">
                    <h3>Core Competencies</h3>
                    <p>Statistical Analysis • Machine Learning • Python • C++ • Risk Modeling</p>
                </div>
                <div class="resume-section">
                    <h3>Experience</h3>
                    <div class="experience-item">
                        <h4>Wealth Management Advisor</h4>
                        <p>B. Riley Wealth Management • Quantitative portfolio analysis</p>
                    </div>
                </div>
            `;
            break;
        case 'Algorithmic Trading Developer':
            previewHTML = `
                <div class="resume-header">
                    <h2>Your Name</h2>
                    <p>Algorithmic Trading Developer | High-Frequency Systems</p>
                </div>
                <div class="resume-section">
                    <h3>Technical Skills</h3>
                    <p>C++ • Python • Low-latency Systems • Trading Algorithms • Market Data</p>
                </div>
                <div class="resume-section">
                    <h3>Experience</h3>
                    <div class="experience-item">
                        <h4>Software Engineer</h4>
                        <p>PayPal • High-performance systems development</p>
                    </div>
                </div>
            `;
            break;
        case 'WealthTech Product Manager':
            previewHTML = `
                <div class="resume-header">
                    <h2>Your Name</h2>
                    <p>WealthTech Product Manager | Fintech Innovation Leader</p>
                </div>
                <div class="resume-section">
                    <h3>Product Leadership</h3>
                    <p>Product Strategy • User Experience • Agile Development • Market Analysis</p>
                </div>
                <div class="resume-section">
                    <h3>Experience</h3>
                    <div class="experience-item">
                        <h4>Wealth Management Advisor</h4>
                        <p>B. Riley Wealth Management • Client experience optimization</p>
                    </div>
                </div>
            `;
            break;
    }
    resumeContent.innerHTML = previewHTML;
}

function toggleAutomation(isActive) {
    const statusLight = document.querySelector('.status-light');
    const statusText = document.querySelector('.status-indicator span');
    
    if (statusLight && statusText) {
        if (isActive) {
            statusLight.classList.add('active');
            statusText.textContent = 'Active - Running';
        } else {
            statusLight.classList.remove('active');
            statusText.textContent = 'Paused';
        }
    }
}

function updateAutomationStatus() {
    const statusStats = document.querySelectorAll('.automation-stats .stat-item');
    if (statusStats.length >= 3) {
        statusStats[0].innerHTML = '<span>Applications Today</span><span>8 / 15</span>';
        statusStats[1].innerHTML = '<span>This Week</span><span>34 / 75</span>';
        statusStats[2].innerHTML = '<span>Success Rate</span><span>87%</span>';
    }
}

function runTestAutomation() {
    showNotification('Running test automation...', 'info');
    
    setTimeout(() => {
        showNotification('Test completed: 3 applications processed successfully', 'success');
    }, 2000);
}

function handleQuickAction(action) {
    switch(action) {
        case 'Start Auto Apply':
            toggleAutomation(true);
            showNotification('Auto-apply started', 'success');
            break;
        case 'Review Applications':
            document.querySelector('[data-section="tracking"]').click();
            break;
        case 'Update Profile':
            document.querySelector('[data-section="profile"]').click();
            break;
    }
}

function handleApplicationAction(action, company) {
    switch(action) {
        case 'Follow Up':
            showNotification(`Follow-up scheduled for ${company}`, 'success');
            break;
        case 'Schedule':
            showNotification(`Interview scheduled with ${company}`, 'success');
            break;
        case 'Prepare':
            showNotification(`Interview prep materials loaded for ${company}`, 'info');
            break;
    }
}

function saveProfileData() {
    // Simulate saving profile data
    console.log('Profile data saved');
}

function updateAutomationSettings() {
    const dailyLimit = document.querySelector('#automation input[value="15"]').value;
    const weeklyLimit = document.querySelector('#automation input[value="75"]').value;
    console.log(`Automation settings updated: Daily: ${dailyLimit}, Weekly: ${weeklyLimit}`);
}

function filterApplications() {
    const platformFilter = document.querySelector('.filter-controls select:first-child').value;
    const statusFilter = document.querySelector('.filter-controls select:last-child').value;
    
    const rows = document.querySelectorAll('.applications-table tbody tr');
    rows.forEach(row => {
        let showRow = true;
        
        if (platformFilter !== 'All Platforms') {
            const platform = row.cells[2].textContent;
            if (platform !== platformFilter) showRow = false;
        }
        
        if (statusFilter !== 'All Statuses') {
            const status = row.cells[3].textContent.trim();
            if (!status.includes(statusFilter)) showRow = false;
        }
        
        row.style.display = showRow ? '' : 'none';
    });
}

function addCertification() {
    const certTags = document.querySelector('.cert-tags');
    const newCert = prompt('Enter certification name:');
    
    if (newCert && newCert.trim()) {
        const certTag = document.createElement('span');
        certTag.className = 'cert-tag';
        certTag.textContent = newCert.trim();
        
        const addButton = certTags.querySelector('.btn');
        certTags.insertBefore(certTag, addButton);
        
        showNotification('Certification added', 'success');
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('.notification-styles')) {
        const styles = document.createElement('style');
        styles.className = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                padding: 12px 16px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                min-width: 300px;
                animation: slideIn 0.3s ease-out;
            }
            
            .notification--success {
                background-color: rgba(var(--color-success-rgb), 0.1);
                border: 1px solid rgba(var(--color-success-rgb), 0.3);
                color: var(--color-success);
            }
            
            .notification--error {
                background-color: rgba(var(--color-error-rgb), 0.1);
                border: 1px solid rgba(var(--color-error-rgb), 0.3);
                color: var(--color-error);
            }
            
            .notification--warning {
                background-color: rgba(var(--color-warning-rgb), 0.1);
                border: 1px solid rgba(var(--color-warning-rgb), 0.3);
                color: var(--color-warning);
            }
            
            .notification--info {
                background-color: rgba(var(--color-info-rgb), 0.1);
                border: 1px solid rgba(var(--color-info-rgb), 0.3);
                color: var(--color-info);
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 12px;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                color: inherit;
                opacity: 0.7;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
            
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
        `;
        document.head.appendChild(styles);
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Real-time updates simulation
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Simulate random application updates
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length > 0 && Math.random() > 0.95) {
            const currentApps = parseInt(statNumbers[0].textContent);
            statNumbers[0].textContent = currentApps + 1;
            showNotification('New application submitted automatically', 'success');
        }
    }, 30000); // Check every 30 seconds
}

// Initialize real-time updates
simulateRealTimeUpdates();

// Form validation and enhancement
function enhanceFormValidation() {
    const requiredFields = document.querySelectorAll('input[required], select[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = 'var(--color-error)';
            } else {
                this.style.borderColor = 'var(--color-border)';
            }
        });
    });
}

// Initialize form validation
enhanceFormValidation();

// Export functionality for reports
function exportData(format = 'csv') {
    const data = {
        applications: [
            ['Role', 'Company', 'Platform', 'Status', 'Date', 'Match Score'],
            ['Senior Quantitative Analyst', 'Goldman Sachs', 'LinkedIn', 'Applied', '2025-06-20', '94%'],
            ['Trading Systems Developer', 'Two Sigma', 'Indeed', 'Phone Screen', '2025-06-18', '91%'],
            ['Product Manager - WealthTech', 'Charles Schwab', 'Glassdoor', 'Interview', '2025-06-15', '88%']
        ]
    };
    
    if (format === 'csv') {
        const csvContent = data.applications.map(row => row.join(',')).join('\n');
        downloadFile(csvContent, 'applications.csv', 'text/csv');
    }
    
    showNotification(`Data exported as ${format.toUpperCase()}`, 'success');
}

function downloadFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Add export buttons functionality
document.addEventListener('click', function(e) {
    if (e.target.textContent.includes('Download') || e.target.textContent.includes('Export')) {
        const format = e.target.textContent.toLowerCase().includes('pdf') ? 'pdf' : 'csv';
        exportData(format);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                document.querySelector('[data-section="dashboard"]').click();
                break;
            case '2':
                e.preventDefault();
                document.querySelector('[data-section="profile"]').click();
                break;
            case '3':
                e.preventDefault();
                document.querySelector('[data-section="resume"]').click();
                break;
            case 's':
                e.preventDefault();
                showNotification('All changes saved', 'success');
                break;
        }
    }
});