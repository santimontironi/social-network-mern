import Sidebar from '../components/Sidebar'

const Home = () => {
  return (
    <div className="flex h-screen bg-[#1D6FA4]/10">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
      </main>
    </div>
  )
}

export default Home
