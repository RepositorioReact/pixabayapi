import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  //useState de la app
  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);

  //PAGINADOR
  //useState para ver en qué página nos encontramos
  const [paginaactual, guardarPaginaActual] = useState(1); //inicia la página 1
  //useState que va a estar atento o diciendonos cuántas páginas hay en total
  const [totalpaginas, guardarTotalPaginas] = useState(1);//al menos vamos a tener una página

  useEffect(() => {

    const consultarAPI = async ()=>{

      if(busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = '17952778-cb9db4aad17f82e2e3f35847c';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarImagenes(resultado.hits);

      //CALCULAR EL TOTAL DE PAGINAS
      //el totalHits de la api nos da la cantidad de resultados-->totalHits/imagenesPorPagina
      //Math.ceil para redondear hacia arriba el decimal y que muestre una página más para las fotos restantes
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);

      //scroll hacia arriba cuando carga una nueva página
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior:'smooth'});

    }

    consultarAPI();

  }, [busqueda, paginaactual]);//cuando cambien busqueda o paginaactual recarga el useEffect

  //definir la página anterior
  const paginaAnterior = () =>{
    const nuevaPaginaActual = paginaactual - 1;

    if(nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  //definir pagina siguiente
  const paginaSiguiente = () =>{
    const nuevaPaginaActual = paginaactual + 1;

    if(nuevaPaginaActual > totalpaginas) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imágenes</p>
        <p className="lead text-center"><small>(libres de copyright)</small></p>

        <Formulario 
          guardarBusqueda={guardarBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes 
          imagenes={imagenes}
        />

        {(paginaactual === 1) ? null : (
          <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={paginaAnterior}
          >&laquo; Anterior</button>
        )}
        {(paginaactual === totalpaginas) ? null : (
          <button
            type="button"
            className="bbtn btn-info"
            onClick={paginaSiguiente}
          >Siguiente &raquo;</button>
        )}
      </div>
    </div>
  );
}

export default App;
