import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import useFetch from "react-fetch-hook";

import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    fetch("https://8080-simonklausludwig-base-0zd2m0ln3ei.ws-eu81.gitpod.io/api/employee?artikel=" + data.artikel + "&menge=" + data.menge,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
      })
      .then(function (res) { window.location.reload() })
      .catch(function (res) { console.log(res) })
  }

  const { isLoading, data, error } = useFetch("https://8080-simonklausludwig-base-0zd2m0ln3ei.ws-eu81.gitpod.io/api/employees");

  if (isLoading) {
    return <div>IS loading</div>
  }

  if (error) {
    return <div>ERROR</div>
  }

  return (


    <main class="container" id="artikel-anzeigen" >

      <p>xxx</p>

      <nav class="navbar navbar-expand-sm navbar-light">
        <div class="container-fluid">
          <a href="#" class="navbar-brand">
            <img src="/src/img/logo.png" height="50" alt="Einkaufsliste" />
          </a>
          <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav .mx-auto">
              <a href="#" class="nav-item nav-link active">Startseite  </a>
              <a href="#" class="nav-item nav-link">Einkaufslisten  </a>
              <a href="#" class="nav-item nav-link">Wochenplaner  </a>
              <a href="#" class="nav-item nav-link">Rezepte  </a>
            </div>
            <div class="navbar-nav ms-auto">
              <a href="#" class="nav-item nav-link">Anmelden</a>
            </div>
          </div>
        </div>
      </nav>


      <div class="artikel-anzeigen">


        <div class="row" mt-3>
          <div class="column">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Artikel hinzufügen</button>
          </div>
        </div>
      </div>

      {/* Modal zum Artikel hinzufügen */}

      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Artikel hinzufügen</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <p></p>
      <p></p>
      <p></p>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div class="input-group mb-3">
          <input {...register("artikel")} type="text" class="form-control" placeholder="Artikel" aria-label="Artikel" aria-describedby="basic-addon1" />
        </div>

        <div class="input-group mb-3">
          <input {...register("menge")} type="text" class="form-control" placeholder="Menge" aria-label="Menge" aria-describedby="basic-addon1" />
        </div>

        <button class="w-100 btn btn-lg btn-primary" id="btn-hinzufügen" type="submit">Artikel hinzufügen</button>


        <div>
          {data.map(empl =>
            <div>
              {/*Artikel Tags */}
              <div class="row mt-3">
                <div class="col">
                  <div class="input-group mb-1">
                    <div class="input-group-text">
                      <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
                    </div>

                    <span class="input-group-text">{empl.artikel}</span>

                    <span class="input-group-text">{empl.menge}</span>

                    <button class="btn btn-outline-secondary" type="button" id="button-addon1">🗑️</button>
                  </div>
                </div>
              </div>

            </div>)}
        </div>


      </form>
    </main >


  );
}

export default App;
