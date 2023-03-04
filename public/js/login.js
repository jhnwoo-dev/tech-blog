document.querySelector("#loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const loginObj = {
        email: document.querySelector("#loginEmail").value,
        password: document.querySelector("#loginPassword").value,
    };
    console.log(loginObj);
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
            alert("An error has occured.");
        }
    });
});

document.querySelector("#signup-redirect").addEventListener("click", () => {
    location.href = "/signup";
});
