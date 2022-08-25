import React from 'react'

const SECURITY_CODE = 'paradigma'

class ClassState extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            loading: false,
            value: '',
        }
    }

    // componentDidMount() {
    //     console.log('componentDidMount')
    // }

    // componentWillUnmount() {
    //     console.log('componentWillUnmount')
    // }

    // UNSAFE_componentWillMount() {
    //     console.log('componentWillMount')
    // }

    componentDidUpdate() {
        console.log('Actualization')
        if (this.state.loading) {
            setTimeout(() => {
                console.log('Haciendo Validación')
                if (SECURITY_CODE === this.state.value) {
                    this.setState({ loading: false, error: false })
                } else {
                    this.setState({ loading: false, error: true })
                }

                console.log('Terminando Validación')
            }, 3000)
        }
    }

    render() {
        return (
            <div>
                <h2>Eliminar ClassState</h2>
                <p>Por favor, escribe el codigo de serguridad</p>

                {this.state.error && !this.state.loading && (
                    <p>Error: en el codigo</p>
                )}
                {this.state.loading && <p>Cargando....</p>}

                <input
                    value={this.state.value}
                    onChange={(event) => {
                        this.setState({ value: event.target.value })
                    }}
                    placeholder="Código de seguridad"
                ></input>
                <button onClick={() => this.setState({ loading: true })}>
                    Comprobar
                </button>
            </div>
        )
    }
}

export { ClassState }
