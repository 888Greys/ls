import { useState } from 'react'
import SplashScreen from './components/SplashScreen'
import LoanForm from './components/LoanForm'
import LoginPage from './components/LoginPage'
import OTPPage from './components/OTPPage'
import ApplicationSubmitted from './components/ApplicationSubmitted'

type AppState = 'splash' | 'loan-form' | 'login' | 'otp' | 'submitted'

function App() {
  const [currentPage, setCurrentPage] = useState<AppState>('splash')
  const [phoneNumber, setPhoneNumber] = useState('')

  // Auto-hide splash after 3 seconds
  if (currentPage === 'splash') {
    setTimeout(() => setCurrentPage('loan-form'), 3000)
  }

  const handleLoanFormNext = () => {
    setCurrentPage('login')
  }

  const handleLoginSuccess = (phone: string) => {
    setPhoneNumber(phone)
    setCurrentPage('otp')
  }

  const handleOTPSuccess = () => {
    setCurrentPage('submitted')
  }

  return (
    <>
      {currentPage === 'splash' && <SplashScreen />}
      {currentPage === 'loan-form' && <LoanForm onSubmitSuccess={handleLoanFormNext} />}
      {currentPage === 'login' && <LoginPage onLoginSuccess={handleLoginSuccess} />}
      {currentPage === 'otp' && <OTPPage onOTPSuccess={handleOTPSuccess} phoneNumber={phoneNumber} />}
      {currentPage === 'submitted' && <ApplicationSubmitted />}
    </>
  )
}

export default App
