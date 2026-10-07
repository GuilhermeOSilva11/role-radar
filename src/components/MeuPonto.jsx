import { Component } from 'react'
import { Button } from '@primereact/ui/button'
import { GEOAPIFY_KEY } from '../utils/chaves.js'

class MeuPonto extends Component {
  state = {
    agora: Date.now()
  }

  timer = null

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        agora: Date.now()
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    console.log('MeuPonto removido')
  }

  render() {
    const latitude = this.props.latitude
    const longitude = this.props.longitude
    const horarioLocalizacao = this.props.horarioLocalizacao
    const onAtualizar = this.props.onAtualizar

    const urlMapa = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=300&center=lonlat:${longitude},${latitude}&zoom=16&marker=lonlat:${longitude},${latitude};color:%23d32f2f;size:48&apiKey=${GEOAPIFY_KEY}`

    const segundos =
      (this.state.agora - horarioLocalizacao) / 1000

    return (
      <div>
        <img
          src={urlMapa}
          alt="Mapa da sua localização"
          className="w-full"
        />

        <p>
          Latitude: {latitude} | Longitude: {longitude}
        </p>

        <p>
          {latitude < 0 ? 'Hemisfério Sul' : 'Hemisfério Norte'}
        </p>

        <p>Localização obtida há {segundos} s</p>

        <Button type="button" onClick={onAtualizar}>
          <i className="pi pi-refresh"></i>
          Atualizar localização
        </Button>
      </div>
    )
  }
}

export default MeuPonto