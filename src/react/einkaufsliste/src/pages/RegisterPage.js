import React, {useState, useContext} from "react";
import Navigation from '../components/navbar';
import "../css/RegisterPage.css"
import { useForm } from "react-hook-form";
import { Logging } from "../context/context";
import { Authentification } from "../context/context";
import { useNavigate } from "react-router-dom";

function RegisterPage() {

   const {loggedIn, setLoggedIn} = useContext(Logging)
   const {userID, setUserID} = useContext(Authentification)

   const [warnMessage, setWarnMesage] = useState("")

   const navigate = useNavigate();

   const { register, handleSubmit, formState: { errors } } = useForm();
   
   // generate a userID from tiem string and a random string 
   const generatedID = "user:" + (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)

   const onRegister = data => {
      fetch("http://localhost:8080/api/register?" +
         "userID=" + generatedID +
         "&prename=" + data.prename +
         "&name=" + data.name +
         "&email=" + data.email +
         "&password=" + data.password,
         {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            method: "POST",
         })
         .then(res => res.json())
         .then(res => {

               if (res.message == "success") {
                  setUserID(generatedID)
                  setLoggedIn(true)
                  navigate("/list")
               } else {
                  setWarnMesage(res.message)
               }

         })
         .catch(function (res) { console.log(res) })
   }


   return (
      <main class="container-fluid" id="con-registerpage">
         
         <div class="row">
            <div class="col"></div>

            <div class="col">
               <h1>Registrieren</h1>
            </div>

            <div class="col"></div>

         </div>

         <div class="row">
            <div class="col"></div>

            <div class="col">
               <form onSubmit={handleSubmit(onRegister)} >
                  <div class="form-group">
                     <label for="input-prename">Vorname</label>
                     <input {...register("prename")} type="text" class="form-control" id="input-prename" placeholder="Vorname" />
                  </div>
                  <div class="form-group">
                     <label for="input-name">Nachname</label>
                     <input {...register("name")} type="text" class="form-control" id="input-name" placeholder="Nachname" />
                  </div>
                  <div class="form-group">
                     <label for="input-email">Email Adresse</label>
                     <input {...register("email")} type="email" class="form-control" id="input-email" aria-describedby="emailHelp" placeholder="Email Adresse" />
                  </div>
                  <div class="form-group">
                     <label for="input-password">Passwort</label>
                     <input {...register("password")} type="password" class="form-control" id="input-password" placeholder="Passwort" />
                  </div>
                  <p class="txt-warnMessage" id="txt-warn">{warnMessage}</p>
                  <button type="submit" class="btn btn-light btn-primary">Registrieren</button>
               </form>
            </div>

            <div class="col"></div>

         </div>
      </main >
   )
}

export default RegisterPage