import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Download,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  AlertCircle,
  Loader2,
  Check,
  ChevronDown,
  Award,
} from "lucide-react";

import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import ParticleCanvas from "./components/ParticleCanvas";
import { projectAPI, contactAPI, Project } from "./api";
import "../index.css";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = {
  Languages: ["Python", "JavaScript", "TypeScript", "Java", "C"],
  "ML / Data": [
    "XGBoost",
    "Random Forest",
    "Scikit-learn",
    "pandas",
    "NumPy",
    "Matplotlib",
    "Seaborn",
    "Feature Engineering",
    "Hyperparameter Tuning",
  ],
  Backend: [
    "Node.js",
    "Express.js",
    "FastAPI",
    "REST APIs",
    "JWT Authentication",
    "Prisma ORM",
  ],
  Frontend: ["React.js", "Next.js", "Tailwind CSS", "Axios"],
  Databases: ["MongoDB", "PostgreSQL"],
  "Tools & Platforms": [
    "Git",
    "GitHub",
    "Vercel",
    "Render",
    "Cloudinary",
    "Streamlit",
    "Postman",
  ],
};

const EXPERIENCE = [
  {
    role: "Technical Member – Web Development",
    company: "Coding Ninjas KIIT Chapter",
    location: "Bhubaneswar, India",
    period: "Aug 2025 – Present",
    bullets: [
      "Engineered a full-stack event management platform (Next.js + Hono + Prisma + MongoDB) enabling participant registration, JWT-authenticated judge workflows, live audience voting, and real-time leaderboard aggregating judge and audience scores simultaneously",
      "Implemented a secure quiz platform with tab-switch detection, session tracking, and timed execution, dynamically serving randomized question sets from a MongoDB-backed question bank",
      "Designed and developed a Project Management System (Next.js + NextAuth + MongoDB) supporting Admin, Domain Lead, Project Lead, and Member roles with project lifecycle management, membership workflows, and announcement systems",
      "Built scalable REST APIs and responsive interfaces supporting concurrent multi-user interactions across all platforms",
    ],
    tech: ["Next.js", "Hono", "Prisma", "MongoDB", "TypeScript", "NextAuth"],
  },
  {
    role: "Open Source Contributor",
    company: "GirlScript Summer of Code",
    location: "Remote",
    period: "Jul 2025 – Oct 2025",
    bullets: [
      "Engineered secure authentication modules integrating OTP login, JWT sessions, Google OAuth, and password recovery workflows using React and Express",
      "Diagnosed and resolved production-level issues; contributed backend improvements adopted into the main codebase",
      "Collaborated with distributed contributors using Git branching workflows and pull request reviews",
    ],
    tech: ["React", "Express", "JWT", "OAuth", "Git"],
  },
];

const EDUCATION = [
  {
    institution: "KIIT University",
    degree: "B.Tech, Computer Science Engineering (AI & ML)",
    year: "2024 – 2028",
    cgpa: 9.29,
  },
  {
    institution: "Aditya Academy Senior Secondary",
    degree: "Class XII (CBSE)",
    year: "2024",
    cgpa: 85,
  },
  {
    institution: "Aditya Academy",
    degree: "Class X (CBSE)",
    year: "2022",
    cgpa: 85.66,
  },
];

const CERTIFICATIONS = [
  {
    name: "TensorFlow on Google Cloud",
    issuer: "Google",
    year: "2025",
    url: "https://google.com",
  },
  {
    name: "DSA in Python",
    issuer: "NPTEL",
    year: "2025",
    url: "https://nptel.ac.in",
  },
  {
    name: "Postman API Student Expert",
    issuer: "Postman",
    year: "2025",
    url: "https://postman.com",
  },
  {
    name: "GirlScript Summer of Code",
    issuer: "Open Source Contributor",
    year: "2025",
    url: "https://gssoc.girlscript.tech",
  },
];

// Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = NAV_LINKS.map((link) => link.href.replace("#", ""));
      for (const section of sections) {
        const elem = document.getElementById(section);
        if (elem) {
          const rect = elem.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const handleNavClick = () => {
    setIsOpen(false);
  };
  return (
    <nav
      className="fixed top-0 left-0 right-0 w-full z-[9999] h-14 md:h-16 transition-all duration-300"
      style={{
  background: scrolled
    ? "rgba(10, 14, 39, 0.85)"
    : "transparent",
  backdropFilter: scrolled ? "blur(20px)" : "none",
  WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
  borderBottom: scrolled
    ? "1px solid rgba(54,29,50,0.2)"
    : "1px solid transparent",
}}
    >
      {" "}
      <div className="h-full max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {" "}
        {/* Logo */}{" "}
        <div className="flex items-center gap-2">
          {" "}
          <div
            className="w-9 h-9 md:w-[36px] md:h-[36px] rounded-full bg-accent-red flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #00d9ff 0%, #00f0ff 100%)",
            }}
          >
            {" "}
            <span className="text-text-dark font-bold text-sm md:text-base">
              {" "}
              SL{" "}
            </span>{" "}
          </div>{" "}
          <span className="hidden sm:inline text-text-lightest font-medium text-sm md:text-lg">
            {" "}
            Soham Lodh{" "}
          </span>{" "}
        </div>{" "}
        {/* Desktop Nav */}{" "}
        <div className="hidden md:flex items-center gap-8">
          {" "}
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleNavClick}
              className={`text-sm transition-colors duration-200 relative ${activeSection === link.href.replace("#", "") ? "text-accent-red" : "text-text-light hover:text-accent-red"}`}
            >
              {" "}
              {link.label}{" "}
              {activeSection === link.href.replace("#", "") && (
                <motion.div
                  className="absolute bottom-[-4px] left-0 h-0.5 bg-accent-red rounded-full"
                  layoutId="activeLink"
                  transition={{ duration: 0.3 }}
                  style={{ width: "100%" }}
                />
              )}{" "}
            </a>
          ))}{" "}
        </div>{" "}
        {/* CTA */}{" "}
        <div className="hidden md:flex">
          {" "}
          <a
            href="#contact"
            className="px-5 py-2 rounded-full text-accent-red text-sm font-medium border border-accent-red border-opacity-20 hover:bg-accent-red hover:text-text-dark transition-all duration-200"
          >
            {" "}
            Hire Me{" "}
          </a>{" "}
        </div>{" "}
        {/* Mobile Button */}{" "}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {" "}
          {isOpen ? (
            <X size={24} className="text-text-light" />
          ) : (
            <Menu size={24} className="text-text-light" />
          )}{" "}
        </button>{" "}
      </div>{" "}
      {/* Mobile Menu */}{" "}
      <AnimatePresence>
        {" "}
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-screen z-40 flex flex-col items-center justify-center gap-8"
            style={{ backgroundColor: "var(--bg-deep)" }}
          >
            {" "}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4"
            >
              {" "}
              <X size={28} className="text-text-light" />{" "}
            </button>{" "}
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleNavClick}
                className="text-2xl text-text-light hover:text-accent-red transition-colors"
              >
                {" "}
                {link.label}{" "}
              </a>
            ))}{" "}
            <a
              href="#contact"
              className="mt-8 bg-accent-red text-text-lightest px-8 py-3 rounded-lg text-lg font-semibold"
            >
              {" "}
              Hire Me{" "}
            </a>{" "}
          </motion.div>
        )}{" "}
      </AnimatePresence>{" "}
    </nav>
  );
};

// Hero Section
const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-transparent pt-16 md:pt-0">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 text-center px-4 md:px-0"
      >
        <motion.div
          variants={itemVariants}
          className="liquid-glass inline-block rounded-full px-4 py-1.5 mb-6"
        >
          <p className="text-xs text-text-light">
            🎓 B.Tech CSE (AI & ML) · KIIT · CGPA 9.29
          </p>
        </motion.div>
        <div className="mb-6 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-8xl font-bold text-text-lightest leading-tight"
          >
            Soham
          </motion.h1>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-8xl font-bold leading-tight"
          >
            <span className="text-accent-red">Lodh</span>
          </motion.h1>
        </div>
        <div className="mb-6">
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-8xl font-bold text-text-lightest leading-tight"
          >
            <span className="text-accent-red">ML</span> Engineer &
          </motion.h1>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-8xl font-bold leading-tight"
          >
            Full-Stack <span className="text-accent-red">Developer</span>
          </motion.h1>
        </div>

        <motion.p
          variants={itemVariants}
          className="text-base md:text-xl text-text-light max-w-2xl mx-auto mb-8 font-light leading-relaxed"
        >
          I build end-to-end systems — from optimized ML pipelines with
          production-grade inference APIs to scalable full-stack web
          applications.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8 flex-wrap"
        >
          <a
            href="#projects"
            className="bg-accent-red text-text-dark px-6 py-3 rounded-lg font-semibold hover:scale-105 hover:brightness-110 transition-transform"
          >
            View Projects
          </a>
          <a
            href="../public/resume.pdf"
            download
            className="liquid-glass px-6 py-3 rounded-lg text-text-light flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(54,29,50,0.5)]"
          >
            <Download size={16} /> Download Resume
          </a>
          <a
            href="#contact"
            className="border border-accent-red border-opacity-40 text-text-light px-6 py-3 rounded-lg hover:border-opacity-100 transition-colors"
          >
            Contact Me
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex gap-6 justify-center mb-12"
        >
          <a
            href="https://github.com/Soham-Lodh"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 hover:text-accent-red transition-all"
          >
            <Github size={20} className="text-text-light" />
          </a>
          <a
            href="https://linkedin.com/in/soham-lodh"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 hover:text-accent-red transition-all"
          >
            <Linkedin size={20} className="text-text-light" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

// About Section
const About = () => {
  const [liveProjectsCount, setLiveProjectsCount] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiBaseUrl =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";
        const response = await fetch(`${apiBaseUrl}/user/stats`);
        if (response.ok) {
          const data = await response.json();
          setLiveProjectsCount(data.stats.liveProjects);
        } else {
          setLiveProjectsCount(0);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        setLiveProjectsCount(0);
      }
    };

    fetchStats();
  }, []);

  return (
    <section
      id="about"
      className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto bg-transparent"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-xs text-accent-red uppercase tracking-widest font-semibold mb-4"
      >
        // ABOUT ME
      </motion.div>

      <div className="grid md:grid-cols-3 gap-12 md:gap-16">
        {/* Left Column */}
        <div className="md:col-span-2">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-text-lightest mb-8"
          >
            Who I{" "}
            <span className="text-accent-red font-playfair italic">Am</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-text-light text-lg leading-relaxed mb-6"
          >
            I'm a passionate developer bridging the gap between machine learning
            and full-stack development. With a strong foundation in AI/ML from
            KIIT University, I've built production-grade systems that combine
            intelligent algorithms with beautiful, scalable interfaces.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1 }}
            className="text-text-light text-lg leading-relaxed"
          >
            My expertise spans from training and deploying ML models to
            architecting robust backend systems and crafting responsive
            frontends. I'm driven by the challenge of solving complex problems
            and delivering solutions that make an impact.
          </motion.p>

          <div className="grid grid-cols-2 gap-6 mt-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="liquid-glass p-6 rounded-lg"
            >
              <p className="text-text-lightest text-3xl font-bold text-accent-red">
                9.29
              </p>
              <p className="text-text-light text-xs mt-2">CGPA</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1 }}
              className="liquid-glass p-6 rounded-lg"
            >
              <p className="text-text-lightest text-3xl font-bold text-accent-red">
                {liveProjectsCount !== null
                  ? `${liveProjectsCount}+`
                  : "Loading..."}
              </p>
              <p className="text-text-light text-xs mt-2">Live Projects</p>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Code Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="liquid-glass p-6 rounded-xl font-mono text-sm"
          style={{ boxShadow: "0 0 40px rgba(245, 89, 81, 0.08)" }}
        >
          <div className="text-text-light mb-4">
            <span>&gt;</span> soham.getCurrentStatus()
          </div>
          <div className="space-y-2">
            <div className="text-text-light">{"{"}</div>
            <div className="text-text-light ml-4">
              role:{" "}
              <span className="text-accent-red">
                "ML Engineer & Full-Stack Dev"
              </span>
              ,
            </div>
            <div className="text-text-light ml-4">
              university:{" "}
              <span className="text-accent-red">"KIIT University"</span>,
            </div>
            <div className="text-text-light ml-4">
              cgpa: <span className="text-text-light">9.29</span>,
            </div>
            <div className="text-text-light ml-4">
              seeking:{" "}
              <span className="text-accent-red">
                "Internship Opportunities"
              </span>
              ,
            </div>
            <div className="text-text-light ml-4">
              domains: [<span className="text-accent-red">"ML Systems"</span>,{" "}
              <span className="text-accent-red">"Backend"</span>,{" "}
              <span className="text-accent-red">"Full-Stack"</span>],
            </div>
            <div className="text-text-light ml-4">
              status: <span className="text-accent-red">"Open to work ✓"</span>
            </div>
            <div className="text-text-light">{"}"}</div>
            <div className="text-text-light mt-4 blink-cursor">_</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Skills Section
const Skills = () => {
  return (
    <section
      id="skills"
      className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto bg-transparent"
      style={{
        backgroundImage:
          "radial-gradient(circle at center, rgba(26,31,58,0.3) 0%, transparent 70%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-xs text-accent-red uppercase tracking-widest font-semibold mb-4"
      >
        // TECHNICAL ARSENAL
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-text-lightest mb-12"
      >
        Technical Arsenal
      </motion.h2>

      <div className="space-y-4">
        {Object.entries(SKILLS).map(([category, skills], index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1 }}
            className="liquid-glass p-6 md:p-7 rounded-lg flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8"
            style={{ background: "rgba(26, 31, 58, 0.4)" }}
          >
            <div className="min-w-fit">
              <p className="text-accent-red text-xs md:text-sm uppercase tracking-widest font-bold">
                {category}
              </p>
            </div>
            <div className="hidden md:block w-px h-12 bg-accent-red opacity-30" />
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <motion.div
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  className="bg-accent-red text-text-dark bg-opacity-8 border border-accent-red border-opacity-20 hover:bg-opacity-15 hover:border-opacity-50 hover:text-text-lightest px-3 py-1.5 rounded-full text-xs md:text-sm transition-all duration-150"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Projects Section
const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, [selectedDomain]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await projectAPI.getAll(selectedDomain || undefined);
      setProjects(response.data.projects || []);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setError("Failed to load projects. Try again.");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchProjects();
  };

  return (
    <section
      id="projects"
      className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto bg-transparent"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-xs text-accent-red uppercase tracking-widest font-semibold mb-4"
      >
        // MY WORK
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-text-lightest mb-12"
      >
        Featured Projects
      </motion.h2>

      {/* Domain Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
  {["All", "Web Development", "AI/ML"].map((domain) => {
    const isActive =
      (domain === "All" && !selectedDomain) ||
      (domain !== "All" && selectedDomain === domain);

    return (
      <motion.button
        key={domain}
        onClick={() => setSelectedDomain(domain === "All" ? null : domain)}
        animate={{
          scale: isActive ? 1.08 : 1,
        }}
        whileHover={{ scale: isActive ? 1.08 : 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 overflow-hidden ${
          isActive
            ? "text-white"
            : "liquid-glass text-text-light hover:text-text-lightest"
        }`}
        style={
          isActive
            ? {
                background: "var(--accent-red) text-text-dark",
                boxShadow:
                  "0 0 0 1px rgba(245,89,81,0.6), 0 0 20px rgba(245,89,81,0.45), 0 0 40px rgba(245,89,81,0.2)",
              }
            : {}
        }
      >
        {isActive && (
          <motion.span
            layoutId="activeFilter"
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)",
            }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          {isActive && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="w-1.5 h-1.5 rounded-full bg-white inline-block"
              style={{ boxShadow: "0 0 6px rgba(255,255,255,0.8)" }}
            />
          )}
          {domain}
        </span>
      </motion.button>
    );
  })}
</div>

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="liquid-glass rounded-2xl h-96 shimmer" />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-16">
          <AlertCircle size={48} className="text-accent-red mb-4" />
          <p className="text-text-light text-lg mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleRetry}
            className="bg-accent-red text-text-lightest px-6 py-2 rounded-lg font-semibold"
          >
            Try Again
          </motion.button>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-text-light text-lg">
            No projects found in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3 }}
              className="liquid-glass rounded-2xl p-6 hover:shadow-2xl transition-all duration-300"
              style={{
                boxShadow: "0 20px 60px rgba(245,89,81,0.12)",
              }}
            >
              <div className="mb-4">
                <span className="inline-block bg-accent-red bg-opacity-10 border border-accent-red border-opacity-30 text-accent-red text-xs uppercase tracking-widest px-3 py-1 rounded-full font-semibold">
                  {project.domain}
                </span>
              </div>
              <h3 className="text-xl font-bold text-text-lightest mb-3">
                {project.title}
              </h3>
              <p className="text-text-light text-sm line-clamp-3 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="bg-bg-mid bg-opacity-60 text-text-light text-xs px-2 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="bg-bg-mid bg-opacity-60 text-text-light text-xs px-2 py-0.5 rounded">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-light hover:text-accent-red transition-colors"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-light hover:text-accent-red transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-accent-red text-sm font-semibold hover:tracking-widest transition-all"
                >
                  Details →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="liquid-glass rounded-3xl p-8 md:p-10 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-text-light hover:text-accent-red"
              >
                <X size={24} />
              </button>
              <span className="inline-block bg-accent-red bg-opacity-10 text-accent-red text-xs uppercase tracking-widest px-3 py-1 rounded-full font-semibold mb-4">
                {selectedProject.domain}
              </span>
              <h2 className="text-3xl font-bold text-text-lightest mb-2">
                {selectedProject.title}
              </h2>
              <p className="text-text-light mb-6 leading-relaxed">
                {selectedProject.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-bg-mid bg-opacity-60 text-text-light text-xs px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={selectedProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-accent-red text-text-lightest py-2 rounded-lg font-semibold text-center hover:brightness-110 transition-all"
                >
                  GitHub
                </a>
                <a
                  href={selectedProject.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border border-accent-red text-accent-red py-2 rounded-lg font-semibold text-center hover:bg-accent-red hover:text-text-lightest transition-all"
                >
                  Live Site
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const TimelineDot = ({
  wrapperRef,
}: {
  wrapperRef: React.RefObject<HTMLDivElement>;
}) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const currentY = useRef(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      if (wrapperRef.current && dotRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();

        const targetY = Math.max(
          0,
          Math.min(window.innerHeight * 0.5 - rect.top, rect.height)
        );

        currentY.current += (targetY - currentY.current) * 0.15;

        dotRef.current.style.transform = `translate(-50%, ${currentY.current - 6}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <div
      ref={dotRef}
      className="absolute left-1/2 hidden md:block w-3 h-3 rounded-full bg-accent-red z-10 will-change-transform"
      style={{
        transform: "translate(-50%, 0)",
        boxShadow:
          "0 0 0 4px rgba(245,89,81,0.15), 0 0 20px rgba(245,89,81,0.7), 0 0 40px rgba(245,89,81,0.3)",
      }}
    />
  );
};

const Experience = () => {
  const wrapperRef = useRef(null);

  return (
    <section
      id="experience"
      className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto bg-transparent relative overflow-hidden"
    >
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-xs text-accent-red uppercase tracking-widest font-semibold mb-4"
        >
          // WHERE I'VE WORKED
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-text-lightest mb-16"
        >
          Experience
        </motion.h2>

        <div className="relative" ref={wrapperRef}>
          <div className="absolute hidden md:block left-1/2 -translate-x-1/2 w-0.5 h-full bg-accent-red bg-opacity-15" />
          <TimelineDot wrapperRef={wrapperRef} />

          <div className="space-y-12">
            {EXPERIENCE.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className={`md:w-1/2 ${index % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"}`}
              >
                <motion.div className="liquid-glass p-6 md:p-7 rounded-lg">
                  <h3 className="text-lg md:text-xl font-bold text-text-lightest mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-accent-red font-semibold mb-1">
                    {exp.company} · {exp.location}
                  </p>
                  <p className="text-text-light text-sm opacity-70 mb-4">
                    {exp.period}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="text-text-light text-sm leading-relaxed">
                        <span className="text-accent-red mr-2">—</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-accent-red bg-opacity-8 border border-accent-red border-opacity-20 text-text-light text-xs px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Education = () => {
  const wrapperRef = useRef(null);

  return (
    <section
      id="education"
      className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto bg-transparent relative overflow-hidden"
    >
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-xs text-accent-red uppercase tracking-widest font-semibold mb-4"
        >
          // ACADEMIC JOURNEY
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-text-lightest mb-16"
        >
          Education
        </motion.h2>

        <div className="relative" ref={wrapperRef}>
          <div className="absolute hidden md:block left-1/2 -translate-x-1/2 w-0.5 h-full bg-accent-red bg-opacity-15" />
          <TimelineDot wrapperRef={wrapperRef} />

          <div className="space-y-12">
            {EDUCATION.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className={`md:w-1/2 ${index % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"}`}
              >
                <motion.div
                  className="liquid-glass p-6 md:p-7 rounded-lg"
                  style={{ border: "1px solid rgba(245,89,81,0.1)" }}
                >
                  <h3 className="text-lg md:text-xl font-bold text-text-lightest mb-2">
                    {edu.institution}
                  </h3>
                  <p className="text-accent-red font-semibold mb-1">
                    {edu.degree}
                  </p>
                  <p className="text-text-light text-sm opacity-70 mb-4">
                    {edu.year}
                  </p>
                  <div>
                    <p className="text-text-lightest text-3xl font-bold text-accent-red">
                      {edu.cgpa}
                    </p>
                    <p className="text-text-light text-xs">CGPA</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Certifications Section
const Certifications = () => {
  return (
    <section
      id="certifications"
      className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto bg-transparent"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-xs text-accent-red uppercase tracking-widest font-semibold mb-4"
      >
        // CREDENTIALS
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-text-lightest mb-12"
      >
        Certifications
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CERTIFICATIONS.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              boxShadow: "-8px 8px 40px rgba(245,89,81,0.1)",
            }}
            className="liquid-glass p-6 rounded-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-accent-red bg-opacity-10 flex items-center justify-center">
                <Award size={20} className="text-accent-red" />
              </div>
              <span className="bg-accent-red bg-opacity-8 text-text-dark text-xs px-3 py-1 rounded-full font-semibold">
                {cert.year}
              </span>
            </div>
            <h3 className="text-lg font-bold text-text-lightest mb-1">
              {cert.name}
            </h3>
            <p className="text-text-light text-sm mb-3">{cert.issuer}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      await contactAPI.send(formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(
        error.response?.data?.message || "Failed to send message",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto bg-transparent"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-xs text-accent-red uppercase tracking-widest font-semibold mb-4"
      >
        // LET'S BUILD SOMETHING
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-text-lightest mb-12"
      >
        Let's Build Something
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Column */}
        <div>
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-xl text-text-light mb-8 leading-relaxed max-w-sm"
          >
            Open to internship opportunities in ML engineering, backend
            development, or full-stack roles.
          </motion.p>

          <div className="space-y-4">
            {[
              {
                icon: Mail,
                label: "Email",
                value: "sohamlodh06@gmail.com",
                href: "mailto:",
              },
              {
                icon: Github,
                label: "GitHub",
                value: "github.com/Soham-Lodh",
                href: "https://github.com/Soham-Lodh",
              },
              {
                icon: Linkedin,
                label: "LinkedIn",
                value: "linkedin.com/in/soham-lodh",
                href: "https://linkedin.com/in/soham-lodh",
              },
            ].map(({ icon: Icon, label, value, href }, i) => (
              <motion.a
                key={label}
                href={href === "mailto:" ? `${href}${value}` : href}
                target={href !== "mailto:" ? "_blank" : undefined}
                rel={href !== "mailto:" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 group"
              >
                <div className="liquid-glass w-9 h-9 rounded-full flex items-center justify-center group-hover:text-accent-red transition-colors">
                  <Icon
                    size={18}
                    className="text-text-light group-hover:text-accent-red"
                  />
                </div>
                <span className="text-text-light group-hover:text-accent-red transition-colors">
                  {value}
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right Column - Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="liquid-glass p-8 md:p-9 rounded-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-bg-mid bg-opacity-40 border border-accent-red border-opacity-20 focus:border-opacity-100 text-text-lightest placeholder-text-light focus:outline-none focus:box-shadow px-4 py-3 rounded-lg transition-all"
              style={{
                boxShadow: formData.name
                  ? "0 0 0 3px rgba(245,89,81,0.1)"
                  : "none",
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-bg-mid bg-opacity-40 border border-accent-red border-opacity-20 focus:border-opacity-100 text-text-lightest placeholder-text-light focus:outline-none px-4 py-3 rounded-lg transition-all"
              style={{
                boxShadow: formData.email
                  ? "0 0 0 3px rgba(245,89,81,0.1)"
                  : "none",
              }}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-bg-mid bg-opacity-40 border border-accent-red border-opacity-20 focus:border-opacity-100 text-text-lightest placeholder-text-light focus:outline-none px-4 py-3 rounded-lg min-h-32 resize-none transition-all"
              style={{
                boxShadow: formData.message
                  ? "0 0 0 3px rgba(245,89,81,0.1)"
                  : "none",
              }}
            />
            {errorMessage && status === "error" && (
              <p className="text-accent-red text-sm">{errorMessage}</p>
            )}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full py-3 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                status === "success"
                  ? "bg-green-600 text-white"
                  : "bg-accent-red text-text-lightest hover:brightness-110"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Sending...
                </>
              ) : status === "success" ? (
                <>
                  <Check size={20} />
                  Message Sent!
                </>
              ) : (
                "Send Message"
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer
      className="w-full py-12 md:py-16 px-4 md:px-8 border-t"
      style={{
        background: "rgba(10, 14, 39, 0.95)",
        borderColor: "rgba(0, 217, 255, 0.15)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-full bg-accent-red flex items-center justify-center"
                style={{ backgroundColor: "#00d9ff" }}
              >
                <span className="text-text-lightest font-bold text-xs">SL</span>
              </div>
              <span className="text-text-lightest font-medium">Soham Lodh</span>
            </div>
            <p className="text-text-light text-sm">
              ML Engineer & Full-Stack Developer
            </p>
            <p className="text-text-light text-xs opacity-60">
              Building production-grade systems, one commit at a time.
            </p>
          </div>

          {/* Center */}
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-text-light text-sm hover:text-accent-red transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right */}
          <div className="flex gap-4 justify-end">
            <a
              href="https://github.com/Soham-Lodh"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 hover:text-accent-red transition-all"
            >
              <Github size={18} className="text-text-light" />
            </a>
            <a
              href="https://linkedin.com/in/soham-lodh"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 hover:text-accent-red transition-all"
            >
              <Linkedin size={18} className="text-text-light" />
            </a>
            <a
              href="mailto:sohamlodh06@gmail.com"
              className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 hover:text-accent-red transition-all"
            >
              <Mail size={18} className="text-text-light" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(245,89,81,0.1)" }}
        >
          <p className="text-text-light text-xs opacity-50">
            © 2025 Soham Lodh. Built with React & TypeScript.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-red pulse-dot" />
            <p className="text-accent-red text-xs font-semibold">
              Open to Internships
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

// Main App Component
export default function App() {
  return (
    <div className="relative isolate w-full bg-transparent">
      <ParticleCanvas />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}
