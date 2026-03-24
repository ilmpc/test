import { Outlet } from "@tanstack/react-router"
import { Toaster } from "sonner"

function App() {
  return (
    <>
      <Outlet />
      <Toaster position="top-right" richColors closeButton />
    </>
  )
}

export default App
