"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, ArrowRight, Home, User, Settings, LogOut, ChevronRight, ChevronLeft, ChevronDown, Check, CircleCheckBig } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { popoverStyles } from "@/themes/theme-v1"
import { CountryCombobox } from "@/components/ui/country-combobox"
import { PhoneCountryCombobox } from "@/components/ui/phone-country-combobox"
import { StateCombobox } from "@/components/ui/state-combobox"
import { countries, statesByCountry, getCountryCallingCode, type Country, type State } from "@/lib/constants/countries"

function getStatesForCountry(countryCode: string): State[] {
  return statesByCountry[countryCode] || []
}

export default function Form() {
  // Student form states
  const [studentAddressCountry, setStudentAddressCountry] = useState("");
  const [studentPhoneCountry, setStudentPhoneCountry] = useState("");
  const [studentState, setStudentState] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentStreet, setStudentStreet] = useState("");
  const [studentCity, setStudentCity] = useState("");
  const [studentPostal, setStudentPostal] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentProgress, setStudentProgress] = useState(0);

  // Parent1 form states
  const [parent1AddressCountry, setParent1AddressCountry] = useState("");
  const [parent1PhoneCountry, setParent1PhoneCountry] = useState("");
  const [parent1State, setParent1State] = useState("");
  const [parent1SameAddress, setParent1SameAddress] = useState(false);
  const [parent1Name, setParent1Name] = useState("");
  const [parent1Street, setParent1Street] = useState("");
  const [parent1City, setParent1City] = useState("");
  const [parent1Postal, setParent1Postal] = useState("");
  const [parent1Phone, setParent1Phone] = useState("");
  const [parent1Email, setParent1Email] = useState("");
  const [parent1Progress, setParent1Progress] = useState(0);
  const [isSoleGuardian, setIsSoleGuardian] = useState<string>("");
  const [guardianshipDocument, setGuardianshipDocument] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Parent2 form states
  const [parent2AddressCountry, setParent2AddressCountry] = useState("");
  const [parent2PhoneCountry, setParent2PhoneCountry] = useState("");
  const [parent2State, setParent2State] = useState("");
  const [parent2SameAddress, setParent2SameAddress] = useState(false);
  const [parent2Name, setParent2Name] = useState("");
  const [parent2Street, setParent2Street] = useState("");
  const [parent2City, setParent2City] = useState("");
  const [parent2Postal, setParent2Postal] = useState("");
  const [parent2Phone, setParent2Phone] = useState("");
  const [parent2Email, setParent2Email] = useState("");
  const [parent2Progress, setParent2Progress] = useState(0);

  // Additional progress state
  const [additionalProgress, setAdditionalProgress] = useState(0);

  // Health information states
  const [hasAllergies, setHasAllergies] = useState<boolean | undefined>(undefined);
  const [allergiesDetails, setAllergiesDetails] = useState("");
  const [hasTreatment, setHasTreatment] = useState<boolean | undefined>(undefined);
  const [treatmentDetails, setTreatmentDetails] = useState("");
  const [hasDietary, setHasDietary] = useState<boolean | undefined>(undefined);
  const [dietaryDetails, setDietaryDetails] = useState("");

  // Active section state
  const [activeSection, setActiveSection] = useState("student-details");
  
  // Form progress state
  const [formProgress, setFormProgress] = useState(0);
  const [isFormComplete, setIsFormComplete] = useState(false);

  // Navigation functions
  const sections = ['student-details', 'parent1-details', 'parent2-details', 'additional-info']
  
  /**
   * Easing function for smooth scrolling animation
   * Creates a quadratic ease-out effect for natural deceleration
   * @param t - Progress of animation from 0 to 1
   * @returns Eased value between 0 and 1
   * Can be replaced with other easing functions from libraries like gsap for different effects
   */
  const easeOutQuad = (t: number): number => t * (2 - t)
  
  /**
   * Smoothly scrolls the form section container to a target position
   * Uses requestAnimationFrame for smooth animation
   * @param targetPosition - The target scroll position in pixels
   * 
   * To reuse this function in other components:
   * 1. Ensure you have a container with overflow-y: auto
   * 2. Pass the desired scroll position
   * 3. Adjust SCROLL_DURATION_MS based on your needs
   */
  const smoothScrollTo = (targetPosition: number) => {
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    const duration = 800
    let start: number | null = null

    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = timestamp - start
      const percent = Math.min(progress / duration, 1)
      
      window.scrollTo({
        top: startPosition + distance * easeOutQuad(percent),
      })

      if (progress < duration) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }

  /**
   * Handles navigation to the next form section
   * - Updates active section
   * - Calculates progress
   * - Smoothly scrolls to the next section
   * 
   * To adapt this for other forms:
   * 1. Update sectionOrder array with your section IDs
   * 2. Modify progress calculation based on your sections
   * 3. Adjust scroll behavior if needed
   */
  const goToNextSection = () => {
    const currentIndex = sections.indexOf(activeSection)
    if (currentIndex < sections.length - 1) {
      const nextSection = sections[currentIndex + 1]
      const element = document.getElementById(nextSection)
      if (element) {
        const headerOffset = 122
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerOffset
        smoothScrollTo(offsetPosition)
        const firstInput = element.querySelector('input, select') as HTMLElement
        if (firstInput) firstInput.focus()
        setActiveSection(nextSection)
      }
    }
  }

  /**
   * Handles navigation to the previous form section
   * Similar to goToNextSection but in reverse
   * 
   * Reuse guidelines same as goToNextSection
   */
  const goToPreviousSection = () => {
    const currentIndex = sections.indexOf(activeSection)
    if (currentIndex > 0) {
      const previousSection = sections[currentIndex - 1]
      const element = document.getElementById(previousSection)
      if (element) {
        const headerOffset = 122
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerOffset
        smoothScrollTo(offsetPosition)
        const firstInput = element.querySelector('input, select') as HTMLElement
        if (firstInput) firstInput.focus()
        setActiveSection(previousSection)
      }
    }
  }

  // Calculate form progress
  useEffect(() => {
    // Student Details Progress - Each field contributes equally to section progress
    const studentFields = [
      studentName,           // Required: Student name
      studentStreet,         // Required: Street address
      studentCity,           // Required: City
      studentAddressCountry, // Required: Country
      studentPostal,         // Required: Postal code
      studentPhone,          // Required: Phone number
      studentEmail,          // Required: Email
      studentState,          // Required: State
      studentPhoneCountry    // Required: Phone country code
    ];
    const studentTotalFields = studentFields.length;
    const studentCompletedFields = studentFields.filter(Boolean).length;
    setStudentProgress(Math.round((studentCompletedFields / studentTotalFields) * 100));

    // Parent 1 Details Progress - Fields adapt based on sameAddress and isSoleGuardian
    const parent1Fields = [
      parent1Name,                                           // Required: Parent name
      parent1SameAddress || parent1Street,                  // Required: Either same as student or new street
      parent1SameAddress || parent1City,                    // Required: Either same as student or new city
      parent1SameAddress || parent1AddressCountry,          // Required: Either same as student or new country
      parent1SameAddress || parent1Postal,                  // Required: Either same as student or new postal
      parent1Phone,                                         // Required: Phone number
      parent1Email,                                         // Required: Email
      parent1State,                                         // Required: State
      parent1PhoneCountry,                                  // Required: Phone country code
      isSoleGuardian,                                      // Required: Must specify if sole guardian
      isSoleGuardian === "yes" ? guardianshipDocument?.name : true  // Required only if sole guardian
    ];
    const parent1TotalFields = parent1Fields.length;
    const parent1CompletedFields = parent1Fields.filter(Boolean).length;
    setParent1Progress(Math.round((parent1CompletedFields / parent1TotalFields) * 100));

    // Parent 2 Details Progress - Section skipped if Parent 1 is sole guardian
    const parent2Fields = isSoleGuardian === "yes" ? [true] : [
      parent2Name,                                          // Required if not sole guardian: Parent name
      parent2SameAddress || parent2Street,                  // Required if not sole guardian: Either same as student or new street
      parent2SameAddress || parent2City,                    // Required if not sole guardian: Either same as student or new city
      parent2SameAddress || parent2AddressCountry,          // Required if not sole guardian: Either same as student or new country
      parent2SameAddress || parent2Postal,                  // Required if not sole guardian: Either same as student or new postal
      parent2Phone,                                         // Required if not sole guardian: Phone number
      parent2Email,                                         // Required if not sole guardian: Email
      parent2State,                                         // Required if not sole guardian: State
      parent2PhoneCountry                                   // Required if not sole guardian: Phone country code
    ];
    const parent2TotalFields = parent2Fields.length;
    const parent2CompletedFields = parent2Fields.filter(Boolean).length;
    setParent2Progress(Math.round((parent2CompletedFields / parent2TotalFields) * 100));

    // Additional Information Progress - Only health questions are mandatory
    let additionalCompletedFields = 0;
    let totalFieldsCount = 3; // Three mandatory health questions

    // Check health-related fields (mandatory questions)
    if (hasAllergies !== undefined) additionalCompletedFields++;     // Required: Must answer allergies question
    if (hasTreatment !== undefined) additionalCompletedFields++;     // Required: Must answer treatment question
    if (hasDietary !== undefined) additionalCompletedFields++;       // Required: Must answer dietary question

    // Optional details fields don't count towards progress
    if (hasAllergies && allergiesDetails) additionalCompletedFields++;     // Optional: Details only if has allergies
    if (hasTreatment && treatmentDetails) additionalCompletedFields++;     // Optional: Details only if has treatment
    if (hasDietary && dietaryDetails) additionalCompletedFields++;         // Optional: Details only if has dietary requirements

    // Calculate additional info progress based on mandatory fields only
    const additionalTotalFields = totalFieldsCount;
    setAdditionalProgress(Math.round((additionalCompletedFields / additionalTotalFields) * 100));

    // Overall form progress - Combines all sections
    const totalFields = studentTotalFields + parent1TotalFields + parent2TotalFields + additionalTotalFields;
    const completedFields = studentCompletedFields + parent1CompletedFields + parent2CompletedFields + additionalCompletedFields;
    const progress = Math.round((completedFields / totalFields) * 100);
    setFormProgress(progress);
    setIsFormComplete(progress === 100);

    console.log(`Total Fields: ${totalFields}, Completed Fields: ${completedFields}, Progress: ${progress}%`);
  }, [
    // Student dependencies
    studentName, studentStreet, studentCity, studentAddressCountry, 
    studentPostal, studentPhone, studentEmail,
    
    // Parent 1 dependencies
    parent1Name, parent1Street, parent1City, parent1AddressCountry,
    parent1Postal, parent1Phone, parent1Email, parent1SameAddress,
    
    // Parent 2 dependencies
    parent2Name, parent2Street, parent2City, parent2AddressCountry,
    parent2Postal, parent2Phone, parent2Email, parent2SameAddress,
    
    // Guardian and health info dependencies
    isSoleGuardian, guardianshipDocument,
    hasAllergies, hasTreatment, hasDietary,
    allergiesDetails, treatmentDetails, dietaryDetails
  ]);

  /**
   * Handles field focus events
   * Automatically scrolls to and activates the section containing the focused field
   * @param sectionId - ID of the section containing the focused field
   * 
   * To reuse in other forms:
   * 1. Add data-section-id attributes to your form sections
   * 2. Call this function on field focus events
   * 3. Update section activation logic if needed
   */
  const handleFieldFocus = (sectionId: string) => {
    setActiveSection(sectionId)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only update active section if no field is focused
          const activeElement = document.activeElement
          const isFieldFocused = activeElement?.tagName === 'INPUT' || 
                               activeElement?.tagName === 'SELECT'
          if (entry.isIntersecting && !isFieldFocused) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-50% 0px -50% 0px"
      }
    )

    // Observe all sections
    const sections = ['student-details', 'parent1-details', 'parent2-details', 'additional-info']
    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id)
        if (element) observer.unobserve(element)
      })
    }
  }, [])

  const router = useRouter()
  const { toast } = useToast()

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

          {/* Breadcrumb Navigation */}
          <div className="px-6 py-4 border-b border-[#E8E8E8]">
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#DFDFDF] hover:border-[#B3B3B3] hover:bg-[#E8E8E8] cursor-pointer transition-colors">
                  <ArrowLeft className="h-5 w-5 text-[#667085]" />
                </div>
              </Link>
              <div className="flex items-center gap-2">
                <Link href="/dashboard" className="text-[#00968F] hover:underline">Home</Link>
                <ChevronRight className="h-5 w-5 text-[#667085]" />
                <span className="text-[#141414]">Course Reservation</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 bg-white">
            <button 
              onClick={() => {
                const element = document.getElementById('student-details')
                if (element) {
                  const headerOffset = 122
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                  const offsetPosition = elementPosition - headerOffset
                  smoothScrollTo(offsetPosition)
                  const firstInput = element.querySelector('input, select') as HTMLElement
                  if (firstInput) firstInput.focus()
                }
                setActiveSection('student-details')
              }}
              className={`relative w-full flex flex-col justify-center items-center self-stretch py-3 px-[1.125rem] border-t border-b border-[#2CD5C4] bg-white hover:bg-[#E8F4F4] hover:text-[#005151] ${activeSection === 'student-details' ? 'shadow-[inset_8px_0_0_0_#2CD5C4,inset_-8px_0_0_0_#2CD5C4] bg-white text-[#005151]' : ''} cursor-pointer transition-colors`}
            >
              <span>Student Details</span>
              <div className="absolute left-6 top-1/2 -translate-y-1/2">
                {studentProgress === 100 ? (
                  <CircleCheckBig className="h-5 w-5 text-[#2CD5C4]" />
                ) : (
                  <div className="relative h-5 w-5">
                    <svg className="h-5 w-5 -rotate-90 transform">
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="#E8E8E8"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="#2CD5C4"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 8}`}
                        strokeDashoffset={`${2 * Math.PI * 8 * (1 - studentProgress / 100)}`}
                        className="transition-all duration-300 ease-out"
                      />
                    </svg>
              </div>
                )}
            </div>
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('parent1-details')
                if (element) {
                  const headerOffset = 122
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                  const offsetPosition = elementPosition - headerOffset
                  smoothScrollTo(offsetPosition)
                  const firstInput = element.querySelector('input, select') as HTMLElement
                  if (firstInput) firstInput.focus()
                }
                setActiveSection('parent1-details')
              }}
              className={`relative w-full flex flex-col justify-center items-center self-stretch py-3 px-[1.125rem] border-b border-[#2CD5C4] bg-white hover:bg-[#E8F4F4] hover:text-[#005151] ${activeSection === 'parent1-details' ? 'shadow-[inset_8px_0_0_0_#2CD5C4,inset_-8px_0_0_0_#2CD5C4] bg-white text-[#005151]' : ''} cursor-pointer transition-colors`}
            >
              <span>Parent/Guardian 1 Details</span>
              <div className="absolute left-6 top-1/2 -translate-y-1/2">
                {parent1Progress === 100 ? (
                  <CircleCheckBig className="h-5 w-5 text-[#2CD5C4]" />
                ) : (
                  <div className="relative h-5 w-5">
                    <svg className="h-5 w-5 -rotate-90 transform">
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="#E8E8E8"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="#2CD5C4"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 8}`}
                        strokeDashoffset={`${2 * Math.PI * 8 * (1 - parent1Progress / 100)}`}
                        className="transition-all duration-300 ease-out"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('parent2-details')
                if (element) {
                  const headerOffset = 122
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                  const offsetPosition = elementPosition - headerOffset
                  smoothScrollTo(offsetPosition)
                  const firstInput = element.querySelector('input, select') as HTMLElement
                  if (firstInput) firstInput.focus()
                }
                setActiveSection('parent2-details')
              }}
              className={`relative w-full flex flex-col justify-center items-center self-stretch py-3 px-[1.125rem] border-b border-[#2CD5C4] bg-white hover:bg-[#E8F4F4] hover:text-[#005151] ${activeSection === 'parent2-details' ? 'shadow-[inset_8px_0_0_0_#2CD5C4,inset_-8px_0_0_0_#2CD5C4] bg-white text-[#005151]' : ''} cursor-pointer transition-colors`}
            >
              <span>Parent/Guardian 2 Details</span>
              <div className="absolute left-6 top-1/2 -translate-y-1/2">
                {parent2Progress === 100 ? (
                  <CircleCheckBig className="h-5 w-5 text-[#2CD5C4]" />
                ) : (
                  <div className="relative h-5 w-5">
                    <svg className="h-5 w-5 -rotate-90 transform">
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="#E8E8E8"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="#2CD5C4"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 8}`}
                        strokeDashoffset={`${2 * Math.PI * 8 * (1 - parent2Progress / 100)}`}
                        className="transition-all duration-300 ease-out"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('additional-info')
                if (element) {
                  const headerOffset = 122
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                  const offsetPosition = elementPosition - headerOffset
                  smoothScrollTo(offsetPosition)
                  const firstInput = element.querySelector('input, select') as HTMLElement
                  if (firstInput) firstInput.focus()
                }
                setActiveSection('additional-info')
              }}
              className={`relative w-full flex flex-col justify-center items-center self-stretch py-3 px-[1.125rem] border-b border-[#2CD5C4] bg-white hover:bg-[#E8F4F4] hover:text-[#005151] ${activeSection === 'additional-info' ? 'shadow-[inset_8px_0_0_0_#2CD5C4,inset_-8px_0_0_0_#2CD5C4] bg-white text-[#005151]' : ''} cursor-pointer transition-colors`}
            >
              <span>Additional Information</span>
              <div className="absolute left-6 top-1/2 -translate-y-1/2">
                {additionalProgress === 100 ? (
                  <CircleCheckBig className="h-5 w-5 text-[#2CD5C4]" />
                ) : (
                  <div className="relative h-5 w-5">
                    <svg className="h-5 w-5 -rotate-90 transform">
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="#E8E8E8"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="#2CD5C4"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 8}`}
                        strokeDashoffset={`${2 * Math.PI * 8 * (1 - additionalProgress / 100)}`}
                        className="transition-all duration-300 ease-out"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-[320px]">
        {/* Top Navigation */}
        <div className="fixed top-0 right-0 left-[320px] h-[98px] z-40 backdrop-blur-[10px]">
          <div className="absolute inset-0 shadow-[0px_8px_8px_rgba(16,24,40,0.03),0px_20px_24px_rgba(16,24,40,0.08)] border-b border-[#E8E8E8]"></div>
          <header className="relative h-full w-full bg-white/40">
            <div className="flex items-center h-full">
              {/* Welcome Message */}
              <div className="flex-1 px-8 flex items-center justify-between">
                <div className="flex flex-col">
                <span className="text-[#141414] font-sans text-[1.5rem] font-normal leading-[133.4%] [font-feature-settings:'liga'_off,'clig'_off]">
                    Course Reservation
                  </span>
                  <span className="text-[#667085] font-sans text-base font-normal leading-[150%] [font-feature-settings:'liga'_off,'clig'_off]">
                    {activeSection === 'student-details' && "Student Details"}
                    {activeSection === 'parent1-details' && "Parent/Guardian 1 Details"}
                    {activeSection === 'parent2-details' && "Parent/Guardian 2 Details"}
                    {activeSection === 'additional-info' && "Additional Information"}
                  </span>
                  
                      </div>

                <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-10 w-10"
                      onClick={goToPreviousSection}
                      disabled={sections.indexOf(activeSection) === 0}
                    >
                      <ArrowLeft className="h-5 w-5 text-[#667085]" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-10 w-10"
                      onClick={goToNextSection}
                      disabled={sections.indexOf(activeSection) === sections.length - 1}
                    >
                      <ArrowRight className="h-5 w-5 text-[#667085]" />
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={async () => {
                        try {
                          const formData = {
                            studentDetails: {
                              name: studentName,
                              street: studentStreet,
                              city: studentCity,
                              country: studentAddressCountry,
                              postal: studentPostal,
                              phone: studentPhone,
                              email: studentEmail,
                              state: studentState,
                              phoneCountry: studentPhoneCountry
                            },
                            parent1Details: {
                              name: parent1Name,
                              street: parent1Street,
                              city: parent1City,
                              country: parent1AddressCountry,
                              postal: parent1Postal,
                              phone: parent1Phone,
                              email: parent1Email,
                              state: parent1State,
                              phoneCountry: parent1PhoneCountry,
                              sameAddress: parent1SameAddress,
                              isSoleGuardian: isSoleGuardian,
                              guardianshipDocument: guardianshipDocument?.name
                            },
                            parent2Details: {
                              name: parent2Name,
                              street: parent2Street,
                              city: parent2City,
                              country: parent2AddressCountry,
                              postal: parent2Postal,
                              phone: parent2Phone,
                              email: parent2Email,
                              state: parent2State,
                              phoneCountry: parent2PhoneCountry,
                              sameAddress: parent2SameAddress
                            },
                            healthInfo: {
                              hasAllergies,
                              allergiesDetails,
                              hasTreatment,
                              treatmentDetails,
                              hasDietary,
                              dietaryDetails
                            },
                            progress: formProgress
                          };

                          const response = await fetch('/api/save-draft', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(formData),
                          });

                          if (!response.ok) {
                            throw new Error('Failed to save draft');
                          }

                          toast({
                            title: "Draft Saved",
                            description: "You have saved a draft of your Course Reservation form",
                          });

                          // Redirect to completed dashboard
                          router.push('/dashboard/completed');
                        } catch (error) {
                          console.error('Error saving draft:', error);
                          toast({
                            title: "Error",
                            description: "Failed to save draft. Please try again.",
                            variant: "destructive",
                          });
                        }
                      }}
                    >
                      Save Draft
                    </Button>
                    <Button
                      variant="default"
                      className={`h-10 px-4 ${isFormComplete ? 'bg-[#007F7A] text-white hover:bg-[#005151]' : ''}`}
                      disabled={!isFormComplete}
                      onClick={() => {
                        if (isFormComplete) {
                          router.push('/dashboard/completed');
                        }
                      }}
                    >
                      {isFormComplete ? (
                        "Submit"
                      ) : (
                      <div className="flex items-center gap-2">
                          <span>Progress: {formProgress}%</span>
                          <div className="relative h-6 w-6">
                            <svg className="h-6 w-6 -rotate-90 transform">
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="#E8E8E8"
                                strokeWidth="3"
                                fill="none"
                              />
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="#2CD5C4"
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 10}`}
                                strokeDashoffset={`${2 * Math.PI * 10 * (1 - formProgress / 100)}`}
                                className="transition-all duration-300 ease-out"
                              />
                            </svg>
                      </div>
                        </div>
                      )}
                    </Button>
                  </div>
                  <LanguageSwitcher />
                </div>
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
                    <DropdownMenuItem>
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
          {/* Info Alert for Required Fields */}
          <Alert variant="info" className="mb-6">
            All fields are mandatory unless marked as (optional).
          </Alert>

          <Card id="student-details" className="p-6 mb-6">
            <h1 className="text-h4 text-[#141414] mb-8">Student Details</h1>
            
            <form className="space-y-8">
              {/* Student Name */}
              <div className="w-[calc(33.333%-10.667px)]">
                <Input
                  label="Student name"
                  placeholder="Enter student name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  onFocus={() => handleFieldFocus('student-details')}
                />
              </div>

              {/* Student Address */}
              <div className="space-y-4">
                <div>
                  <label className="text-[#141414] text-base">Student Address</label>
                </div>
                
                <div className="w-[calc(33.333%-10.667px)]">
                  <Input
                    placeholder="Enter street address"
                    label="Street Address"
                    value={studentStreet}
                    onChange={(e) => setStudentStreet(e.target.value)}
                    onFocus={() => handleFieldFocus('student-details')}
                  />
                </div>
                
                <div className="flex gap-8">
                  <div className="w-[calc(33.333%-10.667px)]">
                    <Input
                      placeholder="Enter city"
                      label="City"
                      value={studentCity}
                      onChange={(e) => setStudentCity(e.target.value)}
                      onFocus={() => handleFieldFocus('student-details')}
                    />
                  </div>
                  <div className="w-[calc(33.333%-10.667px)]">
                    <label className="mb-[4px] font-sans text-[0.875rem] font-normal leading-normal tracking-[0.00938rem] [font-feature-settings:'liga'_off,'clig'_off] text-[#4E4E4E] block">
                      State / Region / Province
                    </label>
                    <Input
                      placeholder="Enter state/region/province"
                      value={studentState}
                      onChange={(e) => setStudentState(e.target.value)}
                      onFocus={() => handleFieldFocus('student-details')}
                    />
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="w-[calc(33.333%-10.667px)]">
                    <Input
                      placeholder="Enter postal/zip code"
                      label="Postal / Zip Code"
                      value={studentPostal}
                      onChange={(e) => setStudentPostal(e.target.value)}
                      onFocus={() => handleFieldFocus('student-details')}
                    />
                  </div>
                  <div className="w-[calc(33.333%-10.667px)]">
                    <label className="mb-[4px] font-sans text-[0.875rem] font-normal leading-normal tracking-[0.00938rem] [font-feature-settings:'liga'_off,'clig'_off] text-[#4E4E4E] block">
                      Country
                    </label>
                    <CountryCombobox
                      countries={countries}
                      value={studentAddressCountry}
                      onValueChange={setStudentAddressCountry}
                      onFocus={() => handleFieldFocus('student-details')}
                    />
                  </div>
                </div>
              </div>

              {/* Student Phone */}
              <div>
                <div className="mb-2">
                  <label className="text-[#141414] text-base">Student Phone</label>
                </div>
                <div className="flex w-[calc(33.333%-10.667px)] gap-1">
                  <div className="w-[120px] shrink-0">
                    <PhoneCountryCombobox
                      countries={countries}
                      value={studentPhoneCountry}
                      onValueChange={setStudentPhoneCountry}
                      onFocus={() => handleFieldFocus('student-details')}
                      getCountryCallingCode={getCountryCallingCode}
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder="Enter phone number"
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      onFocus={() => handleFieldFocus('student-details')}
                    />
                  </div>
                </div>
              </div>

              {/* Student Email */}
              <div className="w-[calc(33.333%-10.667px)]">
                <div>
                  <label className="text-[#141414] text-base">Student Email</label>
                </div>
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  onFocus={() => handleFieldFocus('student-details')}
                />
              </div>
            </form>
          </Card>

          <Card id="parent1-details" className="p-6 mb-6">
            <h1 className="text-h4 text-[#141414] mb-8">Parent / Guardian 1</h1>
            
            <form className="space-y-8">
              {/* Parent1 Name */}
              <div className="w-[calc(33.333%-10.667px)]">
                <Input
                  label="Parent / Guardian 1 name"
                  placeholder="Enter parent name"
                  value={parent1Name}
                  onChange={(e) => setParent1Name(e.target.value)}
                  onFocus={() => handleFieldFocus('parent1-details')}
                />
              </div>

              {/* Parent1 Address */}
              <div className="space-y-4">
                <div>
                  <label className="text-[#141414] text-base">Parent / Guardian 1 Address</label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="parent1SameAddress"
                    checked={parent1SameAddress}
                    onCheckedChange={(checked) => setParent1SameAddress(checked as boolean)}
                  />
                  <label
                    htmlFor="parent1SameAddress"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Same as student's address
                  </label>
                </div>
                
                {!parent1SameAddress && (
                  <>
                    <div className="w-[calc(33.333%-10.667px)]">
                      <Input
                        placeholder="Enter street address"
                        label="Street Address"
                        value={parent1Street}
                        onChange={(e) => setParent1Street(e.target.value)}
                        onFocus={() => handleFieldFocus('parent1-details')}
                      />
                    </div>
                    
                    <div className="flex gap-8">
                      <div className="w-[calc(33.333%-10.667px)]">
                        <Input
                          placeholder="Enter city"
                          label="City"
                          value={parent1City}
                          onChange={(e) => setParent1City(e.target.value)}
                          onFocus={() => handleFieldFocus('parent1-details')}
                        />
                      </div>
                      <div className="w-[calc(33.333%-10.667px)]">
                        <label className="mb-[4px] font-sans text-[0.875rem] font-normal leading-normal tracking-[0.00938rem] [font-feature-settings:'liga'_off,'clig'_off] text-[#4E4E4E] block">
                          State / Region / Province
                        </label>
                        <Input
                          placeholder="Enter state/region/province"
                          value={parent1State}
                          onChange={(e) => setParent1State(e.target.value)}
                          onFocus={() => handleFieldFocus('parent1-details')}
                        />
                      </div>
                    </div>

                    <div className="flex gap-8">
                      <div className="w-[calc(33.333%-10.667px)]">
                        <Input
                          placeholder="Enter postal/zip code"
                          label="Postal / Zip Code"
                          value={parent1Postal}
                          onChange={(e) => setParent1Postal(e.target.value)}
                          onFocus={() => handleFieldFocus('parent1-details')}
                        />
                      </div>
                      <div className="w-[calc(33.333%-10.667px)]">
                        <label className="mb-[4px] font-sans text-[0.875rem] font-normal leading-normal tracking-[0.00938rem] [font-feature-settings:'liga'_off,'clig'_off] text-[#4E4E4E] block">
                          Country
                        </label>
                        <CountryCombobox
                          countries={countries}
                          value={parent1AddressCountry}
                          onValueChange={setParent1AddressCountry}
                          onFocus={() => handleFieldFocus('parent1-details')}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Parent1 Phone */}
              <div>
                <div className="mb-2">
                  <label className="text-[#141414] text-base">Parent/Guardian 1 Phone</label>
                </div>
                <div className="flex w-[calc(33.333%-10.667px)] gap-1">
                  <div className="w-[120px] shrink-0">
                    <PhoneCountryCombobox
                      countries={countries}
                      value={parent1PhoneCountry}
                      onValueChange={setParent1PhoneCountry}
                      onFocus={() => handleFieldFocus('parent1-details')}
                      getCountryCallingCode={getCountryCallingCode}
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder="Enter phone number"
                      value={parent1Phone}
                      onChange={(e) => setParent1Phone(e.target.value)}
                      onFocus={() => handleFieldFocus('parent1-details')}
                    />
                  </div>
                </div>
              </div>

              {/* Parent1 Email */}
              <div className="w-[calc(33.333%-10.667px)]">
                <div>
                  <label className="text-[#141414] text-base">Parent / Guardian 1 Email</label>
                </div>
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={parent1Email}
                  onChange={(e) => setParent1Email(e.target.value)}
                  onFocus={() => handleFieldFocus('parent1-details')}
                />
              </div>

              {/* Sole Guardian Radio Group */}
              <div className="space-y-4">
                <div>
                  <label className="text-[#141414] text-base">Are you the single legal guardian of this student?</label>
                </div>
                <RadioGroup
                  value={isSoleGuardian || ""}
                  onValueChange={(value) => setIsSoleGuardian(value as string)}
                  onFocus={() => handleFieldFocus('parent1-details')}
                >
                  <div className="flex items-center gap-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="sole-guardian-yes" />
                      <label htmlFor="sole-guardian-yes">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="sole-guardian-no" />
                      <label htmlFor="sole-guardian-no">No</label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Conditional File Upload */}
              {isSoleGuardian === "yes" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-[#141414] text-base">Please submit a document that proves you are the single legal guardian</label>
                  </div>
                  <Alert variant="info" className="mb-2">
                    It is mandatory to upload this document, however this can be completed at a later stage.
                  </Alert>
                  <div className="w-[calc(33.333%-10.667px)]">
                    <div 
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        isDragging ? 'border-[#2CD5C4] bg-[#E8F4F4]' : 'border-[#DFDFDF]'
                      }`}
                      onDragOver={(e) => {
                        e.preventDefault()
                        setIsDragging(true)
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault()
                        setIsDragging(false)
                      }}
                      onDrop={(e) => {
                        e.preventDefault()
                        setIsDragging(false)
                        const file = e.dataTransfer.files[0]
                        if (file && /\.(pdf|doc|docx|jpg|jpeg|png)$/i.test(file.name)) {
                          setGuardianshipDocument(file)
                        }
                      }}
                    >
                      {guardianshipDocument ? (
                        <div className="flex items-center justify-center gap-2">
                          <Check className="h-5 w-5 text-[#2CD5C4]" />
                          <span>{guardianshipDocument.name}</span>
                          <button 
                            onClick={() => setGuardianshipDocument(null)}
                            className="text-[#D32F2F] hover:underline ml-2"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <>
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={(e) => setGuardianshipDocument(e.target.files?.[0] || null)}
                            onFocus={() => handleFieldFocus('parent1-details')}
                            className="hidden"
                            id="guardianship-document"
                          />
                          <label 
                            htmlFor="guardianship-document"
                            className="cursor-pointer"
                          >
                            <p>Drag and drop your file here, or <span className="text-[#2CD5C4] hover:underline">browse</span></p>
                            <p className="text-sm text-[#667085] mt-2">Accepted file types: PDF, DOC, DOCX, JPG, JPEG, PNG</p>
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </form>
          </Card>

          <Card id="parent2-details" className="p-6 mb-6">
            <h1 className="text-h4 text-[#141414] mb-8">Parent / Guardian 2</h1>
            
            <form className="space-y-8">
              {isSoleGuardian === "yes" ? (
                <Alert variant="info">
                  <AlertDescription>
                    As Parent / Guardian 1 is the single legal guardian, Parent / Guardian 2 details are not required.
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  {/* Parent2 Name */}
                  <div className="w-[calc(33.333%-10.667px)]">
                    <Input
                      label="Parent / Guardian 2 name"
                      placeholder="Enter parent name"
                      value={parent2Name}
                      onChange={(e) => setParent2Name(e.target.value)}
                      onFocus={() => handleFieldFocus('parent2-details')}
                      disabled={isSoleGuardian === "yes"}
                    />
                  </div>

                  {/* Parent2 Address */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-[#141414] text-base">Parent / Guardian 2 Address</label>
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="parent2SameAddress"
                        checked={parent2SameAddress}
                        onCheckedChange={(checked) => setParent2SameAddress(checked as boolean)}
                        disabled={isSoleGuardian === "yes"}
                      />
                      <label
                        htmlFor="parent2SameAddress"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Same as student's address
                      </label>
                    </div>
                    
                    {!parent2SameAddress && (
                      <>
                        <div className="w-[calc(33.333%-10.667px)]">
                          <Input
                            placeholder="Enter street address"
                            label="Street Address"
                            value={parent2Street}
                            onChange={(e) => setParent2Street(e.target.value)}
                            onFocus={() => handleFieldFocus('parent2-details')}
                            disabled={isSoleGuardian === "yes"}
                          />
                        </div>
                        
                        <div className="flex gap-8">
                          <div className="w-[calc(33.333%-10.667px)]">
                            <Input
                              placeholder="Enter city"
                              label="City"
                              value={parent2City}
                              onChange={(e) => setParent2City(e.target.value)}
                              onFocus={() => handleFieldFocus('parent2-details')}
                              disabled={isSoleGuardian === "yes"}
                            />
                          </div>
                          <div className="w-[calc(33.333%-10.667px)]">
                            <label className="mb-[4px] font-sans text-[0.875rem] font-normal leading-normal tracking-[0.00938rem] [font-feature-settings:'liga'_off,'clig'_off] text-[#4E4E4E] block">
                              State / Region / Province
                            </label>
                            <Input
                              placeholder="Enter state/region/province"
                              value={parent2State}
                              onChange={(e) => setParent2State(e.target.value)}
                              onFocus={() => handleFieldFocus('parent2-details')}
                              disabled={isSoleGuardian === "yes"}
                            />
                          </div>
                        </div>

                        <div className="flex gap-8">
                          <div className="w-[calc(33.333%-10.667px)]">
                            <Input
                              placeholder="Enter postal/zip code"
                              label="Postal / Zip Code"
                              value={parent2Postal}
                              onChange={(e) => setParent2Postal(e.target.value)}
                              onFocus={() => handleFieldFocus('parent2-details')}
                              disabled={isSoleGuardian === "yes"}
                            />
                          </div>
                          <div className="w-[calc(33.333%-10.667px)]">
                            <label className="mb-[4px] font-sans text-[0.875rem] font-normal leading-normal tracking-[0.00938rem] [font-feature-settings:'liga'_off,'clig'_off] text-[#4E4E4E] block">
                              Country
                            </label>
                            <CountryCombobox
                              countries={countries}
                              value={parent2AddressCountry}
                              onValueChange={setParent2AddressCountry}
                              onFocus={() => handleFieldFocus('parent2-details')}
                              disabled={isSoleGuardian === "yes"}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Parent2 Phone */}
                  <div>
                    <div className="mb-2">
                      <label className="text-[#141414] text-base">Parent/Guardian 2 Phone</label>
                    </div>
                    <div className="flex w-[calc(33.333%-10.667px)] gap-1">
                      <div className="w-[120px] shrink-0">
                        <PhoneCountryCombobox
                          countries={countries}
                          value={parent2PhoneCountry}
                          onValueChange={setParent2PhoneCountry}
                          onFocus={() => handleFieldFocus('parent2-details')}
                          disabled={isSoleGuardian === "yes"}
                          getCountryCallingCode={getCountryCallingCode}
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          placeholder="Enter phone number"
                          value={parent2Phone}
                          onChange={(e) => setParent2Phone(e.target.value)}
                          onFocus={() => handleFieldFocus('parent2-details')}
                          disabled={isSoleGuardian === "yes"}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Parent2 Email */}
                  <div className="w-[calc(33.333%-10.667px)]">
                    <div>
                      <label className="text-[#141414] text-base">Parent / Guardian 2 Email</label>
                    </div>
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      value={parent2Email}
                      onChange={(e) => setParent2Email(e.target.value)}
                      onFocus={() => handleFieldFocus('parent2-details')}
                      disabled={isSoleGuardian === "yes"}
                    />
                  </div>
                </>
              )}
            </form>
          </Card>

          <Card id="additional-info" className="p-6 mt-6">
            <h1 className="text-h4 text-[#141414] mb-8">Additional Information</h1>
            <form className="space-y-8">
              {/* Current School */}
              <div className="w-[calc(33.333%-10.667px)]">
                <div>
                  <label className="text-[#141414] text-base">Current School <span className="text-sm text-[#667085]">(optional)</span></label>
                </div>
                <Input
                  placeholder="Enter current school"
                  onFocus={() => handleFieldFocus('additional-info')}
                />
              </div>

              {/* Health Information Section */}
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-[#4E4E4E]">
                    Does the student have any allergies?
                  </label>
                  <RadioGroup
                    value={hasAllergies === undefined ? "" : hasAllergies ? "yes" : "no"}
                    onValueChange={(value) => setHasAllergies(value === "yes")}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="allergies-no" onFocus={() => handleFieldFocus('additional-info')} />
                      <label htmlFor="allergies-no">No</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="allergies-yes" onFocus={() => handleFieldFocus('additional-info')} />
                      <label htmlFor="allergies-yes">Yes</label>
                    </div>
                  </RadioGroup>
                  {hasAllergies && (
                    <textarea
                      placeholder="Please provide details about allergies (optional)"
                      value={allergiesDetails}
                      onChange={(e) => setAllergiesDetails(e.target.value)}
                      onFocus={() => handleFieldFocus('additional-info')}
                      className="mt-4 w-full min-h-[100px] p-3 rounded-md border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#00968F]"
                    />
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-[#4E4E4E]">
                    Is the student currently receiving any medical treatment?
                  </label>
                  <RadioGroup
                    value={hasTreatment === undefined ? "" : hasTreatment ? "yes" : "no"}
                    onValueChange={(value) => setHasTreatment(value === "yes")}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="treatment-no" onFocus={() => handleFieldFocus('additional-info')} />
                      <label htmlFor="treatment-no">No</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="treatment-yes" onFocus={() => handleFieldFocus('additional-info')} />
                      <label htmlFor="treatment-yes">Yes</label>
                    </div>
                  </RadioGroup>
                  {hasTreatment && (
                    <textarea
                      placeholder="Please provide details about medical treatment (optional)"
                      value={treatmentDetails}
                      onChange={(e) => setTreatmentDetails(e.target.value)}
                      onFocus={() => handleFieldFocus('additional-info')}
                      className="mt-4 w-full min-h-[100px] p-3 rounded-md border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#00968F]"
                    />
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-[#4E4E4E]">
                    Does the student have any dietary requirements?
                  </label>
                  <RadioGroup
                    value={hasDietary === undefined ? "" : hasDietary ? "yes" : "no"}
                    onValueChange={(value) => setHasDietary(value === "yes")}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="dietary-no" onFocus={() => handleFieldFocus('additional-info')} />
                      <label htmlFor="dietary-no">No</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="dietary-yes" onFocus={() => handleFieldFocus('additional-info')} />
                      <label htmlFor="dietary-yes">Yes</label>
                    </div>
                  </RadioGroup>
                  {hasDietary && (
                    <textarea
                      placeholder="Please provide details about dietary requirements (optional)"
                      value={dietaryDetails}
                      onChange={(e) => setDietaryDetails(e.target.value)}
                      onFocus={() => handleFieldFocus('additional-info')}
                      className="mt-4 w-full min-h-[100px] p-3 rounded-md border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#00968F]"
                    />
                  )}
                </div>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
} 