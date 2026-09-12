import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Calendar, Layout, Server, Database, Smartphone, ArrowRight, Code2 } from 'lucide-react';

const videos = [
  { id: 0, label: 'Golden Hour', src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4' },
  { id: 1, label: 'Still Water', src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4' },
  { id: 2, label: 'Deep Woods', src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4' },
  { id: 3, label: 'Quiet Dawn', src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4' },
];

type Project = {
  name: string;
  desc: string;
  fullDesc: string;
  tech: string[];
  bg: string;
  image: string;
  features: string[];
  links: { live: string; github: string };
};

const projectsData: Project[] = [
  { 
    name: "SecureSure", 
    desc: "Comprehensive insurance plans for you, your family and your future.", 
    fullDesc: "An enterprise-grade insurance platform designed to handle multiple lines of business simultaneously. Utilizing a modern micro-frontend architecture, the platform enables independent team deployments, robust state management, and scales efficiently under heavy loads.",
    tech: ["React", "TypeScript", "Redux", "Material-UI"], 
    bg: "from-blue-900/40 to-slate-900",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    features: ["Active Policies Tracking", "Claims Processing", "Total Coverage Analytics", "Health Score Gamification", "Coverage Overview Dashboard"],
    links: { live: "#", github: "#" }
  },
  { 
    name: "MindSpace", 
    desc: "Find the Right Therapist for You. Professional. Confidential. Personalized.", 
    fullDesc: "An end-to-end booking and practice management solution for independent therapists. The platform simplifies scheduling, tracks patient progress, and provides an intuitive dashboard for patient management.",
    tech: ["MERN", "Node.js", "Express"], 
    bg: "from-emerald-900/40 to-slate-900",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    features: ["Therapist Directory", "Session Booking", "Progress Tracking", "Mental Wellness Resources", "Personalized Insights"],
    links: { live: "#", github: "#" }
  },
  { 
    name: "HomeHub", 
    desc: "Smarter Homes. Safer Lives. Monitor. Control. Automate. All from one place.", 
    fullDesc: "A custom hardware and software integration project enabling real-time environmental monitoring and smart home control. The system connects microcontrollers to a React frontend, delivering sub-second latency for temperature readings, security cameras, and lighting toggles.",
    tech: ["ESP32", "WebSocket", "React"], 
    bg: "from-purple-900/40 to-slate-900",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1200&auto=format&fit=crop",
    features: ["Real-time Device Control", "Energy Usage Analytics", "Live Security Camera Feeds", "Automated Scene Creation", "Room-based Management"],
    links: { live: "#", github: "#" }
  },
  { 
    name: "QuickKart", 
    desc: "From Your Neighbourhood to Their Doorstep. Smarter deliveries.", 
    fullDesc: "A fast, responsive web application purpose-built to act as the core interface for deliveries. The app handles complex routing, order tracking, and dynamic location services while maintaining high performance.",
    tech: ["React.js", "Mobile WebView"], 
    bg: "from-orange-900/40 to-slate-900",
    image: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?q=80&w=1200&auto=format&fit=crop",
    features: ["Live Delivery Tracking", "Recent Orders Dashboard", "Daily Performance Metrics", "Driver Assignment", "Quick Actions Menu"],
    links: { live: "#", github: "#" }
  }
];

export default function App() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (selectedProject || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedProject, isMenuOpen]);

  const handleVideoSwitch = (index: number) => {
    if (isTransitioning || activeVideo === index) return;
    setIsTransitioning(true);
    setActiveVideo(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ];

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-black font-sans text-white selection:bg-white/30 overflow-x-hidden">
      
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 z-0">
        {videos.map((vid, idx) => (
          <video
            key={vid.id}
            src={vid.src}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              activeVideo === idx ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        {/* Cinematic Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 md:to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        
        {/* PNG Overlay (Train Bob) */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat animate-train-bob pointer-events-none"
          style={{ backgroundImage: `url('https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png')` }}
        />
      </div>

      {/* Main Scrollable Content */}
      <div className="relative z-10 w-full flex flex-col">
        
        {/* Clean, Sticky Navbar */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/70 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-6'
        }`}>
          <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="font-instrument italic text-2xl tracking-wide cursor-pointer hover:opacity-80 transition-opacity">
              IMRAN
            </button>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button 
                  key={link.id} 
                  onClick={() => scrollToSection(link.id)} 
                  className="text-xs font-semibold tracking-widest uppercase text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <a 
                href="/Imran_Tarafder_Full_Stack_Developer_Resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white/90 transition-colors cursor-pointer"
              >
                Resume
              </a>
            </div>

            {/* Mobile Nav Toggle */}
            <button
              className="md:hidden text-white cursor-pointer p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>

        {/* --- HERO SECTION --- */}
        <section id="hero" className="w-full min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 sm:px-12 pt-24 pb-32 relative">
          <div className="max-w-[850px] mt-16 md:mt-0">
            
            {/* Eyebrow */}
            <div className="text-sm font-semibold tracking-[0.2em] text-white/70 uppercase mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-white/50"></span>
              Imran Tarafder
            </div>

            {/* Heading */}
            <h1 className="font-instrument text-6xl sm:text-7xl md:text-[5.5rem] leading-[1.05] text-white mb-8 drop-shadow-lg">
              Full-Stack <br className="hidden sm:block" /> Developer.
            </h1>

            {/* Subtext */}
            <p className="font-sans text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mb-12 drop-shadow-md">
              Building scalable <span className="text-white font-bold">web, mobile & backend systems</span> with <span className="text-white font-bold">JavaScript</span>, <span className="text-white font-bold">TypeScript</span> and modern <span className="text-white font-bold">cloud technologies</span>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button 
                onClick={() => scrollToSection('projects')}
                className="w-full sm:w-auto bg-white text-black rounded-full px-8 py-3.5 text-sm font-bold tracking-wider uppercase hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </button>
              <a 
                href="/Imran_Tarafder_Full_Stack_Developer_Resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-3.5 text-sm font-bold tracking-wider uppercase text-white hover:bg-white/20 transition-colors flex items-center justify-center cursor-pointer"
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* Video Switcher */}
          <div className="absolute bottom-10 left-6 sm:left-12 flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar max-w-full pr-6">
            {videos.map((vid, idx) => (
              <button
                key={vid.id}
                onClick={() => handleVideoSwitch(idx)}
                className={`font-sans text-xs font-extrabold tracking-widest uppercase transition-all duration-500 ease-in-out whitespace-nowrap px-4 py-2 rounded-full cursor-pointer border ${
                  activeVideo === idx 
                    ? 'bg-white text-black border-white shadow-lg' 
                    : 'bg-black/40 text-white/70 border-white/20 hover:bg-black/60 hover:text-white backdrop-blur-sm'
                }`}
              >
                {vid.label}
              </button>
            ))}
          </div>
        </section>

        {/* --- METRICS / PROOF SECTION --- */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full bg-[#0a0a0a] border-t border-white/5 py-16 z-20 relative"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center md:text-left">
            <div>
              <div className="font-instrument text-5xl md:text-6xl text-white mb-2">04+</div>
              <div className="text-xs font-semibold tracking-widest uppercase text-white/50">Years Experience</div>
            </div>
            <div>
              <div className="font-instrument text-5xl md:text-6xl text-white mb-2">20+</div>
              <div className="text-xs font-semibold tracking-widest uppercase text-white/50">Projects Delivered</div>
            </div>
            <div>
              <div className="font-instrument text-5xl md:text-6xl text-white mb-2">03</div>
              <div className="text-xs font-semibold tracking-widest uppercase text-white/50">Production Systems</div>
            </div>
            <div>
              <div className="font-instrument text-5xl md:text-6xl text-white mb-2">15+</div>
              <div className="text-xs font-semibold tracking-widest uppercase text-white/50">Technologies</div>
            </div>
          </div>
        </motion.section>

        {/* --- ABOUT SECTION --- */}
        <motion.section 
          id="about" 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full bg-[#0a0a0a] py-24 z-20 relative"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <h2 className="font-instrument text-4xl md:text-5xl text-white mb-8">About</h2>
            <div className="max-w-3xl mb-16">
              <p className="text-lg text-white/70 leading-relaxed">
                I build production-grade <span className="text-white font-semibold">web and mobile applications</span> across the <span className="text-white font-semibold">MERN ecosystem</span>, with experience in <span className="text-white font-semibold">APIs</span>, <span className="text-white font-semibold">micro-frontends</span>, <span className="text-white font-semibold">IoT</span> and <span className="text-white font-semibold">cloud systems</span>. I focus on creating <span className="text-white font-semibold">scalable architectures</span> and seamless user experiences from database to deployment.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Frontend", icon: <Layout className="w-6 h-6 text-white" />, items: ["React.js", "TypeScript", "Redux", "Material-UI", "Tailwind"] },
                { name: "Backend", icon: <Server className="w-6 h-6 text-white" />, items: ["Node.js", "Express.js", "FastAPI", "RESTful APIs"] },
                { name: "Database", icon: <Database className="w-6 h-6 text-white" />, items: ["MySQL", "MongoDB", "Redis"] },
                { name: "Mobile & IoT", icon: <Smartphone className="w-6 h-6 text-white" />, items: ["React Native", "ESP32", "WebSocket", "WebViews"] }
              ].map((skill, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/[0.05] transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                    {skill.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-4">{skill.name}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, idx) => (
                      <span key={idx} className="text-xs font-semibold text-white/90 bg-white/10 px-2 py-1 rounded border border-white/10">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* --- EXPERIENCE SECTION --- */}
        <motion.section 
          id="experience" 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full bg-[#111111] py-24 z-20 relative border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <h2 className="font-instrument text-4xl md:text-5xl text-white mb-16">Experience</h2>
            
            <div className="space-y-12 max-w-4xl">
              {[
                { title: "Senior Software Engineer", company: "Confitech Solutions Private Limited", period: "July 2022 – Present", desc: <>Developing and maintaining a <span className="text-white font-semibold">React.js micro-frontend architecture</span> for a production insurance platform and a therapist booking and management platform.</>, tech: "React.js, TypeScript, Redux, Node.js, Express.js" },
                { title: "Software Engineer", company: "Highkeen Technologies", period: "April 2022 – June 2022", desc: <>Contributed to the <span className="text-white font-semibold">micro-frontend architecture</span> of a full-scale insurance platform. Built frontend UI components and integrated <span className="text-white font-semibold">RESTful APIs</span>.</>, tech: "React.js, Tailwind CSS, Redux, RxJS" },
                { title: "Freelance Full Stack Developer", company: "Various Clients", period: "April 2020 – March 2022", desc: <>Developed a delivery web application for a local client, delivered small-business web solutions, and built an <span className="text-white font-semibold">IoT monitoring system</span>.</>, tech: "React.js, ESP32, WebSocket, IoT" }
              ].map((exp, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-12 group">
                  <div className="md:w-1/4 shrink-0">
                    <div className="text-xs font-semibold tracking-widest text-white/40 uppercase mb-2">{exp.period}</div>
                  </div>
                  <div className="md:w-3/4 pb-12 border-b border-white/10 group-last:border-0 group-last:pb-0">
                    <h3 className="text-2xl font-semibold text-white mb-1">{exp.title}</h3>
                    <div className="text-base text-white/60 mb-4">{exp.company}</div>
                    <p className="text-base text-white/70 leading-relaxed mb-6">{exp.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.split(', ').map(t => (
                        <span key={t} className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-white/10 text-white border border-white/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* --- PROJECTS SECTION --- */}
        <motion.section 
          id="projects" 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full bg-[#0a0a0a] py-24 z-20 relative border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <h2 className="font-instrument text-4xl md:text-5xl text-white mb-16">Selected Work</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {projectsData.map((proj, i) => (
                <div key={i} className="group cursor-pointer" onClick={() => setSelectedProject(proj)}>
                  {/* Image Placeholder */}
                  <div className={`w-full aspect-[4/3] rounded-2xl bg-gradient-to-br ${proj.bg} border border-white/10 mb-6 relative overflow-hidden flex items-center justify-center`}>
                    <Code2 className="w-16 h-16 text-white/20 group-hover:scale-110 transition-transform duration-500" />
                    <img 
                      src={proj.image} 
                      alt={proj.name} 
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                  </div>
                  
                  {/* Project Info */}
                  <h3 className="text-2xl font-semibold text-white mb-2">{proj.name}</h3>
                  <p className="text-white/60 mb-6 leading-relaxed">{proj.desc}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {proj.tech.map(t => (
                        <span key={t} className="text-[11px] font-bold text-white uppercase tracking-wider bg-white/10 px-2 py-1 rounded border border-white/20">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0 ml-4">
                       <span className="text-sm font-semibold text-white flex items-center gap-1 hover:underline">View <ArrowRight className="w-4 h-4"/></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* --- CONTACT SECTION (Transparent to reveal video) --- */}
        <motion.section 
          id="contact" 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full min-h-[70vh] flex flex-col justify-center bg-black/60 backdrop-blur-sm py-24 z-20 relative border-t border-white/10"
        >
          <div className="max-w-4xl mx-auto px-6 sm:px-12 text-center">
            <h2 className="font-instrument text-5xl md:text-7xl text-white mb-8">Let's Build Something</h2>
            <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              Open for new opportunities and interesting projects. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <a href="mailto:imrantarafder@gmail.com" className="inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold tracking-widest uppercase text-sm hover:scale-105 transition-transform mb-16 shadow-2xl cursor-pointer">
              <Mail className="w-5 h-5" />
              Say Hello
            </a>

            <div className="flex items-center justify-center gap-8 border-t border-white/10 pt-12">
              <a href="https://github.com/YusufHamzan" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                <Github className="w-6 h-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://linkedin.com/in/imran-tarafder-42084624a/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://codeopen.in" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                <ExternalLink className="w-6 h-6" />
                <span className="sr-only">Portfolio</span>
              </a>
            </div>
          </div>
        </motion.section>

      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-6 right-6 text-white p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => scrollToSection(link.id)}
                  className="text-white font-instrument text-4xl hover:text-white/70 transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.a
                href="/Imran_Tarafder_Full_Stack_Developer_Resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 text-sm font-bold tracking-widest uppercase text-white border border-white/20 rounded-full px-8 py-3"
              >
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
              className="bg-[#0a0a0a] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 z-10 bg-black/40 rounded-full backdrop-blur-sm"
                onClick={() => setSelectedProject(null)}
              >
                <X className="w-6 h-6" />
              </button>

              <div className={`w-full aspect-video sm:aspect-[21/9] bg-gradient-to-br ${selectedProject.bg} relative overflow-hidden flex items-center justify-center`}>
                <Code2 className="w-24 h-24 text-white/20" />
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.name} 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  className="absolute inset-0 w-full h-full object-cover opacity-60" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent pointer-events-none"></div>
              </div>

              <div className="p-8 sm:p-12">
                <h3 className="font-instrument text-4xl sm:text-5xl text-white mb-6">{selectedProject.name}</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tech.map(t => (
                    <span key={t} className="text-xs font-bold text-white uppercase tracking-wider bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                      {t}
                    </span>
                  ))}
                </div>
                
                <p className="text-lg text-white/80 leading-relaxed mb-10">
                  {selectedProject.fullDesc}
                </p>

                <div className="mb-12">
                  <h4 className="text-sm font-semibold tracking-widest text-white/40 uppercase mb-4">Key Features</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 shrink-0"></span>
                        <span className="text-white/70 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-4 pt-8 border-t border-white/10">
                  <a href={selectedProject.links.live} className="bg-white text-black px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors flex items-center gap-2">
                    Live Demo <ExternalLink className="w-4 h-4" />
                  </a>
                  <a href={selectedProject.links.github} className="bg-white/10 text-white px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-white/20 transition-colors border border-white/20 flex items-center gap-2">
                    Source Code <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
