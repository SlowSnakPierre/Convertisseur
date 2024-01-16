import type { Metadata } from 'next'
import Icon from '@/assets/images/icon.svg'
import Heart from '@/assets/images/heart.svg'
import Github from '@/assets/images/github.svg'
import { ThemeProvider } from "@/components/themes/theme-provider"
import { ModeToggle } from "@/components/themes/mode-toggle"
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Merge',
  icons: [{ rel: 'icon', url: Icon.src }]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(
        "select-none dark:bg-zinc-800 bg-zinc-100 overflow-hidden transition-colors",
        inter.className
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="merge-theme"
        >
          <div className="flex flex-col min-h-screen items-center justify-between">
            {/* Navbar */}
            <div className="w-full shadow-[0_25px_50px_1px_rgba(0,0,0,0.1)] dark:shadow-[0_25px_50px_1px_rgba(0,0,0,0.15)]">
              <div className="flex w-[90%] items-center justify-between p-4 mx-auto">

                <div className="flex items-center space-x-3">
                  <img src={Icon.src} className="h-8 dark:invert-0 invert" alt="Logo" />
                  <span className="self-center text-black dark:text-white text-2xl font-semibold whitespace-nowrap">Merge</span>
                </div>

                <a href="https://github.com/SlowSnakPierre/Convertisseur">
                  <div className="flex items-center space-x-3">
                    <img src={Github.src} className="h-8 invert dark:invert-0" alt="Github" />
                    <span className="self-center text-black dark:text-white text-2xl font-semibold whitespace-nowrap">Github</span>
                  </div>
                </a>

                <ModeToggle />
              </div>
            </div>


            {/* Content */}
            <div>
              {children}
            </div>

            {/* Footer */}
            <div className="w-full shadow-[0_-25px_50px_1px_rgba(0,0,0,0.15)]">
              <div className="flex items-center justify-center w-[80%] mx-auto p-4 gap-1">
                Fait avec
                <img alt="Heart" src={Heart.src} className="animate-beat w-5 h-5 mr-1 ml-1" />
                par
                <a href="https://slowsnakpierre.com/" target="_blank" className="group text-zinc-500 dark:text-zinc-300 transition-all duration-300 ease-in-out">
                  <span className="bg-left-bottom bg-gradient-to-r from-zinc-500 dark:from-zinc-300 dark:to-zinc-300 to-zinc-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    SlowSnakPierre
                  </span>
                </a>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
