import { motion } from 'framer-motion';

interface VoiceWaveformProps {
  isActive: boolean;
}

export function VoiceWaveform({ isActive }: VoiceWaveformProps) {
  const bars = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="flex items-center gap-1 h-16">
      {bars.map((bar) => (
        <motion.div
          key={bar}
          className="w-1 bg-blue-500 rounded-full"
          animate={
            isActive
              ? {
                  height: [8, 32, 16, 40, 24, 8, 36, 20, 8],
                  opacity: [0.7, 1, 0.8, 1, 0.9, 0.7, 1, 0.8, 0.7],
                }
              : { height: 8, opacity: 0.3 }
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: bar * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}