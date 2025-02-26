"use client"

import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Info } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { LanguageSwitcher } from "@/components/ui/language-switcher"

export default function SignUp() {
  const router = useRouter()
  const [emailError, setEmailError] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)

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

  const checkPasswordStrength = (pass: string) => {
    let score = 0
    if (pass.length >= 8) score++
    if (/[A-Z]/.test(pass)) score++
    if (/[a-z]/.test(pass)) score++
    if (/[0-9]/.test(pass)) score++
    if (/[^A-Za-z0-9]/.test(pass)) score++
    setPasswordStrength(score)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    checkPasswordStrength(newPassword)
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }

  const handlePasswordBlur = () => {
    if (confirmPassword) {
      validatePasswords(password, confirmPassword)
    }
  }

  const handleConfirmPasswordBlur = () => {
    if (password) {
      validatePasswords(password, confirmPassword)
    }
  }

  const validatePasswords = (pass: string, confirm: string) => {
    if (confirm && pass !== confirm) {
      setPasswordError("Passwords do not match")
    } else {
      setPasswordError("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would validate and send credentials to backend
    router.push("/dashboard?fromSignup=true")
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
            src="/edu_logo_teal.svg"
            alt="Educatius Logo"
            width={200}
            height={44}
            priority
          />
        </div>

        {/* Sign Up Text */}
        <div className="text-center">
          <h1 className="text-h4 text-[#141414]">
            Sign Up
          </h1>
        </div>

        {/* Info Message */}
        <Alert variant="info">
          <AlertTitle className="text-body2">Hi Bessie Cooper</AlertTitle>
          <AlertDescription className="text-body2">
            Please fill in your details to create an account
          </AlertDescription>
        </Alert>

        {/* Sign Up Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email Address"
              label="Email Address"
              required
              disabled
              value="bessie.cooper@mailprovider.com"
              onBlur={handleEmailBlur}
              error={!!emailError}
              helperText={emailError}
            />
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                label="Password"
                required
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                helperText="Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters"
              />
              {/* Password Strength Indicator */}
              <div className="space-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full ${
                        level <= passwordStrength
                          ? level <= 2
                            ? "bg-red-500"
                            : level <= 3
                            ? "bg-yellow-500"
                            : "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  {passwordStrength === 0 && "Very Weak"}
                  {passwordStrength === 1 && "Weak"}
                  {passwordStrength === 2 && "Fair"}
                  {passwordStrength === 3 && "Good"}
                  {passwordStrength === 4 && "Strong"}
                  {passwordStrength === 5 && "Very Strong"}
                </p>
              </div>
            </div>
            <Input
              type="password"
              placeholder="Confirm Password"
              label="Confirm Password"
              required
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onBlur={handleConfirmPasswordBlur}
              error={!!passwordError}
              helperText={passwordError}
            />
          </div>

          <Button className="w-full" size="lg">
            Sign Up
          </Button>
        </form>

        {/* Social Sign Up */}
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
            Sign Up With Google
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
            Sign Up With Microsoft
          </Button>
        </div>
      </div>
    </main>
  )
} 