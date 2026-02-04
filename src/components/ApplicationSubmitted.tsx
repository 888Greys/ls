import { useEffect, useState } from 'react'

const ApplicationSubmitted = () => {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setAnimate(true), 100)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative bg-gradient-to-br from-[#0056a4] via-[#12009c] to-[#2d0b5a]">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className={`w-full max-w-[500px] px-5 text-center relative z-10 transition-all duration-1000 ${
        animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Success Icon */}
        <div className="mb-8">
          <div className={`w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl transition-all duration-700 delay-200 ${
            animate ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
          }`}>
            <div className="w-28 h-28 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-check text-white text-5xl"></i>
            </div>
          </div>

          {/* Checkmark animation ring */}
          <div className={`w-40 h-40 border-4 border-white/30 rounded-full mx-auto -mt-36 mb-6 transition-all duration-1000 delay-400 ${
            animate ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}></div>
        </div>

        {/* Logo */}
        <div className="text-4xl font-bold mb-6 tracking-tight">
          <span className="text-white">Eco</span>
          <span className="text-[#e11d2d]">Cash</span>
        </div>
        <p className="text-white/80 mb-4">Lesotho</p>

        {/* Success Message */}
        <div className="bg-white/10 backdrop-blur-lg py-10 px-8 rounded-[40px] border border-white/20 shadow-2xl">
          <h1 className="text-3xl font-bold text-white mb-2">
            Kopo e Romelitsoe!
          </h1>
          <p className="text-white/70 text-lg mb-4">Application Submitted!</p>
          
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#e11d2d] to-transparent mx-auto mb-6"></div>

          <p className="text-white/90 text-lg mb-2 leading-relaxed">
            Kopo ea hau ea kadimo e rometsoe ka katleho 'me e ntse e hlahlojoa.
          </p>
          <p className="text-white/70 text-sm mb-6">
            Your loan application has been successfully submitted and is under review.
          </p>

          <div className="bg-white/10 rounded-2xl py-6 px-6 mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <i className="fa-solid fa-clock text-yellow-300 text-2xl"></i>
              <span className="text-white font-semibold text-xl">E ntse e Hlahlojoa</span>
            </div>
            <p className="text-white/90 text-sm mb-1">Under Review</p>
            <p className="text-white/80 text-sm">
              Sehlopha sa rona se tla hlahloba kopo ea hau ka hora tse 24-48
            </p>
            <p className="text-white/60 text-xs mt-1">
              Our team will review within 24-48 hours
            </p>
          </div>

          {/* What's Next */}
          <div className="text-left space-y-4 mb-8">
            <h3 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
              <i className="fa-solid fa-list-check"></i>
              Ho etsahala eng? (What's next?)
            </h3>
            
            <div className="flex items-start gap-3 text-white/80 text-sm">
              <i className="fa-solid fa-circle-check text-green-400 mt-1"></i>
              <div>
                <p>Re tla netefatsa lintlha tsa hau</p>
                <p className="text-white/60 text-xs">We'll verify your information</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 text-white/80 text-sm">
              <i className="fa-solid fa-circle-check text-green-400 mt-1"></i>
              <div>
                <p>U tla fumana SMS ka qeto</p>
                <p className="text-white/60 text-xs">You'll receive SMS with decision</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 text-white/80 text-sm">
              <i className="fa-solid fa-circle-check text-green-400 mt-1"></i>
              <div>
                <p>Ha e amoheloa, chelete e tla romelloa</p>
                <p className="text-white/60 text-xs">If approved, funds will be disbursed</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white/5 rounded-2xl py-4 px-6 border border-white/10">
            <p className="text-white/80 text-xs mb-2">U hloka thuso? (Need help?)</p>
            <div className="flex items-center justify-center gap-4 text-white text-sm">
              <a href="tel:*151#" className="hover:text-[#e11d2d] transition-colors">
                <i className="fa-solid fa-phone mr-1"></i>
                *151#
              </a>
              <span className="text-white/30">|</span>
              <a href="mailto:support@ecocash.co.ls" className="hover:text-[#e11d2d] transition-colors">
                <i className="fa-solid fa-envelope mr-1"></i>
                Tšehetso (Support)
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-white/60 text-sm flex items-center justify-center gap-2">
          <i className="fa-solid fa-shield-halved"></i>
          <span>Application ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  )
}

export default ApplicationSubmitted
