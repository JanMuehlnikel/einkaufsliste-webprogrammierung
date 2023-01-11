import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';

import useFetch from "react-fetch-hook";
import { useForm } from "react-hook-form";
import React, { useState } from 'react';

function App() {
  // add article modal functions
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // fetch articls
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    fetch("https://8080-simonklausludwig-base-0zd2m0ln3ei.ws-eu81.gitpod.io/api/items?" + 
    "item=" + data.item + 
    "&quantity=" + data.quantity + 
    "&unit=" + data.unit + 
    "&responsible=" + data.responsible,
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

  const { isLoading, data, error } = useFetch("https://8080-simonklausludwig-base-0zd2m0ln3ei.ws-eu81.gitpod.io/api/items");

  console.log(data)

  if (isLoading) {
    return <div>IS loading</div>
  }

  if (error) {
    return <div>ERROR</div>
  }

  function deleteArticle(){
    console.log('DELETING')
    fetch("https://8080-simonklausludwig-base-0zd2m0ln3ei.ws-eu81.gitpod.io/api/items/:1",
    {method: 'DELETE'})
    .then(function (res) { window.location.reload() })
  }

  return (


    <main class="container" id="artikel-anzeigen" >
      <p>test</p>
      
        {/*NAVBAR*/}
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

        {/*ADD ARTICLE */}
        <button class="btn btn-lg btn-primary" onClick={handleShow}>Artikel hinzufügen</button>

        {/*ARTICLE TAGS Tags */}
        {data.map(items =>
          <div>
            <div class="row mt-3">
              <div class="col">
                <div class="input-group mb-1">
                  <div class="input-group-text">
                    <input class="form-check-input mt-0" type="checkbox"/>
                  </div>

                  <span class="input-group-text">{"" + items.item}</span>
                  <span class="input-group-text">{"" + items.quantity}</span>
                  <span class="input-group-text">{"" + items.unit}</span>
                  <span class="input-group-text">{"" + items.responsible}</span>


                  <button class="btn btn-outline-secondary" onClick={deleteArticle}>🗑️</button>
                </div>
              </div>

            </div>
          </div>
        )}

      {/*ADD ARTICLE MODAL*/}
      <Modal show={show} onHide={handleClose} animation={false}>

        <Modal.Header closeButton>
          <Modal.Title>Artikel hinzufügen</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div class="input-group mb-3">
              <input {...register("item")} type="text" class="form-control" placeholder="Artikel" aria-label="Artikel" aria-describedby="basic-addon1" />
            </div>

            <div class="input-group mb-3">
              <input {...register("quantity")} type="text" class="form-control" placeholder="Menge" aria-label="Menge" aria-describedby="basic-addon1" />
            </div>

            <div class="input-group mb-3">
              <input {...register("unit")} type="text" class="form-control" placeholder="Meingeneinheit" aria-label="Mengeneinheit" aria-describedby="basic-addon1" />
            </div>

            <div class="input-group mb-3">
              <input {...register("responsible")} type="text" class="form-control" placeholder="Zugeordnet" aria-label="Zugeordnet" aria-describedby="basic-addon1" />
            </div>

            <button class="w-100 btn btn-lg btn-primary" id="btn-hinzufügen" type="submit">Artikel hinzufügen</button>

          </form>
        </Modal.Body>

      </Modal>


    </main >


  );
}

export default App;

