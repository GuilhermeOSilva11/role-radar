import { GEOAPIFY_KEY } from '../utils/chaves.js'

function MapaRadar(props) {
  const latitude = props.latitude
  const longitude = props.longitude
  const lugares = props.lugares

  const marcadorUsuario =
    `lonlat:${longitude},${latitude};color:%23d32f2f;size:48`

  const marcadoresLugares = lugares.map((lugar, indice) => {
    return `lonlat:${lugar.properties.lon},${lugar.properties.lat};type:circle;color:%231565c0;size:42;contentsize:28;text:${indice + 1}`
  }).join('|')

  const marcadores = `${marcadorUsuario}|${marcadoresLugares}`

  const urlMapa =
    `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&marker=${marcadores}&apiKey=${GEOAPIFY_KEY}`

  return (
    <img
      src={urlMapa}
      alt="Radar com os lugares encontrados"
      className="w-full"
    />
  )
}

export default MapaRadar