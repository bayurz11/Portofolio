"use client";
import { useState, useEffect } from 'react';
import { TypewriterEffect } from '../components/ui/typewriter-effect';
import Navbar from '../components/NavBar';
import Link from 'next/link';
import { FcKindle, FcLinux } from 'react-icons/fc';
import Image from 'next/image';

export default function TypewriterEffectDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll events to show/hide scroll-to-top button and update scroll progress
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

    setShowScrollToTop(scrollTop > 200);
    setScrollProgress(scrollPercent);
  };

  // Smooth scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Words for typewriter effect
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
        <Image
          src="/egg.png"
          alt="Logo Desa Mentuda"
          className="mb-8 h-36 w-36" // Perbaiki ukuran image jika diperlukan
          width={150}
          height={150}
        />
        <TypewriterEffect words={words} />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10 items-center justify-center px-4">
          <div className="flex flex-col items-center text-center">
            <p className="text-neutral-600 dark:text-neutral-200 text-base mb-4">
              Web Developer & UI/UX Enthusiast
            </p>
            <p className="text-neutral-500 dark:text-neutral-300 text-base">
              I am a <b>Fullstack Developer</b> from Indonesia with a strong understanding of programming languages and experience in <b>Web Development</b> projects.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10 items-center">
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
        </div>
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
      </div>

     {/* About Section */}
<div className="flex flex-col items-center justify-center min-h-screen p-4" id="About">
  <h2 className="text-3xl font-bold mb-6 text-center">😎 About</h2>
  <p className="text-lg mb-4 text-center">This is a new section that appears below the first page. You can add more content here as needed.</p>
</div>

{/* Education Section */}
<div className="flex flex-col items-center justify-center min-h-screen p-4" id="Education">
  <h2 className="text-3xl font-bold mb-6 text-center">🎓 Education</h2>
  <p className="text-lg mb-4 text-center">Add your educational background here.</p>
</div>

{/* Project Section */}
<div className="flex flex-col items-center justify-center min-h-screen p-4" id="Project">
  <h2 className="text-3xl font-bold mb-6 text-center">⚒️ Projects</h2>
  <p className="text-lg mb-4 text-center">Showcase your projects here.</p>
</div>

{/* Resume Section */}
<div className="flex flex-col items-center justify-center min-h-screen p-4" id="Resume">
  <h2 className="text-3xl font-bold mb-6 text-center">📑 Resume</h2>
  <p className="text-lg mb-4 text-center">Add a downloadable resume here.</p>
</div>

{/* Contact Section */}
<div className="flex flex-col items-center justify-center min-h-screen p-4" id="Contact">
  <h2 className="text-3xl font-bold mb-6 text-center">📲 Contact</h2>
  <p className="text-lg mb-4 text-center">Provide your contact details here.</p>
</div>

    </>
  );
}

