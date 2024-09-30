import { motion } from 'framer-motion';

const ContactSection = () => {
  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
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
  );
};

export default ContactSection;
