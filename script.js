//Script of the vulnerable web

document.getElementById("login_formulario").addEventListener("submit", async function(e) {
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    let response = await fetch('/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password })
    });
    let result = await response.text();
    alert(result);
});

document.getElementById("comment_formulario").addEventListener("submit", async function(e) {
    e.preventDefault();
    let comment_text = document.getElementById("comment_text").value;
    
    let response = await fetch('/comment', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment_text })
    });
    let result = await response.text();
    alert(result);
});

document.getElementById("ping_formulario").addEventListener("submit", async function(e) {
    e.preventDefault();
    let ip = document.getElementById("ip").value;
    
    let response = await fetch('/ping', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip })
    });
    let result = await response.text();
    document.getElementById("ping-output").innerText = result;
});
