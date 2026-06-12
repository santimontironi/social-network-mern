import { useState } from 'react'
import { useAuth } from '../hooks/authContextHook'
import type { SidebarProps, sectionsType } from '../types/props.types'

const navLinkClass = (isActive: boolean) =>
  `flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group cursor-pointer ${
    isActive
      ? 'text-[#F0F8FF] bg-[#1D6FA4]/60 border border-[#74ACDF]/40 shadow-[0_2px_10px_rgba(29,111,164,0.35)]'
      : 'text-[#F0F8FF]/55 border border-transparent hover:text-[#F0F8FF] hover:bg-[#1D6FA4]/25 hover:border-[#74ACDF]/15 hover:shadow-[0_2px_8px_rgba(29,111,164,0.2)]'
  }`

const iconClass = (isActive: boolean) =>
  `text-base w-5 shrink-0 transition-colors duration-200 ${isActive ? 'text-[#74ACDF]' : 'group-hover:text-[#74ACDF]'}`

const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  
  const { user, logoutUser } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const navigate = (section: sectionsType) => {
    setActiveSection(section)
    setIsOpen(false)
  }

  return (
    <>
      
      <button
        onClick={() => setIsOpen(true)}
        className={`lg:hidden fixed top-4 left-4 z-50 bg-[#1a2536] border border-[#74ACDF]/20 text-[#F0F8FF] p-2 rounded-xl shadow-lg transition-opacity duration-300 ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <i className="bi bi-list text-xl leading-none" />
      </button>
      
      <div
        onClick={() => setIsOpen(false)}
        className={`lg:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside className={`
        fixed lg:sticky top-0 left-0 z-40
        w-64 h-screen
        bg-[#111827] border-r border-[#74ACDF]/20
        flex flex-col justify-between shrink-0
        shadow-[4px_0_24px_rgba(17,24,39,0.5)]
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          <div className="px-8 pt-6 pb-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-[#F0F8FF] rounded-lg p-1 shrink-0 shadow-[0_2px_8px_rgba(17,24,39,0.3)]">
                  <img src="/images/logo.png" alt="Argentex" className="w-12 h-10 block" />
                </div>
                <span className="text-[#F0F8FF] font-bold text-xl tracking-wide">Argentex</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden text-[#F0F8FF]/40 hover:text-[#F0F8FF] transition-colors duration-200 p-1"
              >
                <i className="bi bi-x-lg text-lg leading-none" />
              </button>
            </div>
            <div className="h-px bg-linear-to-r from-[#74ACDF]/30 via-[#F0F8FF]/10 to-transparent mt-5" />
          </div>

          {user && (
            <div className="px-4 pb-4">
              <div className="bg-[#1a2536] border border-[#74ACDF]/20 rounded-2xl px-3 py-2.5 flex items-center gap-3 shadow-[0_2px_12px_rgba(17,24,39,0.4)]">
                <div className="w-9 h-9 rounded-full bg-[#1D6FA4] ring-2 ring-[#74ACDF]/50 flex items-center justify-center shrink-0">
                  <i className="bi bi-person-fill text-[#F0F8FF] text-base" />
                </div>
                <div className="min-w-0 flex-1 flex items-center justify-between gap-2">
                  <p className="text-[#F0F8FF] font-semibold text-sm truncate">@{user.username}</p>
                  <span className="shrink-0 text-[#74ACDF] text-xs font-medium bg-[#1D6FA4]/30 border border-[#74ACDF]/30 rounded-full px-3 py-2">
                    paisano
                  </span>
                </div>
              </div>
            </div>
          )}

          <nav className="px-3 mt-1 flex flex-col gap-1">
            <button onClick={() => navigate('inicio')} className={navLinkClass(activeSection === 'inicio')}>
              <i className={`bi bi-house-fill ${iconClass(activeSection === 'inicio')}`} />
              Inicio
            </button>

            <button onClick={() => navigate('paisanaje')} className={navLinkClass(activeSection === 'paisanaje')}>
              <i className={`bi bi-people-fill ${iconClass(activeSection === 'paisanaje')}`} />
              Mi paisanaje
            </button>

            <button onClick={() => navigate('nueva-publicacion')} className={navLinkClass(activeSection === 'nueva-publicacion')}>
              <i className={`bi bi-plus-circle-fill ${iconClass(activeSection === 'nueva-publicacion')}`} />
              Nueva publicación
            </button>

            <button onClick={() => navigate('perfil')} className={navLinkClass(activeSection === 'perfil')}>
              <i className={`bi bi-person-circle ${iconClass(activeSection === 'perfil')}`} />
              Mi perfil
            </button>
          </nav>
        </div>

        <div>
          <div className="h-px bg-linear-to-r from-transparent via-[#74ACDF]/20 to-transparent mx-4 mb-1" />
          <div className="px-3 py-4">
            <button
              onClick={() => logoutUser()}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-[#F0F8FF]/35 border border-transparent hover:text-red-300 hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-200 cursor-pointer group"
            >
              <i className="bi bi-box-arrow-left text-base w-5 shrink-0 group-hover:text-red-300 transition-colors duration-200" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar