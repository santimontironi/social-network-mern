import Sidebar from '../components/Sidebar'
import type { sectionsType } from '../types/props.types'
import { useState } from 'react'
import AddPost  from './AddPost'
import MyProfile from './MyProfile'

const Home = () => {

  const [activeSection, setActiveSection] = useState<sectionsType>('inicio')

  return (
    <div className="flex h-screen bg-[#1D6FA4]/10">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 overflow-y-auto">
        {activeSection === 'inicio' && <div className="p-6">Inicio</div>}
        {activeSection === 'paisanaje' && <div className="p-6">Mi paisanaje</div>}
        {activeSection === 'notificaciones' && <div className="p-6">Notificaciones</div>}
        {activeSection === 'nueva-publicacion' && <AddPost />}
        {activeSection === 'perfil' && <MyProfile />}
      </main>
    </div>
  )
}

export default Home
