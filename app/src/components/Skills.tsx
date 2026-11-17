import { useEffect, useRef, type CSSProperties } from "react";
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
import {
  TbBrandXdeep,
  TbKey,
  TbApi,
  TbAdjustments,
  TbSettings,
  TbUserShield,
} from "react-icons/tb";

interface Skill {
  name: string;
  icon: React.ElementType | null;
  bg: string; // brand background
  color: string; // icon / text color
  customSvg?: string; // for brands with no react-icons entry
}

const LANGUAGES: Skill[] = [
  { name: "Python", icon: SiPython, bg: "#3776AB", color: "#FFD43B" },
  { name: "JavaScript", icon: SiJavascript, bg: "#F7DF1E", color: "#000000" },
  { name: "TypeScript", icon: SiTypescript, bg: "#3178C6", color: "#ffffff" },
  { name: "Java", icon: FaJava, bg: "#ED8B00", color: "#ffffff" },
  { name: "C", icon: SiC, bg: "#A8B9CC", color: "#000000" },
];

const ML_DATA: Skill[] = [
  {
    name: "XGBoost",
    icon: TbBrandXdeep,
    bg: "#189AB4",
    color: "#ffffff",
    customSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><text y="18" font-size="12" font-weight="700" font-family="monospace">XG</text></svg>`,
  },
  {
    name: "Random Forest",
    icon: null,
    bg: "#2D6A4F",
    color: "#ffffff",
    customSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V12M8 20v-6M16 20v-6M6 12c0-3 2-5 6-5s6 2 6 5"/></svg>`,
  },
  { name: "Scikit-learn", icon: SiScikitlearn, bg: "#F7931E", color: "#3499CD" },
  { name: "pandas", icon: SiPandas, bg: "#130754", color: "#E70488" },
  { name: "NumPy", icon: SiNumpy, bg: "#013243", color: "#4DABCF" },
  {
    name: "Matplotlib",
    icon: null,
    bg: "#11557C",
    color: "#ffffff",
    customSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18l4-8 4 4 4-6 4 10H3z" opacity=".8"/></svg>`,
  },
  {
    name: "Seaborn",
    icon: null,
    bg: "#4C72B0",
    color: "#ffffff",
    customSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12c3-6 6 6 9 0s6-6 9 0"/></svg>`,
  },
  {
    name: "Feature Engineering",
    icon: TbAdjustments,
    bg: "#6C3483",
    color: "#ffffff",
  },
  {
    name: "Hyperparameter Tuning",
    icon: TbSettings,
    bg: "#1A5276",
    color: "#ffffff",
  },
  {
    name: "Optuna",
    icon: null,
    bg: "#00C4CC",
    color: "#ffffff",
    customSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="4"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2" stroke="currentColor" stroke-width="2"/></svg>`,
  },
];

const BACKEND: Skill[] = [
  { name: "Node.js", icon: SiNodedotjs, bg: "#339933", color: "#ffffff" },
  { name: "Express.js", icon: SiExpress, bg: "#000000", color: "#ffffff" },
  { name: "FastAPI", icon: SiFastapi, bg: "#009688", color: "#ffffff" },
  { name: "REST APIs", icon: TbApi, bg: "#FF6B35", color: "#ffffff" },
  { name: "JWT Auth", icon: TbKey, bg: "#D63031", color: "#ffffff" },
  { name: "Prisma ORM", icon: SiPrisma, bg: "#2D3748", color: "#ffffff" },
  { name: "Clerk Auth", icon: TbUserShield, bg: "#6C47FF", color: "#ffffff" },
];

const FRONTEND: Skill[] = [
  { name: "React.js", icon: SiReact, bg: "#20232A", color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, bg: "#000000", color: "#ffffff" },
  { name: "Tailwind CSS", icon: SiTailwindcss, bg: "#0EA5E9", color: "#ffffff" },
  { name: "Axios", icon: SiAxios, bg: "#5A29E4", color: "#ffffff" },
  { name: "Redux Toolkit", icon: SiRedux, bg: "#764ABC", color: "#ffffff" },
  { name: "Vite", icon: SiVite, bg: "#646CFF", color: "#FFD62E" },
];

const DATABASES: Skill[] = [
  { name: "MongoDB", icon: SiMongodb, bg: "#001E2B", color: "#00ED64" },
  { name: "PostgreSQL", icon: SiPostgresql, bg: "#336791", color: "#ffffff" },
];

const TOOLS: Skill[] = [
  { name: "Git", icon: SiGit, bg: "#F05032", color: "#ffffff" },
  { name: "GitHub", icon: SiGithub, bg: "#181717", color: "#ffffff" },
  { name: "Vercel", icon: SiVercel, bg: "#000000", color: "#ffffff" },
  { name: "Render", icon: SiRender, bg: "#46E3B7", color: "#000000" },
  { name: "Cloudinary", icon: SiCloudinary, bg: "#3448C5", color: "#ffffff" },
  { name: "Streamlit", icon: SiStreamlit, bg: "#FF4B4B", color: "#ffffff" },
  { name: "Postman", icon: SiPostman, bg: "#FF6C37", color: "#ffffff" },
];

const ALL_CATEGORIES: {
  label: string;
  blurb: string;
  accent: string;
  skills: Skill[];
}[] = [
  {
    label: "Languages",
    blurb:
      "The languages I write every day — Python for modelling and data work, TypeScript for products.",
    accent: "#00d9ff",
    skills: LANGUAGES,
  },
  {
    label: "ML / Data",
    blurb:
      "The modelling stack behind my machine learning work: training, tuning, and explaining models end to end.",
    accent: "#7bdff2",
    skills: ML_DATA,
  },
  {
    label: "Backend",
    blurb:
      "APIs, authentication, and data layers engineered to hold up under real multi-user traffic.",
    accent: "#b8f2e6",
    skills: BACKEND,
  },
  {
    label: "Frontend",
    blurb:
      "Interfaces built with React and Next.js, wired to live APIs and shipped with a fast toolchain.",
    accent: "#aed9e0",
    skills: FRONTEND,
  },
  {
    label: "Databases",
    blurb:
      "The storage I have shipped with: document stores for speed, relational databases for structure.",
    accent: "#ffd6a5",
    skills: DATABASES,
  },
  {
    label: "Tools & Platforms",
    blurb:
      "Everyday tooling for versioning, deploying, and hosting the work once it leaves my machine.",
    accent: "#00d9ff",
    skills: TOOLS,
  },
];

const SkillChip = ({ skill }: { skill: Skill }) => {
  const Icon = skill.icon;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 340, damping: 24 }}
      className="group flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.035] px-2.5 py-2.5"
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-md"
        style={{
          backgroundColor: skill.bg,
          boxShadow: `0 4px 12px ${skill.bg}55`,
          color: skill.color,
        }}
        aria-hidden="true"
      >
        {Icon ? (
          <Icon size={19} style={{ color: skill.color }} />
        ) : (
          <span
            className="flex h-5 w-5 items-center justify-center"
            dangerouslySetInnerHTML={{ __html: skill.customSvg || "" }}
          />
        )}
      </span>
      <span className="text-xs leading-tight text-text-light transition-colors group-hover:text-text-lightest">
        {skill.name}
      </span>
    </motion.div>
  );
};

const Skills = () => {
  const stackRef = useRef<HTMLDivElement>(null);

  /**
   * Scroll-linked stacking. Reads every card box once per animation frame,
   * then writes a single transform + one custom property per card. No React
   * re-renders and no layout reads inside the write loop, so scrolling stays
   * off the main thread's style work. The loop only runs while the stack is
   * near the viewport.
   */
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    const cards = Array.from(
      stack.querySelectorAll<HTMLElement>("[data-skill-card]"),
    );
    if (!cards.length) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let active = false;

    const render = () => {
      frame = 0;
      if (!active) return;

      if (motionQuery.matches) {
        cards.forEach((card) => {
          card.style.transform = "";
          card.style.setProperty("--cover", "0");
        });
        return;
      }

      const compact = window.innerWidth < 768;
      const step = compact ? 8 : 14;
      const boxes = cards.map((card) => {
        const top = card.getBoundingClientRect().top;
        // offsetHeight ignores the scale we apply, so the loop cannot feed
        // back into its own measurements.
        return {
          top,
          bottom: top + card.offsetHeight,
          height: card.offsetHeight,
        };
      });

      cards.forEach((card, i) => {
        let cover = 0;
        for (let j = i + 1; j < cards.length; j++) {
          const range = Math.max(120, boxes[i].height - step);
          const overlap = (boxes[i].bottom - boxes[j].top) / range;
          cover += Math.min(1, Math.max(0, overlap));
        }
        cover = Math.min(cover, 3.2);

        const scale = 1 - cover * (compact ? 0.03 : 0.05);
        const rotate = compact ? 0 : -cover * 2.2;
        card.style.transform = `translate3d(0, 0, 0) rotateX(${rotate.toFixed(
          2,
        )}deg) scale(${scale.toFixed(4)})`;
        card.style.setProperty("--cover", cover.toFixed(3));
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) schedule();
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(stack);

    const onMotionChange = () => schedule();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motionQuery.addEventListener("change", onMotionChange);
    schedule();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motionQuery.removeEventListener("change", onMotionChange);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const total = ALL_CATEGORIES.length;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-32"
      style={{
        backgroundImage:
          "radial-gradient(circle at center, rgba(26,31,58,0.3) 0%, transparent 70%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent-red"
      >
        // TECHNICAL ARSENAL
      </motion.div>

      <motion.h2
        id="skills-heading"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-4xl font-bold text-text-lightest md:text-5xl"
      >
        Technical Arsenal
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mt-4 max-w-xl text-lg leading-relaxed text-text-light"
      >
        Six layers of the stack I build with — from the languages I model in to
        the tools that ship the result.
      </motion.p>

      <div ref={stackRef} className="skills-stack mt-14 md:mt-20">
        {ALL_CATEGORIES.map(({ label, blurb, accent, skills }, i) => (
          <article
            key={label}
            data-skill-card=""
            aria-labelledby={`skills-title-${i}`}
            className="skills-card relative flex flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0b1027]/95 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] md:min-h-[380px] md:flex-row md:rounded-[30px]"
            style={
              {
                "--i": i,
                "--accent": accent,
              } as CSSProperties
            }
          >
            <div className="skills-card__text flex flex-col justify-between gap-6 p-6 md:w-[45%] md:shrink-0 md:p-10">
              <div>
                <p className="text-xs font-semibold tabular-nums tracking-[0.3em] text-accent-red">
                  {String(i + 1).padStart(2, "0")}
                  <span className="ml-1 text-text-light/40">
                    / {String(total).padStart(2, "0")}
                  </span>
                </p>
                <h3
                  id={`skills-title-${i}`}
                  className="mt-4 text-3xl font-bold text-text-lightest md:text-4xl"
                >
                  {label}
                </h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-text-light">
                  {blurb}
                </p>
              </div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-text-light/35">
                {skills.length} technologies
              </p>
            </div>

            <div
              className="skills-card__media flex flex-1 items-center border-t border-white/[0.06] p-5 md:border-l md:border-t-0 md:p-8"
              style={{
                background: `radial-gradient(120% 140% at 100% 0%, ${accent}24 0%, rgba(10,14,39,0) 62%)`,
              }}
            >
              <ul className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 md:gap-2.5">
                {skills.map((skill) => (
                  <li key={skill.name}>
                    <SkillChip skill={skill} />
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="skills-card__trame pointer-events-none absolute inset-0"
              aria-hidden="true"
            />
          </article>
        ))}
      </div>
    </section>
  );
};

export default Skills;
