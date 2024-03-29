"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <Button className="bg-transparent border-0 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0" variant="outline" size="icon" onClick={() => {
            setTheme(theme === "light" ? "dark" : "light")
        }}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:text-white text-black" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-white text-black" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}