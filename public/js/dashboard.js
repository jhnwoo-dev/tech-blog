document.querySelector("#new-blog-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const blogsObj = {
        blogTitle: document.querySelector("#blog-title").value,
        blogText: document.querySelector("#blog-text").value,
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
        }
    });
});
