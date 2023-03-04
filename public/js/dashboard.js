document.querySelector(".blog-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const blogsObj = {
        title: document.querySelector("#title").value,
        text: document.querySelector("#text").value,
    };
    fetch("/api/blog", {
        method: "POST",
        body: JSON.stringify(blogsObj),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        if (res.ok) {
            location.href = "/dashboard";
        }
    });
});

const blogs = document.querySelectorAll(".blog-box");

blogs.forEach((blog) => {
    blog.addEventListener("click", () => {
        const title = blog.children[0].textContent
            .split(" ")[1]
            .replace(/"/g, "");
        const text = blog.children[2].textContent;
        const id = blog.getAttribute("data-id");

        blog.innerHTML = "";

        const editForm = document.createElement("form");
        editForm.setAttribute("class", "edit-form");

        const newTitleInput = document.createElement("input");
        newTitleInput.setAttribute("type", "text");
        newTitleInput.setAttribute("id", "edit-title");
        newTitleInput.setAttribute("placeholder", `blog title: ${title}`);

        const newTextInput = document.createElement("input");
        newTextInput.setAttribute("type", "text");
        newTextInput.setAttribute("id", "edit-text");
        newTextInput.setAttribute("placeholder", `blog text: ${text}`);

        const submitBtn = document.createElement("button");
        submitBtn.setAttribute("type", "submit");
        submitBtn.setAttribute("class", "blog-btn");
        submitBtn.textContent = "Update Blog Post!";

        editForm.appendChild(newTitleInput);
        editForm.appendChild(newTextInput);
        editForm.appendChild(submitBtn);

        // put requst to setup editing
        editForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const blogObj = {
                title: document.querySelector("#edit-title").value || title,
                text: document.querySelector("#edit-text").value || text,
            };
            fetch(`/api/blog/${id}`, {
                method: "PUT",
                body: JSON.stringify(blogObj),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                if (res.ok) {
                    location.href = "/dashboard";
                }
            });
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete Post";
        deleteBtn.addEventListener("click", (e) => {
            fetch(`/api/blog/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                if (res.ok) {
                    location.href = "/dashboard";
                }
            });
        });

        blog.appendChild(editForm);
        blog.appendChild(deleteBtn);
    });
});
