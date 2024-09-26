"use client";
import { useState, useEffect } from 'react';
import { TypewriterEffect } from '../components/ui/typewriter-effect';
import Navbar from '../components/NavBar';
import Link from 'next/link';
import { FcKindle, FcLinux } from 'react-icons/fc';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function TypewriterEffectDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const animationVariants = {
    hidden: { opacity: 0, y: 50 }, // kondisi saat belum terlihat (sembunyi)
    visible: { opacity: 1, y: 0 }, // kondisi saat muncul (terlihat)
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

    setShowScrollToTop(scrollTop > 200);
    setScrollProgress(scrollPercent);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const words = [
    { text: 'Nur' },
    { text: 'Azani' },
    { text: 'Bayu' },
    { text: 'Rezki.', className: 'text-blue-900 dark:text-blue-500' },
  ];

  return (
    <>
      
      {/* Home Section */}
      <div className="flex flex-col items-center justify-center min-h-screen" id="Home">
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="relative"  
        > 
          <div className="relative">
            <Image
              src="/bayu.png"
              alt="Logo Desa Mentuda"
              className="mb-8 h-45 w-36 opacity-80"
              width={150}
              height={150}
            />
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent dark:from-black"></div>
          </div>      
        </motion.div>
        
        <TypewriterEffect words={words} />
        <motion.div
          className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10 items-center justify-center px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={animationVariants}
        >
          <div className="flex flex-col items-center text-center">
            <p className="text-neutral-600 dark:text-neutral-200 text-base mb-4">
              Web Developer & UI/UX Enthusiast
            </p>
            <p className="text-neutral-500 dark:text-neutral-300 text-base">
              I am a <b>Fullstack Developer</b> from Indonesia with a fairly strong understanding of programming languages ​​and experience in several <b>Web Development</b> projects.
            </p>
          </div>
        </motion.div>
        <motion.div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10 items-center" initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          variants={animationVariants}>
          <Link href="#Resume">
            <button className="flex items-center bg-yellow-300 hover:bg-yellow-500 text-blue-900 font-medium py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-lg border-2 border-b-4 border-blue-900 transition-all duration-300 hover:scale-105">
              <FcKindle className="mr-2" size={24} />
              <span className="text-sm md:text-base">My Resume</span>
            </button>
          </Link>
          <Link href="#About">
            <button className="flex items-center bg-white hover:bg-neutral-200 text-blue-900 font-medium py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-lg border-2 border-b-4 border-blue-900 transition-all duration-300 hover:scale-105">
              <FcLinux className="mr-2" size={24} />
              <span className="text-sm md:text-base">See More About Me</span>
            </button>
          </Link>
        </motion.div>
      </div>

      {/* About Section */}
      <motion.div
        className="flex flex-col text-center items-center justify-start min-h-screen p-4 pt-28"
        id="About"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        variants={animationVariants}
      >
        <h2 className="text-3xl font-bold mb-6 ">😎 About</h2>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="relative"  
        > 
          <p className="text-xl mb-4">Hi, I’m Nur Azani Bayu Rezki 👋</p>   
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="relative"  
          > 
            <h3 className="text-neutral-500 dark:text-neutral-300 text-lg mb-4 px-4 md:px-8 lg:px-24">
              I am a passionate web developer with a knack for turning ideas into interactive and dynamic websites. With a strong foundation in <b>laravel, JavaScript,</b> and <b>Next.js</b>, I specialize in creating seamless and responsive web applications that prioritize both user experience and performance.
            </h3>   
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Education Section */}
      <motion.div
        className="flex flex-col text-center items-center justify-start min-h-screen p-4 pt-28" 
        id="Education"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        variants={animationVariants}
      >
        <h2 className="text-3xl font-bold mb-6">🎓 Education</h2>
        <p className="text-lg mb-4">Add your educational background here.</p>
      </motion.div>

      {/* Project Section */}
      <motion.div
        className="flex flex-col text-center items-center justify-start min-h-screen p-4 pt-28" 
        id="Project"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        variants={animationVariants}
      >
        <h2 className="text-3xl font-bold mb-6">⚒️ Projects</h2>
        <p className="text-lg mb-4">Showcase your projects here.</p>
      </motion.div>

      {/* Resume Section */}
      <motion.div
        className="flex flex-col text-center items-center justify-start min-h-screen p-4 pt-28" 
        id="Resume"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        variants={animationVariants}
      >
        <h2 className="text-3xl font-bold mb-6">📑 Resume</h2>
        <p className="text-lg mb-4">Add a downloadable resume here.</p>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        className="flex flex-col text-center items-center justify-start min-h-screen p-4 pt-28" 
        id="Contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        variants={animationVariants}
      >
        <h2 className="text-3xl font-bold mb-6">📲 Contact</h2>
        <p className="text-lg mb-4">Provide your contact details here.</p>
      </motion.div>

      {showScrollToTop && (
          <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center z-50">
            <div
              className="w-full h-full rounded-full border-4 border-white flex items-center justify-center"
              style={{
                background: `conic-gradient(#4F46E5 ${scrollProgress}%, transparent ${scrollProgress}% 100%)`,
              }}
            >
              <button
                onClick={scrollToTop}
                className="bg-blue-500 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-900 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
              >
                <span className="text-lg md:text-xl">🚀</span>
              </button>
            </div>
          </div>
        )}
    </>
  );
}
