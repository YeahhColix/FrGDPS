import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDs2sGkNFJJqPOnx1fmeFQcGHXH1yFmPVc",
  authDomain: "frgdpsdemon.firebaseapp.com",
  databaseURL: "https://frgdpsdemon-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "frgdpsdemon",
  storageBucket: "frgdpsdemon.firebasestorage.app",
  messagingSenderId: "459095738556",
  appId: "1:459095738556:web:2b73dfa2694b977655e8b9",
  measurementId: "G-QMQ5G3FQ90"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.getElementById('submit-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById("name").value;
  const creator = document.getElementById("creator").value;
  const verifier = document.getElementById("verifier").value;
  const video = document.getElementById("video").value;

  const newRef = push(ref(db, "demons"));
  set(newRef, { 
    name, 
    creator, 
    verifier, 
    video 
  }).then(() => {
    alert("Level berhasil disubmit! Terima kasih.");
    this.reset();
  }).catch((error) => {
    alert("Error: " + error.message);
  });
});
