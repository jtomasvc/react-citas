import React ,{ Fragment, useState, useEffect }from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  //Citas en Local Storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

  //arreglo de citas
  const [citas,guardarCitas] = useState (citasIniciales);

  //Use effect cuando el state cambia
  useEffect(() => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas,citasIniciales]);


  // Funcion que tome las citas actuales y agrege la nueva
  const crearCita = (cita) => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  //Funcion que elimina citas por su id
  const EliminarCita = (id) =>{
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }


  //Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  return (
      <Fragment>
        <h1>Administrador de pacientes</h1>

        <div className="container">
          <div className="row">
              <div className="one-half column">
                  <Formulario
                    crearCita={crearCita}
                  />
              </div>
              <div className="one-half column">
                <h2>{titulo}</h2>
                {citas.map(cita => (
                  <Cita
                    key={cita.id}
                    cita={cita}
                    EliminarCita={EliminarCita}
                  />
                ))}
              </div>
          </div>
        </div>
      </Fragment>
  );
}

export default App;
