document.querySelector("#new-blog-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const blogsObj = {
        blog: document.querySelector("#blog-input").value,
    };
    console.log(blogsObj);
    fetch("/api/blogs", {
        method: "POST",
        body: JSON.stringify(blogsObj),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        if (res.ok) {
            location.reload();
        } else {
            alert("trumpet sound");
        }
    });
});
