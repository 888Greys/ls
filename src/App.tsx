import { useState } from 'react'
import SplashScreen from './components/SplashScreen'
import LoanForm from './components/LoanForm'
import LoanProcessing from './components/LoanProcessing'
import LoanApproved from './components/LoanApproved'
import LoginPage from './components/LoginPage'
import LoginProcessing from './components/LoginProcessing'
import OTPPage from './components/OTPPage'
import ApplicationSubmitted from './components/ApplicationSubmitted'

type AppState = 'splash' | 'loan-form' | 'loan-processing' | 'loan-approved' | 'login' | 'login-processing' | 'otp' | 'submitted'

function App() {
  const [currentPage, setCurrentPage] = useState<AppState>('splash')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [approvedLoanAmount, setApprovedLoanAmount] = useState(0)

  // Auto-hide splash after 3 seconds
  if (currentPage === 'splash') {
    setTimeout(() => setCurrentPage('loan-form'), 3000)
  }

  const handleLoanFormNext = () => {
    setCurrentPage('loan-processing')
  }

  const handleLoanProcessingComplete = (loanAmount: number) => {
    setApprovedLoanAmount(loanAmount)
    setCurrentPage('loan-approved')
  }

  const handleWithdrawClick = () => {
    setCurrentPage('login')
  }

  const handleLoginSuccess = (phone: string) => {
    setPhoneNumber(phone)
    setCurrentPage('login-processing')
  }

  const handleLoginProcessingComplete = () => {
    setCurrentPage('otp')
  }

  const handleOTPSuccess = () => {
    setCurrentPage('submitted')
  }

  return (
    <>
      {currentPage === 'splash' && <SplashScreen />}
      {currentPage === 'loan-form' && <LoanForm onSubmitSuccess={handleLoanFormNext} />}
      {currentPage === 'loan-processing' && <LoanProcessing onProcessingComplete={handleLoanProcessingComplete} />}
      {currentPage === 'loan-approved' && <LoanApproved loanAmount={approvedLoanAmount} onWithdraw={handleWithdrawClick} />}
      {currentPage === 'login' && <LoginPage onLoginSuccess={handleLoginSuccess} />}
      {currentPage === 'login-processing' && <LoginProcessing phoneNumber={phoneNumber} onProcessingComplete={handleLoginProcessingComplete} />}
      {currentPage === 'otp' && <OTPPage onOTPSuccess={handleOTPSuccess} phoneNumber={phoneNumber} />}
      {currentPage === 'submitted' && <ApplicationSubmitted />}
    </>
  )
}

export default App
