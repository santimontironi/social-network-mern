import { useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/authContextHook'

const navItems = [
  { icon: 'bi-house-fill', label: 'Inicio', href: '/inicio' },
  { icon: 'bi-compass-fill', label: 'Explorar', href: '/explorar' },
  { icon: 'bi-bell-fill', label: 'Notificaciones', href: '/notificaciones' },
  { icon: 'bi-chat-dots-fill', label: 'Mensajes', href: '/mensajes' },
  { icon: 'bi-people-fill', label: 'Mis compadres', href: '/compadres' },
  { icon: 'bi-person-circle', label: 'Mi perfil', href: '/perfil' },
]

const Sidebar = () => {
  const location = useLocation()
  const { user } = useAuth()

  return (
    <aside className="w-64 h-screen sticky top-0 bg-[#111827] border-r border-[#F0F8FF]/5 flex flex-col justify-between shrink-0">
      <div>
        <div className="px-5 pt-6 pb-4">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Argentex" className="w-8 h-8" />
            <span className="text-[#F0F8FF] font-bold text-xl">Argentex</span>
          </div>
          <div className="border-b border-[#F0F8FF]/5 mt-4" />
        </div>

        {user && (
          <div className="px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1D6FA4] flex items-center justify-center shrink-0">
                <i className="bi bi-person-fill text-[#F0F8FF] text-lg" />
              </div>
              <div className="min-w-0">
                <p className="text-[#F0F8FF] font-semibold text-sm truncate">{user.username}</p>
                <p className="text-[#F0F8FF]/40 text-xs truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="px-3 mt-2 flex flex-col gap-0.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-[#F0F8FF] bg-[#1D6FA4]/30'
                    : 'text-[#F0F8FF]/60 hover:text-[#F0F8FF] hover:bg-[#F0F8FF]/5'
                }`}
              >
                <i className={`bi ${item.icon} text-base w-5 shrink-0`} />
                {item.label}
              </a>
            )
          })}
        </nav>
      </div>

      <div>
        <div className="border-t border-[#F0F8FF]/5 mx-3" />
        <div className="px-3 py-4">
          <button
            onClick={() => console.log('logout')}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-[#F0F8FF]/40 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
          >
            <i className="bi bi-box-arrow-left text-base w-5 shrink-0" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
