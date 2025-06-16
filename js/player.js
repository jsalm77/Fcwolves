// تحميل بيانات اللاعب عند فتح الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const playerCode = localStorage.getItem('playerCode');
    
    if (!playerCode) {
        window.location.href = "index.html";
        return;
    }

    // جلب بيانات اللاعب من Firebase
    db.collection("players").where("accessCode", "==", playerCode).get()
        .then(snapshot => {
            if (!snapshot.empty) {
                const playerData = snapshot.docs[0].data();
                document.getElementById('playerName').textContent = `مرحباً ${playerData.name}!`;
                document.getElementById('playerPosition').textContent = `${playerData.position} - الرقم ${playerData.number || ''}`;
                
                // تمييز اللاعب الحالي في التشكيلة
                const currentPlayerElement = document.getElementById('currentPlayer');
                if (currentPlayerElement) {
                    currentPlayerElement.textContent = playerData.name;
                }
            }
        })
        .catch(error => {
            console.error("Error loading player data:", error);
        });
});
