export type sectionsType = 'inicio' | 'notificaciones' | 'paisanaje' | 'nueva-publicacion' | 'perfil'

export type SidebarProps = {
  activeSection: sectionsType
  setActiveSection: (section: sectionsType) => void
}