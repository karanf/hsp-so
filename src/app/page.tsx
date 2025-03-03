"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LanguageSwitcher } from "@/components/ui/language-switcher"

export default function SignIn() {
  const router = useRouter()
  const [emailError, setEmailError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const email = e.target.value
    if (email && !validateEmail(email)) {
      setEmailError("Please enter a valid email address")
    } else {
      setEmailError("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would validate credentials
    router.push("/dashboard")
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-white relative">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-[400px] space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/assets/edu_logo_teal.svg"
            alt="Educatius Logo"
            width={200}
            height={44}
            priority
          />
        </div>

        {/* Sign In Text */}
        <div className="text-center">
          <h1 className="text-h4 text-[#141414]">
            Sign In
          </h1>
        </div>

        {/* Info Message */}
        <Alert variant="info">
          <AlertDescription className="text-body2">
            Please enter your login credentials to sign in
          </AlertDescription>
        </Alert>

        {/* Sign In Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email Address"
              label="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
              error={!!emailError}
              helperText={emailError}
            />
            <Input
              type="password"
              placeholder="Password"
              label="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-body2">Remember me</Label>
              </div>
              <Link href="/forgot-password" className="text-[#007F7A] hover:underline text-[0.875rem] font-normal leading-[1.43] tracking-[0.01071em]">
                Forgot password?
              </Link>
            </div>
          </div>

          <Button className="w-full" size="lg">
            Sign In
          </Button>
        </form>

        {/* Social Sign In */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#DFDFDF]"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-[#767676]">OR</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            variant="secondary" 
            className="w-full" 
            size="lg"
          >
            <Image
              src="/google-logo.svg"
              alt="Google Logo"
              width={20}
              height={20}
              className="mr-2"
            />
            Sign In With Google
          </Button>

          <Button 
            variant="secondary" 
            className="w-full" 
            size="lg"
          >
            <Image
              src="/microsoft-logo.svg"
              alt="Microsoft Logo"
              width={20}
              height={20}
              className="mr-2"
            />
            Sign In With Microsoft
          </Button>
        </div>
      </div>
    </main>
  )
}
