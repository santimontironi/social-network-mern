import { useAuth } from '../hooks/authContextHook'
import { formatJoinedDate } from '../utils/date.utils'

const MyProfile = () => {

  const { user } = useAuth()

  const joinedDate = formatJoinedDate(user?.createdAt)

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">

      <div className="relative rounded-2xl overflow-hidden border border-[#74ACDF]/20 shadow-[0_8px_32px_rgba(17,24,39,0.5)]">

        <div className="relative h-32 md:h-44 bg-linear-to-r from-[#1D6FA4] via-[#1D6FA4] to-[#74ACDF]">
          <div className="absolute inset-0 opacity-[0.18]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(135deg, transparent, transparent 18px, rgba(240,248,255,0.5) 18px, rgba(240,248,255,0.5) 19px)',
              }}
            />

          </div>

          <div className="pointer-events-none absolute inset-0 opacity-[0.16]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="profile-diamonds" x="0" y="0" width="34" height="34" patternUnits="userSpaceOnUse">
                  <polygon points="17,2 32,17 17,32 2,17" fill="none" stroke="#F0F8FF" strokeWidth="1" />
                  <polygon points="17,11 23,17 17,23 11,17" fill="#F0F8FF" fillOpacity="0.35" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#profile-diamonds)" />
            </svg>
          </div>

          <div className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full border-2 border-[#F0F8FF]/15" />
          <div className="pointer-events-none absolute -bottom-16 -right-24 w-64 h-64 rounded-full border border-[#F0F8FF]/10" />
          <div className="pointer-events-none absolute -bottom-10 left-1/3 w-40 h-40 rounded-full bg-[#F0F8FF]/5 blur-2xl" />

          <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-6 md:right-12 w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#F0F8FF]/20 flex items-center justify-center">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#F0F8FF]/25" />
          </div>

        </div>

        <div className="relative bg-[#1a2536] px-5 md:px-8 pt-14 md:pt-16 pb-6 border-t border-[#74ACDF]/10">

          <div className="absolute left-5 md:left-8 -top-12 md:-top-14 z-10 w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#111827] border-4 border-[#1a2536] shadow-[0_4px_20px_rgba(17,24,39,0.6)] flex items-center justify-center ring-2 ring-[#74ACDF]/40 overflow-hidden">
            {user?.photo ? (
              <img src={user.photo} alt={user.username} className="w-full h-full object-cover" />
            ) : (
              <i className="bi bi-person-circle text-[#74ACDF] text-6xl md:text-7xl leading-none"></i>
            )}
          </div>

          <button
            type="button"
            className="absolute top-4 right-5 md:top-5 md:right-8 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
              bg-[#F0F8FF] text-[#1D6FA4] border border-[#F0F8FF]/30
              transition-all duration-300 cursor-pointer
              hover:bg-[#74ACDF] hover:text-[#111827] hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(240,248,255,0.3)]"
          >
            <i className="bi bi-pencil-fill text-sm"></i>
            <span className="hidden sm:inline">Editar perfil</span>
          </button>

          <div className="pr-12 sm:pr-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-[#F0F8FF] font-bold text-2xl md:text-3xl tracking-tight">
                {user ? `${user.name} ${user.surname}` : 'Nombre Apellido'}
              </h1>
              <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-[#1D6FA4] bg-[#74ACDF] rounded-full px-2.5 py-1 border border-[#F0F8FF]/30">
                <i className="bi bi-cup-hot-fill"></i>
                Paisano
              </span>
            </div>
            <p className="text-[#74ACDF] text-sm font-medium mt-0.5">
              @{user?.username ?? 'usuario'}
            </p>
          </div>

          <div className="mt-5 max-w-2xl">
            <p className="text-[#F0F8FF]/70 text-sm leading-relaxed">
              <i className="bi bi-quote text-[#74ACDF] mr-1"></i>
              {user?.bio ? user.bio : 'No hay bio'}
            </p>
          </div>

          <div className="mt-4 flex items-center">
            
            {joinedDate && (
              <span className="flex items-center gap-1.5 text-xs font-medium text-[#F0F8FF]/60 bg-[#111827]/50 border border-[#74ACDF]/15 rounded-full px-3 py-1.5">
                <i className="bi bi-calendar-event-fill text-[#74ACDF]"></i>
                Se unió en {joinedDate}
              </span>
            )}
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
