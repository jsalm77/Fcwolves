// تسجيل الخروج
document.getElementById('logoutBtn').addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
        window.location.href = "index.html";
    });
});

// إضافة لاعب جديد
document.getElementById('addPlayerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('playerNameInput').value;
    const code = document.getElementById('playerCodeInput').value;
    const position = document.getElementById('playerPositionInput').value;
    
    db.collection("players").add({
        name: name,
        accessCode: code,
        position: position,
        joinDate: new Date().toLocaleDateString('ar-EG'),
        number: Math.floor(Math.random() * 99) + 1
    })
    .then(() => {
        alert("تمت إضافة اللاعب بنجاح");
        document.getElementById('addPlayerForm').reset();
        loadPlayers();
    })
    .catch(error => {
        console.error("Error adding player:", error);
        alert("حدث خطأ أثناء إضافة اللاعب");
    });
});

// تحميل قائمة اللاعبين
function loadPlayers() {
    const playersList = document.getElementById('playersList');
    playersList.innerHTML = '';
    
    db.collection("players").get()
        .then(snapshot => {
            document.getElementById('playersCount').textContent = snapshot.size;
            
            snapshot.forEach(doc => {
                const player = doc.data();
                const playerItem = document.createElement('div');
                playerItem.className = 'player-item';
                playerItem.innerHTML = `
                    <div>
                        <strong>${player.name}</strong>
                        <p>${player.position} - ${player.accessCode}</p>
                    </div>
                    <div class="player-actions">
                        <button class="edit" data-id="${doc.id}"><i class="fas fa-edit"></i></button>
                        <button class="delete" data-id="${doc.id}"><i class="fas fa-trash"></i></button>
                    </div>
                `;
                playersList.appendChild(playerItem);
            });
            
            // إضافة مستمعين لأزرار الحذف
            document.querySelectorAll('.delete').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const playerId = e.target.closest('button').getAttribute('data-id');
                    if (confirm("هل أنت متأكد من حذف هذا اللاعب؟")) {
                        db.collection("players").doc(playerId).delete()
                            .then(() => {
                                loadPlayers();
                            });
                    }
                });
            });
        });
}

// تحميل البيانات عند فتح الصفحة
document.addEventListener('DOMContentLoaded', () => {
    // تحقق من أن المستخدم مدير
    const playerCode = localStorage.getItem('playerCode');
    if (playerCode !== "0011JMFC") {
        window.location.href = "index.html";
        return;
    }
    
    loadPlayers();
    
    // تحميل الإحصائيات
    db.collection("matches").get().then(snap => {
        document.getElementById('matchesCount').textContent = snap.size;
    });
    
    // يمكنك إضافة المزيد من الاستعلامات للإحصائيات هنا
});
