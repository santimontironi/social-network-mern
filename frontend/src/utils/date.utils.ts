export const formatJoinedDate = (date?: string) => {
    if (!date) return null

    return new Date(date).toLocaleDateString('es-AR', { year: 'numeric', month: 'long' })
}
