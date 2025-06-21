import { motion } from 'framer-motion';

export function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Floating shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-gradient-to-br from-blue-200/20 to-green-200/20 dark:from-blue-800/10 dark:to-green-800/10 rounded-full"
          style={{
            width: Math.random() * 200 + 100,
            height: Math.random() * 200 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/50 to-transparent dark:via-gray-900/50" />
    </div>
  );
}