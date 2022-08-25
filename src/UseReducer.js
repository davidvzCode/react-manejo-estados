import React from 'react'

const SECURITY_CODE = 'paradigma'

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
}

function UseReducer() {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    const onConfirmed = () => dispatch({ type: actionTypes.CONFIRM })

    const onError = () => {
        dispatch({ type: actionTypes.ERROR })
    }

    // const onWrite = (newValue) => {
    //     dispatch({
    //         type: actionTypes.WRITE,
    //         payload: newValue,
    //     })
    // }

    const onWrite = ({ target: { value } }) => {
        dispatch({
            type: actionTypes.WRITE,
            payload: value,
        })
    }

    const onCheck = () => {
        dispatch({ type: actionTypes.CHECK })
    }

    const onDelete = () => {
        dispatch({ type: actionTypes.DELETE })
    }

    const onReset = () => {
        dispatch({ type: actionTypes.RESET })
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
                    // onChange={(event) => {
                    //     onWrite(event.target.value)
                    // }}
                    onChange={onWrite}
                    placeholder="Código de seguridad"
                ></input>
                <button onClick={onCheck}>Comprobar</button>
            </div>
        )
    } else if (!state.deleted && state.confirmed) {
        return (
            <>
                <p>Seguro que quieres eliminar el estado ?</p>
                <button onClick={onDelete}>Si, elimina</button>
                <button onClick={onReset}>No, me arrepenti</button>
            </>
        )
    } else {
        return (
            <>
                <p>Eliminado con extio</p>
                <button onClick={onReset}>Resetear</button>
            </>
        )
    }
}

const actionTypes = {
    CONFIRM: 'CONFIRM',
    ERROR: 'ERROR',
    CHECK: 'CHECK',
    WRITE: 'WRITE',
    DELETE: 'DELETE',
    RESET: 'RESET',
}

const reducerObject = (state, payload) => ({
    [actionTypes.ERROR]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.CHECK]: {
        ...state,
        loading: true,
    },
    [actionTypes.CONFIRM]: {
        ...state,
        loading: false,
        error: false,
        confirmed: true,
    },
    [actionTypes.WRITE]: {
        ...state,
        value: payload,
    },
    [actionTypes.DELETE]: {
        ...state,
        deleted: true,
    },
    [actionTypes.RESET]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    },
})

const reducer = (state, action) => {
    if (reducerObject(state, action.payload)[action.type]) {
        return reducerObject(state, action.payload)[action.type]
    } else {
        return state
    }
}

export { UseReducer }
