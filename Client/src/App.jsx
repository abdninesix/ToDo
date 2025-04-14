import Tasks from "./components/Tasks"
import { ThemeProvider } from "./components/ThemeContext.jsx"

function App() {

  return (
    <>
      <ThemeProvider>
        <Tasks/>
      </ThemeProvider>
    </>
  )
}

export default App
