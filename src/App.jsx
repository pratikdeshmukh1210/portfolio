import React, { useState, useEffect } from 'react';
import './App.css'; // Optional if you have any generic CSS

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('education');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('opacity-100', 'translate-y-0');
            e.target.classList.remove('opacity-0', 'translate-y-6');
            if (e.target.closest('#skills-tab')) {
              // Trigger skill bars animation
              const bars = document.querySelectorAll('.skill-bar-fill');
              bars.forEach((bar) => {
                bar.style.width = bar.dataset.width + '%';
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeTab]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="font-['DM_Sans',sans-serif] bg-[#f7f7f9] text-[#2d2d2d] leading-relaxed overflow-x-hidden">
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[999] flex items-center justify-between px-[6%] py-[18px] transition-shadow duration-300 md:px-[5%] ${isScrolled ? 'shadow-[0_2px_24px_rgba(0,0,0,0.08)] bg-white/85 backdrop-blur-[16px] border-b border-[#ececec]' : 'bg-[#f7f7f9]/85 backdrop-blur-[16px] border-b border-[#ececec]'
          }`}
      >
        <a href="#" className="font-['Syne',sans-serif] text-[1.4rem] font-extrabold text-[#1a1a2e] tracking-[-0.5px]">
          Pratik<span className="text-[#e63946]">.</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-9 list-none p-0 m-0">
          {['Home', 'Skills', 'Projects', 'Resume', 'Contact'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-[#2d2d2d] text-[0.88rem] font-medium tracking-[0.3px] hover:text-[#e63946] transition-colors duration-200"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden md:inline-block bg-[#e63946] text-white px-6 py-2.5 rounded-full text-[0.88rem] font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(230,57,70,0.35)]"
        >
          Contact Me
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] cursor-pointer bg-none border-none z-50"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <span className="w-6 h-0.5 bg-[#2d2d2d] rounded transition-transform"></span>
          <span className="w-6 h-0.5 bg-[#2d2d2d] rounded transition-transform"></span>
          <span className="w-6 h-0.5 bg-[#2d2d2d] rounded transition-transform"></span>
        </button>

        {/* Mobile Menu */}
        {isNavOpen && (
          <div className="md:hidden absolute top-[70px] left-0 right-0 bg-white drop-shadow-xl px-[6%] py-5 flex flex-col">
            <ul className="flex flex-col p-0 m-0">
              {['Home', 'Skills', 'Projects', 'Resume', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsNavOpen(false)}
                    className="block py-3 border-b border-[#ececec] text-[1rem] hover:text-[#e63946]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setIsNavOpen(false)}
              className="mt-4 bg-[#e63946] text-white px-6 py-3 rounded-full text-center font-semibold"
            >
              Hire Me
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-center gap-[60px] pt-[130px] px-[6%] pb-[100px] bg-white relative overflow-hidden"
      >
        <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(230,57,70,0.06)_0%,transparent_70%)] top-[-100px] right-[-100px] pointer-events-none"></div>

        {/* Hero Left */}
        <div className="animate-[fadeUp_0.8s_ease_both] md:text-left text-center z-10">
          <p className="text-[1rem] font-medium text-[#888] tracking-[0.5px] mb-4">
            Welcome to my world <span className="text-[#e63946]">👋</span>
          </p>
          <h1 className="font-['Syne',sans-serif] text-[clamp(2.6rem,5vw,4rem)] font-extrabold text-[#1a1a2e] leading-[1.1] tracking-[-1px] mb-2 m-0">
            Pratik Deshmukh
          </h1>
          <h2 className="font-['Syne',sans-serif] text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-[#e63946] mb-6 leading-[1.2] m-0 mt-2">
            MERN Stack Developer
          </h2>
          <p className="text-[#666] text-[1rem] leading-[1.8] max-w-[480px] mb-10 mx-auto md:mx-0">
            Full-stack developer with strong command of JavaScript, React, Node.js, Express, and MongoDB. I build responsive UIs, integrate APIs, and implement secure authentication — turning ideas into production-ready web apps.
          </p>
          <div className="flex gap-4 items-center flex-wrap mb-12 justify-center md:justify-start">
            <a
              href="#contact"
              className="bg-[#e63946] text-white px-8 py-3.5 rounded-full text-[0.95rem] font-semibold flex items-center gap-2 hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(230,57,70,0.35)] transition-all"
            >
              <i className="fas fa-paper-plane"></i> Hire Me
            </a>
            <a
              href="#portfolio"
              className="border-2 border-[#1a1a2e] text-[#1a1a2e] px-7 py-[12px] rounded-full text-[0.95rem] font-semibold flex items-center gap-2 hover:border-[#e63946] hover:text-[#e63946] transition-colors"
            >
              <i className="fas fa-code"></i> View Projects
            </a>
          </div>
          <div className="flex gap-[14px] justify-center md:justify-start">
            {[
              { icon: 'linkedin-in', link: 'https://www.linkedin.com/in/pratik-deshmukh-82066228a/', brand: 'fab' },
              { icon: 'github', link: 'https://github.com/Pratikdeshmukh1210', brand: 'fab' },
              { icon: 'envelope', link: 'mailto:pratikdeshmukh12102004@gmail.com', brand: 'fas' },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.link}
                target={social.icon !== 'envelope' ? '_blank' : '_self'}
                rel="noreferrer"
                className="w-10 h-10 rounded-full border-[1.5px] border-[#ececec] flex items-center justify-center text-[#888] text-[0.9rem] hover:border-[#e63946] hover:text-[#e63946] hover:-translate-y-0.5 transition-all"
              >
                <i className={`${social.brand} fa-${social.icon}`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Hero Right */}
        <div className="hidden md:flex justify-center items-center animate-[fadeUp_0.8s_0.2s_ease_both] relative z-10">
          <div className="relative">
            <div className="w-[340px] bg-white rounded-[28px] shadow-[0_20px_80px_rgba(0,0,0,0.1)] overflow-hidden">
              <div className="h-[220px] bg-gradient-to-br from-[#1a1a2e] to-[#e63946] flex flex-col items-center justify-center relative">
                <div className="w-[110px] h-[110px] rounded-full bg-white/15 border-4 border-white/40 flex items-center justify-center font-['Syne',sans-serif] text-[2.8rem] font-extrabold text-white">
                  PD
                </div>
                <div className="absolute -bottom-4 right-6 bg-[#e63946] text-white px-4 py-2 rounded-full text-[0.78rem] font-bold tracking-[0.5px] shadow-[0_4px_16px_rgba(230,57,70,0.4)]">
                  ✦ Open to Work
                </div>
              </div>
              <div className="p-8 pb-6 text-left">
                <h3 className="font-['Syne',sans-serif] text-[1.2rem] font-extrabold text-[#1a1a2e] mb-1 mt-0">
                  Pratik Deshmukh
                </h3>
                <p className="text-[0.85rem] text-[#e63946] font-medium mb-5">MERN Stack Developer · Fresher</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { num: '2', label: 'Projects Deployed' },
                    { num: '7.8', label: 'CGPA' },
                    { num: '4+', label: 'Certifications' },
                    { num: '2027', label: 'Graduating' },
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-[#f7f7f9] rounded-2xl p-3.5 text-center">
                      <div className="font-['Syne',sans-serif] text-[1.5rem] font-extrabold text-[#e63946] leading-none mb-1">
                        {stat.num}
                      </div>
                      <div className="text-[0.72rem] text-[#888] font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* floating chips */}
            <div className="absolute top-[60px] -left-5 bg-white rounded-full px-4 py-2 text-[0.78rem] font-semibold shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center gap-1.5 animate-[float_3s_ease-in-out_infinite]">
              <i className="fab fa-react text-[#e63946]"></i> React.js
            </div>
            <div className="absolute bottom-[100px] -left-10 bg-white rounded-full px-4 py-2 text-[0.78rem] font-semibold shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center gap-1.5 animate-[float_3s_ease-in-out_infinite] [animation-delay:1s]">
              <i className="fab fa-node-js text-[#e63946]"></i> Node.js
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="px-[6%] py-[100px] bg-[#f7f7f9]">
        <div className="text-[0.78rem] font-semibold tracking-[2.5px] uppercase text-[#e63946] mb-3">
          What I Do
        </div>
        <h2 className="font-['Syne',sans-serif] text-[clamp(2rem,4vw,2.8rem)] font-extrabold text-[#1a1a2e] leading-[1.15] mb-4 mt-0">
          My Skills & Expertise
        </h2>
        <p className="text-[#888] text-[1rem] max-w-[520px] leading-[1.75] mb-14">
          I build responsive web applications using the MERN stack, focusing on clean UI, efficient APIs, and real-world usability.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal opacity-0 translate-y-6 transition-all duration-700">
          {[
            {
              icon: 'fab fa-react',
              title: 'Frontend Development',
              desc: 'Building responsive, component-driven UIs with React and utility-first styling.',
              tags: [{ name: 'React', red: true }, 'Tailwind CSS', 'HTML5', 'CSS3'],
            },
            {
              icon: 'fab fa-node-js',
              title: 'Backend Development',
              desc: 'Creating fast, scalable REST APIs and server-side logic with Node.js and Express.',
              tags: [{ name: 'Node.js', red: true }, 'Express.js', 'REST APIs'],
            },
            {
              icon: 'fas fa-database',
              title: 'Database Design',
              desc: 'Designing and querying MongoDB databases for flexible, document-based data storage.',
              tags: [{ name: 'MongoDB', red: true }, 'DBMS'],
            },
            {
              icon: 'fas fa-shield-alt',
              title: 'Authentication & Security',
              desc: 'Implementing secure login flows with JWT and Google OAuth 2.0 integration.',
              tags: [{ name: 'JWT', red: true }, 'Google OAuth 2.0', 'Auth'],
            },
            {
              icon: 'fab fa-java',
              title: 'Core Programming',
              desc: 'Strong foundation in Java, OOP principles, and problem-solving through DSA.',
              tags: [{ name: 'Java', red: true }, 'JavaScript', 'DSA', 'OOP'],
            },
            {
              icon: 'fas fa-brain',
              title: 'AI Tools & Cloud',
              desc: 'Hands-on experience with Google Cloud, Gemini AI, and modern prompt-based workflows.',
              tags: [{ name: 'Google Cloud', red: true }, 'Gemini AI', 'Prompt Engineering'],
            },
          ].map((skill, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[20px] p-8 shadow-[0_4px_32px_rgba(0,0,0,0.07)] hover:shadow-[0_12px_48px_rgba(230,57,70,0.13)] border-[1.5px] border-transparent hover:border-red-500/15 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-[52px] h-[52px] rounded-2xl bg-gradient-to-br from-red-500/10 to-pink-500/10 flex items-center justify-center text-[1.3rem] text-[#e63946] mb-5 relative z-10">
                <i className={skill.icon}></i>
              </div>
              <h3 className="font-['Syne',sans-serif] text-[1rem] font-bold text-[#1a1a2e] mb-2.5 mt-0 relative z-10">
                {skill.title}
              </h3>
              <p className="text-[0.88rem] text-[#888] leading-[1.7] relative z-10 m-0">{skill.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-3.5 relative z-10">
                {skill.tags.map((tag, i) =>
                  typeof tag === 'object' ? (
                    <span key={i} className="bg-red-500/10 text-[#e63946] text-[0.73rem] font-semibold px-2.5 py-1 rounded-full tracking-[0.3px]">
                      {tag.name}
                    </span>
                  ) : (
                    <span key={i} className="bg-[#f7f7f9] text-[#2d2d2d] text-[0.73rem] font-semibold px-2.5 py-1 rounded-full tracking-[0.3px]">
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="portfolio" className="px-[6%] py-[100px] bg-white">
        <div className="text-[0.78rem] font-semibold tracking-[2.5px] uppercase text-[#e63946] mb-3">
          My Work
        </div>
        <h2 className="font-['Syne',sans-serif] text-[clamp(2rem,4vw,2.8rem)] font-extrabold text-[#1a1a2e] leading-[1.15] mb-4 mt-0">
          Featured Projects
        </h2>
        <p className="text-[#888] text-[1rem] max-w-[520px] leading-[1.75] mb-14">
          Real-world projects I've built and deployed — combining clean design with solid engineering.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 reveal opacity-0 translate-y-6 transition-all duration-700">
          <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_32px_rgba(0,0,0,0.07)] hover:shadow-[0_12px_48px_rgba(230,57,70,0.13)] transition-all duration-300 border-[1.5px] border-[#ececec] hover:-translate-y-1.5">
            <div className="h-[200px] relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#e63946]">
              <div className="absolute top-4 left-4 bg-[#e63946] text-white text-[0.72rem] font-bold px-3 py-1 rounded-full tracking-[0.5px] uppercase">
                Full Stack
              </div>
              <div className="font-['Syne',sans-serif] text-[1.5rem] font-extrabold text-white z-10 text-center px-5">
                StudentMart
              </div>
              <i className="fas fa-shopping-bag text-[3rem] text-white/30 absolute right-6 bottom-5"></i>
            </div>
            <div className="p-6">
              <h3 className="font-['Syne',sans-serif] text-[1.1rem] font-bold text-[#1a1a2e] mb-2 mt-0">
                StudentMart
              </h3>
              <p className="text-[0.88rem] text-[#888] leading-[1.7] mb-4">
                A web platform for college students to buy and resell books, stationery, and engineering supplies. Focused on peer-to-peer transactions within campus, making academics more affordable.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {['React', 'Tailwind CSS', 'Node.js', 'MongoDB'].map((t) => (
                  <span key={t} className="bg-[#f7f7f9] text-[#2d2d2d] text-[0.73rem] font-semibold px-2.5 py-1 rounded-full tracking-[0.3px]">{t}</span>
                ))}
              </div>
              <div className="flex gap-2.5">
                <a href="#" className="bg-[#e63946] text-white px-4 py-1.5 rounded-full text-[0.8rem] font-semibold flex items-center gap-1 hover:shadow-[0_4px_16px_rgba(230,57,70,0.4)] transition-shadow no-underline">
                  <i className="fas fa-external-link-alt"></i> Live Demo
                </a>
                <a href="https://github.com/pratikdeshmukh1210/CampusKart" className="border-[1.5px] border-[#ececec] text-[#2d2d2d] px-4 py-1.5 rounded-full text-[0.8rem] font-semibold flex items-center gap-1 hover:border-[#e63946] hover:text-[#e63946] transition-colors no-underline">
                  <i className="fab fa-github"></i> GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_32px_rgba(0,0,0,0.07)] hover:shadow-[0_12px_48px_rgba(230,57,70,0.13)] transition-all duration-300 border-[1.5px] border-[#ececec] hover:-translate-y-1.5">
            <div className="h-[200px] relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#2d2d2d] to-[#ff6b8a]">
              <div className="absolute top-4 left-4 bg-[#e63946] text-white text-[0.72rem] font-bold px-3 py-1 rounded-full tracking-[0.5px] uppercase">
                Frontend
              </div>
              <div className="font-['Syne',sans-serif] text-[1.5rem] font-extrabold text-white z-10 text-center px-5">
                Agency UI
              </div>
              <i className="fas fa-palette text-[3rem] text-white/30 absolute right-6 bottom-5"></i>
            </div>
            <div className="p-6">
              <h3 className="font-['Syne',sans-serif] text-[1.1rem] font-bold text-[#1a1a2e] mb-2 mt-0">
                Agency Website UI
              </h3>
              <p className="text-[0.88rem] text-[#888] leading-[1.7] mb-4">
                A modern, fully responsive agency website UI built with React and Tailwind CSS. Features reusable components, clean layouts, and utility-first styling optimized for all screen sizes.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {['React', 'Tailwind CSS', 'Responsive'].map((t) => (
                  <span key={t} className="bg-[#f7f7f9] text-[#2d2d2d] text-[0.73rem] font-semibold px-2.5 py-1 rounded-full tracking-[0.3px]">{t}</span>
                ))}
              </div>
              <div className="flex gap-2.5">
                <a href="https://agency-tau-six.vercel.app/" className="bg-[#e63946] text-white px-4 py-1.5 rounded-full text-[0.8rem] font-semibold flex items-center gap-1 hover:shadow-[0_4px_16px_rgba(230,57,70,0.4)] transition-shadow no-underline">
                  <i className="fas fa-external-link-alt"></i> Live Demo
                </a>
                <a href="https://github.com/pratikdeshmukh1210/Agency" className="border-[1.5px] border-[#ececec] text-[#2d2d2d] px-4 py-1.5 rounded-full text-[0.8rem] font-semibold flex items-center gap-1 hover:border-[#e63946] hover:text-[#e63946] transition-colors no-underline">
                  <i className="fab fa-github"></i> GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESUME */}
      <section id="resume" className="px-[6%] py-[100px] bg-[#f7f7f9]">
        <div className="text-[0.78rem] font-semibold tracking-[2.5px] uppercase text-[#e63946] mb-3">
          My Resume
        </div>
        <h2 className="font-['Syne',sans-serif] text-[clamp(2rem,4vw,2.8rem)] font-extrabold text-[#1a1a2e] leading-[1.15] mb-4 mt-0">
          Education, Skills & Certifications
        </h2>
        <p className="text-[#888] text-[1rem] max-w-[520px] leading-[1.75] mb-12">
          A snapshot of my academic background, technical skills, and credentials.
        </p>

        <div className="flex flex-wrap gap-2.5 mb-12">
          {[
            { id: 'education', label: 'Education' },
            { id: 'skills-tab', label: 'Technical Skills' },
            { id: 'certs', label: 'Certifications' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full border-[1.5px] font-semibold text-[0.88rem] transition-colors cursor-pointer ${activeTab === tab.id
                  ? 'bg-[#e63946] border-[#e63946] text-white'
                  : 'bg-white border-[#ececec] text-[#888] hover:border-[#e63946] hover:text-[#e63946]'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Education */}
        <div className={`reveal opacity-0 translate-y-6 transition-all duration-700 ${activeTab === 'education' ? 'block' : 'hidden'}`}>
          <div className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-[#e63946] before:to-transparent">
            {[
              {
                date: '2023 – 2027 (Expected)',
                title: 'B.Tech. in Computer Science',
                sub: 'Sagar Institute of Research Technology-Excellence, Bhopal',
                score: 'CGPA: 7.8 / 10',
                desc: 'Studying core CS subjects including Data Structures, OOP, DBMS, Operating Systems along with practical full-stack development.',
              },
              {
                date: '2025',
                title: 'MERN Stack Web Development',
                sub: 'Sheryians Coding School',
                desc: 'Completed an intensive full-stack course covering HTML, CSS, JavaScript, React, Tailwind CSS, Node.js, and MongoDB with hands-on project work.',
              },
            ].map((edu, idx) => (
              <div key={idx} className="relative bg-white rounded-[20px] p-7 mb-5 shadow-[0_4px_32px_rgba(0,0,0,0.07)] border-[1.5px] border-[#ececec] hover:border-red-500/20 transition-colors">
                <div className="absolute -left-[34px] top-7 w-3 h-3 rounded-full bg-[#e63946] shadow-[0_0_0_3px_rgba(230,57,70,0.2)]"></div>
                <div className="text-[0.78rem] font-bold text-[#e63946] uppercase tracking-[0.5px] mb-2">{edu.date}</div>
                <h3 className="font-['Syne',sans-serif] text-[1.05rem] font-bold text-[#1a1a2e] mb-1 mt-0">{edu.title}</h3>
                <div className="text-[0.88rem] text-[#888] mb-2.5">{edu.sub}</div>
                {edu.score && (
                  <div className="inline-block bg-red-500/10 text-[#e63946] text-[0.8rem] font-bold px-3 py-1 rounded-full mb-2.5">
                    {edu.score}
                  </div>
                )}
                <p className="text-[0.88rem] text-[#888] leading-[1.7] m-0">{edu.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tab 3: Certs */}
        <div className={`reveal opacity-0 translate-y-6 transition-all duration-700 ${activeTab === 'certs' ? 'block' : 'hidden'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: 'graduation-cap', name: 'NPTEL Java Programming', issuer: 'IIT Kharagpur', year: '2025 · Score: 60%' },
              { icon: 'google', prefix: 'fab', name: 'Digital Transformation', issuer: 'Google Cloud', year: '2025' },
              { icon: 'robot', name: 'Gemini Certified Student', issuer: 'Google', year: '2025 · Built a Power AI Project' },
              { icon: 'layer-group', name: 'MERN Stack Web Dev', issuer: 'Sheryians Coding School', year: '2025' },
              { icon: 'cisco', prefix: 'fab', name: ' Introduction to Modern AI  ', issuer: 'Cisco Networking Academy', year: '2026' },
             
            ].map((c, idx) => (
              <div key={idx} className="bg-white rounded-[20px] p-6 shadow-[0_4px_32px_rgba(0,0,0,0.07)] border-[1.5px] border-[#ececec] flex gap-4 items-start hover:border-red-500/20 hover:-translate-y-1 transition-all">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500/10 to-pink-500/10 flex items-center justify-center text-[1.1rem] text-[#e63946] shrink-0">
                  <i className={`${c.prefix || 'fas'} fa-${c.icon}`}></i>
                </div>
                <div>
                  <h4 className="font-['Syne',sans-serif] text-[0.9rem] font-bold text-[#1a1a2e] mb-1 leading-tight">{c.name}</h4>
                  <p className="text-[0.8rem] text-[#888] m-0">{c.issuer}</p>
                  <p className="text-[0.75rem] text-[#e63946] font-semibold mt-1 mb-0">{c.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-[5%] sm:px-[6%] py-[80px] sm:py-[100px] bg-white">
        <div className="text-[0.78rem] font-semibold tracking-[2.5px] uppercase text-[#e63946] mb-3">
          Get In Touch
        </div>
        <h2 className="font-['Syne',sans-serif] text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-[#1a1a2e] leading-[1.15] mb-4 mt-0">
          Contact Me
        </h2>
        <p className="text-[#888] text-[0.95rem] sm:text-[1rem] max-w-[520px] leading-[1.75] mb-10 sm:mb-14">
          Have a project in mind or want to discuss an opportunity? I'd love to hear from you.
        </p>

        <div className="flex flex-col gap-5 max-w-[500px]">
          {[
            { icon: 'phone', label: 'Phone', value: '+91 9399471399', link: 'tel:+919399471399' },
            { icon: 'envelope', label: 'Email', value: 'pratikdeshmukh12102004@gmail.com', link: 'mailto:pratikdeshmukh12102004@gmail.com' },
            { icon: 'linkedin-in', prefix: 'fab', label: 'LinkedIn', value: 'linkedin.com/in/pratik-deshmukh', link: 'https://linkedin.com/in/pratik-deshmukh' },
            { icon: 'map-marker-alt', label: 'Location', value: 'Bhopal, Madhya Pradesh, India' },
          ].map((c, idx) => (
            <div key={idx} className="flex gap-4 items-start bg-[#f7f7f9] rounded-[20px] p-5">
              <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center text-[#e63946] text-[1rem] shrink-0">
                <i className={`${c.prefix || 'fas'} fa-${c.icon}`}></i>
              </div>
              <div>
                <div className="text-[0.78rem] font-bold text-[#888] uppercase tracking-[1px] mb-1">
                  {c.label}
                </div>
                {c.link ? (
                  <a href={c.link} target={c.link.startsWith('http') ? "_blank" : "_self"} rel="noopener noreferrer" className="text-[0.93rem] font-medium text-[#1a1a2e]">
                    {c.value}
                  </a>
                ) : (
                  <div className="text-[0.93rem] font-medium text-[#1a1a2e]">
                    {c.value}
                  </div>
                )}
              </div>
            </div>
          ))}

          <a href="mailto:pratikdeshmukh12102004@gmail.com" className="bg-[#e63946] text-white px-6 py-3 rounded-full text-center font-semibold hover:shadow-lg mt-4">
            Send Email
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a1a2e] px-[6%] py-10 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="font-['Syne',sans-serif] text-[1.3rem] font-extrabold text-white">
          Pratik<span className="text-[#e63946]">.</span>
        </div>
        <p className="text-[0.85rem] text-white/40 m-0">Built with React & Tailwind CSS</p>
        <div className="flex gap-3">
          {[
            { icon: 'linkedin-in', link: 'https://www.linkedin.com/in/pratik-deshmukh-82066228a/' },
            { icon: 'github', link: 'https://github.com/pratikdeshmukh1210' },
          ].map((s, idx) => (
            <a key={idx} href={s.link} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 text-[0.85rem] hover:border-[#e63946] hover:text-[#e63946] transition-colors">
              <i className={`fab fa-${s.icon}`}></i>
            </a>
          ))}
          <a href="mailto:pratikdeshmukh12102004@gmail.com" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 text-[0.85rem] hover:border-[#e63946] hover:text-[#e63946] transition-colors">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </footer>

      {/* Scroll Top Btn */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-7 right-7 w-11 h-11 rounded-full bg-[#e63946] text-white flex items-center justify-center cursor-pointer border-none shadow-[0_4px_16px_rgba(230,57,70,0.4)] transition-all z-[998] ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2.5 pointer-events-none'
          }`}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
};

export default App;
