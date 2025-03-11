"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, Home, User, Settings, LogOut, SquareCheck, FileCheck, X, CircleCheck, CreditCard, ListChecks } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { useState, useEffect } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { LanguageSwitcher } from "@/components/ui/language-switcher"

export default function CompletedDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [showWelcomeAlert, setShowWelcomeAlert] = useState(true)
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (isPaymentOpen) {
      const timer = setTimeout(() => {
        router.push('/dashboard/payment')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isPaymentOpen, router])

  const handleLogout = () => {
    // In a real app, we would clear auth tokens/session here
    router.push("/")
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    setIsPaymentOpen(false)
    
    router.push("/dashboard/payment-complete")
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
                <LanguageSwitcher />
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
                    <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-[#667085]" />
                        My Profile
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => e.preventDefault()}>
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

          {/* Next Steps Card */}
          <Card className="p-4 mb-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-h4 text-[#141414] flex items-center gap-2">
                <SquareCheck className="h-6 w-6" />
                Next Steps
              </h2>
              <Alert variant="info">
                <AlertDescription className="text-body2">
                  Here are your next steps to continue with the application process.
                </AlertDescription>
              </Alert>
              <div className="flex flex-col gap-6">
                {/* Next Task: Pay Deposit */}
                <div className="flex items-start justify-between bg-[#E8F4F4] p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileCheck className="h-6 w-6 text-[#00968F]" />
                    <div className="flex flex-col">
                      <h3 className="text-h5 text-[#141414]">Pay Deposit</h3>
                      <span className="text-sm text-[#667085]">Make your initial deposit to secure your placement</span>
                    </div>
                  </div>
                  <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
                    <DialogTrigger asChild>
                      <Button variant="default" size="lg" className="min-w-[160px]">
                        Pay Deposit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Payment Confirmation</DialogTitle>
                        <DialogDescription>
                          You will be redirected to our official payment gateway. Please do not close this window or refresh the page during the process.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end">
                        <Button 
                          variant="default" 
                          onClick={() => {
                            setIsConfirmationOpen(false)
                            setIsPaymentOpen(true)
                          }}
                        >
                          Continue to Payment Gateway
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </Card>

          {/* Completed Card */}
          <Card className="p-4">
            <div className="flex flex-col gap-3">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="completed" className="border-none">
                  <AccordionTrigger className="hover:no-underline p-0">
                    <h2 className="text-h4 text-[#141414] flex items-center gap-2">
                      <ListChecks className="h-6 w-6" />
                      Completed Tasks
                    </h2>
                  </AccordionTrigger>
                  <AccordionContent className="pt-3">
                    <div className="flex flex-col gap-6">
                      {/* Completed Course Reservation */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <CircleCheck className="h-6 w-6" />
                          <div className="flex flex-col">
                            <h3 className="text-h5 text-[#141414]">Course Reservation</h3>
                            <span className="text-sm text-[#667085]">Completed on {new Date().toLocaleDateString()}</span>
                          </div>
                        </div>
                        <Button variant="secondary" size="sm" className="text-[#00968F] border-[#00968F] hover:bg-[#E8F4F4]">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </Card>

          <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
            <DialogContent className="sm:max-w-[425px] [&>button]:hidden" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle>Pay Deposit</DialogTitle>
                <DialogDescription>
                  You will be redirected to our secure payment gateway to complete your €400 deposit payment.
                </DialogDescription>
              </DialogHeader>
              <div className="py-8 flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#00968F] border-t-transparent"></div>
                <p className="text-sm text-[#667085] text-center">
                  Please wait while we redirect you to our secure payment gateway...
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  )
} 