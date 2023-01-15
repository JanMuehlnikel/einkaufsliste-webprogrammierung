import React, { useState, useContext } from 'react';
import "../css/ListPage.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';

import WelcomePage from './WelcomePage';

import useFetch from "react-fetch-hook";
import { useForm } from "react-hook-form";

import { Logging } from "../context/context";
import { Authentification } from '../context/context';

function ListPage() {

  const { loggedIn, setLoggedIn } = useContext(Logging)
  const { userID, setUserID } = useContext(Authentification)

  // add article modal functions
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // POST ITEMS
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    fetch("http://localhost:8080/api/users/items?" +
      "userID=" + userID +
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
  const { isLoading, data, error } = useFetch("http://localhost:8080/api/user/items/" + userID);

  if (isLoading) {
    return <div>IS loading</div>
  }

  if (error) {
    return <WelcomePage></WelcomePage>
  }

  // DELETE USER ITEMS

  function deleteItem(ItemID) {
    console.log('DELETING')
    fetch("http://localhost:8080/api/users/items/" + userID + "@" + ItemID, {
      method: 'DELETE'
    })
      .then(function (res) { window.location.reload() })
  }

  //tickItem
  function tickItem(iID, tick) {
    console.log(tick)
    fetch("http://localhost:8080/api/users/items/ticked?" +
      "userID=" + userID +
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

  function showTicked(tickedValue) {
    function oppositeBool(b) {
      if (b == "false") {
        return "true"
      } else {
        return "false"
      }
    }
    return (
      data.map(item => {

        if (item.ticked == tickedValue) {

          return (

            <div class="row mt-3">
              <div class="col">
                <div class="input-group mb-1">

                  <button class="btn btn-light btn-outline-secondary" id={"btn-text-" + tickedValue}
                    onClick={() => tickItem(item.itemID, oppositeBool(tickedValue))}>
                    {tickedValue == "false" ?
                      "☐ "
                      + item.item + " "
                      + item.quantity + " "
                      + item.unit + " "
                      + (item.responsible.trim() != "" ? "⇒ " + item.responsible : "")
                      :
                      "☒ "
                      + item.item + " "
                      + item.quantity + " "
                      + item.unit + " "
                      + (item.responsible.trim() != "" ? "⇒ " + item.responsible : "")
                    }
                  </button>

                  {/*DELETE BUTTON */}
                  <button class="btn btn-outline-secondary" id={"btn-delete-" + tickedValue} onClick={() => deleteItem(item.itemID)}>🗑</button>
                </div>
              </div>
            </div>
          )
        }

      })
    )
  }

  if (loggedIn) {
    return (
      // full width container
      <main class="container-fluid" id="con-listpage">

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
            {showTicked("false", data)}
            {showTicked("true", data)}

            {/*ADD ARTICLE */}
            <button class="btn btn-lg btn-light btn-primary" id="btn-addArticle" onClick={handleShow}>Hinzufügen</button>

          </div>

          <div class="col"></div>
        </div>

        {/*ADD ARTICLE MODAL*/}
        <Modal show={show} onHide={handleClose} animation={false}>

          <Modal.Header closeButton>
            <Modal.Title className='modal-title'>Artikel hinzufügen</Modal.Title>
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

    )
  } else {
    <WelcomePage></WelcomePage>
  }
}

export default ListPage;