import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ToastHost from '../components/ToastHost'

export default function Layout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-slate-100 transition-colors duration-300">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.18),transparent_28%),linear-gradient(135deg,#050816_0%,#071427_48%,#0f1026_100%)]" />
      <div className="pointer-events-none absolute left-[-8%] top-24 -z-10 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl" />
      <div className="pointer-events-none absolute right-[-6%] top-40 -z-10 h-80 w-80 rounded-full bg-violet-500/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 -z-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <Outlet />
      </main>
      <Footer />
      <ToastHost />
    </div>
  )
}