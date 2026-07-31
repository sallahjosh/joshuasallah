import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '../../lib/utils';

/**
 * HoverExpand_001 — expand-on-hover image strip.
 * Adapted from 21st.dev Skiper52 component (JS version, no TS, no swiper).
 */
const HoverExpand_001 = ({ images, className }) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={cn('relative w-full', className)}
    >
      <div className="flex w-full items-center justify-center gap-1.5 overflow-hidden">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative cursor-pointer overflow-hidden rounded-2xl flex-shrink-0"
            animate={{
              width: activeImage === index ? '320px' : '56px',
              height: '280px',
            }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            onClick={() => setActiveImage(index)}
            onHoverStart={() => setActiveImage(index)}
          >
            {/* Dark overlay on active */}
            <AnimatePresence>
              {activeImage === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"
                />
              )}
            </AnimatePresence>

            {/* Caption */}
            <AnimatePresence>
              {activeImage === index && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-0 left-0 right-0 z-20 p-3"
                >
                  <p className="text-white/70 text-xs font-medium truncate">{image.alt}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export { HoverExpand_001 };
export default HoverExpand_001;
