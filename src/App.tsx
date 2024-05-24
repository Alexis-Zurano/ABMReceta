import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import Admin from "./pages/Admin"
import ClientPage from "./pages/ClientPage"
import ClientProfile from "./pages/ClientProfile"
import ErrorPage from "./pages/ErrorPage"


function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/cliente" element={<ClientPage/>}/>
      <Route path="/cliente/perfil" element={<ClientProfile/>}/>
      <Route path="*" element={<ErrorPage/>}/>
    </Routes>
    
    <Footer/>
    </>

  )
}

export default App
