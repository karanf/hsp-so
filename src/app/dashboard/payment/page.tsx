"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { CreditCard, Building2, QrCode } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

  // Using approximate exchange rates
  const amount = {
    EUR: 400,
    USD: 432.40, // 1 EUR = 1.0810 USD
    CNY: 3374.80, // 1 EUR = 8.4370 CNY
  }

  const handleContinue = () => {
    if (selectedMethod) {
      router.push(`/dashboard/payment/gateway?method=${selectedMethod}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#00968F] flex flex-col items-center pt-16 pb-8 px-4 relative overflow-hidden">
      {/* Background wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-[#005151] transform -skew-y-[10deg] translate-y-1/2" />
      
      {/* Logo */}
      <Image
        src="/assets/images/edu_logo_white.svg"
        alt="Educatius Logo"
        width={240}
        height={55}
        priority
        className="mb-16"
      />

      {/* Content */}
      <div className="w-full max-w-[600px] text-center text-white z-10">
        <h1 className="text-2xl font-medium mb-2">Checkout: finalize your purchase.</h1>
        <p className="text-sm mb-4">Summary of selections</p>
        <div className="text-4xl font-bold mb-8">400.00 EUR</div>

        <p className="text-sm mb-6">Payment methods available in your country. Choose the option that suits you the most.</p>

        {/* Payment Options */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <button 
            className={`bg-white rounded-lg p-4 flex flex-col items-center transition-all duration-200 
              ${selectedMethod === 'CARD' 
                ? 'ring-[3px] ring-white ring-offset-1 ring-offset-[#00968F] shadow-lg scale-[1.02] bg-[#F8FFFE]' 
                : 'hover:shadow-md hover:scale-[1.02] hover:bg-[#F8FFFE]'}`}
            onClick={() => setSelectedMethod('CARD')}
          >
            <CreditCard className={`w-6 h-6 mb-2 transition-colors duration-200 
              ${selectedMethod === 'CARD' ? 'text-[#00968F]' : 'text-[#141414]'}`} />
            <span className={`font-medium mb-1 transition-colors duration-200 
              ${selectedMethod === 'CARD' ? 'text-[#00968F]' : 'text-[#141414]'}`}>
              CARD
            </span>
            <span className="text-[#667085] text-sm">{amount.USD.toFixed(2)} USD</span>
          </button>
          <button 
            className={`bg-white rounded-lg p-4 flex flex-col items-center transition-all duration-200 
              ${selectedMethod === 'WECHAT' 
                ? 'ring-[3px] ring-white ring-offset-1 ring-offset-[#00968F] shadow-lg scale-[1.02] bg-[#F8FFFE]' 
                : 'hover:shadow-md hover:scale-[1.02] hover:bg-[#F8FFFE]'}`}
            onClick={() => setSelectedMethod('WECHAT')}
          >
            <QrCode className={`w-6 h-6 mb-2 transition-colors duration-200 
              ${selectedMethod === 'WECHAT' ? 'text-[#00968F]' : 'text-[#141414]'}`} />
            <span className={`font-medium mb-1 transition-colors duration-200 
              ${selectedMethod === 'WECHAT' ? 'text-[#00968F]' : 'text-[#141414]'}`}>
              WECHAT
            </span>
            <span className="text-[#667085] text-sm">{amount.CNY.toFixed(2)} CNY</span>
          </button>
          <button 
            className={`bg-white rounded-lg p-4 flex flex-col items-center transition-all duration-200 
              ${selectedMethod === 'ALIPAY' 
                ? 'ring-[3px] ring-white ring-offset-1 ring-offset-[#00968F] shadow-lg scale-[1.02] bg-[#F8FFFE]' 
                : 'hover:shadow-md hover:scale-[1.02] hover:bg-[#F8FFFE]'}`}
            onClick={() => setSelectedMethod('ALIPAY')}
          >
            <QrCode className={`w-6 h-6 mb-2 transition-colors duration-200 
              ${selectedMethod === 'ALIPAY' ? 'text-[#00968F]' : 'text-[#141414]'}`} />
            <span className={`font-medium mb-1 transition-colors duration-200 
              ${selectedMethod === 'ALIPAY' ? 'text-[#00968F]' : 'text-[#141414]'}`}>
              ALIPAY
            </span>
            <span className="text-[#667085] text-sm">{amount.CNY.toFixed(2)} CNY</span>
          </button>
          <button 
            className={`bg-white rounded-lg p-4 flex flex-col items-center transition-all duration-200 
              ${selectedMethod === 'BANK' 
                ? 'ring-[3px] ring-white ring-offset-1 ring-offset-[#00968F] shadow-lg scale-[1.02] bg-[#F8FFFE]' 
                : 'hover:shadow-md hover:scale-[1.02] hover:bg-[#F8FFFE]'}`}
            onClick={() => setSelectedMethod('BANK')}
          >
            <Building2 className={`w-6 h-6 mb-2 transition-colors duration-200 
              ${selectedMethod === 'BANK' ? 'text-[#00968F]' : 'text-[#141414]'}`} />
            <span className={`font-medium mb-1 transition-colors duration-200 
              ${selectedMethod === 'BANK' ? 'text-[#00968F]' : 'text-[#141414]'}`}>
              BANK TRANSFER
            </span>
            <span className="text-[#667085] text-sm">{amount.CNY.toFixed(2)} CNY</span>
          </button>
        </div>

        {selectedMethod && (
          <button 
            className="bg-white text-[#00968F] font-medium py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={handleContinue}
          >
            Continue to Payment
          </button>
        )}

        <p className="text-sm mt-8">Your trust is our priority, and we're here to make your transaction process seamless.</p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-white/80 text-sm">
        Powered by <span className="font-medium">Nexpora Sweden AB</span>
      </div>
    </div>
  )
} 