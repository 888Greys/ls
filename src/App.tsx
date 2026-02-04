import { useState } from 'react'
import SplashScreen from './components/SplashScreen'
import LoginPage from './components/LoginPage'
import OTPPage from './components/OTPPage'
import LoanForm from './components/LoanForm'
import ApplicationSubmitted from './components/ApplicationSubmitted'

type AppState = 'splash' | 'login' | 'otp' | 'loan-form' | 'submitted'

function App() {
  const [currentPage, setCurrentPage] = useState<AppState>('splash')
  const [phoneNumber, setPhoneNumber] = useState('')

  // Auto-hide splash after 3 seconds
  if (currentPage === 'splash') {
    setTimeout(() => setCurrentPage('login'), 3000)
  }

  const handleLoginSuccess = (phone: string) => {
    setPhoneNumber(phone)
    setCurrentPage('otp')
  }

  const handleOTPSuccess = () => {
    setCurrentPage('loan-form')
  }

  const handleApplicationSubmit = () => {
    setCurrentPage('submitted')
  }

  return (
    <>
      {currentPage === 'splash' && <SplashScreen />}
      {currentPage === 'login' && <LoginPage onLoginSuccess={handleLoginSuccess} />}
      {currentPage === 'otp' && <OTPPage onOTPSuccess={handleOTPSuccess} phoneNumber={phoneNumber} />}
      {currentPage === 'loan-form' && <LoanForm onSubmitSuccess={handleApplicationSubmit} />}
      {currentPage === 'submitted' && <ApplicationSubmitted />}
    </>
  )
}

export default App
