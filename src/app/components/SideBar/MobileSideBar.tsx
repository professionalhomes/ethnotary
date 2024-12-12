"use client";
import React from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { BarChart3, FileText, Menu, Send } from "lucide-react";
import SidebarContent from "./SideBarContent";
import { Card } from "../ui/card";
import Image from "next/image";

const MobileSideBar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col space-y-4 py-4">
          <div className="w-full  left-1 top-0 min-h-full flex justify-center items-center">
            <div className="bg-[#5710b2] p-4 flex flex-col items-center gap-8 h-[calc(100vh-10px)] ">
              <div className="w-12 h-12 bg-white rounded-full overflow-hidden">
                <Image
                  src="/logo/logo.png"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <nav className="flex flex-col gap-6">
                {[
                  { Icon: BarChart3, active: true },
                  { Icon: Send, active: false },
                  { Icon: FileText, active: false },
                ].map(({ Icon, active }, i) => (
                  <button
                    key={i}
                    className={`p-3 rounded-lg ${
                      active
                        ? "bg-white/10 text-white"
                        : "hover:bg-white/10 text-white/60"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
