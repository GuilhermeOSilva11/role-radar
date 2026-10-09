import Lugar from './Lugar.jsx'

function ListaLugares(props) {
  return (
    <div>
      {props.lugares.map((lugar, indice) => (
        <Lugar
          key={lugar.properties.place_id}
          numero={indice + 1}
          nome={lugar.properties.name}
          endereco={lugar.properties.address_line2}
          distancia={lugar.properties.distance}
        />
      ))}
    </div>
  )
}

export default ListaLugares