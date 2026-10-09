import { Component } from 'react'
import Creditos from './Creditos.jsx'
import Loading from './Loading.jsx'
import Cartao from './Cartao.jsx'
import MeuPonto from './MeuPonto.jsx'
import geoapifyClient from '../utils/geoapifyClient.js'
import Busca from './Busca.jsx'
import ListaLugares from './ListaLugares.jsx'

class App extends Component {
  state = {
    latitude: null,
    longitude: null,
    horarioLocalizacao: null,
    mensagemDeErro: null,
    lugares: null
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

  onBuscaRealizada = (categoria, raio) => {
    geoapifyClient.get('/places', {
      params: {
        categories: categoria,
        filter: `circle:${this.state.longitude},${this.state.latitude},${raio}`,
        bias: `proximity:${this.state.longitude},${this.state.latitude}`,
        limit: 20
      }
    }).then((resultado) => {
      this.setState({
        lugares: resultado.data.features
      })
    })
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

          <div className="grid">
            <div className="col-12 md:col-6">
              <Cartao cabecalho="Você está aqui">
                <MeuPonto
                  latitude={this.state.latitude}
                  longitude={this.state.longitude}
                  horarioLocalizacao={this.state.horarioLocalizacao}
                  onAtualizar={this.obterLocalizacao}
                />
              </Cartao>

              <Cartao cabecalho="O que você procura?">
                <Busca
                  onBuscaRealizada={this.onBuscaRealizada}
                />
              </Cartao>
            </div>

            <div className="col-12 md:col-6">
              {this.state.lugares === null ? null : (
                this.state.lugares.length === 0 ? (
                  <p>
                    Nenhum lugar encontrado. Tente aumentar o raio.
                  </p>
                ) : (
                  <ListaLugares lugares={this.state.lugares} />
                )
              )}
            </div>
          </div>
          
        )}

        <footer>RolêRadar © {this.obterAno()}</footer>
      </div>
    )
  }
}

export default App