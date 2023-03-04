document.querySelector("#signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const signupObj = {
        email: document.querySelector("#signup-email").value,
        password: document.querySelector("#signup-password").value,
    };
    fetch("/api/users/", {
        method: "POST",
        body: JSON.stringify(signupObj),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        if (res.ok) {
            location.href = "/dashboard";
        } else {
            alert("An error has occured.");
        }
    });
});
