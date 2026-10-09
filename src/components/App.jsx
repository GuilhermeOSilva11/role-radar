import { Component } from 'react'
import Creditos from './Creditos.jsx'
import Loading from './Loading.jsx'
import Cartao from './Cartao.jsx'
import MeuPonto from './MeuPonto.jsx'
import geoapifyClient from '../utils/geoapifyClient.js'
import Busca from './Busca.jsx'
import ListaLugares from './ListaLugares.jsx'
import MapaRadar from './MapaRadar.jsx'

class App extends Component {
  state = {
    latitude: null,
    longitude: null,
    horarioLocalizacao: null,
    mensagemDeErro: null,
    lugares: null,
    buscando: false,
    erroBusca: null,
    raioBuscado: null
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
    this.setState({
      buscando: true,
      erroBusca: null,
      raioBuscado: raio
    })

    geoapifyClient.get('/places', {
      params: {
        categories: categoria,
        filter: `circle:${this.state.longitude},${this.state.latitude},${raio}`,
        bias: `proximity:${this.state.longitude},${this.state.latitude}`,
        limit: 20
      }
    }).then((resultado) => {
      this.setState({
        lugares: resultado.data.features,
        buscando: false
      })
    }).catch((erro) => {
      console.error(erro)

      this.setState({
        buscando: false,
        erroBusca: 'Não foi possível consultar os lugares. Tente novamente.'
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
              {this.state.buscando ? (
                <Loading mensagem="Procurando lugares..." />
              ) : this.state.erroBusca !== null ? (
                <p>{this.state.erroBusca}</p>
              ) : this.state.lugares === null ? null : (
                this.state.lugares.length === 0 ? (
                  <p>
                    Nenhum lugar encontrado. Tente aumentar o raio.
                  </p>
                ) : (
                  <div>
                    <p>
                      <strong>
                        {this.state.lugares.length}{' '}
                        {this.state.lugares.length === 1
                          ? 'lugar encontrado'
                          : 'lugares encontrados'}
                        {' '}em até {this.state.raioBuscado} m
                      </strong>
                    </p>

                    <Cartao cabecalho="Radar">
                      <MapaRadar
                        latitude={this.state.latitude}
                        longitude={this.state.longitude}
                        lugares={this.state.lugares}
                      />
                    </Cartao>

                    <ListaLugares lugares={this.state.lugares} />
                  </div>
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