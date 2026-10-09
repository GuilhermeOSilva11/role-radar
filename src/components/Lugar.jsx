import Cartao from './Cartao.jsx'

function formatarDistancia(distancia) {
  return `a ${distancia} m`
}

function Lugar({ numero, nome, endereco, distancia }) {
  const estiloNumero = {
    backgroundColor: '#1565c0',
    color: '#fff',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  return (
    <Cartao cabecalho={formatarDistancia(distancia)}>
      <div className="flex align-items-start gap-3">
        <div style={estiloNumero}>
          {numero}
        </div>

        <div>
          <strong>{nome ? nome : 'Sem nome'}</strong>
          <p>{endereco}</p>
        </div>
      </div>
    </Cartao>
  )
}

export default Lugar