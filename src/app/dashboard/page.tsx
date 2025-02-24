"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, Home, User, Settings, LogOut, SquareCheck, FileCheck, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()
  const [showWelcomeAlert, setShowWelcomeAlert] = useState(true)

  const handleLogout = () => {
    // In a real app, we would clear auth tokens/session here
    router.push("/")
  }

  return (
    <div className="min-h-screen flex bg-[#FCFCFC]">
      {/* Left Sidebar */}
      <aside className="fixed left-0 top-0 w-[320px] h-screen bg-white flex flex-col z-50">
        <div className="absolute inset-0 shadow-[0px_2px_4px_rgba(16,24,40,0.06),0px_4px_8px_rgba(16,24,40,0.1)] border-r border-[#E8E8E8]"></div>
        <div className="relative h-full w-full bg-white">
          {/* Logo */}
          <div className="h-[98px] flex items-center justify-center bg-white z-[70] px-6">
            <Image
              src="/edu_logo_teal.svg"
              alt="Educatius Logo"
              width={140}
              height={32}
              priority
            />
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 bg-white">
            <div className="w-full flex flex-col justify-center items-center self-stretch py-3 px-[1.125rem] border-t border-b border-[#2CD5C4] bg-white hover:bg-[#E8F4F4] hover:text-[#005151] border-x-8 border-x-[#2CD5C4] text-[#005151] cursor-pointer transition-colors">
              <span>Home</span>
            </div>
            <Link href="/form" className="w-full">
              <div className="w-full flex flex-col justify-center items-center self-stretch py-3 px-[1.125rem] border-b border-[#2CD5C4] bg-white hover:bg-[#E8F4F4] hover:text-[#005151] focus:border-x-8 focus:border-[#2CD5C4] focus:bg-white cursor-pointer transition-colors">
                <span>Course Reservation</span>
              </div>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-[320px]">
        {/* Top Navigation */}
        <div className="fixed top-0 right-0 left-[320px] h-[98px] z-40 backdrop-blur-[10px]">
          <div className="absolute inset-0 shadow-[0px_8px_8px_rgba(16,24,40,0.03),0px_20px_24px_rgba(16,24,40,0.08)] border-b border-[#E8E8E8]"></div>
          <header className="relative h-full w-full bg-white/80">
            <div className="flex items-center h-full">
              {/* Welcome Message */}
              <div className="flex-1 px-8 flex items-center justify-between">
                <h1 className="text-[#141414] font-sans text-[1.5rem] font-normal leading-[133.4%] [font-feature-settings:'liga'_off,'clig'_off]">
                  Hi Bessie
                </h1>
                <Select defaultValue="en">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">
                      <div className="flex items-center gap-2">
                        <Image src="/flags/en.svg" width={20} height={20} alt="English" />
                        English
                      </div>
                    </SelectItem>
                    <SelectItem value="es">
                      <div className="flex items-center gap-2">
                        <Image src="/flags/es.svg" width={20} height={20} alt="Spanish" />
                        Spanish
                      </div>
                    </SelectItem>
                    <SelectItem value="fr">
                      <div className="flex items-center gap-2">
                        <Image src="/flags/fr.svg" width={20} height={20} alt="French" />
                        French
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* User Area - Fixed 320px width */}
              <div className="w-[320px] flex items-center h-full border-l border-[#DFDFDF] px-6">
                <div className="flex items-center gap-3 flex-1">
                  <Avatar className="h-[50px] w-[50px] rounded-lg border border-white shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]">
                    <AvatarImage src="/assets/bessie-cooper.png" alt="Bessie Cooper" />
                    <AvatarFallback>BC</AvatarFallback>
                  </Avatar>
                  <span className="text-[#101828] text-base font-normal flex-1">Bessie Cooper</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-10 w-10"
                    >
                      <ChevronDown className="h-5 w-5 text-[#667085]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[240px]">
                    <DropdownMenuItem>
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-[#667085]" />
                        My Profile
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div className="flex items-center gap-2">
                        <Settings className="h-5 w-5 text-[#667085]" />
                        Account Settings
                      </div>
                    </DropdownMenuItem>
                    <div className="h-px bg-[#DFDFDF] my-2" />
                    <DropdownMenuItem onClick={handleLogout}>
                      <div className="flex items-center gap-2">
                        <LogOut className="h-5 w-5 text-[#D92D20]" />
                        <span className="text-[#D92D20]">Log Out</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
        </div>

        {/* Page Content */}
        <div className="p-6 mt-[98px]">
          {/* Welcome Message */}
          {showWelcomeAlert && (
            <Alert variant="info" className="mb-8 shadow-[0px_2px_4px_rgba(16,24,40,0.06),0px_4px_8px_rgba(16,24,40,0.1)] relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 h-6 w-6 text-[#0288D1] hover:text-[#0288D1] hover:bg-[#E5F6FD]"
                onClick={() => setShowWelcomeAlert(false)}
              >
                <X className="h-4 w-4" />
              </Button>
              <AlertTitle>Welcome to Educatius Student Portal</AlertTitle>
              <AlertDescription className="text-body2">
                Complete your application to and begin your journey as an international student in the US. In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat volutpat. Morbi in orci risus. Donec pretium.
              </AlertDescription>
            </Alert>
          )}

          
          
            

            {/* Course Reservation Card */}
            <Card className="p-4">
            <div className="flex flex-col gap-3">
              <h2 className="text-h4 text-[#141414] flex items-center gap-2">
                <SquareCheck className="h-6 w-6" />
                Next Steps
              </h2>
              <Alert variant="info">
                <AlertDescription className="text-body2">
                Complete these steps at the earliest to complete your application process. These will change as you progress, so keep an eye out for new tasks.
                </AlertDescription>
              </Alert>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <FileCheck className="h-6 w-6" />
                  <h3 className="text-h5 text-[#141414]">Reserve your Course Seat</h3>
                </div>
              </div>
              <Progress value={2} className="w-full" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-body2 text-[#767676] font-bold">Percentage Complete:</span>
                    <span className="text-body2 text-[#00968F] font-bold">2%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-body2 text-[#767676] font-bold">Estimated time to finish:</span>
                    <span className="text-body2 text-[#EF6C00] font-bold">15 minutes</span>
                  </div>
                </div>
                <Link href="/form">
                  <Button variant="default" size="lg">
                    Complete Your Reservation
                  </Button>
                </Link>
              </div>
            </div>
            </Card>
        </div>
      </main>
    </div>
  )
} 