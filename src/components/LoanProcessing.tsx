import { useEffect } from 'react'

interface LoanProcessingProps {
  onProcessingComplete: (loanAmount: number) => void
}

const LoanProcessing = ({ onProcessingComplete }: LoanProcessingProps) => {
  useEffect(() => {
    // Generate random loan amount between 500 and 5000 (in increments of 100)
    const generateLoanAmount = () => {
      const min = 500
      const max = 5000
      const increment = 100
      const range = (max - min) / increment
      return min + Math.floor(Math.random() * (range + 1)) * increment
    }

    // Show processing for 3-5 seconds, then show loan amount
    const processingTime = 3000 + Math.random() * 2000 // 3-5 seconds
    const timer = setTimeout(() => {
      const approvedAmount = generateLoanAmount()
      onProcessingComplete(approvedAmount)
    }, processingTime)

    return () => clearTimeout(timer)
  }, [onProcessingComplete])

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative bg-[#f7f9fc]">
      {/* Background */}
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute top-[-20%] right-[-20%] w-full h-full bg-gradient-to-br from-transparent via-transparent to-[#e0e6f0]"></div>
        <div className="absolute bottom-[-20%] left-[-20%] w-full h-full bg-gradient-to-tr from-[#e0e6f0] via-transparent to-transparent"></div>
      </div>

      <div className="w-full max-w-[440px] px-5 text-center">
        {/* Logo */}
        <div className="text-4xl font-bold mb-10 tracking-tight">
          <span className="text-[#0056a4]">Eco</span>
          <span className="text-[#e11d2d]">Cash</span>
        </div>
        <p className="text-gray-600 mb-4 text-sm">Lesotho</p>

        {/* Processing Card */}
        <div className="bg-white py-16 px-8 rounded-[50px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-[#f0f0f0]">
          {/* Animated Icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-[#0056a4] to-[#12009c] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <i className="fa-solid fa-calculator text-white text-4xl"></i>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Re Bala Tšoaneleho ea Hau</h2>
          <p className="text-gray-600 text-base mb-2">Calculating Your Loan Eligibility</p>

          {/* Loading Spinner */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <div className="w-3 h-3 bg-[#0056a4] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-[#0056a4] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-[#0056a4] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>

          {/* Processing Messages */}
          <div className="mt-8 space-y-2 text-sm text-gray-600">
            <p className="animate-pulse">✓ Re hlahloba mongolo oa hau...</p>
            <p className="animate-pulse" style={{ animationDelay: '1s' }}>✓ Re lekola krediti ea hau...</p>
            <p className="animate-pulse" style={{ animationDelay: '2s' }}>✓ Re bala chelete eo u tšoanelehang...</p>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-xs text-gray-500 flex items-center justify-center gap-2">
          <i className="fa-solid fa-shield-halved"></i>
          <span>E sireletsehile ebile e potlakile (Secure & Fast)</span>
        </div>
      </div>
    </div>
  )
}

export default LoanProcessing
