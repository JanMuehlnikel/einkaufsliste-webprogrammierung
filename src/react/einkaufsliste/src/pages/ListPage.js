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

  // GET ITEMS
  const { isLoading, data, error } = useFetch("https://8080-janmuehlnik-einkaufslis-o4z085hqnla.ws-eu82.gitpod.io/api/user/items/" + validationUserID); 

  if (isLoading) {
    return <div>IS loading</div>
  }

  if (error) {
    return <Signup></Signup>
  }

  // DELETE ITEMS

  function deleteItem(theID) {
    console.log(theID)
    console.log('DELETING')
    fetch("https://8080-janmuehlnik-einkaufslis-o4z085hqnla.ws-eu82.gitpod.io/api/users/items/" + validationUserID + "@" + theID, {
      method: 'DELETE'
    })
      .then(function (res) { window.location.reload() })
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
          {data.map(items =>
            <div>
              <div class="row mt-3">
                <div class="col">
                  <div class="input-group mb-1">

                    <div class="input-group-text">
                      <input class="form-check-input" id="cb-abgehakt" type="checkbox" />
                    </div>

                    <span class="input-group-text" id="igt-item">{items.item + " " 
                    + items.quantity + " " 
                    + items.unit + "  ⇨ " 
                    + items.responsible}</span>

                    {/*DELETE BUTTON */}
                    <button class="btn btn-outline-secondary" id="btn-deleteItem" onClick={() => deleteItem(items.itemID)}>
                      <img src='https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2018/png/iconmonstr-trash-can-thin.png&r=0&g=0&b=0'
                      width="25px" height="auto"></img>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

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

            <button class="w-100 btn btn-lg btn-primary" id="btn-hinzufügen" type="submit">Artikel hinzufügen</button>

          </form>
        </Modal.Body>

      </Modal>


    </main >

  );
}

export default ListPage;