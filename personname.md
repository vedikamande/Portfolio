# Technical Documentation: Vedika Mande Personal Portfolio System

**Engineer / Subject**: Vedika Mande  
**Project**: Responsive Personal Portfolio Web Application  
**Version**: 1.0.0  
**Stack**: HTML5, Vanilla CSS3 (Custom Design System), JavaScript (ES6+)  
**Documentation Integrity Compliance**: AIRA Engineering Protocol  

---

## 1. System Overview & Purpose

The **Vedika Mande Personal Portfolio** is an ultra-fast, responsive, minimal web application created to showcase Vedika Mande's software engineering background, academic excellence (Master of Computer Applications, Vishwakarma University; Bachelor of Computer Science, MGM University), project implementations, technical proficiencies, and verified credentials.

### Key Capabilities
- **Hero & Personal Branding**: Headline, contact chips, dynamic coding widget, active availability badge, and quick action CTAs.
- **About Me Panel**: Academic background narrative, core engineering pillars (Backend, Databases, Cloud, Modern Web), and personal profile metadata.
- **Skills Matrix with Interactive Filter**: Filterable grid categorizing Languages, Databases, Web & Backend, and Tools & Cloud with real-time UI toggles.
- **Project Showcase with In-Depth Modals**: Highlights the *Student Registration Portal* (FastAPI, MongoDB, JWT) and *Career Up Placement Consultant* (CMS, UX Design, Pitching).
- **Academic Timeline**: Visual chronological history representing MCA (CGPA 9.2), BCS (CGPA 8.13), HSC (76.33%), and SSC (88.20%).
- **Verified Credentials Gallery**: Dedicated cards for MKCL Java (120 hrs), HackerRank SQL, Infosys Springboard Python, Great Learning OOP, and AWS Cloud Practitioner Essentials.
- **Contact & Communication Interface**: Client-side validated messaging form with instant feedback toast and copy-to-clipboard email facility.
- **Theme Engine**: Light/Dark mode toggle with `localStorage` persistence and system media preference fallback.
- **Repository Setup**: Standard `.gitignore` and comprehensive `README.md` prepared for GitHub publishing.

---

## 2. High-Level System Architecture

The following Mermaid architecture diagram illustrates the component hierarchy and client-side data flows:

```mermaid
graph TD
    User["Web Client / Browser"] --> DOM["index.html (Semantic DOM Structure)"]
    
    subgraph UI_Layer ["Presentation & UI Layer"]
        DOM --> Header["Navigation Bar & Theme Switcher"]
        DOM --> Hero["Hero Banner & Stat Badges"]
        DOM --> About["About Me & Core Engineering Pillars"]
        DOM --> Skills["Skills Grid & Filter Controls"]
        DOM --> Projects["Projects Showcase & Modal Viewer"]
        DOM --> Education["Education Timeline (MCA, BCS, HSC, SSC)"]
        DOM --> Certs["Certifications Grid (AWS, Java, SQL, Python)"]
        DOM --> Contact["Contact Form & Communication Links"]
        DOM --> Footer["Footer & Scroll to Top"]
    end

    subgraph Style_System ["Style System (style.css)"]
        CSSVars["CSS Custom Properties / Design Tokens"]
        DarkMode["Dark Theme (Default)"]
        LightMode["Light Theme"]
        Responsive["Media Queries (Breakpoints: 992px, 768px, 480px)"]
        CSSVars --> DarkMode
        CSSVars --> LightMode
    end

    subgraph Logic_Engine ["Client Runtime Engine (script.js)"]
        ThemeHandler["Theme Toggle & LocalStorage Sync"]
        FilterHandler["Interactive Skills Category Filter"]
        ModalHandler["Dynamic Project Modal Manager"]
        ScrollSpy["Navbar ScrollSpy Observer"]
        FormValidator["Contact Form Validation & Toast Notification"]
        Clipboard["Email Clipboard Copy Action"]
    end

    UI_Layer -.-> Style_System
    UI_Layer <--> Logic_Engine
```

---

## 3. Component Breakdown & Logic Descriptions

### 3.1. Theme Engine (`initThemeToggle`)
- **Mechanism**: Reads `'theme'` key from browser `localStorage`. Defaults to `'dark'`.
- **Logic**:
  - Modifies `data-theme` attribute on `<html>` root (`data-theme="light"` or `data-theme="dark"`).
  - Triggers toast notification confirming theme switch.
  - Updates button iconography seamlessly.

### 3.2. Filterable Skills Engine (`initSkillsFilter`)
- **Mechanism**: Event-driven DOM filtering using data attributes `data-filter` and `data-category`.
- **Logic Flow**:

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant FilterBtn as Filter Button
    participant DOM as Skills Grid
    participant SkillCard as Skill Cards

    User->>FilterBtn: Clicks Category (e.g., 'Databases')
    FilterBtn->>FilterBtn: Sets .active state on clicked button
    FilterBtn->>DOM: Reads data-filter attribute
    loop Each Skill Card
        DOM->>SkillCard: Inspects data-category
        alt Matches Filter or Filter is 'all'
            SkillCard->>SkillCard: Display 'flex' & fade in opacity
        else Does Not Match
            SkillCard->>SkillCard: Display 'none'
        end
    end
```

### 3.3. Project Modal Architecture (`initProjectModal`)
- Modal data is maintained in a typed JavaScript object dictionary `projectData`.
- When user clicks `.project-modal-trigger`, the system extracts `data-project` ID, constructs the detailed architecture summary, system flow, and technologies applied, then mounts it to `#modal-content`.
- Dismissible via close icon, background click, or `Escape` keypress.

```mermaid
stateDiagram-v2
    [*] --> Closed
    Closed --> Opened: User clicks "Project Details"
    Opened --> Opened: View Architecture & Tech Specs
    Opened --> Closed: Click Backdrop / Close Button / Escape key
```

### 3.4. Contact Form Validation Flow (`initContactForm`)
- Client-side validation validates non-empty name, email regex pattern `^[^\s@]+@[^\s@]+\.[^\s@]+$`, and message length (>10 characters).
- Emits explicit helper messages under erroneous inputs.
- Emulates asynchronous dispatch with spinner state and displays a floating Toast message before clearing input buffers.

---

## 4. Data Contracts & Model Schemas

### 4.1. Contact Form Payload Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "ContactFormPayload",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 2,
      "maxLength": 100,
      "description": "Full name of the sender"
    },
    "email": {
      "type": "string",
      "format": "email",
      "description": "Valid email address for replies"
    },
    "subject": {
      "type": "string",
      "maxLength": 150,
      "description": "Subject or topic of inquiry"
    },
    "message": {
      "type": "string",
      "minLength": 10,
      "maxLength": 2000,
      "description": "Message body"
    }
  },
  "required": ["name", "email", "message"]
}
```

### 4.2. Project Modal Data Object Contract

```json
{
  "projectId": {
    "title": "string",
    "category": "string",
    "duration": "string",
    "stack": ["string"],
    "summary": "string",
    "features": ["string"],
    "architecture": "string"
  }
}
```

---

## 5. Resume Verification Matrix

| Resume Section | Item | Representation in Application |
|---|---|---|
| **Personal Info** | Vedika Mande, +91 8767743926, vedikamande14@gmail.com | Header, Hero, Contact Section, Footer |
| **Education** | MCA @ Vishwakarma University (CGPA 9.2, 2025–2027) | Hero Stat, About Panel, Timeline Card 1 |
| **Education** | BCS @ MGM University (CGPA 8.13, 2022–2025) | Timeline Card 2 |
| **Education** | HSC Science (PCMB) @ Deogiri College (76.33%, 2022) | Timeline Card 3 |
| **Education** | SSC @ S.B. High School (88.20%, 2020) | Timeline Card 4 |
| **Skills** | Python, Java, SQL, MySQL, MongoDB, AWS, Git/GitHub, Antigravity | Skills Matrix with live categorization |
| **Project 1** | Student Registration Portal (FastAPI, MongoDB, JWT, Python) | Projects Grid Featured Card & Interactive Modal |
| **Project 2** | Career Up Placement Consultant (Wix, Pitching, UX, Documentation) | Projects Grid Team Card & Interactive Modal |
| **Certificates** | KLiC Java Programming (MKCL 120-hr) | Certifications Grid Card 1 |
| **Certificates** | HackerRank SQL (Basic) | Certifications Grid Card 2 |
| **Certificates** | Infosys Springboard Basics of Python | Certifications Grid Card 3 |
| **Certificates** | Great Learning Basics of OOP | Certifications Grid Card 4 |
| **Certificates** | AWS Cloud Practitioner Essentials | Certifications Grid Card 5 |

---

## 6. Verification & Quality Assurance

- **Responsive breakpoints tested**: Desktop (1440px), Laptop (1024px), Tablet (768px), Mobile (375px).
- **Accessibility**: ARIA labels on all icon buttons, keyboard navigable modal, high-contrast text color combinations.
- **Zero dependencies**: No heavy JS frameworks or external CSS bloat; lightning-fast initial paint.

---

## 7. Change Log & Revision History

### Revision 1.1.0 — Role Precision Alignment (Software Developer)
- **Change Description**: Removed all mentions of "Full-Stack Developer" across `index.html`, `script.js`, and documentation. Updated the designation strictly to **Software Developer & MCA Scholar**, focusing on core proficiencies in Python, Java, SQL, Database Architecture, and Backend Web APIs.
- **Updated Logic**:
  - `index.html`: Refined Hero role chip, About narrative, and Featured project badge.
  - `script.js`: Updated `projectData['student-portal'].category` to `'Web Application & API'`.
- **Role Alignment Flowchart**:

```mermaid
flowchart LR
    A["User Profile: Vedika Mande"] --> B["Academic Core: MCA @ Vishwakarma Univ (9.2 CGPA)"]
    A --> C["Languages & Core: Python, Java, SQL, OOP"]
    A --> D["Databases: MySQL, MongoDB"]
    A --> E["Backend & Web: FastAPI, JWT, HTML/CSS/JS"]
    A --> F["Cloud Fundamentals: AWS Practitioner"]
    
    B & C & D & E & F --> G["Designation: Software Developer"]
```

### Revision 1.2.0 — Prominent Integration of Python Developer & AWS Cloud Computing Learner
- **Change Description**: Elevated **Python Developer** as the primary programming identity and **AWS & Cloud Computing Learner** as the key cloud infrastructure focus across the web application.
- **Updated Logic & Component Changes**:
  - `<head>`: Refined title tag and meta description highlighting Python Developer and AWS Cloud Computing Learner.
  - **Hero Section**:
    - Hero Badge updated to: `<i class="fa-brands fa-python"></i> Python Developer & AWS Cloud Computing Learner`.
    - Hero Headline: "Python Developer & AWS Cloud Computing Learner".
    - Visual Profile Card role updated to "Python Developer & AWS Cloud Learner".
    - Terminal Widget updated to `vedika_dev.py` featuring AWS Cloud Practitioner and Python core stack.
  - **About Me Section**: Added explicit narrative about Infosys Springboard Python and AWS Cloud Practitioner Essentials curriculum (EC2, S3, IAM, Cloud Economics).
  - **About Pillars**: Re-aligned into 4 pillars: Python & Backend APIs, AWS & Cloud Computing, Database Engineering, and Java & OOP.
  - **Skills Section Filter**: Re-architected interactive filter categories to feature dedicated `Python & Backend` and `AWS & Cloud` buttons.
- **Competency & Cloud Flowchart**:

```mermaid
flowchart TD
    VM["Vedika Mande"]
    
    subgraph Python_Track ["Python Developer Track"]
        PY1["Python Fundamentals (Infosys Certified)"]
        PY2["Data Structures & Algorithms"]
        PY3["FastAPI Web Framework"]
        PY4["Database Integration (MongoDB / MySQL)"]
        PY1 --> PY2 --> PY3 --> PY4
    end

    subgraph AWS_Cloud_Track ["AWS Cloud Computing Learner Track"]
        AWS1["AWS Cloud Practitioner Essentials"]
        AWS2["Amazon EC2 (Compute)"]
        AWS3["Amazon S3 (Object Storage)"]
        AWS4["AWS IAM (Security & Governance)"]
        AWS5["Cloud Pricing & Shared Responsibility"]
        AWS1 --> AWS2 & AWS3 & AWS4 & AWS5
    end

    VM --> Python_Track
    VM --> AWS_Cloud_Track
```

### Revision 1.3.0 — Beginner-Friendly Simplification & FastAPI Removal
- **Change Description**: 
  - Fully removed all references to FastAPI across the codebase, projects, and skills.
  - Removed the subtitle sentence *"A glimpse into my academic trajectory, engineering principles, and what drives my passion for technology."*
  - Refined all terminology into accessible, beginner-friendly language focusing on foundational Python, AWS cloud basics, database querying, and web fundamentals.
- **Updated Logic & Component Changes**:
  - `index.html`:
    - Removed `FastAPI` from metadata, terminal code preview, about narrative, skill cards, and project tags.
    - Updated Project 1 highlights to focus on Python, MongoDB, input validation, and JWT login.
    - Simplified education description to clear, approachable language.
  - `script.js`:
    - Cleaned `projectData['student-portal']` stack and architecture to remove FastAPI.
- **Beginner-Friendly Portfolio Flowchart**:

```mermaid
flowchart TD
    Profile["Vedika Mande (MCA Student)"]
    
    subgraph Core_Focus ["Core Beginner-Friendly Focus"]
        P1["Python Basics & Problem Solving"]
        P2["AWS Cloud Fundamentals (EC2, S3, IAM)"]
        P3["Database Queries (MySQL & MongoDB)"]
        P4["Web Basics (HTML, CSS, JavaScript)"]
    end
    
    subgraph Real_Projects ["Practical Projects"]
        Proj1["Student Registration Portal (Python + MongoDB + JWT)"]
        Proj2["Career Up Placement Consultant (Wix + UI/UX)"]
    end
    
    Profile --> Core_Focus --> Real_Projects
```

### Revision 1.4.0 — Technical Skills Simplification & Tooling Cleanup
- **Change Description**:
  - Removed the standalone **Login & Authentication** card from the Technical Skills section.
  - Cleaned the **Developer Tools** card: removed Postman / API Testing and MS Office Suite, strictly retaining **VS Code** and **Antigravity** to align with the candidate's core resume skills summary.
- **Updated Logic & Component Changes**:
  - `index.html`:
    - Removed `Login & Authentication` card from `.skills-grid`.
    - Simplified Developer Tools card subtitle to `VS Code & Antigravity`.
    - Retained only `VS Code` and `Antigravity` in the pills list.
- **Updated Skills Matrix Flowchart**:

```mermaid
graph TD
    Skills["Technical Skills Matrix"]
    
    subgraph Languages ["Languages"]
        L1["Python (Primary)"]
        L2["Java (Core OOP)"]
        L3["SQL (Queries & Joins)"]
    end
    
    subgraph Databases ["Databases"]
        D1["MySQL (Relational)"]
        D2["MongoDB (NoSQL Document)"]
    end
    
    subgraph Cloud_Tools ["Cloud & Developer Tools"]
        C1["Amazon Web Services (AWS)"]
        T1["HTML5, CSS3 & JavaScript"]
        T2["Git & GitHub"]
        T3["VS Code & Antigravity"]
    end
    
    Skills --> Languages
    Skills --> Databases
    Skills --> Cloud_Tools
```

### Revision 1.5.0 — Removal of Professional Strengths Component
- **Change Description**: Removed the secondary **Professional Strengths** card containing soft-skill tags from the About Me side column (`.about-info-col`) to create a cleaner, minimalist layout centered on the verified Quick Profile card.
- **Updated Logic & Component Changes**:
  - `index.html`: Cleaned lines 283–296 by removing `.tags-cloud` and `.info-card` for Professional Strengths.
- **Streamlined About Section Architecture**:

```mermaid
graph TD
    AboutSection["About Me Section"]
    
    subgraph Narrative_Panel ["Main Narrative (Left)"]
        N1["Personal Bio & MCA Merit (9.2 CGPA)"]
        N2["Python & Cloud Learning Journey"]
        N3["4 Core Technical Pillars"]
    end
    
    subgraph Profile_Panel ["Side Column (Right)"]
        P1["Quick Profile Card"]
        P2["Academic & Contact Details"]
    end
    
    AboutSection --> Narrative_Panel
    AboutSection --> Profile_Panel
```

### Revision 1.6.0 — Python Skill Alignment to Fundamentals (Removal of Data Structures)
- **Change Description**: Removed references to data structures and advanced algorithmic problem solving from Python descriptions. Accurately mapped Python proficiency to foundational concepts certified by Infosys Springboard: variables, data types, control statements, loops, functions, and basic problem-solving.
- **Updated Logic & Component Changes**:
  - `index.html`:
    - Updated About narrative and Python pillar description.
    - Updated Python skill card description and pills (`Variables & Types`, `Loops & Conditions`, `Functions`, `Infosys Certified`).
    - Aligned Infosys Springboard certificate card skills to `Control Statements`, `Loops & Functions`.
    - Simplified BCS education description.
- **Python Scope Flowchart**:

```mermaid
flowchart LR
    PY["Python Knowledge Scope"] --> C1["Variables & Data Types"]
    PY --> C2["Control Statements (if-else)"]
    PY --> C3["Loops (for, while)"]
    PY --> C4["Functions & Modularity"]
    PY --> C5["Basic Problem Solving"]
```

### Revision 1.7.0 — Designation of Student Registration Portal as Academic Group Project
- **Change Description**: Explicitly tagged the **Student Registration Portal** project as an **Academic Group Project** across all user-facing interfaces, reflecting team-based academic collaboration.
- **Updated Logic & Component Changes**:
  - `index.html`:
    - Updated project badge: `<i class="fa-solid fa-users"></i> Academic Group Project`.
    - Category label updated to `Academic Group Project`.
    - Updated summary and first highlight bullet point to reflect academic group collaboration.
  - `script.js`:
    - Updated `projectData['student-portal']` category and duration to `'Academic Group Project'`.
    - Updated first feature bullet point to reflect collaborative academic work.
- **Projects Classification Flowchart**:

```mermaid
graph TD
    Projects["Vedika Mande Projects"]
    
    subgraph P1 ["Student Registration Portal"]
        P1Type["Type: Academic Group Project"]
        P1Tech["Stack: Python, MongoDB, JWT, HTML/CSS/JS"]
        P1Contrib["Role: Form Validation, Admin Dashboard, Login & DB"]
    end
    
    subgraph P2 ["Career Up Placement Consultant"]
        P2Type["Type: Collaborative Team Project"]
        P2Tech["Stack: Wix, UI/UX, MS Office"]
        P2Contrib["Role: Pitch Presentation, User Journeys & Docs"]
    end
    
    Projects --> P1
    Projects --> P2
```

### Revision 1.8.0 — Streamlining Project Description Phrasing
- **Change Description**: Refined the initial highlight sentence of the **Student Registration Portal** to eliminate repetitive phrasing. The sentence now reads cleanly and professionally:
  > *"Collaborated with a team to develop a web-based Student Registration Portal using Python, MongoDB, HTML, CSS, and JavaScript."*
- **Updated Logic & Component Changes**:
  - `index.html`: Refined first bullet point in `.project-highlights`.
  - `script.js`: Synchronized modal feature bullet with identical natural phrasing.
- **Content Hierarchy Flowchart**:

```mermaid
flowchart LR
    Badge["Badge: Academic Group Project"] --> Action["Action: Collaborated with a team"]
    Action --> Target["Product: Web-based Student Registration Portal"]
    Target --> Tech["Stack: Python, MongoDB, HTML, CSS, JS"]
```

### Revision 1.9.0 — Dedicated Project Technology Container & UI Polish
- **Change Description**: Separated technology mentions from the functional achievement bullet points into a dedicated `.tech-stack-wrapper` container with distinct badge styling and uppercase label. This eliminates clumsy inline comma-separated text wrapping and provides a modern, balanced project card presentation.
- **Updated Logic & Component Changes**:
  - `style.css`: Added styles for `.tech-stack-wrapper` and `.tech-stack-label` with subtle border separation.
  - `index.html`:
    - Updated Project 1 bullet: *"Collaborated with a team to develop a web-based Student Registration Portal."*
    - Nested technology tags inside `.tech-stack-wrapper` with `Technologies Used:` label.
    - Synchronized Project 2 with identical structure and `Technologies & Tools:` label.
- **Project Card Layout Flowchart**:

```mermaid
graph TD
    ProjectCard["Project Card"]
    
    subgraph Highlights ["Functional Highlights (Bullet Points)"]
        H1["1. Team collaboration & portal development"]
        H2["2. Form validation & CET registration"]
        H3["3. Admin dashboard management"]
        H4["4. JWT authentication & security"]
        H5["5. Responsive cross-device UI"]
    end
    
    subgraph Tech_Stack ["Dedicated Tech Stack Container"]
        Label["Label: Technologies Used"]
        Pills["Pill Tags: Python | MongoDB | HTML5 | CSS3 | JavaScript | JWT"]
        Label --> Pills
    end
    
    ProjectCard --> Highlights
    ProjectCard --> Tech_Stack
```

### Revision 1.10.0 — Brand Identity & Career Consultant Scope Alignment
- **Change Description**:
  - Updated primary brand text in navigation header and footer from `Vedika.dev` to **Vedika Mande**.
  - Removed all UI/UX Design references from the **Career Up Placement Consultant** project, ensuring alignment with resume bullet points (Wix website development, MS Word documentation, MS PowerPoint pitch delivery, and team collaboration).
- **Updated Logic & Component Changes**:
  - `index.html`:
    - Updated `.brand-logo` in header and footer to display `Vedika Mande`.
    - Updated Project 2 category to `Placement Consultancy Platform`.
    - Updated Project 2 fifth highlight to: *"Strengthened skills in teamwork, documentation, and client-ready presentation delivery."*
    - Replaced `UI/UX Design` badge tag with `Web Design`.
  - `script.js`:
    - Cleaned `projectData['career-consultant']` metadata to remove UI/UX Design.
- **Brand & Project Mapping Flowchart**:

```mermaid
flowchart TD
    Brand["Brand Identity: Vedika Mande"]
    
    subgraph Career_Up ["Career Up Placement Consultant Scope"]
        F1["Platform: Wix Website"]
        F2["Content: Professional Documentation (MS Word)"]
        F3["Pitch: Presentation Delivery (MS PowerPoint)"]
        F4["Core Strength: Teamwork & Communication"]
    end
    
    Brand --> Career_Up
```

### Revision 1.11.0 — Uniform Typography Color for Brand Logo
- **Change Description**: Unified the font color of the brand logo **Vedika Mande** across both header navigation and footer. Removed the secondary accent color split so that the full name displays in a single, consistent, polished font color (`var(--text-primary)`).
- **Updated Logic & Component Changes**:
  - `index.html`: Removed internal `<span>` around "Mande" in `.logo-text`.
  - `style.css`: Updated `.logo-text` rule to apply `var(--text-primary)` uniformly.
- **Brand Typography Flowchart**:

```mermaid
flowchart LR
    VM["Brand Logo"] --> Mark["Icon Badge: VM (Gradient)"]
    VM --> Text["Text: Vedika Mande (Single Uniform Color: --text-primary)"]
```











