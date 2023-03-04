document.querySelector("#login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const loginObj = {
        email: document.querySelector("#login-email").value,
        password: document.querySelector("#login-password").value,
    };
    fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(loginObj),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        if (res.ok) {
            location.href = "/dashboard";
        } else {
            location.href = "/signup";
        }
    });
});

document.querySelector("#signup-redirect").addEventListener("click", () => {
    location.href = "/signup";
});
