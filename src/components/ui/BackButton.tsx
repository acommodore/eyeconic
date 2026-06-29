"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  iconClassName?: string;
  containerClassName?: string;
  label?: string;
  children?: React.ReactNode;
}

export function BackButton({ 
  iconClassName = "w-6 h-6 text-[#75fbd9]", 
  containerClassName = "p-2 hover:bg-white/10 rounded-full transition-colors inline-flex items-center gap-2",
  label,
  children
}: BackButtonProps) {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className={containerClassName} type="button">
      <ArrowLeft className={iconClassName} />
      {label && <span>{label}</span>}
      {children}
    </button>
  );
}
