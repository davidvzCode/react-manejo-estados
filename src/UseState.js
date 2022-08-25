import React from 'react'

const SECURITY_CODE = 'paradigma'

function UseState() {
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    })
    // const [value, setValue] = React.useState('')
    // const [error, setError] = React.useState(false)
    // const [loading, setLoading] = React.useState(false)

    const onConfirmed = () => {
        setState({
            ...state,
            loading: false,
            error: false,
            confirmed: true,
        })
    }

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false,
            confirmed: false,
        })
    }

    const onWrite = (newValue) => {
        setState({
            ...state,
            value: newValue,
        })
    }

    const onCheck = () => {
        setState({
            ...state,
            loading: true,
        })
    }

    const onDelete = () => {
        setState({
            ...state,
            deleted: true,
        })
    }

    const onReset = () => {
        setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: '',
        })
    }

    React.useEffect(() => {
        console.log('Empezando el efecto')
        if (state.loading) {
            setTimeout(() => {
                console.log('Haciendo Validación')
                if (state.value === SECURITY_CODE) {
                    onConfirmed()
                } else {
                    onError()
                }

                console.log('Terminando Validación')
            }, 3000)
        }
        console.log('Terminando el efecto')
    }, [state.loading])

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar UseState</h2>
                <p>Por favor, escribe el codigo de serguridad</p>

                {state.error && !state.loading && <p>Error: en el codigo</p>}
                {state.loading && <p>Cargando....</p>}

                <input
                    value={state.value}
                    onChange={(event) => {
                        onWrite(event.target.value)
                    }}
                    placeholder="Código de seguridad"
                ></input>
                <button onClick={() => onCheck()}>Comprobar</button>
            </div>
        )
    } else if (!state.deleted && state.confirmed) {
        return (
            <>
                <p>Seguro que quieres eliminar el estado ?</p>
                <button
                    onClick={() => {
                        onDelete()
                    }}
                >
                    Si, elimina
                </button>
                <button
                    onClick={() => {
                        onReset()
                    }}
                >
                    No, me arrepenti
                </button>
            </>
        )
    } else {
        return (
            <>
                <p>Eliminado con extio</p>
                <button
                    onClick={() => {
                        onReset()
                    }}
                >
                    Resetear
                </button>
            </>
        )
    }
}

export { UseState }
