"use client";
import { Menu } from "lucide-react";
import { cn } from "@/src/app/lib/utils";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import SidebarContent from "./SideBarContent";
interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <>
      <div className={cn("hidden lg:flex h-screen flex-col ", className)}>
        <div className="flex flex-col space-y-4 py-4">
          <SidebarContent />
        </div>
      </div>
    </>
  );
}
