import Cartao from './Cartao.jsx'
import Creditos from './Creditos.jsx'

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
      <h1 className="titulo">
        <i className="pi pi-map-marker"></i> RolêRadar
      </h1>

      <p style={estiloSubtitulo}>
        Descubra o que existe perto de você
      </p>

      <Creditos />

      <Cartao cabecalho="Teste">
        <p>Conteúdo do cartão</p>
      </Cartao>

      <footer>RolêRadar © {obterAno()}</footer>
    </div>
  )
}

export default App