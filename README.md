

# JobFlow Pro: Automated Finance & Tech Job Applications

JobFlow Pro is a web-based dashboard that automates and tracks finance and technology job applications. It provides an interactive professional toolkit with a dashboard, resume templates, job tracker, analytics, market insights, and an "Auto-Apply" feature to streamline the job search process.

---

## Features

- **Modern Dashboard UI**: Overview of applications, interviews, and stats.
- **Auto-Apply**: One-click auto application process based on user preferences.
- **Resume Templates**: Professionally designed templates for Quant, Fintech, Trading, Sales, and WealthTech roles.
- **Profile Management**: Manage education, skills, certifications, and preferences.
- **Application Tracker**: Track application status, companies, positions, and salary ranges.
- **Analytics**: Visualize application success rates, trends, and job type breakdowns with charts.
- **Market Insights**: Salary data and current trends in Fintech and Finance.
- **Dark/Light Theme Support**: Responsive, accessible, and theme-adaptive design.

---

## Programming Stack

- **HTML5**: Application structure and views (`index.html`)
- **CSS3**: Responsive, modern UI and theming (`style.css`)
- **JavaScript (ES6+)**: Frontend logic, navigation, interactivity, charts (`app.js`)
- **Chart.js**: Data visualization (loaded from CDN)

---

## Setup & Usage

### Prerequisites

- Any modern web browser (Chrome, Firefox, Edge, Safari)
- (Optional) Python 3.x for running a local server (recommended for full JS/CSS support)

### 1. One-Command Setup

Use the provided script to install dependencies and launch the app.

```bash
bash setup.sh
```

### 2. Manual Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/elithaxxor/auto_applyer.git
    cd auto_applyer
    ```

2. **Run with a local server (recommended):**

    - **Using Python 3:**
        ```bash
        python3 -m http.server 8000
        ```
        Then open [http://localhost:8000](http://localhost:8000) in your browser.

    - **Or open directly:**
        Just open `index.html` in your preferred browser, but some features may work best over HTTP.

---

## How It Works

- **Navigation:** Use the sidebar to explore dashboard, profile, templates, tracker, analytics, and settings.
- **Auto-Apply:** Click "Start Auto-Applying" on the dashboard to simulate automated job applications using your profile and preferences.
- **Tracker & Analytics:** All application data is visualized using interactive charts (Chart.js).
- **Customization:** Edit preferences and templates to tailor your job search.

---

## Expanding the Program

- **Backend Integration:** Connect to a backend (Node.js, Flask, etc.) for persistent storage, real APIs, and live data.
- **Authentication:** Add login and user accounts for personalized experiences.
- **More Templates:** Add new roles or custom resume templates in `index.html` and `app.js`.
- **Job Scraping:** Integrate with job boards or LinkedIn APIs for real-time job feeds and automated application submissions.
- **Notifications:** Use browser notifications or email integration for application status updates.

---

## File Structure

```
.
├── index.html      # Main application interface
├── app.js          # Main JavaScript logic and interactivity
├── style.css       # Responsive styles and theming
└── setup.sh        # Automated setup and launch script
```

---

## License

MIT License

---

## Author

Adel Alaali

---

## setup.sh

```bash
#!/bin/bash

# JobFlow Pro Setup Script

# Install Python 3 if not available
if ! command -v python3 &> /dev/null
then
    echo "Python3 is not installed. Please install Python3 to continue."
    exit 1
fi

# Start a local HTTP server
echo "Starting JobFlow Pro at http://localhost:8000 ..."
python3 -m http.server 8000

# (Optional) Detect OS and open browser automatically
if command -v xdg-open &> /dev/null; then
  xdg-open http://localhost:8000
elif command -v open &> /dev/null; then
  open http://localhost:8000
fi
```

---

**How to use:**  
1. Make the script executable: `chmod +x setup.sh`  
2. Run with `./setup.sh`  

This will launch a local server and open JobFlow Pro in your browser.
