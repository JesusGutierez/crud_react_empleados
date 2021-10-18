import React from 'react';
import { Link } from "react-router-dom";
import Api from "../services/api"

class Editar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados: false,
            empleado: []
        }
    }

    cambioValor = (e) => {

        const state = this.state.empleado

        state[e.target.name] = e.target.value;
        this.setState({ empleado: state })
    }

    enviarDatos = (e) => {
        e.preventDefault();

        const { id, nombre, correo } = this.state.empleado

        var datosEnviar = { id: id, nombre: nombre, correo: correo }

        fetch(Api+"?actualizar=1", {
            method: "POST",
            body: JSON.stringify(datosEnviar)
        })
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                this.props.history.push("/")
            })
            .catch(console.log)

    }

    componentDidMount() {

        fetch(Api+"?consultar=" + this.props.match.params.id)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {

                this.setState({
                    datosCargados: true,
                    empleado: datosRespuesta[0]
                })
            })
            .catch(console.log)
    }

    render() {

        const { datosCargados, empleado } = this.state

        if (!datosCargados) { return (<div>Cargando...</div>); }
        else {

            return (
                <div className="card">
                    <div className="card-header">
                        Editar empleados
                    </div>
                    <div className="card-body">

                        <form onSubmit={this.enviarDatos}>

                            {empleado.id}

                            <div className="form-group">
                                <label htmlFor=""></label>
                                <input type="text" readOnly className="form-control" value={empleado.id} onChange={this.cambioValor} name="id" id="id" aria-describedby="helpId" placeholder="" />
                                <small id="helpId" className="form-text text-muted">Clave</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Nombre:"></label>
                                <input required type="text" name="nombre" id="nombre" onChange={this.cambioValor} value={empleado.nombre} className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="text-muted">Escribe el nombre del empleado</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Correo:"></label>
                                <input required type="text" name="correo" id="correo" onChange={this.cambioValor} value={empleado.correo} className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="text-muted">Escribe el correo del empleado</small>
                            </div>
                            <div className="btn-group" role="group" aria-label="">
                                <button type="submit" className="btn btn-success">Actualizar empleado</button>
                                <Link to="/" className="btn btn-primary">Cancelar</Link>
                            </div>
                        </form>

                    </div>
                    <div className="card-footer text-muted">

                    </div>
                </div>
            )
        };
    }
}

export default Editar;