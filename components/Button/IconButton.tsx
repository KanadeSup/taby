import { cn } from "@/lib/shadnc-utils";
import { ButtonHTMLAttributes } from "react";

export function IconButton({
   children,
   ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
   return (
      <button
         {...props}
         className={cn(
            "w-8 h-8 hover:bg-accent rounded-md flex items-center justify-center cursor-pointer",
            props.className
         )}
      >
         {children}
      </button>
   );
}
