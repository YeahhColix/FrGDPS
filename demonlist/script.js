import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-database.js";

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

const list = document.getElementById("demon-list");
const demonsRef = ref(db, "demons");

onValue(demonsRef, (snapshot) => {
  const data = snapshot.val();
  list.innerHTML = "";
  if (data) {
    Object.entries(data).forEach(([key, val]) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${val.name}</strong> by ${val.creator} <br>
        <em>Verified by:</em> ${val.verifier}<br>
        <a href="${val.video}" target="_blank">Lihat Video</a>
      `;
      list.appendChild(li);
    });
  } else {
    list.innerHTML = "<li>Belum ada level terdaftar.</li>";
  }
});