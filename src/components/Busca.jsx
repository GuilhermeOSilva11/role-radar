import { Component } from 'react'
import { Button } from '@primereact/ui/button'
import { InputText } from '@primereact/ui/inputtext'

const categorias = [
  { rotulo: 'Cafés', chave: 'catering.cafe' },
  { rotulo: 'Restaurantes', chave: 'catering.restaurant' },
  { rotulo: 'Parques', chave: 'leisure.park' },
  { rotulo: 'Farmácias', chave: 'healthcare.pharmacy' },
  { rotulo: 'Supermercados', chave: 'commercial.supermarket' },
  { rotulo: 'Museus', chave: 'entertainment.museum' }
]

class Busca extends Component {
  static defaultProps = {
    dica: 'Raio em metros (100 a 5000)'
  }

  state = {
    categoria: null,
    raio: '1000',
    erro: null
  }

  onRaioAlterado = (evento) => {
    this.setState({
      raio: evento.target.value
    })
  }

  onFormSubmit = (evento) => {
    evento.preventDefault()

    if (this.state.categoria === null) {
      this.setState({
        erro: 'Escolha uma categoria.'
      })

      return
    }

    const raio = Number(this.state.raio)

    if (!Number.isInteger(raio) || raio < 100 || raio > 5000) {
      this.setState({
        erro: 'Informe um raio inteiro entre 100 e 5000 metros.'
      })

      return
    }

    this.setState({
      erro: null
    })

    this.props.onBuscaRealizada(this.state.categoria, raio)
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="flex flex-wrap gap-2 mb-3">
          {categorias.map((categoria) => (
            <Button
              key={categoria.chave}
              type="button"
              variant={
                this.state.categoria === categoria.chave
                  ? 'filled'
                  : 'outlined'
              }
              onClick={() => {
                this.setState({
                  categoria: categoria.chave
                })
              }}
            >
              {categoria.rotulo}
            </Button>
          ))}
        </div>

        <InputText
          className="w-full mb-3"
          placeholder={this.props.dica}
          value={this.state.raio}
          onChange={this.onRaioAlterado}
        />

        <Button type="submit">
          <i className="pi pi-search"></i>
          Buscar
        </Button>

        {this.state.erro !== null ? (
          <p style={{ color: 'red' }}>
            {this.state.erro}
          </p>
        ) : null}
      </form>
    )
  }
}

export default Busca