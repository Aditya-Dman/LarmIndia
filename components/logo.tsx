import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const sizes = {
    sm: { width: "w-32", height: "h-20", leaf: "w-8 h-8", fontSize: "text-xs" },
    md: { width: "w-48", height: "h-28", leaf: "w-12 h-12", fontSize: "text-sm" },
    lg: { width: "w-64", height: "h-36", leaf: "w-16 h-16", fontSize: "text-base" },
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {/* Green Leaf Icon - More detailed */}
      <div className={cn("relative", sizes[size].leaf)}>
        <svg
          viewBox="0 0 120 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Left Leaf - Dark Green */}
          <path
            d="M50 15C45 25 35 45 35 75C35 105 45 125 60 135C55 120 50 90 50 55C50 35 52 20 50 15Z"
            fill="#228B22"
          />
          
          {/* Right Leaf - Bright Green */}
          <path
            d="M70 15C75 25 85 45 85 75C85 105 75 125 60 135C65 120 70 90 70 55C70 35 68 20 70 15Z"
            fill="#2BA82B"
          />
          
          {/* Left White Curve */}
          <path
            d="M55 20C52 35 50 55 52 80"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          {/* Right White Curve */}
          <path
            d="M65 20C68 35 70 55 68 80"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* LARM INDIA Banner */}
      <div className={cn("flex border-4 border-black", sizes[size].width, sizes[size].height)}>
        {/* Green Background with LARM */}
        <div className="flex-1 bg-green-700 flex items-center justify-center border-r-8 border-white">
          <span className={cn(
            "font-black text-yellow-300 tracking-wider",
            sizes[size].fontSize
          )}>
            LARM
          </span>
        </div>
        
        {/* Red Background with INDIA */}
        <div className="flex-1 bg-red-600 flex items-center justify-center">
          <span className={cn(
            "font-black text-yellow-300 tracking-wider",
            sizes[size].fontSize
          )}>
            INDIA
          </span>
        </div>
      </div>
    </div>
  );
}
