"use client";

import Image from "next/image";
import { motion } from "motion/react";

export function LogoHeader() {
  return (
    <div className="relative w-full pt-24 pb-16 md:pt-32 md:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto"
      >
        <Image
          src="/images/logos/nnmedia_logo_clean.png"
          width={1000}
          height={1000}
          alt="Vipermedia logo"
          priority
          className="mx-auto h-auto w-full max-w-[900px] drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
        />
      </motion.div>
    </div>
  );
}
