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
const tbody = document.getElementById("demon-table-body");
const demonsRef = ref(db, "demons");

onValue(demonsRef, (snapshot) => {
  const data = snapshot.val();
  tbody.innerHTML = "";
  if (data) {
    let index = 1;
    Object.entries(data).forEach(([key, val]) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index++}</td>
        <td>${val.name}</td>
        <td>${val.creator}</td>
        <td>${val.verifier}</td>
        <td><a href="${val.video}" target="_blank">Tonton</a></td>
      `;
      tbody.appendChild(tr);
    });
  } else {
    tbody.innerHTML = "<tr><td colspan='5'>Belum ada level terdaftar.</td></tr>";
  }
});
