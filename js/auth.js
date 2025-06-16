import { auth } from "./firebase.js";
import { signInAnonymously } from "firebase/auth";

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const accessCode = document.getElementById('accessCode').value;
  
  try {
    await signInAnonymously(auth);
    
    if(accessCode === "0011JMFC") {
      window.location.href = "admin.html";
    } else {
      localStorage.setItem('playerCode', accessCode);
      window.location.href = "player.html";
    }
  } catch (error) {
    document.getElementById('loginMessage').textContent = 'خطأ في الدخول: ' + error.message;
  }
});
