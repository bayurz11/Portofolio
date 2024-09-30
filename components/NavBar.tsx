import { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";
import Link from 'next/link';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BsFillSunFill, BsMoonStarsFill, BsGear } from "react-icons/bs";

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Navbar({ isOpen, setIsOpen }: NavbarProps) {
  const [currentPath, setCurrentPath] = useState<string>("#Home");
  const [hasShadow, setHasShadow] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [showIcons, setShowIcons] = useState<boolean>(false);
  const [isGearAnimating, setIsGearAnimating] = useState<boolean>(false);
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({
    Home: null,
    About: null,
    Education: null,
    Project: null,
    Resume: null,
    Contact: null,
  });

  // Mengatur scroll dan navigasi
  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentPath(`#${entry.target.id}`);
        }
      });
    }, { threshold: 0.5 });

    Object.keys(sectionsRef.current).forEach((key) => {
      if (sectionsRef.current[key]) {
        observer.observe(sectionsRef.current[key]!);
      }
    });

    window.addEventListener("scroll", handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // Memperbarui mode gelap
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      const isDark = savedMode === "true";
      setDarkMode(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, []);

  // Fungsi untuk men-switch mode gelap
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
  };

  const handleGearClick = () => {
    setIsGearAnimating(true);
    setShowIcons(!showIcons);
    setTimeout(() => setIsGearAnimating(false), 150);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const gearButton = document.getElementById("gear-button");
    if (gearButton && !gearButton.contains(target)) {
      setShowIcons(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className={`bg-white dark:bg-gray-900 ${hasShadow ? 'shadow-md' : ''} w-full fixed top-0 left-0 z-50 transition-shadow duration-300`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="ml-2 font-semibold text-2xl dark:text-white">BAYU REZ</span>
            </Link>
            {/* Menu Desktop */}
            <div className="hidden md:flex flex-1 justify-center items-center">
              <div className="flex space-x-9">
                {['Home', 'About', 'Education', 'Project', 'Resume', 'Contact'].map((section) => (
                  <Link key={section} href={`#${section}`} onClick={() => setCurrentPath(`#${section}`)}>
                    <span className={`relative ${currentPath === `#${section}` ? "text-blue-900 dark:text-white" : "text-gray-700 dark:text-gray-200"} group`}>
                      <span className="flex items-center space-x-2 text-lg transition-colors duration-300">
                        {section === 'Home' ? '🚀' : section === 'About' ? '😎' : section === 'Education' ? '🎓' : section === 'Project' ? '⚒️' : section === 'Resume' ? '📑' : '📲'}
                        <span>{section}</span>
                        <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-900 dark:bg-white transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 ${currentPath === `#${section}` ? "scale-x-100" : ""}`}></span>
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tombol Menu Mobile */}
            <div className="-mr-2 flex md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path className={`${isOpen ? "hidden" : "inline-flex"}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  <path className={`${isOpen ? "inline-flex" : "hidden"}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            {['Home', 'About', 'Education', 'Project', 'Resume', 'Contact'].map((section) => (
              <Link key={section} href={`#${section}`} scroll={true} className={`block px-3 py-2 rounded-md text-lg font-medium ${currentPath === `#${section}` ? "text-blue-900 dark:text-white" : "text-gray-700 dark:text-gray-200"}`} onClick={() => setCurrentPath(`#${section}`)}>
                {section === 'Home' ? '🚀' : section === 'About' ? '😎' : section === 'Education' ? '🎓' : section === 'Project' ? '⚒️' : section === 'Resume' ? '📑' : '📲'} {section}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Icon tambahan di kiri bawah layar untuk mode mobile */}
      <div className="fixed bottom-4 left-4 flex flex-col space-y-4 z-50">
        {showIcons && (
          <div className="flex flex-col space-y-2">
            <button onClick={toggleDarkMode} className="p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 focus:outline-none">
              {darkMode ? <BsFillSunFill size={24} className="text-yellow-500" /> : <BsMoonStarsFill size={20} />}
            </button>
            <a href="https://id.linkedin.com/in/nur-azani-bayu-rezki-08369a219" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 focus:outline-none">
              <FaLinkedin size={24} />
            </a>
            <a href="https://github.com/bayurezk" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 focus:outline-none">
              <FaGithub size={24} />
            </a>
          </div>
        )}
        <button
          id="gear-button"
          onClick={handleGearClick}
          className={`p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 focus:outline-none ${isGearAnimating ? 'animate-spin' : ''}`}
        >
          <BsGear size={24} />
        </button>
      </div>
    </>
  );
}
