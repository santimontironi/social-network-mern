import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/authContextHook'
import type { LoginUserData } from '../types/auth.types'

const Login = () => {
  const { loginUser, loading, user } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginUserData>()
  const navigate = useNavigate()

  const [serverError, setServerError] = useState<string | null>(null)

  const onSubmit = async (data: LoginUserData) => {
    setServerError(null)
    try {
      await loginUser(data)
      navigate('/inicio')
    } catch (error: any) {
      setServerError(error.response?.data?.message || 'Error al iniciar sesión')
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/inicio')
    }
  }, [user, navigate])

  return (
    <section className="min-h-screen overflow-y-auto flex items-start md:items-center justify-center bg-[#1D6FA4] px-4 pt-24 pb-8 md:pt-8 md:pb-8">

      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-[0.14]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diamonds" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <polygon points="16,2 30,16 16,30 2,16" fill="none" stroke="#F0F8FF" strokeWidth="1"/>
              <polygon points="16,10 22,16 16,22 10,16" fill="#F0F8FF" fillOpacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diamonds)"/>
        </svg>
      </div>

      <div
        className="pointer-events-none absolute top-0 left-0 right-0 opacity-90 h-15"
        style={{
          backgroundImage: "url('/images/guardapampa.jpeg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <img
          src="/images/mate.png" alt=""
          className="absolute invert mix-blend-screen
                     bottom-[18%] left-[1%] w-14 opacity-[0.18] rotate-[-14deg]
                     md:top-[25%] md:bottom-auto md:left-[3%] md:w-30 md:opacity-40 xl:left-[10%]"
        />

        <img
          src="/images/sombrero.png" alt=""
          className="absolute invert mix-blend-screen
                     bottom-[16%] right-[1%] w-16 opacity-[0.18] rotate-[8deg]
                     md:top-[24%] md:bottom-auto md:right-[4%] md:w-41.25 md:opacity-[0.38] xl:right-[10%]"
        />

        <img
          src="/images/caballo.png" alt=""
          className="absolute invert mix-blend-screen
                     bottom-[3%] left-[1%] w-16 opacity-[0.15] rotate-2
                     md:bottom-[10%] md:left-[0%] md:w-42.5 md:opacity-[0.42] xl:left-[10%]"
        />

        <img
          src="/images/guitarra.png" alt=""
          className="absolute invert mix-blend-screen
                     bottom-[2%] right-[1%] w-14 opacity-[0.15] rotate-[-10deg]
                     md:bottom-[8%] md:right-[4%] md:w-38.5 md:opacity-40 xl:right-[10%]"
        />

      </div>

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-125 h-125 rounded-full border border-[#F0F8FF]/5" />
        <div className="absolute -bottom-40 -right-40 w-150 h-150 rounded-full border border-[#F0F8FF]/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full bg-[#74ACDF]/10 blur-[80px]" />
      </div>

      <div className="relative w-full max-w-lg shadow-[0_16px_64px_rgba(17,24,39,0.6)] mb-4 md:mb-16 rounded-2xl overflow-hidden animate-auth-card">

        <div className="relative overflow-hidden rounded-t-2xl bg-[#74ACDF]/30 border-x border-t border-[#111827]/40 border-b-0 px-4 md:px-8 pt-5 pb-6 backdrop-blur-sm">
          <div className="pointer-events-none absolute -top-6 -right-6 w-36 h-36 rounded-full border-2 border-[#111827]/20" />
          <div className="pointer-events-none absolute -top-10 -right-10 w-52 h-52 rounded-full border border-[#111827]/10" />
          <div className="pointer-events-none absolute bottom-0 -left-8 w-28 h-28 rounded-full border border-[#111827]/15" />

          <div className="relative flex flex-col items-center gap-2">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-[#F0F8FF] backdrop-blur-sm border border-[#111827]/60 shadow-[0_4px_20px_rgba(17,24,39,0.5)]">
              <img src="/images/logo.png" alt="Argentex" className="w-14 object-contain" />
            </div>
            <div className="text-center">
              <h1 className="text-[#F0F8FF] font-bold text-2xl tracking-tight">¡Bienvenido de vuelta, paisano!</h1>
              <p className="text-[#F0F8FF]/70 text-sm mt-1">Tu paisanaje te está esperando</p>
            </div>
          </div>
        </div>

        <div className="bg-[#111827]/30 backdrop-blur-sm rounded-b-2xl border-x border-b border-[#111827]/40 border-t-0 px-4 md:px-8 pt-4 pb-5">

          {serverError && (
            <div className="flex items-center gap-3 mb-5 px-4 py-3 rounded-xl bg-red-500/20 border border-red-400/30">
              <i className="bi bi-exclamation-triangle-fill text-red-300 text-lg shrink-0"></i>
              <p className="text-red-200 text-sm">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">

            <div className="flex flex-col gap-1">
              <label className="text-[#F0F8FF]/70 text-xs font-medium uppercase tracking-wide">Email o nombre de usuario</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-3 flex items-center text-[#F0F8FF]/40 pointer-events-none transition group-focus-within:text-[#F0F8FF]/80">
                  <i className="bi bi-person-fill text-sm"></i>
                </span>
                <input
                  type="text"
                  placeholder="Email o nombre de usuario"
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border bg-[#111827]/50 text-[#F0F8FF] placeholder-[#F0F8FF]/25 outline-none transition duration-200
                    focus:bg-[#111827]/60 focus:border-[#74ACDF]/60 focus:ring-2 focus:ring-[#74ACDF]/20
                    ${errors.identifier ? 'border-red-400/60 bg-red-900/30' : 'border-[#111827]/60'}`}
                  {...register('identifier', { required: 'Obligatorio' })}
                />
              </div>
              {errors.identifier && (
                <span className="text-red-300 text-xs flex items-center gap-1">
                  <i className="bi bi-exclamation-circle text-xs"></i>
                  {errors.identifier.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#F0F8FF]/70 text-xs font-medium uppercase tracking-wide">Contraseña</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-3 flex items-center text-[#F0F8FF]/40 pointer-events-none transition group-focus-within:text-[#F0F8FF]/80">
                  <i className="bi bi-shield-lock-fill text-sm"></i>
                </span>
                <input
                  type="password"
                  placeholder="Contraseña"
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border bg-[#111827]/50 text-[#F0F8FF] placeholder-[#F0F8FF]/25 outline-none transition duration-200
                    focus:bg-[#111827]/60 focus:border-[#74ACDF]/60 focus:ring-2 focus:ring-[#74ACDF]/20
                    ${errors.password ? 'border-red-400/60 bg-red-900/30' : 'border-[#111827]/60'}`}
                  {...register('password', { required: 'La contraseña es obligatoria' })}
                />
              </div>
              {errors.password && (
                <span className="text-red-300 text-xs flex items-center gap-1">
                  <i className="bi bi-exclamation-circle text-xs"></i>
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading.login}
              className="w-full py-2.5 rounded-xl font-semibold transition-all duration-300
                bg-[#F0F8FF] text-[#1D6FA4]
                hover:bg-[#F0F8FF]/90 hover:shadow-[0_0_24px_rgba(240,248,255,0.2)] hover:scale-[1.01]
                active:scale-[0.98] cursor-pointer group
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading.login ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="bi bi-arrow-repeat text-base animate-spin"></i>
                  Iniciando sesión...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <i className="bi bi-box-arrow-in-right text-base transition group-hover:scale-110"></i>
                  Iniciar sesión
                </span>
              )}
            </button>

          </form>

          <div className="flex items-center gap-3 my-3">
            <div className="flex-1 h-px bg-[#111827]/40" />
            <span className="text-[#F0F8FF]/30 text-xs">o</span>
            <div className="flex-1 h-px bg-[#111827]/40" />
          </div>

          <p className="text-center text-[#F0F8FF]/50 text-sm">
            ¿No tenés cuenta?{' '}
            <a
              href="/registro"
              className="text-[#F0F8FF]/80 cursor-pointer font-medium transition hover:text-[#F0F8FF] hover:underline underline-offset-2"
            >
              Registrate
            </a>
          </p>

        </div>
      </div>
    </section>
  )
}

export default Login
