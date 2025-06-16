import { db } from "./firebase.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

// إضافة لاعب جديد
document.getElementById('addPlayerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('playerNameInput').value;
  const code = document.getElementById('playerCodeInput').value;
  const position = document.getElementById('playerPositionInput').value;
  
  try {
    await addDoc(collection(db, "players"), {
      name: name,
      accessCode: code,
      position: position,
      joinDate: new Date().toLocaleDateString('ar-LY'),
      number: Math.floor(Math.random() * 99) + 1
    });
    alert("تمت إضافة اللاعب بنجاح");
    loadPlayers();
  } catch (error) {
    console.error("Error adding player: ", error);
  }
});

// تحميل اللاعبين
async function loadPlayers() {
  const playersList = document.getElementById('playersList');
  playersList.innerHTML = '';
  
  const querySnapshot = await getDocs(collection(db, "players"));
  document.getElementById('playersCount').textContent = querySnapshot.size;
  
  querySnapshot.forEach((doc) => {
    const player = doc.data();
    const playerItem = document.createElement('div');
    playerItem.className = 'player-item';
    playerItem.innerHTML = `
      <div>
        <strong>${player.name}</strong>
        <p>${player.position} - ${player.accessCode}</p>
      </div>
      <div class="player-actions">
        <button class="delete" data-id="${doc.id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
    playersList.appendChild(playerItem);
  });

  // إضافة مستمعين لأزرار الحذف
  document.querySelectorAll('.delete').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const playerId = e.target.closest('button').getAttribute('data-id');
      if (confirm("هل أنت متأكد من حذف هذا اللاعب؟")) {
        await deleteDoc(doc(db, "players", playerId));
        loadPlayers();
      }
    });
  });
}

// تحميل اللاعبين عند فتح الصفحة
document.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('playerCode') !== "0011JMFC") {
    window.location.href = "index.html";
    return;
  }
  loadPlayers();
});
