import Container from "./Components/Container"

const Pattern = () => {
  return (
    <div 
      className="absolute w-full h-screen inset-x-0 z-0 rounded-lg m-auto bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1%,transparent_0%,transparent_50%)] bg-size-[10px_10px] bg-fixed pointer-events-none">
    </div>
  )
}

function App() {  

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center absolute
      [--pattern-fg:var(--color-neutral-900)]/25">
      <Pattern />
      <Container className="-mt-30 z-10" />
    </div>
  )
}

export default App