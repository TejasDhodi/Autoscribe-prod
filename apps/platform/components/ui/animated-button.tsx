"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, variant, size, children, isLoading, ...props }, ref) => {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          ref={ref}
          variant={variant}
          size={size}
          className={cn(
            "relative overflow-hidden",
            variant === "default" &&
              "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
            className
          )}
          disabled={isLoading}
          {...props}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-inherit">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
            </div>
          )}
          <span
            className={cn(isLoading && "opacity-0", "flex gap-1 items-center")}
          >
            {children}
          </span>
        </Button>
      </motion.div>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton };
