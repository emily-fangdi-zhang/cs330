var form = document.getElementById("contact-form");

async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("contact-form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
    }).then(response => {
    if (response.ok) {
        status.innerHTML = "Thank you!";
        status.className = "success";
        form.reset()
    } else {
        response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
        } else {
            status.innerHTML = "Error with Submission";
        }
        })
        status.className = "error";
    }
    }).catch(error => {
    status.innerHTML = "Please fill out all fields";
    status.className = "error";
    });
}

form.addEventListener("submit", handleSubmit)