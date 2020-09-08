import React,{useState} from 'react';
import Error from './Error';

const Formulario = ({guardarBusqueda}) => {

    //useState para buscar los terminos. guardarTermino va en el onChange del input
    const [termino, guardarTermino] = useState('');
    const [error, guardarError] = useState(false);

    const buscarImagenes = e =>{
        e.preventDefault();

        //Validar
        if(termino.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);

        //Enviar el término de búsqueda hacia el componente principal
        guardarBusqueda(termino);
    }

    return ( 
        <form
            onSubmit={buscarImagenes}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Busca una imagen, por ejemplo: ovnis o café"
                        onChange={e=> guardarTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        className="btn btn-lg btn-danger btn-block"
                        type="submit"
                        value="Buscar"
                    />
                </div>
            </div>
            {error ? <Error mensaje="Agrega un término a la búsqueda" /> : null}
        </form>
     );
}
 
export default Formulario;