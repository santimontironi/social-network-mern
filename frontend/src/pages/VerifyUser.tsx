import { useEffect, useState } from "react"
import { useAuth } from "../hooks/authContextHook"
import { useParams } from "react-router-dom"

const VerifyUser = () => {

    const { token } = useParams()

    const { verifyEmail } = useAuth()

    const [error, setError] = useState<string | null>(null)

    const [success, setSuccess] = useState<string | null>(null)
    
    useEffect(() => {
        try{
            verifyEmail(token as string)
            setSuccess('Email verificado correctamente')
        }
        catch(error){
            setError('Error al verificar el email')
        }
    }, [token])

    return (
        <section className="min-h-screen overflow-y-auto flex items-center justify-center bg-[#1D6FA4] px-4 py-6">

            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-32 -left-32 w-125 h-125 rounded-full border border-[#F0F8FF]/5" />
                <div className="absolute -bottom-40 -right-40 w-150 h-150 rounded-full border border-[#F0F8FF]/5" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full bg-[#74ACDF]/10 blur-[80px]" />
            </div>

            <div className="relative w-full max-w-lg shadow-[0_16px_64px_rgba(17,24,39,0.6)] rounded-2xl overflow-hidden">

                <div className="relative overflow-hidden rounded-t-2xl bg-[#74ACDF]/30 border-x border-t border-[#111827]/40 border-b-0 px-8 pt-5 pb-6 backdrop-blur-sm">
                    <div className="pointer-events-none absolute -top-6 -right-6 w-36 h-36 rounded-full border-2 border-[#111827]/20" />
                    <div className="pointer-events-none absolute -top-10 -right-10 w-52 h-52 rounded-full border border-[#111827]/10" />
                    <div className="pointer-events-none absolute bottom-0 -left-8 w-28 h-28 rounded-full border border-[#111827]/15" />

                    <div className="relative flex flex-col items-center gap-2">
                        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F0F8FF] border border-[#111827]/60 shadow-[0_4px_20px_rgba(17,24,39,0.5)]">
                            <img src="/images/logo.png" alt="Argentex" className="w-100 object-contain" />
                        </div>
                        <div className="text-center">
                            <h1 className="text-[#F0F8FF] font-bold text-2xl tracking-tight">Verificación de cuenta</h1>
                            <p className="text-[#F0F8FF]/70 text-sm mt-1">Confirmá tu dirección de email</p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#111827]/30 backdrop-blur-sm rounded-b-2xl border-x border-b border-[#111827]/40 border-t-0 px-8 pt-6 pb-7">

                    {!success && !error && (
                        <div className="flex flex-col items-center gap-4 py-4">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#74ACDF]/20 border border-[#F0F8FF]/15">
                                <i className="bi bi-arrow-repeat text-[#F0F8FF] text-2xl animate-spin"></i>
                            </div>
                            <div className="text-center">
                                <p className="text-[#F0F8FF] font-semibold">Verificando tu cuenta...</p>
                                <p className="text-[#F0F8FF]/50 text-sm mt-1">Esto tomará solo un momento</p>
                            </div>
                        </div>
                    )}

                    {success && (
                        <div className="flex flex-col items-center gap-5 py-4">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#F0F8FF]/15 border border-[#F0F8FF]/25">
                                <i className="bi bi-check-circle-fill text-[#F0F8FF] text-3xl"></i>
                            </div>
                            <div className="text-center">
                                <p className="text-[#F0F8FF] font-bold text-xl">¡Email confirmado!</p>
                                <p className="text-[#F0F8FF]/60 text-sm mt-1">{success}</p>
                            </div>
                            <a
                                href="/login"
                                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl
                                    bg-[#F0F8FF] text-[#1D6FA4] font-semibold
                                    hover:bg-[#F0F8FF]/90 hover:shadow-[0_0_24px_rgba(240,248,255,0.2)]
                                    active:scale-[0.98] transition-all duration-300"
                            >
                                <i className="bi bi-box-arrow-in-right text-base"></i>
                                Ir al inicio de sesión
                            </a>
                        </div>
                    )}

                    {error && (
                        <div className="flex flex-col items-center gap-5 py-4">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#111827]/40 border border-[#111827]/60">
                                <i className="bi bi-exclamation-triangle-fill text-[#F0F8FF]/70 text-3xl"></i>
                            </div>
                            <div className="text-center">
                                <p className="text-[#F0F8FF] font-bold text-xl">Error al confirmar</p>
                                <p className="text-[#F0F8FF]/60 text-sm mt-1">{error}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <a
                                    href="/register"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                                        border border-[#F0F8FF]/30 text-[#F0F8FF]/80 font-medium
                                        hover:border-[#F0F8FF]/60 hover:text-[#F0F8FF]
                                        active:scale-[0.98] transition-all duration-300"
                                >
                                    <i className="bi bi-arrow-left text-sm"></i>
                                    Volver al registro
                                </a>
                                <a
                                    href="/"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                                        bg-[#F0F8FF]/15 border border-[#F0F8FF]/20 text-[#F0F8FF] font-medium
                                        hover:bg-[#F0F8FF]/25 hover:shadow-[0_0_16px_rgba(240,248,255,0.1)]
                                        active:scale-[0.98] transition-all duration-300"
                                >
                                    <i className="bi bi-house-fill text-sm"></i>
                                    Inicio de sesión
                                </a>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    )
}

export default VerifyUser