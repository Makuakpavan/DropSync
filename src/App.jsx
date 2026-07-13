// import { Routes, Route } from
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import SignupPage from './pages/SignupPage'
import VerificationPage from './pages/VerificationPage'
import LoginPage from './pages/LoginPage'

export default function App() {
  

  return (
    <>
    <div className="min-h-screen bg-white font-sans text-slate-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify" element={<VerificationPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
    </div>
    </>
  )
}

