// FinTech Career Generator Application
class FinTechCareerApp {
    constructor() {
        this.currentStep = 1;
        this.selectedRole = null;
        this.currentApplication = {};
        this.applications = [];
        this.templates = {};
        
        this.init();
        this.loadSampleData();
        this.loadTemplates();
    }

    init() {
        this.setupNavigation();
        this.setupWizard();
        this.setupRoleSelection();
        this.renderApplicationsTable();
    }

    loadSampleData() {
        // Load sample applications
        this.applications = [
            {
                id: 1,
                company: "Goldman Sachs",
                position: "Quantitative Analyst - Equity Strategies",
                role: "Quantitative Analyst",
                status: "Interview Scheduled",
                applied: "2025-06-15",
                priority: "High",
                notes: "Phone screen went well, technical interview next week",
                hiringManager: "Sarah Chen"
            },
            {
                id: 2,
                company: "Two Sigma",
                position: "Quantitative Researcher",
                role: "Quantitative Analyst",
                status: "Applied",
                applied: "2025-06-20",
                priority: "High",
                notes: "Dream job - systematic trading focus",
                hiringManager: "Unknown"
            },
            {
                id: 3,
                company: "Betterment",
                position: "Senior Product Manager - WealthTech",
                role: "WealthTech Product Manager",
                status: "Phone Screen",
                applied: "2025-06-10",
                priority: "Medium",
                notes: "Good culture fit, discussing user research background",
                hiringManager: "Mike Johnson"
            }
        ];
    }

    async loadTemplates() {
        // Load resume templates
        try {
            const quantResumeResponse = await fetch('https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/e009acc69fd92e332ef1e96c93293a52/0517f375-be9f-4efb-9571-c172ca358a41/a7589953.md');
            const algoResumeResponse = await fetch('https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/e009acc69fd92e332ef1e96c93293a52/5f6a96df-8276-4a2e-85ef-9357cac6cfc5/828f31fc.md');
            const pmResumeResponse = await fetch('https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/e009acc69fd92e332ef1e96c93293a52/aaadffca-55c6-4752-a252-5b7c64004cea/a7af7329.md');
            
            const quantCoverResponse = await fetch('https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/e009acc69fd92e332ef1e96c93293a52/731f84fd-4a59-44fd-89b6-48cc3dd9a4b1/3fc1c036.md');
            const algoCoverResponse = await fetch('https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/e009acc69fd92e332ef1e96c93293a52/de09bdfb-9a10-4e6a-a526-85d6f05135b0/a197e8fa.md');
            const pmCoverResponse = await fetch('https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/e009acc69fd92e332ef1e96c93293a52/9cf569a3-602f-41ae-b898-fc5223ad3b75/95bafbc8.md');

            this.templates = {
                quantAnalyst: {
                    resume: await quantResumeResponse.text(),
                    coverLetter: await quantCoverResponse.text()
                },
                algoTrader: {
                    resume: await algoResumeResponse.text(),
                    coverLetter: await algoCoverResponse.text()
                },
                productManager: {
                    resume: await pmResumeResponse.text(),
                    coverLetter: await pmCoverResponse.text()
                }
            };
        } catch (error) {
            console.error('Error loading templates:', error);
            this.loadFallbackTemplates();
        }
    }

    loadFallbackTemplates() {
        this.templates = {
            quantAnalyst: {
                resume: `JOHN SMITH
Warren, NJ | (555) 123-4567 | john.smith@email.com | linkedin.com/in/johnsmith

PROFESSIONAL SUMMARY
Quantitative finance professional with 5+ years of experience developing algorithmic trading strategies and managing high-value portfolios. Combines strong technical background in Python/C++ with deep understanding of financial markets and risk management principles.

PROFESSIONAL EXPERIENCE

Wealth Management Advisor | B. Riley Wealth Management | 2021 - Present
• Manage $25M+ in client assets across 50+ high-net-worth portfolios
• Developed quantitative investment strategies resulting in 12% outperformance vs. benchmark
• Implemented automated portfolio rebalancing system reducing manual work by 40%

Senior Software Engineer | PayPal | 2018 - 2021
• Developed high-performance C++ SDKs processing 1M+ transactions per second
• Built Python analytics tools improving user engagement by 25%
• Implemented ML algorithms for fraud detection reducing false positives by 30%

EDUCATION
MBA, Finance | Babson University | 2020 | GPA: 3.8
BS, Computer Science | State University | 2015

CERTIFICATIONS & LICENSES
• Series 7 - General Securities Representative
• Series 66 - Investment Advisor Representative

TECHNICAL SKILLS
Programming: Python, C++, R, SQL, MATLAB
Financial: Bloomberg Terminal, Trading Technologies, Portfolio Management
Analytics: pandas, NumPy, scikit-learn, TensorFlow

TRADING PERFORMANCE
• Annual Returns: 15.2%
• Sharpe Ratio: 1.4
• Maximum Drawdown: 8.5%
• Win Rate: 68%`,
                coverLetter: `[Date]

[Hiring Manager Name]
[Company Name]
[Company Address]

Dear Hiring Manager,

I am writing to express my strong interest in the Quantitative Analyst position at [Company Name]. With my unique combination of quantitative finance expertise and software engineering background, I am excited to contribute to your firm's analytical capabilities and trading strategies.

In my current role as Wealth Management Advisor at B. Riley Wealth Management, I manage over $25M in client assets and have developed quantitative investment strategies that consistently outperform benchmarks by 12%. My technical skills in Python, C++, and statistical modeling, combined with my Series 7 and Series 66 certifications, position me well for the challenges of quantitative analysis in institutional finance.

My previous experience as a Senior Software Engineer at PayPal provided me with the technical foundation necessary for building robust financial systems. I developed high-performance applications processing over 1M transactions per second and implemented machine learning algorithms that reduced fraud detection false positives by 30%. This experience with large-scale data processing and algorithm optimization directly translates to the quantitative modeling requirements of your role.

Key qualifications I bring include:
• Proven track record of developing profitable trading strategies with strong risk-adjusted returns
• Expertise in Python, C++, R, and MATLAB for quantitative analysis
• Experience with Bloomberg Terminal and institutional trading platforms
• Strong academic foundation with MBA in Finance from Babson University

I am particularly drawn to [Company Name] because of your reputation for innovation in quantitative finance and commitment to data-driven investment strategies. I would welcome the opportunity to discuss how my technical skills and market insights can contribute to your team's success.

Thank you for your consideration. I look forward to hearing from you.

Sincerely,
John Smith`
            },
            algoTrader: {
                resume: `JOHN SMITH
Warren, NJ | (555) 123-4567 | john.smith@email.com | linkedin.com/in/johnsmith

PROFESSIONAL SUMMARY
Experienced software engineer and quantitative finance professional specializing in high-performance trading systems and algorithmic strategy development. Expert in C++ optimization, low-latency systems, and market microstructure with proven track record in financial technology.

PROFESSIONAL EXPERIENCE

Wealth Management Advisor | B. Riley Wealth Management | 2021 - Present
• Implemented automated portfolio rebalancing system reducing manual work by 40%
• Developed quantitative investment strategies resulting in 12% outperformance vs. benchmark
• Built real-time risk monitoring systems for $25M+ in managed assets

Senior Software Engineer | PayPal | 2018 - 2021
• Developed high-performance C++ SDKs processing 1M+ transactions per second
• Optimized system latency achieving sub-microsecond execution times
• Built distributed trading infrastructure handling peak loads of 10K+ TPS
• Implemented market data processing systems with 99.99% uptime

EDUCATION
MBA, Finance | Babson University | 2020 | GPA: 3.8
BS, Computer Science | State University | 2015

CERTIFICATIONS & LICENSES
• Series 7 - General Securities Representative
• Series 66 - Investment Advisor Representative

TECHNICAL SKILLS
Programming: C++, Python, Java, SQL, Shell Scripting
Trading Systems: FIX Protocol, Market Data Feeds, Order Management Systems
Infrastructure: Linux, Docker, Kubernetes, Redis, MongoDB
Performance: Low-latency optimization, Memory management, Multi-threading

TRADING PERFORMANCE
• System Latency: <100 microseconds average
• Order Fill Rate: 99.8%
• System Uptime: 99.99%
• Risk-Adjusted Returns: Sharpe 1.4`,
                coverLetter: `[Date]

[Hiring Manager Name]
[Company Name]
[Company Address]

Dear Hiring Manager,

I am excited to apply for the Algorithmic Trading Developer position at [Company Name]. With my extensive background in high-performance software development and quantitative finance, I am well-positioned to contribute to your firm's trading technology infrastructure and algorithmic strategy implementation.

My experience as a Senior Software Engineer at PayPal provided me with deep expertise in building ultra-low-latency systems that process over 1M transactions per second. I specialized in C++ optimization techniques, achieving sub-microsecond execution times while maintaining 99.99% system uptime. This technical foundation directly applies to the demanding performance requirements of algorithmic trading systems.

Currently, as a Wealth Management Advisor at B. Riley Wealth Management, I have successfully bridged the gap between technology and finance by developing automated trading and portfolio management systems. My quantitative strategies have consistently outperformed benchmarks by 12%, demonstrating my ability to translate technical capabilities into profitable trading outcomes.

Key technical competencies I offer:
• Expert-level C++ programming with focus on performance optimization
• Experience with FIX protocol and market data processing systems
• Proven ability to build distributed systems handling high-frequency trading loads
• Deep understanding of market microstructure and algorithmic trading strategies

I am particularly interested in [Company Name] because of your reputation for cutting-edge trading technology and systematic approach to market opportunities. Your focus on quantitative research and technology-driven alpha generation aligns perfectly with my career aspirations and technical expertise.

I would welcome the opportunity to discuss how my unique combination of software engineering excellence and financial market knowledge can contribute to your trading systems and strategy development.

Thank you for your consideration.

Best regards,
John Smith`
            },
            productManager: {
                resume: `JOHN SMITH
Warren, NJ | (555) 123-4567 | john.smith@email.com | linkedin.com/in/johnsmith

PROFESSIONAL SUMMARY
Product management professional with expertise in financial technology and wealth management platforms. Combines technical background in software development with deep understanding of client needs and market dynamics in the fintech space.

PROFESSIONAL EXPERIENCE

Wealth Management Advisor | B. Riley Wealth Management | 2021 - Present
• Manage $25M+ in client assets across 50+ high-net-worth portfolios
• Led implementation of automated portfolio rebalancing system improving client experience
• Developed client-facing analytics dashboard increasing engagement by 35%
• Collaborated with technology team to enhance platform functionality and user experience

Senior Software Engineer | PayPal | 2018 - 2021
• Built Python analytics tools improving user engagement by 25%
• Led cross-functional teams in developing user-centric financial products
• Implemented ML algorithms for fraud detection reducing false positives by 30%
• Collaborated with product managers on feature prioritization and roadmap planning

EDUCATION
MBA, Finance | Babson University | 2020 | GPA: 3.8
BS, Computer Science | State University | 2015

CERTIFICATIONS & LICENSES
• Series 7 - General Securities Representative
• Series 66 - Investment Advisor Representative

CORE COMPETENCIES
Product Strategy: Market analysis, competitive research, product roadmap development
Technical Skills: Python, SQL, data analytics, API design, system architecture
Financial Services: Portfolio management, risk assessment, regulatory compliance
User Experience: User research, journey mapping, A/B testing, conversion optimization

PROJECT HIGHLIGHTS
• Portfolio Management Platform: Led design and implementation of automated rebalancing system
• Client Analytics Dashboard: Developed real-time performance tracking with 35% engagement increase
• Risk Monitoring System: Built comprehensive risk assessment tools for high-net-worth clients`,
                coverLetter: `[Date]

[Hiring Manager Name]
[Company Name]
[Company Address]

Dear Hiring Manager,

I am writing to express my strong interest in the WealthTech Product Manager position at [Company Name]. With my unique combination of financial services experience, technical background, and product development expertise, I am excited to contribute to your mission of democratizing wealth management through innovative technology.

In my current role as Wealth Management Advisor at B. Riley Wealth Management, I manage over $25M in client assets while actively contributing to product development initiatives. I led the implementation of an automated portfolio rebalancing system that significantly improved client experience and operational efficiency. Additionally, I developed a client-facing analytics dashboard that increased user engagement by 35%, demonstrating my ability to translate complex financial concepts into intuitive user experiences.

My technical foundation, developed during my tenure as Senior Software Engineer at PayPal, enables me to work effectively with engineering teams and make informed product decisions. I built analytics tools that improved user engagement by 25% and implemented machine learning solutions that enhanced product functionality. This technical credibility, combined with my MBA in Finance, allows me to bridge the gap between complex financial requirements and practical technology solutions.

Key qualifications I bring to this role:
• Deep understanding of wealth management workflows and client needs
• Proven track record of successful fintech product development
• Strong technical background enabling effective collaboration with engineering teams
• Experience with regulatory requirements in financial services (Series 7, Series 66)

I am particularly drawn to [Company Name] because of your innovative approach to wealth management technology and commitment to improving financial outcomes for all investors. Your focus on user-centric design and data-driven product development aligns perfectly with my product philosophy and career aspirations.

I would welcome the opportunity to discuss how my unique blend of financial services expertise and product management experience can contribute to your team's continued success.

Thank you for your consideration.

Sincerely,
John Smith`
            }
        };
    }

    setupNavigation() {
        const navButtons = document.querySelectorAll('[data-nav]');
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetSection = e.target.getAttribute('data-nav');
                this.showSection(targetSection);
                
                // Update active nav button
                navButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    showSection(sectionId) {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => section.classList.remove('active'));
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    setupWizard() {
        // Make proceedToStep globally available
        window.proceedToStep = (step) => this.proceedToStep(step);
        window.regenerateResume = () => this.generateResume();
        window.regenerateCoverLetter = () => this.generateCoverLetter();
        window.downloadDocuments = () => this.downloadDocuments();
        window.submitApplication = () => this.submitApplication();
    }

    setupRoleSelection() {
        const roleCards = document.querySelectorAll('.role-card');
        roleCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove selection from all cards
                roleCards.forEach(c => c.classList.remove('selected'));
                
                // Add selection to clicked card
                card.classList.add('selected');
                
                // Store selected role
                this.selectedRole = card.getAttribute('data-role');
                
                // Auto-proceed to next step after short delay
                setTimeout(() => {
                    this.proceedToStep(2);
                }, 500);
            });
        });
    }

    proceedToStep(step) {
        if (step === 3 && !this.validateStep2()) {
            alert('Please fill in all required fields');
            return;
        }

        // Hide current step
        document.querySelectorAll('.wizard-content').forEach(content => {
            content.classList.add('hidden');
        });

        // Update step indicators
        document.querySelectorAll('.step').forEach((stepEl, index) => {
            stepEl.classList.remove('active', 'completed');
            if (index + 1 < step) {
                stepEl.classList.add('completed');
            } else if (index + 1 === step) {
                stepEl.classList.add('active');
            }
        });

        // Show target step
        const targetStep = document.getElementById(`step-${step}`);
        if (targetStep) {
            targetStep.classList.remove('hidden');
        }

        this.currentStep = step;

        // Generate content for specific steps
        if (step === 3) {
            this.collectApplicationData();
            this.generateResume();
        } else if (step === 4) {
            this.generateCoverLetter();
        } else if (step === 5) {
            this.updateSummary();
        }
    }

    validateStep2() {
        const companyName = document.getElementById('companyName').value.trim();
        const positionTitle = document.getElementById('positionTitle').value.trim();
        const jobDescription = document.getElementById('jobDescription').value.trim();
        
        return companyName && positionTitle && jobDescription;
    }

    collectApplicationData() {
        this.currentApplication = {
            company: document.getElementById('companyName').value,
            position: document.getElementById('positionTitle').value,
            jobDescription: document.getElementById('jobDescription').value,
            hiringManager: document.getElementById('hiringManager').value || 'Hiring Manager',
            role: this.selectedRole,
            appliedDate: new Date().toISOString().split('T')[0]
        };
    }

    generateResume() {
        const resumeContent = document.getElementById('resumeContent');
        
        if (!this.selectedRole || !this.templates[this.selectedRole]) {
            resumeContent.textContent = 'Error: Unable to load resume template';
            return;
        }

        let resume = this.templates[this.selectedRole].resume;
        
        // Customize resume based on job description
        const jobDesc = this.currentApplication.jobDescription?.toLowerCase() || '';
        
        // Simple keyword matching and highlighting
        if (jobDesc.includes('python')) {
            resume = resume.replace('Python', '**Python**');
        }
        if (jobDesc.includes('machine learning') || jobDesc.includes('ml')) {
            resume = resume.replace('ML algorithms', '**Machine Learning algorithms**');
        }
        
        resumeContent.textContent = resume;
    }

    generateCoverLetter() {
        const coverLetterContent = document.getElementById('coverLetterContent');
        
        if (!this.selectedRole || !this.templates[this.selectedRole]) {
            coverLetterContent.textContent = 'Error: Unable to load cover letter template';
            return;
        }

        let coverLetter = this.templates[this.selectedRole].coverLetter;
        
        // Personalize cover letter
        const today = new Date().toLocaleDateString();
        coverLetter = coverLetter.replace('[Date]', today);
        coverLetter = coverLetter.replace(/\[Company Name\]/g, this.currentApplication.company);
        coverLetter = coverLetter.replace('[Hiring Manager Name]', this.currentApplication.hiringManager);
        
        coverLetterContent.textContent = coverLetter;
    }

    updateSummary() {
        document.getElementById('summaryCompany').textContent = this.currentApplication.company;
        document.getElementById('summaryPosition').textContent = this.currentApplication.position;
        
        const roleNames = {
            quantAnalyst: 'Quantitative Analyst',
            algoTrader: 'Algorithmic Trading Developer',
            productManager: 'WealthTech Product Manager'
        };
        
        document.getElementById('summaryRole').textContent = roleNames[this.selectedRole] || this.selectedRole;
    }

    downloadDocuments() {
        // Simulate document download
        alert('Documents would be downloaded as PDF files in a real application');
    }

    submitApplication() {
        // Add application to tracking
        const newApplication = {
            id: this.applications.length + 1,
            company: this.currentApplication.company,
            position: this.currentApplication.position,
            role: this.selectedRole,
            status: 'Applied',
            applied: this.currentApplication.appliedDate,
            priority: 'Medium',
            notes: 'Application submitted via Career Generator',
            hiringManager: this.currentApplication.hiringManager
        };

        this.applications.push(newApplication);
        this.renderApplicationsTable();

        // Show success message
        alert('Application submitted successfully!');

        // Reset wizard and go to applications view
        this.resetWizard();
        this.showSection('applications');
        
        // Update nav
        document.querySelectorAll('[data-nav]').forEach(btn => btn.classList.remove('active'));
        document.querySelector('[data-nav="applications"]').classList.add('active');
    }

    resetWizard() {
        this.currentStep = 1;
        this.selectedRole = null;
        this.currentApplication = {};

        // Reset wizard UI
        document.querySelectorAll('.wizard-content').forEach(content => {
            content.classList.add('hidden');
        });
        document.getElementById('step-1').classList.remove('hidden');

        document.querySelectorAll('.step').forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index === 0) {
                step.classList.add('active');
            }
        });

        // Clear form fields
        document.getElementById('companyName').value = '';
        document.getElementById('positionTitle').value = '';
        document.getElementById('jobDescription').value = '';
        document.getElementById('hiringManager').value = '';

        // Clear selections
        document.querySelectorAll('.role-card').forEach(card => {
            card.classList.remove('selected');
        });
    }

    renderApplicationsTable() {
        const tbody = document.getElementById('applicationsTableBody');
        tbody.innerHTML = '';

        this.applications.forEach(app => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${app.company}</strong></td>
                <td>${app.position}</td>
                <td><span class="status-badge status-badge--${app.status.toLowerCase().replace(/\s+/g, '-')}">${app.status}</span></td>
                <td>${new Date(app.applied).toLocaleDateString()}</td>
                <td><span class="priority-badge priority-badge--${app.priority.toLowerCase()}">${app.priority}</span></td>
                <td>
                    <button class="action-btn" onclick="app.viewApplication(${app.id})">View</button>
                    <button class="action-btn" onclick="app.editApplication(${app.id})">Edit</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    viewApplication(id) {
        const application = this.applications.find(app => app.id === id);
        if (application) {
            alert(`Application Details:\n\nCompany: ${application.company}\nPosition: ${application.position}\nStatus: ${application.status}\nNotes: ${application.notes}`);
        }
    }

    editApplication(id) {
        alert('Edit functionality would be implemented in a full application');
    }
}

// Initialize the application
const app = new FinTechCareerApp();

// Make app globally available for event handlers
window.app = app;