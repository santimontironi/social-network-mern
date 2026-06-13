import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/authContextHook'
import type { RegisterUserData } from '../types/auth.types'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const navigate = useNavigate()

  const { registerUser, loading, user } = useAuth()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterUserData>()

  const [serverError, setServerError] = useState<string | null>(null)
  const [messageRegister, setMessageRegister] = useState<string | null>(null)

  const onSubmit = async (data: RegisterUserData) => {
    setServerError(null)
    setMessageRegister(null)
    try {
      const formData = new FormData()
      formData.append('username', data.username)
      formData.append('email', data.email)
      formData.append('password', data.password)
      formData.append('name', data.name)
      formData.append('surname', data.surname)
      formData.append('birthDay', String(data.birthDay))
      formData.append('birthMonth', String(data.birthMonth))
      formData.append('birthYear', String(data.birthYear))

      if (data.photo && data.photo.length > 0) {
        formData.append('photo', data.photo[0])
      }

      if (data.bio) {
        formData.append('bio', data.bio)
      }

      const res = await registerUser(formData)
      setMessageRegister(res.message)

      reset()
    } catch (error: any) {
      setServerError(error.response?.data?.message || 'Error al registrar el usuario')
      reset()
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/inicio')
    }
  }, [user])

  return (
    <section className="min-h-screen overflow-y-auto flex items-start justify-center bg-[#1D6FA4] px-4 pt-28 pb-10 md:pt-24 md:pb-12 xl:pb-0">

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
          src="/images/pava-mate.png" alt=""
          className="absolute invert mix-blend-screen
                     top-[6%] left-[1%] w-14 opacity-[0.18] -rotate-12
                     md:top-[18%] md:left-[3%] md:w-32 md:opacity-[0.38] xl:left-[10%]"
        />

        <img
          src="/images/gaucho.png" alt=""
          className="absolute invert mix-blend-screen
                     top-[5%] right-[1%] w-16 opacity-[0.18] rotate-[8deg]
                     md:top-[20%] md:right-[4%] md:w-40 md:opacity-[0.38] xl:right-[10%]"
        />

        <img
          src="/images/hornero.png" alt=""
          className="absolute invert mix-blend-screen
                     bottom-[7%] left-[1%] w-14 opacity-[0.15] rotate-[-8deg]
                     md:bottom-[12%] md:left-[4%] md:w-38 md:opacity-[0.38] xl:left-[10%]"
        />

      </div>

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-125 h-125 rounded-full border border-[#F0F8FF]/5" />
        <div className="absolute -bottom-40 -right-40 w-150 h-150 rounded-full border border-[#F0F8FF]/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full bg-[#74ACDF]/10 blur-[80px]" />
      </div>

      <div className="relative w-full max-w-lg shadow-[0_16px_64px_rgba(17,24,39,0.6)] mb-8 sm:mb-16 rounded-2xl overflow-hidden animate-auth-card">

        <div className="relative overflow-hidden rounded-t-2xl bg-[#74ACDF]/30 border-x border-t border-[#111827]/40 border-b-0 px-4 md:px-8 pt-5 pb-6 backdrop-blur-sm">
          <div className="pointer-events-none absolute -top-6 -right-6 w-36 h-36 rounded-full border-2 border-[#111827]/20" />
          <div className="pointer-events-none absolute -top-10 -right-10 w-52 h-52 rounded-full border border-[#111827]/10" />
          <div className="pointer-events-none absolute bottom-0 -left-8 w-28 h-28 rounded-full border border-[#111827]/15" />

          <div className="relative flex flex-col items-center gap-2">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-[#F0F8FF] backdrop-blur-sm border border-[#111827]/60 shadow-[0_4px_20px_rgba(17,24,39,0.5)]">
              <img src="/images/logo.png" alt="Argentex" className="w-14 object-contain" />
            </div>
            <div className="text-center">
              <h1 className="text-[#F0F8FF] font-bold text-2xl tracking-tight">¡Sumáte al paisanaje!</h1>
              <p className="text-[#F0F8FF]/70 text-sm mt-1">Registrate y conectá con tus paisanos</p>
            </div>
          </div>
        </div>

        <div className="bg-[#111827]/30 backdrop-blur-sm rounded-b-2xl border-x border-b border-[#111827]/40 border-t-0 px-4 md:px-8 pt-4 pb-5">

          {messageRegister && (
            <div className="flex items-center gap-3 mb-5 px-4 py-3 rounded-xl bg-[#F0F8FF]/15 border border-[#F0F8FF]/25">
              <i className="bi bi-check-circle-fill text-[#F0F8FF] text-lg shrink-0"></i>
              <p className="text-[#F0F8FF] text-sm">{messageRegister}</p>
            </div>
          )}

          {serverError && (
            <div className="flex items-center gap-3 mb-5 px-4 py-3 rounded-xl bg-red-500/20 border border-red-400/30">
              <i className="bi bi-exclamation-triangle-fill text-red-300 text-lg shrink-0"></i>
              <p className="text-red-200 text-sm">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">

            <div className="flex flex-col gap-1">
              <label className="text-[#F0F8FF]/70 text-xs font-medium uppercase tracking-wide">Foto de perfil</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-3 flex items-center text-[#F0F8FF]/40 pointer-events-none transition group-focus-within:text-[#F0F8FF]/80">
                  <i className="bi bi-image-fill text-sm"></i>
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border bg-[#111827]/50 text-[#F0F8FF]/70 text-sm outline-none transition duration-200 cursor-pointer
                    file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[#74ACDF]/30 file:text-[#F0F8FF] file:text-xs file:font-medium file:cursor-pointer
                    focus:bg-[#111827]/60 focus:border-[#74ACDF]/60 focus:ring-2 focus:ring-[#74ACDF]/20
                    ${errors.photo ? 'border-red-400/60 bg-red-900/30' : 'border-[#111827]/60'}`}
                  {...register('photo', { required: 'La foto de perfil es obligatoria' })}
                />
              </div>
              {errors.photo && <span className="text-red-300 text-xs flex items-center gap-1"><i className="bi bi-exclamation-circle text-xs"></i>{errors.photo.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#F0F8FF]/70 text-xs font-medium uppercase tracking-wide">Biografía (opcional)</label>
              <div className="relative group">
                <span className="absolute top-2.5 left-3 flex items-center text-[#F0F8FF]/40 pointer-events-none transition group-focus-within:text-[#F0F8FF]/80">
                  <i className="bi bi-card-text text-sm"></i>
                </span>
                <textarea
                  placeholder="Contanos algo sobre vos..."
                  rows={2}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border bg-[#111827]/50 text-[#F0F8FF] placeholder-[#F0F8FF]/25 outline-none transition duration-200 resize-none
                    focus:bg-[#111827]/60 focus:border-[#74ACDF]/60 focus:ring-2 focus:ring-[#74ACDF]/20
                    border-[#111827]/60"
                  {...register('bio')}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">

              <div className="flex flex-col gap-1">
                <label className="text-[#F0F8FF]/70 text-xs font-medium uppercase tracking-wide">Nombre</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-3 flex items-center text-[#F0F8FF]/40 pointer-events-none transition group-focus-within:text-[#F0F8FF]/80">
                    <i className="bi bi-person-fill text-sm"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Nombre"
                    className={`w-full pl-8 pr-3 py-2.5 rounded-xl border bg-[#111827]/50 text-[#F0F8FF] placeholder-[#F0F8FF]/25 outline-none transition duration-200
                      focus:bg-[#111827]/60 focus:border-[#74ACDF]/60 focus:ring-2 focus:ring-[#74ACDF]/20
                      ${errors.name ? 'border-red-400/60 bg-red-900/30' : 'border-[#111827]/60'}`}
                    {...register('name', { required: 'Obligatorio' })}
                  />
                </div>
                {errors.name && <span className="text-red-300 text-xs flex items-center gap-1"><i className="bi bi-exclamation-circle text-xs"></i>{errors.name.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[#F0F8FF]/70 text-xs font-medium uppercase tracking-wide">Apellido</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-3 flex items-center text-[#F0F8FF]/40 pointer-events-none transition group-focus-within:text-[#F0F8FF]/80">
                    <i className="bi bi-person-fill text-sm"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Apellido"
                    className={`w-full pl-8 pr-3 py-2.5 rounded-xl border bg-[#111827]/50 text-[#F0F8FF] placeholder-[#F0F8FF]/25 outline-none transition duration-200
                      focus:bg-[#111827]/60 focus:border-[#74ACDF]/60 focus:ring-2 focus:ring-[#74ACDF]/20
                      ${errors.surname ? 'border-red-400/60 bg-red-900/30' : 'border-[#111827]/60 '}`}
                    {...register('surname', { required: 'Obligatorio' })}
                  />
                </div>
                {errors.surname && <span className="text-red-300 text-xs flex items-center gap-1"><i className="bi bi-exclamation-circle text-xs"></i>{errors.surname.message}</span>}
              </div>

            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#F0F8FF]/70 text-xs font-medium uppercase tracking-wide">Nombre de usuario</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-3 flex items-center text-[#F0F8FF]/40 pointer-events-none transition group-focus-within:text-[#F0F8FF]/80">
                  <i className="bi bi-at text-base"></i>
                </span>
                <input
                  type="text"
                  placeholder="@tu_usuario"
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border bg-[#111827]/50 text-[#F0F8FF] placeholder-[#F0F8FF]/25 outline-none transition duration-200
                    focus:bg-[#111827]/60 focus:border-[#74ACDF]/60 focus:ring-2 focus:ring-[#74ACDF]/20
                    ${errors.username ? 'border-red-400/60 bg-red-900/30' : 'border-[#111827]/60 '}`}
                  {...register('username', { required: 'El nombre de usuario es obligatorio' })}
                />
              </div>
              {errors.username && <span className="text-red-300 text-xs flex items-center gap-1"><i className="bi bi-exclamation-circle text-xs"></i>{errors.username.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#F0F8FF]/70 text-xs font-medium uppercase tracking-wide">Email</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-3 flex items-center text-[#F0F8FF]/40 pointer-events-none transition group-focus-within:text-[#F0F8FF]/80">
                  <i className="bi bi-envelope-fill text-sm"></i>
                </span>
                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border bg-[#111827]/50 text-[#F0F8FF] placeholder-[#F0F8FF]/25 outline-none transition duration-200
                    focus:bg-[#111827]/60 focus:border-[#74ACDF]/60 focus:ring-2 focus:ring-[#74ACDF]/20
                    ${errors.email ? 'border-red-400/60 bg-red-900/30' : 'border-[#111827]/60 '}`}
                  {...register('email', {
                    required: 'El email es obligatorio',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Ingresá un email válido' },
                  })}
                />
              </div>
              {errors.email && <span className="text-red-300 text-xs flex items-center gap-1"><i className="bi bi-exclamation-circle text-xs"></i>{errors.email.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#F0F8FF]/70 text-xs font-medium uppercase tracking-wide">Contraseña</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-3 flex items-center text-[#F0F8FF]/40 pointer-events-none transition group-focus-within:text-[#F0F8FF]/80">
                  <i className="bi bi-shield-lock-fill text-sm"></i>
                </span>
                <input
                  type="password"
                  placeholder="**********"
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border bg-[#111827]/50 text-[#F0F8FF] placeholder-[#F0F8FF]/25 outline-none transition duration-200
                    focus:bg-[#111827]/60 focus:border-[#74ACDF]/60 focus:ring-2 focus:ring-[#74ACDF]/20
                    ${errors.password ? 'border-red-400/60 bg-red-900/30' : 'border-[#111827]/60 '}`}
                  {...register('password', {
                    required: 'La contraseña es obligatoria'
                  })}
                />
              </div>
              {errors.password && <span className="text-red-300 text-xs flex items-center gap-1"><i className="bi bi-exclamation-circle text-xs"></i>{errors.password.message}</span>}
            </div>

            <div className="grid grid-cols-3 gap-3">

              <div className="flex flex-col gap-1">
                <label className="text-[#F0F8FF]/70 text-xs font-medium uppercase tracking-wide">Día</label>
                <input
                  type="number"
                  placeholder="01"
                  min={1}
                  max={31}
                  className={`w-full px-3 py-2.5 rounded-xl border bg-[#111827]/50 text-[#F0F8FF] placeholder-[#F0F8FF]/25 outline-none transition duration-200 text-center
                    focus:bg-[#111827]/60 focus:border-[#74ACDF]/60 focus:ring-2 focus:ring-[#74ACDF]/20
                    ${errors.birthDay ? 'border-red-400/60 bg-red-900/30' : 'border-[#111827]/60 '}`}
                  {...register('birthDay', { required: 'Obligatorio', min: { value: 1, message: 'Mín. 1' }, max: { value: 31, message: 'Máx. 31' }, valueAsNumber: true })}
                />
                {errors.birthDay && <span className="text-red-300 text-xs flex items-center gap-1"><i className="bi bi-exclamation-circle text-xs"></i>{errors.birthDay.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[#F0F8FF]/70 text-xs font-medium uppercase tracking-wide">Mes</label>
                <input
                  type="number"
                  placeholder="01"
                  min={1}
                  max={12}
                  className={`w-full px-3 py-2.5 rounded-xl border bg-[#111827]/50 text-[#F0F8FF] placeholder-[#F0F8FF]/25 outline-none transition duration-200 text-center
                    focus:bg-[#111827]/60 focus:border-[#74ACDF]/60 focus:ring-2 focus:ring-[#74ACDF]/20
                    ${errors.birthMonth ? 'border-red-400/60 bg-red-900/30' : 'border-[#111827]/60 '}`}
                  {...register('birthMonth', { required: 'Obligatorio', min: { value: 1, message: 'Mín. 1' }, max: { value: 12, message: 'Máx. 12' }, valueAsNumber: true })}
                />
                {errors.birthMonth && <span className="text-red-300 text-xs flex items-center gap-1"><i className="bi bi-exclamation-circle text-xs"></i>{errors.birthMonth.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[#F0F8FF]/70 text-xs font-medium uppercase tracking-wide">Año</label>
                <input
                  type="number"
                  placeholder="2000"
                  min={1900}
                  max={2025}
                  className={`w-full px-3 py-2.5 rounded-xl border bg-[#111827]/50 text-[#F0F8FF] placeholder-[#F0F8FF]/25 outline-none transition duration-200 text-center
                    focus:bg-[#111827]/60 focus:border-[#74ACDF]/60 focus:ring-2 focus:ring-[#74ACDF]/20
                    ${errors.birthYear ? 'border-red-400/60 bg-red-900/30' : 'border-[#111827]/60 '}`}
                  {...register('birthYear', { required: 'Obligatorio', min: { value: 1900, message: 'Mín. 1900' }, max: { value: 2025, message: 'Máx. 2025' }, valueAsNumber: true })}
                />
                {errors.birthYear && <span className="text-red-300 text-xs flex items-center gap-1"><i className="bi bi-exclamation-circle text-xs"></i>{errors.birthYear.message}</span>}
              </div>

            </div>

            <button
              type="submit"
              disabled={loading.register}
              className="w-full py-2.5 rounded-xl font-semibold transition-all duration-300
                bg-[#F0F8FF] text-[#1D6FA4]
                hover:bg-[#F0F8FF]/90 hover:shadow-[0_0_24px_rgba(240,248,255,0.2)] hover:scale-[1.01]
                active:scale-[0.98] cursor-pointer group
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading.register ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="bi bi-arrow-repeat text-base animate-spin"></i>
                  Registrando...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <i className="bi bi-person-check-fill text-base transition group-hover:scale-110"></i>
                  Crear mi cuenta
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
            ¿Ya tenés cuenta?{' '}
            <a
              href="/"
              className="text-[#F0F8FF]/80 cursor-pointer font-medium transition hover:text-[#F0F8FF] hover:underline underline-offset-2"
            >
              Iniciá sesión
            </a>
          </p>

        </div>
      </div>
    </section>
  )
}

export default Register
