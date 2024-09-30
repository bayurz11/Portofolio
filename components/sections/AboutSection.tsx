import { motion } from 'framer-motion';

const AboutSection = () => {
  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
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
  );
};

export default AboutSection;
