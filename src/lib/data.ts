import { Code, LineChart, Layers, BrainCircuit, Briefcase, GraduationCap, Award, Mail, Github, Linkedin, Database, GitBranch, Terminal, ShieldCheck, Trophy, Star } from 'lucide-react';

export const personalInfo = {
  name: "Sumit Pathak",
  role: "AI & ML Student | Full-Stack Developer | Data Analyst",
  about: "Innovative B.Tech AI & ML student with hands-on experience in full-stack development, frontend projects, and managing digital training programs. Skilled in Python, JavaScript, SQL, Tableau and R. Patent-holder in VR health monitoring and USB security systems. Passionate about leveraging technology and data-driven insights to deliver impactful digital solutions, with a strong willingness to learn ERP and SAP.",
  email: "sumitpathak18105@gmail.com",
  phone: "+919608794549",
  address: "Bijaipur, Gopalganj, Bihar",
};

export const skills = [
  {
    category: "Data Analysis & Visualization",
    icon: LineChart,
    items: ["Tableau", "R", "SQL", "Python"],
  },
  {
    category: "Databases",
    icon: Database,
    items: ["MySQL", "MongoDB"],
  },
  {
    category: "Programming Languages",
    icon: Code,
    items: ["Python", "C++", "JavaScript", "HTML/CSS"],
  },
  {
    category: "Frameworks & Libraries",
    icon: Layers,
    items: ["Django", "Django Rest Framework", "OpenCV"],
  },
  {
    category: "Tools & Platforms",
    icon: Terminal,
    items: ["Git", "GitHub", "Postman", "Linux", "VS Code"],
  },
  {
    category: "Interpersonal Skills",
    icon: BrainCircuit,
    items: ["Problem-Solving", "Decision-Making", "Analytical Thinking", "Documentation", "Management", "Team Leadership"],
  },
];

export const projects = [
  {
    id: "mental-health",
    title: "Mental and Psychological Support System",
    description: "Built a mental health support system with counseling, meditation, yoga, and quizzes. Used MERN stack to develop a secure, role-based wellness platform.",
    tech: ["MERN", "Counseling", "Meditation", "Yoga", "Quizzes"],
    image: "placeholder-mental-health",
  },
  {
    id: "job-portal",
    title: "Job Portal",
    description: "Built a full-stack Job Portal using MERN with secure login and role-based access. Integrated RESTful APIs and MongoDB for job and user management.",
    tech: ["MongoDB", "Express", "React", "Node"],
    image: "placeholder-job-portal",
  },
  {
    id: "fire-detection",
    title: "Fire Detection using computer vision",
    description: "Developed a real-time Fire Detection system using OpenCV and YOLOv8 for accurate flame localization. Trained custom models on Roboflow datasets to improve detection accuracy and reduce false alarms.",
    tech: ["Python", "OpenCV", "NumPy", "YOLOv8", "Roboflow", "PyTorch"],
    image: "placeholder-fire-detection",
  },
  {
    id: "portfolio",
    title: "Personal Portfolio Website",
    description: "Built a responsive portfolio website scoring 92/100 (mobile) and 97/100 (desktop) on PageSpeed Insights. Optimized performance with a 1.02-second load time and interactive JavaScript-based navigation.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "placeholder-portfolio",
  },
  {
    id: "ocr-translation",
    title: "Optical Character Recognition (OCR) and Translation Application",
    description: "Created a Python tool achieving 95% text extraction accuracy from images and scanned documents. Integrated multilingual translation and text-to-speech features supporting 10+ languages.",
    tech: ["Python", "OpenCV", "Tesseract", "Googletrans"],
    image: "placeholder-ocr-app",
  },
];

export const experience = [
  {
    type: "Education",
    icon: GraduationCap,
    title: "Bachelor of Technology in AI & ML",
    institution: "Chandigarh Engineering College",
    date: "2023 – 2027",
    description: "Currently pursuing a B.Tech in Artificial Intelligence & Machine Learning in Mohali, Punjab, India.",
  },
  {
    type: "Education",
    icon: GraduationCap,
    title: "Senior Secondary",
    institution: "Mukularanyam English School",
    date: "2021 – 2022",
    description: "Completed senior secondary education in Varanasi, India.",
  },
  {
    type: "Job",
    icon: Briefcase,
    title: "Operations Manager",
    institution: "Makes360",
    date: "09/2024 - 10/2024",
    description: "Managed daily operations of a digital training program and coordinated activities for participants in Mohali, India.",
  },
  {
    type: "Internship",
    icon: Briefcase,
    title: "Front End Development Intern",
    institution: "IBM SkillsBuild",
    date: "06/2024 - 07/2024",
    description: "Learned and practiced frontend development concepts through hands-on tasks and guided training in a virtual setting.",
  },
];

export const patents = [
    {
        icon: ShieldCheck,
        title: "Integrated Virtual Reality Headset For Real-Time Health Monitoring And Adaptive Environment Control",
        appNo: "App. No. 202511044089",
        description: [
            "Invented a VR headset with embedded BioVision SiP sensor combining ECG, PPG, and skin-temperature monitoring for real-time health tracking.",
            "Developed adaptive VR environment control that adjusts visuals and interactions based on heart rate, SpO₂, stress, fatigue, and anxiety levels."
        ],
    },
    {
        icon: ShieldCheck,
        title: "USB Bus Tracking System with Integrated Multi-Node Verification",
        appNo: "App. No. 202511015897",
        description: [
            "Designed a secure USB authentication framework using multi-node verification (password, biometric, OTP/hardware checks) to prevent unauthorized data access.",
            "Implemented tamper-detection and smart access control, enhancing security against data theft and device misuse."
        ]
    }
];

export const certifications = [
    { name: "Front End Development", issuer: "Edunet - IBM SkillsBuild" },
    { name: "Artificial Intelligence Foundation", issuer: "Infosys Springboard" },
    { name: "Python for Software Engineering", issuer: "Chegg" },
    { name: "Full Stack Developer Bootcamp", issuer: "GeeksforGeeks" },
    { name: "AWS Academy Cloud Security Foundations", issuer: "AWS Academy" },
    { name: "AWS Academy Data Engineering", issuer: "AWS Academy" },
];

export const honors = [
    { title: "Certificate of Appreciation - OPERATIONS MANAGER", issuer: "Makes360" },
    { title: "1st Position - Inter-college esports competition", issuer: "" },
    { title: "2nd Position - Tech Hunt Technical Riddle", issuer: "" },
];

export const contact = {
  email: "sumitpathak18105@gmail.com",
  links: [
    { name: "GitHub", url: "https://github.com/sumit-pathak-", icon: Github },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/sumit-pathak-", icon: Linkedin },
  ]
};
