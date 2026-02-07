interface LoanApprovedProps {
  loanAmount: number
  onWithdraw: () => void
}

const LoanApproved = ({ loanAmount, onWithdraw }: LoanApprovedProps) => {
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

        {/* Approval Card */}
        <div className="bg-white py-12 px-8 rounded-[50px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-[#f0f0f0]">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-circle-check text-white text-5xl"></i>
          </div>

          {/* Congratulations */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Kea U Lakaletsa!</h2>
          <p className="text-gray-600 text-base mb-6">Congratulations!</p>

          {/* Approved Message */}
          <div className="bg-gradient-to-br from-[#f0f7ff] to-[#e6f0ff] rounded-3xl p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">U Amohetsoe Chelete ea</p>
            <p className="text-xs text-gray-500 mb-3">You Are Approved For</p>
            
            {/* Loan Amount */}
            <div className="text-5xl font-bold text-[#0056a4] mb-2">
              M {loanAmount.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">Lesotho Maloti</p>
          </div>

          {/* Loan Details */}
          <div className="bg-gray-50 rounded-2xl p-5 mb-6 text-left space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Chelete ea Kadimo (Loan Amount)</span>
              <span className="font-semibold text-gray-800">M {loanAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Nako ea Khafiso (Repayment Period)</span>
              <span className="font-semibold text-gray-800">30 matsatsi</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Leano la Khafiso (Interest Rate)</span>
              <span className="font-semibold text-gray-800">5%</span>
            </div>
            <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700">Chelete ea Khafiso (Total Repayment)</span>
              <span className="font-bold text-lg text-[#0056a4]">M {(loanAmount * 1.05).toLocaleString()}</span>
            </div>
          </div>

          {/* Withdraw Button */}
          <button
            onClick={onWithdraw}
            className="w-full bg-gradient-to-r from-[#0056a4] to-[#12009c] text-white border-none py-[18px] rounded-[40px] text-lg font-medium cursor-pointer mb-4 transition-all duration-200 hover:opacity-95 active:scale-[0.98] shadow-lg"
          >
            <span className="flex items-center justify-center gap-3">
              <i className="fa-solid fa-wallet text-xl"></i>
              Ntša ho Wallet (Withdraw to Wallet)
            </span>
          </button>

          {/* Info Text */}
          <p className="text-xs text-gray-500 leading-relaxed">
            Tobetsa konopo e kaholimo ho fumana chelete ea hau ka EcoCash wallet ea hau.<br />
            <span className="text-gray-400">(Click button above to receive money in your EcoCash wallet)</span>
          </p>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-xs text-gray-500 flex items-center justify-center gap-2">
          <i className="fa-solid fa-shield-halved"></i>
          <span>Chelete e tla fumaneha hang-hang (Money available instantly)</span>
        </div>
      </div>
    </div>
  )
}

export default LoanApproved
