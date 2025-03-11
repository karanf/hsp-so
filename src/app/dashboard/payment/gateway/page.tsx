"use client"

import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function PaymentGatewayPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const paymentMethod = searchParams.get('method')
  
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [name, setName] = useState('')
  const [payInLocalCurrency, setPayInLocalCurrency] = useState(false)
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes in seconds
  const [isProcessing, setIsProcessing] = useState(false)

  // Exchange rates
  const rates = {
    EUR_USD: 1.0810, // 1 EUR = 1.0810 USD
    EUR_CNY: 8.4370, // 1 EUR = 8.4370 CNY
  }

  const getCurrencyByMethod = (method: string | null) => {
    switch (method) {
      case 'CARD':
        return { value: (400 * rates.EUR_USD).toFixed(2), currency: 'US$' }
      case 'WECHAT':
      case 'ALIPAY':
      case 'BANK':
        return { value: (400 * rates.EUR_CNY).toFixed(2), currency: 'CNY' }
      default:
        return { value: '400.00', currency: 'EUR' }
    }
  }

  const { value, currency } = getCurrencyByMethod(paymentMethod)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Test items data maintaining same ratio but totaling 400 EUR
  const items = [
    { name: 'Test Item 1', quantity: 1, amount: '180.00 EUR', amountUSD: `${(180 * rates.EUR_USD).toFixed(2)} USD` },
    { name: 'Test Item 0', quantity: 1, amount: '220.00 EUR', amountUSD: `${(220 * rates.EUR_USD).toFixed(2)} USD` },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing with a 2-second delay
    setTimeout(() => {
      router.push('/dashboard/payment-complete')
    }, 2000)
  }

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'WECHAT':
      case 'ALIPAY':
        return (
          <div className="border rounded-lg p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-4 h-4 rounded-full border-2 border-[#00968F] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#00968F]"></div>
              </div>
              <span className="font-medium">{paymentMethod === 'WECHAT' ? 'WeChat Pay' : 'Alipay'}</span>
            </div>
            <div className="bg-gray-100 w-48 h-48 mx-auto mb-6 rounded-lg flex items-center justify-center">
              <span className="text-sm text-gray-500">QR Code will appear here</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Scan with {paymentMethod === 'WECHAT' ? 'WeChat' : 'Alipay'} app</p>
            <p className="text-lg font-medium mb-4">{value} {currency}</p>
            <p className="text-xs text-gray-500">The QR code will expire in {formatTime(timeLeft)}</p>
          </div>
        )

      case 'BANK':
        return (
          <div className="border rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-4 h-4 rounded-full border-2 border-[#00968F] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#00968F]"></div>
              </div>
              <span className="font-medium">Bank Transfer</span>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-4">Bank Account Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank Name:</span>
                    <span className="font-medium">Example Bank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Name:</span>
                    <span className="font-medium">Nexpora Sweden AB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Number:</span>
                    <span className="font-medium">1234 5678 9012 3456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">SWIFT/BIC:</span>
                    <span className="font-medium">EXAMPLEXX</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-medium">INV-{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-sm text-yellow-800">
                <p className="mb-2"><strong>Important:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Please include the reference number in your transfer</li>
                  <li>Transfer must be completed within 24 hours</li>
                  <li>Amount to transfer: {value} {currency}</li>
                </ul>
              </div>
            </div>
          </div>
        )

      default: // CARD payment form
        return (
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-[#00968F] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#00968F]"></div>
                </div>
                <span className="font-medium">Card</span>
              </div>
              <div className="flex gap-3 items-center">
                <Image src="/visa.svg" alt="Visa" width={49} height={30} className="object-contain" />
                <Image src="/mastercard.svg" alt="Mastercard" width={49} height={30} className="object-contain" />
                <Image src="/maestro.svg" alt="Maestro" width={39} height={30} className="object-contain" />
                <button className="text-blue-500 text-sm">Show More...</button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Cardholder Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full px-3 py-2 border rounded focus:ring-1 focus:ring-[#00968F] focus:border-[#00968F]"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border rounded focus:ring-1 focus:ring-[#00968F] focus:border-[#00968F]"
                  maxLength={19}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Expiry Date</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border rounded focus:ring-1 focus:ring-[#00968F] focus:border-[#00968F]"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    className="w-full px-3 py-2 border rounded focus:ring-1 focus:ring-[#00968F] focus:border-[#00968F]"
                    maxLength={3}
                  />
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Processing Payment Modal */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#00968F] border-t-transparent"></div>
              <h3 className="text-lg font-medium text-center">Processing Payment</h3>
              <p className="text-sm text-gray-500 text-center">Please wait while we process your payment...</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex min-h-screen">
        {/* Left side - Order summary */}
        <div className="w-[45%] bg-[#00968F] p-8">
          <Image
            src="/assets/images/edu_logo_white.svg"
            alt="Educatius Logo"
            width={180}
            height={42}
            priority
            className="mb-12"
          />

          <table className="w-full text-white">
            <thead>
              <tr className="text-left">
                <th className="pb-4">Name</th>
                <th className="pb-4">Quantity</th>
                <th className="pb-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-t border-white/20">
                  <td className="py-4">{item.name}</td>
                  <td className="py-4">{item.quantity}</td>
                  <td className="py-4 text-right">{item.amount}</td>
                </tr>
              ))}
              <tr className="border-t border-white/20">
                <td colSpan={2} className="py-4 text-2xl font-bold">Total</td>
                <td className="py-4 text-right text-2xl font-bold">400.00 EUR</td>
              </tr>
            </tbody>
          </table>

          <div className="absolute bottom-4 text-white/80 text-sm">
            Powered by <span className="font-medium">Nexpora Sweden AB</span>
          </div>
        </div>

        {/* Right side - Payment form */}
        <div className="w-[55%] p-8">
          <div className="max-w-[600px] mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-xl font-medium">
                {paymentMethod === 'CARD' ? 'ENTER CARD DETAILS' :
                 paymentMethod === 'BANK' ? 'BANK TRANSFER DETAILS' :
                 `SCAN ${paymentMethod === 'WECHAT' ? 'WECHAT' : 'ALIPAY'} QR CODE`}
              </h1>
              <div className="text-red-500 font-medium">{formatTime(timeLeft)}</div>
            </div>

            {paymentMethod === 'CARD' && (
              <div className="text-sm text-gray-600 mb-6">
                This payment method does not support directly your local currency. You can use the DCC
                (Dynamic Currency Conversion) to pay in your currency.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {renderPaymentForm()}

              {paymentMethod === 'CARD' && (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="payInCurrency"
                    checked={payInLocalCurrency}
                    onChange={(e) => setPayInLocalCurrency(e.target.checked)}
                    className="rounded border-gray-300 text-[#00968F] focus:ring-[#00968F]"
                  />
                  <label htmlFor="payInCurrency" className="text-sm">Pay in my currency</label>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#00BFB3] text-white font-medium py-3 rounded hover:bg-[#00a89d] transition-colors"
              >
                {paymentMethod === 'CARD' ? `Pay ${value} ${currency}` :
                 paymentMethod === 'BANK' ? 'I have completed the bank transfer' :
                 'Check payment status'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 