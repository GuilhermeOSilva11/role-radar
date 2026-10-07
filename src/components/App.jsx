import { Component } from 'react'
import Creditos from './Creditos.jsx'
import Loading from './Loading.jsx'

class App extends Component {
  state = {
    latitude: null,
    longitude: null,
    horarioLocalizacao: null,
    mensagemDeErro: null
  }

  obterLocalizacao = () => {
    navigator.geolocation.getCurrentPosition(
      (posicao) => {
        this.setState({
          latitude: posicao.coords.latitude,
          longitude: posicao.coords.longitude,
          horarioLocalizacao: Date.now(),
          mensagemDeErro: null
        })
      },
      (erro) => {
        console.error(erro)

        this.setState({
          mensagemDeErro:
            'Não foi possível obter sua localização. Libere o acesso no navegador e atualize a página.'
        })
      }
    )
  }

  componentDidMount() {
    this.obterLocalizacao()
  }

  obterAno() {
    return new Date().getFullYear()
  }

  render() {
    const estiloSubtitulo = {
      color: '#666',
      fontSize: '18px'
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

        {this.state.mensagemDeErro !== null ? (
          <p>{this.state.mensagemDeErro}</p>
        ) : this.state.latitude === null ? (
          <Loading mensagem="Aguardando permissão de localização..." />
        ) : (
          <p>
            Localização obtida: {this.state.latitude},{' '}
            {this.state.longitude}
          </p>
        )}

        <footer>RolêRadar © {this.obterAno()}</footer>
      </div>
    )
  }
}

export default App