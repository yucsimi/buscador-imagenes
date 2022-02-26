import './App.css';
import React, { useState, useEffect } from 'react';
import Formulario from './Componentes/Formulario';
import ListadoImagenes from './Componentes/ListadoImagenes';

function App() {


  //state de la app
  const [busqueda, guardarBusqueda] = useState('')
  const [imagenes, guardarImagenes] = useState([])
  const [paginaactual, guardarPaginaActual] = useState(1)
  const [paginatotal, guardarPaginaTotal] = useState(1)

  useEffect(() => {

    const consultarApi = async () => {
      if (busqueda === '') return

      const imagenesPorPagina = 30
      const key = '23195778-c7276e5802738efed1980346d'
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`

      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      guardarImagenes(resultado.hits)

      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina)
      guardarPaginaTotal(calcularTotalPaginas)

      //mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron')
      jumbotron.scrollIntoView({ behavior: 'smooth' })

    }
    consultarApi()

  }, [busqueda, paginaactual])

  //definir la pagina anterior
  const paginaAnterior = () => {

    const nuevaPaginaActual = paginaactual - 1

    if (nuevaPaginaActual === 0) return


    guardarPaginaActual(nuevaPaginaActual)
  }
  //definir la pagina siguente 
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1
    if (nuevaPaginaActual > paginatotal) return

    guardarPaginaActual(nuevaPaginaActual)



  }

  return (
    <div className="container">
      <div className='jumbotron'>
        <p className='lead text-center'> Buscador de Imagenes</p>
        <Formulario
          guardarBusqueda={guardarBusqueda}
        />
      </div>

      <div className='row justify-content-center'>
        <ListadoImagenes
          imagenes={imagenes}

        />

        {(paginaactual === 1) ? null : (

          <button
            type='button '
            className='bbtn btn-info mr-1' onClick={paginaAnterior}> &laquo; Anterior </button>



        )}

        {(paginaactual === paginatotal) ? null : (

          <button
            type='button '
            className='bbtn btn-info '
            onClick={paginaSiguiente}
          >Siguiente &raquo;</button>

        )}




      </div>
    </div>
  );
}

export default App;
