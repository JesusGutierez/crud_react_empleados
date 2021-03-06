import React from 'react';
import { Link } from "react-router-dom";
import Api from "../services/api";

class Listar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados: false,
            empleados: []
        }
    }

    cargarDatos() {
        fetch(Api)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {

                this.setState({ datosCargados: true, empleados: datosRespuesta })
            })
            .catch(console.log)
    }

    borrarRegistros = (id) => {
        fetch(Api+"?borrar="+id)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {

                this.cargarDatos()
            })
            .catch(console.log)
    }

    componentDidMount() {
        this.cargarDatos();
    }

    render() {

        const { datosCargados, empleados } = this.state

        if (!datosCargados) { return (<div>Cargando...</div>); }
        else {
            return (
                <div className="card">
                    <div className="card-header">
                    <Link className="btn btn-success" to={"/crear"}>Agregar nuevo empleado</Link>
                    </div>
                    <div className="card-body">
                        <h4>Lista de empleados</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {empleados.map(
                                    (empleado) => (
                                        <tr key={empleado.id}>
                                            <td>{empleado.id}</td>
                                            <td>{empleado.nombre}</td>
                                            <td>{empleado.correo}</td>
                                            <td>
                                                <div className="btn-group" role="group" aria-label="">
                                                    <Link className="btn btn-warning"
                                                    to={"/editar/"+empleado.id}
                                                    >Editar</Link>
                                                    <button className="btn btn-danger"
                                                    onClick={()=>this.borrarRegistros(empleado.id)}
                                                    >Borrar</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer text-muted">

                    </div>
                </div>

            );
        }
    }
}

export default Listar;