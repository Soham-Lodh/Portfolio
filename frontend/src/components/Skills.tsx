import { motion } from "motion/react";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiC,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiVercel,
  SiRender,
  SiCloudinary,
  SiPostman,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiStreamlit,
  SiPrisma,
  SiAxios,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
// XGBoost, Random Forest, Feature Engineering, Hyperparameter Tuning, Optuna, Matplotlib,
// Seaborn, JWT, REST APIs, Clerk Auth — no official SI icons; use TbIcons or custom
import {
  TbBrandXdeep,    // XGBoost fallback — we'll use a custom SVG
  TbChartBar,
  TbBraces,
  TbKey,
  TbApi,
  TbAdjustments,
  TbBrain,
  TbChartDots,
  TbChartLine,
  TbSeeding,
  TbSettings,
  TbShield,
  TbUserShield,
} from "react-icons/tb";

// ─── Skill definition ────────────────────────────────────────────────────────
interface Skill {
  name: string;
  icon: React.ElementType | null;
  bg: string;       // brand background
  color: string;    // icon / text color
  customSvg?: string; // for brands with no react-icons entry
}

// ─── Skill maps per category ─────────────────────────────────────────────────

const LANGUAGES: Skill[] = [
  { name: "Python",     icon: SiPython,     bg: "#3776AB", color: "#FFD43B" },
  { name: "JavaScript", icon: SiJavascript, bg: "#F7DF1E", color: "#000000" },
  { name: "TypeScript", icon: SiTypescript, bg: "#3178C6", color: "#ffffff" },
  { name: "Java",       icon: FaJava,       bg: "#ED8B00", color: "#ffffff" },
  { name: "C",          icon: SiC,          bg: "#A8B9CC", color: "#000000" },
];

const ML_DATA: Skill[] = [
  {
    name: "XGBoost", icon: TbBrandXdeep, bg: "#189AB4", color: "#ffffff",
    customSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><text y="18" font-size="12" font-weight="700" font-family="monospace">XG</text></svg>`,
  },
  {
    name: "Random Forest", icon: null, bg: "#2D6A4F", color: "#ffffff",
    customSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V12M8 20v-6M16 20v-6M6 12c0-3 2-5 6-5s6 2 6 5"/></svg>`,
  },
  { name: "Scikit-learn", icon: SiScikitlearn, bg: "#F7931E", color: "#3499CD" },
  { name: "pandas",       icon: SiPandas,      bg: "#130754", color: "#E70488" },
  { name: "NumPy",        icon: SiNumpy,       bg: "#013243", color: "#4DABCF" },
  {
    name: "Matplotlib", icon: null, bg: "#11557C", color: "#ffffff",
    customSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18l4-8 4 4 4-6 4 10H3z" opacity=".8"/></svg>`,
  },
  {
    name: "Seaborn", icon: null, bg: "#4C72B0", color: "#ffffff",
    customSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12c3-6 6 6 9 0s6-6 9 0"/></svg>`,
  },
  {
    name: "Feature Engineering", icon: TbAdjustments, bg: "#6C3483", color: "#ffffff",
  },
  {
    name: "Hyperparameter Tuning", icon: TbSettings, bg: "#1A5276", color: "#ffffff",
  },
  {
    name: "Optuna", icon: null, bg: "#00C4CC", color: "#ffffff",
    customSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="4"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2" stroke="currentColor" stroke-width="2"/></svg>`,
  },
];

const BACKEND: Skill[] = [
  { name: "Node.js",        icon: SiNodedotjs, bg: "#339933", color: "#ffffff" },
  { name: "Express.js",     icon: SiExpress,   bg: "#000000", color: "#ffffff" },
  { name: "FastAPI",        icon: SiFastapi,   bg: "#009688", color: "#ffffff" },
  { name: "REST APIs",      icon: TbApi,       bg: "#FF6B35", color: "#ffffff" },
  { name: "JWT Auth",       icon: TbKey,       bg: "#D63031", color: "#ffffff" },
  { name: "Prisma ORM",     icon: SiPrisma,    bg: "#2D3748", color: "#ffffff" },
  { name: "Clerk Auth",     icon: TbUserShield, bg: "#6C47FF", color: "#ffffff" },
];

const FRONTEND: Skill[] = [
  { name: "React.js",      icon: SiReact,        bg: "#20232A", color: "#61DAFB" },
  { name: "Next.js",       icon: SiNextdotjs,    bg: "#000000", color: "#ffffff" },
  { name: "Tailwind CSS",  icon: SiTailwindcss,  bg: "#0EA5E9", color: "#ffffff" },
  { name: "Axios",         icon: SiAxios,        bg: "#5A29E4", color: "#ffffff" },
  { name: "Redux Toolkit", icon: SiRedux,        bg: "#764ABC", color: "#ffffff" },
  { name: "Vite",          icon: SiVite,         bg: "#646CFF", color: "#FFD62E" },
];

const DATABASES: Skill[] = [
  { name: "MongoDB",    icon: SiMongodb,    bg: "#001E2B", color: "#00ED64" },
  { name: "PostgreSQL", icon: SiPostgresql, bg: "#336791", color: "#ffffff" },
];

const TOOLS: Skill[] = [
  { name: "Git",        icon: SiGit,       bg: "#F05032", color: "#ffffff" },
  { name: "GitHub",     icon: SiGithub,    bg: "#181717", color: "#ffffff" },
  { name: "Vercel",     icon: SiVercel,    bg: "#000000", color: "#ffffff" },
  { name: "Render",     icon: SiRender,    bg: "#46E3B7", color: "#000000" },
  { name: "Cloudinary", icon: SiCloudinary,bg: "#3448C5", color: "#ffffff" },
  { name: "Streamlit",  icon: SiStreamlit, bg: "#FF4B4B", color: "#ffffff" },
  { name: "Postman",    icon: SiPostman,   bg: "#FF6C37", color: "#ffffff" },
];

const ALL_CATEGORIES = [
  { label: "Languages",      skills: LANGUAGES },
  { label: "ML / Data",      skills: ML_DATA   },
  { label: "Backend",        skills: BACKEND   },
  { label: "Frontend",       skills: FRONTEND  },
  { label: "Databases",      skills: DATABASES },
  { label: "Tools & Platforms", skills: TOOLS },
];

// ─── Single skill chip ────────────────────────────────────────────────────────
const SkillChip = ({ skill }: { skill: Skill }) => {
  const Icon = skill.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.12, y: -4 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 350, damping: 18 }}
      className="group flex flex-col items-center gap-2 cursor-default"
    >
      {/* Icon bubble */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition-shadow duration-200 group-hover:shadow-xl"
        style={{
          backgroundColor: skill.bg,
          boxShadow: `0 4px 12px ${skill.bg}55`,
        }}
      >
        {Icon ? (
          <Icon size={26} style={{ color: skill.color }} />
        ) : (
          <span
            className="flex items-center justify-center w-7 h-7"
            style={{ color: skill.color }}
            dangerouslySetInnerHTML={{ __html: skill.customSvg || "" }}
          />
        )}
      </div>
      {/* Label */}
      <span className="text-xs text-text-light text-center leading-tight max-w-[72px] group-hover:text-text-lightest transition-colors">
        {skill.name}
      </span>
    </motion.div>
  );
};

// ─── Category row ─────────────────────────────────────────────────────────────
const CategoryRow = ({
  label,
  skills,
  index,
}: {
  label: string;
  skills: Skill[];
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ delay: index * 0.08 }}
    className="liquid-glass rounded-2xl p-6 md:p-8"
    style={{ background: "rgba(26, 31, 58, 0.45)" }}
  >
    {/* Category label */}
    <p className="text-accent-red text-xs uppercase tracking-widest font-bold mb-6">
      {label}
    </p>

    {/* Chips grid */}
    <div className="flex flex-wrap gap-x-6 gap-y-5">
      {skills.map((skill) => (
        <SkillChip key={skill.name} skill={skill} />
      ))}
    </div>
  </motion.div>
);

// ─── Section export ───────────────────────────────────────────────────────────
const Skills = () => (
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

    <div className="space-y-5">
      {ALL_CATEGORIES.map(({ label, skills }, i) => (
        <CategoryRow key={label} label={label} skills={skills} index={i} />
      ))}
    </div>
  </section>
);

export default Skills;