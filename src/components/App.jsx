function App() {
  const estiloSubtitulo = {
    color: '#666',
    fontSize: '18px'
  }

  function obterAno() {
    return new Date().getFullYear()
  }

  return (
    <div>
      <h1 className="titulo">RolêRadar</h1>

      <p style={estiloSubtitulo}>
        Descubra o que existe perto de você
      </p>

      <footer>RolêRadar © {obterAno()}</footer>
    </div>
  )
}

export default App