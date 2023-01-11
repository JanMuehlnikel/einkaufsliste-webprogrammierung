import React, { useState } from 'react';
import "./ListPage.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';

import Navigation from '../components/navbar';

import useFetch from "react-fetch-hook";
import { useForm } from "react-hook-form";


function ListPage() {
  // add article modal functions
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // fetch articls
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    fetch("https://8080-simonklausludwig-base-0zd2m0ln3ei.ws-eu82.gitpod.io/api/items?" +
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

  const { isLoading, data, error } = useFetch("https://8080-simonklausludwig-base-0zd2m0ln3ei.ws-eu82.gitpod.io/api/items");

  console.log(data)

  if (isLoading) {
    return <div>IS loading</div>
  }

  if (error) {
    return <div>ERROR</div>
  }

  function deleteItem(id) {
    console.log('DELETING')
    fetch("https://8080-simonklausludwig-base-0zd2m0ln3ei.ws-eu82.gitpod.io/api/items/" + id, {
      method: 'DELETE'
    })
      .then(function (res) { window.location.reload() })
  }

  return (
    // full width container
    <main class="container-fluid" id="con-listpage">

      <Navigation></Navigation>

        <div class="row">
          <div class="col-sm"></div>

          <div class="col-sm">
            <h1>Deine Einkaufsliste</h1>
          </div>

          <div class="col-sm"></div>

        </div>


      <div class="row">

        <div class="col-sm"></div>

        <div class="col-sm">


          {/*ARTICLE TAGS Tags */}
          {data.map(items =>
            <div>
              <div class="row mt-3">
                <div class="col">
                  <div class="input-group mb-1">

                    <div class="input-group-text">
                      <input class="form-check-input mt-0" id="cb-abgehakt" type="checkbox" />
                    </div>

                    <span class="input-group-text" id="igt-item">{"" + items.item}</span>
                    <span class="input-group-text" id="igt-quantity">{"" + items.quantity}</span>
                    <span class="input-group-text" id="igt-unit">{"" + items.unit}</span>
                    <span class="input-group-text" id="igt-responsible">{"" + items.responsible}</span>


                    <button class="btn btn-outline-secondary" id="btn-deleteItem" onClick={() => deleteItem(items.id)}>🗑️</button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/*ADD ARTICLE */}
          <button class="btn btn-lg btn-primary" onClick={handleShow}>Artikel hinzufügen</button>

        </div>

        <div class="col-sm"></div>
      </div>

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
              <select {...register("unit")} type="text" class="form-control" placeholder="Meingeneinheit" aria-label="Mengeneinheit" aria-describedby="basic-addon1">
                <option value="" selected disabled hidden>Mengeneinheit</option>
                <option value="Liter">Liter</option>
                <option value="Kilogramm">Kilogramm</option>
                <option value="Gramm">Gramm</option>
                <option value="Stück">Stück</option>
                <option value="Milliliter">Milliliter</option>
                <option value="Pfund">Pfund</option>
              </select>
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

export default ListPage;