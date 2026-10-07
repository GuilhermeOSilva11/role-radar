function Cartao(props) {
  return (
    <div className="border-1 surface-border border-round-lg p-3 mb-3">
      <div className="cabecalho-cartao text-sm border-bottom-1 surface-border pb-2 mb-3">
        {props.cabecalho}
      </div>

      <div>
        {props.children}
      </div>
    </div>
  )
}

export default Cartao