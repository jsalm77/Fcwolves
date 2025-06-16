document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const accessCode = document.getElementById('accessCode').value;
    const messageDiv = document.getElementById('loginMessage');
    
    // رمز المدير الثابت
    if (accessCode === "0011JMFC") {
        auth.signInAnonymously()
            .then(() => {
                window.location.href = "admin.html";
            })
            .catch(error => {
                messageDiv.textContent = "خطأ في الدخول: " + error.message;
            });
    } else {
        // التحقق من وجود اللاعب
        db.collection("players").where("accessCode", "==", accessCode).get()
            .then(snapshot => {
                if (!snapshot.empty) {
                    auth.signInAnonymously()
                        .then(() => {
                            localStorage.setItem('playerCode', accessCode);
                            window.location.href = "player.html";
                        });
                } else {
                    messageDiv.textContent = "رمز الدخول غير صحيح";
                }
            })
            .catch(error => {
                messageDiv.textContent = "خطأ في التحقق: " + error.message;
            });
    }
});
