import { Component } from 'react'

class Loading extends Component {
  static defaultProps = {
    mensagem: 'Carregando...'
  }

  render() {
    return (
      <div className="flex flex-column align-items-center gap-2 p-3">
        <i
          className="pi pi-spin pi-spinner"
          style={{ fontSize: '2rem' }}
        ></i>

        <p>{this.props.mensagem}</p>
      </div>
    )
  }
}

export default Loading