import { db } from "./firebase.js";
import { collection, getDocs } from "firebase/firestore";

document.addEventListener('DOMContentLoaded', async () => {
  const playerCode = localStorage.getItem('playerCode');
  
  if (!playerCode) {
    window.location.href = "index.html";
    return;
  }

  // جلب بيانات اللاعب
  const querySnapshot = await getDocs(collection(db, "players"));
  querySnapshot.forEach((doc) => {
    const playerData = doc.data();
    if(playerData.accessCode === playerCode) {
      document.getElementById('playerName').textContent = `مرحباً ${playerData.name}!`;
      document.getElementById('playerPosition').textContent = 
        `${playerData.position} - الرقم ${playerData.number || ''}`;
    }
  });
});
