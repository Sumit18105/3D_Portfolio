import { Code, Bot, LineChart, Layers, BrainCircuit, Database, Cloud, Briefcase, GraduationCap, Award, Mail, Github, Linkedin } from 'lucide-react';

export const personalInfo = {
  name: "Sumit Pathak",
  role: "AI & ML Student | Product Thinker | Full-Stack Developer | Data Analyst",
  profile: "A student building data-driven, user-centric digital products with AI, MERN stack, and analytics.",
  about: "As a passionate student of AI and Machine Learning, I'm driven by the challenge of creating intelligent, data-driven products. My background in full-stack development and a keen eye for product has given me a holistic view of the digital landscape. I thrive on translating complex user needs into functional, elegant, and impactful digital systems, from neural networks to user-friendly web applications."
};

export const skills = [
  {
    category: "AI & Machine Learning",
    icon: BrainCircuit,
    items: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "NLP", "Computer Vision"],
  },
  {
    category: "Data Analysis",
    icon: LineChart,
    items: ["SQL", "Tableau", "R", "Pandas", "NumPy", "Power BI"],
  },
  {
    category: "Product Management",
    icon: Layers,
    items: ["UX Thinking", "Agile", "JIRA", "Figma", "Market Research", "Analytics"],
  },
  {
    category: "Web Development",
    icon: Code,
    items: ["React", "Node.js", "Express", "MongoDB", "Django", "JavaScript"],
  },
];

export const projects = [
  {
    id: "mental-health",
    title: "Mental Health Support System",
    description: "A comprehensive platform using the MERN stack to connect users with mental health resources and professionals.",
    tech: ["MERN Stack", "Socket.io", "JWT"],
    impact: "Provided a safe and accessible space for users to seek mental health support.",
    image: "placeholder-mental-health",
  },
  {
    id: "job-portal",
    title: "Job Portal",
    description: "A full-featured job portal built with the MERN stack, allowing companies to post jobs and candidates to apply.",
    tech: ["MERN Stack", "REST APIs", "Node.js"],
    impact: "Streamlined the hiring process for both employers and job seekers.",
    image: "placeholder-job-portal",
  },
  {
    id: "fire-detection",
    title: "Fire Detection System",
    description: "A computer vision project that uses deep learning to detect fire in real-time from video streams.",
    tech: ["Computer Vision", "Python", "OpenCV", "TensorFlow"],
    impact: "Enhanced safety by providing early fire warnings.",
    image: "placeholder-fire-detection",
  },
  {
    id: "ocr-translation",
    title: "OCR & Translation App",
    description: "An application that performs Optical Character Recognition (OCR) on images and translates the extracted text.",
    tech: ["OCR", "Tesseract.js", "React"],
    impact: "Made information more accessible by breaking language barriers.",
    image: "placeholder-ocr-app",
  },
  {
    id: "portfolio",
    title: "3D Portfolio Website",
    description: "This very portfolio, built with Next.js and Three.js to create an immersive 3D experience.",
    tech: ["Next.js", "Three.js", "GSAP", "Tailwind CSS"],
    impact: "Showcases my skills and projects in an innovative and engaging way.",
    image: "placeholder-portfolio",
  },
  {
    id: "sudoku-wizard",
    title: "Sudoku Wizard",
    description: "A web-based Sudoku solver that uses a backtracking algorithm to solve any valid puzzle.",
    tech: ["JavaScript", "HTML/CSS", "Algorithm"],
    impact: "A fun project demonstrating algorithmic problem-solving skills.",
    image: "placeholder-sudoku",
  },
];

export const experience = [
  {
    type: "Education",
    icon: GraduationCap,
    title: "AI & ML Degree",
    institution: "University of Technology",
    date: "2021 - Present",
    description: "Pursuing a specialized degree in Artificial Intelligence and Machine Learning, focusing on deep learning, data science, and intelligent systems.",
  },
  {
    type: "Job",
    icon: Briefcase,
    title: "Operations Manager",
    institution: "Makes360",
    date: "2020 - 2021",
    description: "Managed cross-functional teams, streamlined operational workflows, and improved process efficiency by 25% using data-driven strategies.",
  },
  {
    type: "Internship",
    icon: Briefcase,
    title: "Frontend Internship",
    institution: "IBM SkillsBuild",
    date: "Summer 2020",
    description: "Developed and maintained user-facing features for enterprise applications, gaining hands-on experience with modern frontend frameworks and agile development methodologies.",
  },
  {
    type: "Patent",
    icon: Award,
    title: "VR Health Monitoring System",
    institution: "Patent Office",
    date: "Published 2023",
    description: "Co-authored a patent for a system that uses Virtual Reality to monitor and guide users through physical therapy exercises, tracking progress with integrated sensors.",
  },
  {
    type: "Patent",
    icon: Award,
    title: "USB Security Protocol",
    institution: "Patent Office",
    date: "Published 2022",
    description: "A novel security protocol to prevent data breaches through unauthorized USB device access, utilizing hardware and software-level authentications.",
  },
];

export const contact = {
  email: "sumit@example.com",
  links: [
    { name: "GitHub", url: "https://github.com", icon: Github },
    { name: "LinkedIn", url: "https://linkedin.com", icon: Linkedin },
  ]
};
