import React, { useState } from 'react';
import "../css/ListPage.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';

import Navigation from '../components/navbar';
import Signup from './Signup';

import useFetch from "react-fetch-hook";
import { useForm } from "react-hook-form";
import { validationUserID } from '../constants';

function ListPage() {

  // add article modal functions
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // POST ITEMS
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    fetch("https://8080-janmuehlnik-einkaufslis-o4z085hqnla.ws-eu82.gitpod.io/api/users/items?" +
      "userID=" + validationUserID +
      "&item=" + data.item +
      "&quantity=" + data.quantity +
      "&unit=" + data.unit +
      "&responsible=" + data.responsible +
      "&ticked=false",
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

  // GET ITEMS
  const { isLoading, data, error } = useFetch("https://8080-janmuehlnik-einkaufslis-o4z085hqnla.ws-eu82.gitpod.io/api/user/items/" + validationUserID);

  if (isLoading) {
    return <div>IS loading</div>
  }

  if (error) {
    return <Signup></Signup>
  }

  // DELETE ITEMS

  function deleteItem(id) {
    console.log(id)
    console.log('DELETING')
    fetch("https://8080-janmuehlnik-einkaufslis-o4z085hqnla.ws-eu82.gitpod.io/api/users/items/" + validationUserID + "@" + id, {
      method: 'DELETE'
    })
      .then(function (res) { window.location.reload() })
  }

  //tickItem
  function tickItem(iID, tick) {
    fetch("https://8080-janmuehlnik-einkaufslis-o4z085hqnla.ws-eu82.gitpod.io/api/users/items/ticked?" +
      "userID=" + validationUserID +
      "&itemID=" + iID +
      "&ticked=" + tick,
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



  return (
    // full width container
    <main class="container-fluid" id="con-listpage">

      <Navigation id="navbar"></Navigation>

      <div class="row">
        <div class="col"></div>

        <div class="col">
          <h1>Deine Einkaufsliste</h1>
        </div>

        <div class="col"></div>

      </div>


      <div class="row">

        <div class="col"></div>

        <div class="col">


          {/*ARTICLE TAGS Tags */}
          {console.log(data)}

          {data.map(item => {
            if (item.ticked === "false") {
              return (

                <div class="row mt-3">
                  <div class="col">
                    <div class="input-group mb-1">

                      <button class="btn btn-outline-secondary" id="btn-notTicked" onClick={() => tickItem(item.itemID, true)}>
                        {item.item + " "
                          + item.quantity + " "
                          + item.unit +
                          + item.responsible}
                      </button>

                      {/*DELETE BUTTON */}
                      <button class="btn btn-outline-secondary" id="btn-deleteItem" onClick={() => deleteItem(item.itemID)}>🗑</button>
                    </div>
                  </div>
                </div>
              )
            }
          })}

          {data.map(item => {
            if (item.ticked === "true") {
              return (
                <div class="row mt-3">
                  <div class="col">
                    <div class="input-group mb-1">

                      <button class="btn btn-outline-secondary" id="btn-ticked" onClick={() => tickItem(item.itemID, true)}>
                        {item.item + " "
                          + item.quantity + " "
                          + item.unit +
                          + item.responsible}
                      </button>

                      {/*DELETE BUTTON */}
                      <button class="btn btn-outline-secondary" id="btn-deleteItem" onClick={() => deleteItem(item.itemID)}>🗑</button>
                    </div>
                  </div>
                </div>
              )
            }
          })}

          {/*ADD ARTICLE */}
          <button class="btn btn-lg btn-light btn-primary" id="btn-addArticle" onClick={handleShow}>Artikel hinzufügen</button>

        </div>

        <div class="col"></div>
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

            <button class="w-100 btn btn-light btn-lg btn-primary" id="btn-hinzufügen" type="submit">Artikel hinzufügen</button>

          </form>
        </Modal.Body>

      </Modal>


    </main >

  );
}

export default ListPage;