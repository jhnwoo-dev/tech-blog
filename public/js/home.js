document.querySelector(".blog-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const loginObj = {
        title: document.querySelector("#title").value,
        text: document.querySelector("#text").value,
    };
    fetch("/api/blog", {
        method: "POST",
        body: JSON.stringify(loginObj),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        if (res.ok) {
            location.href = "/";
        }
    });
});

// const blogs = document.querySelectorAll(".blog-box");

// blogs.forEach((blog) => {
//     blog.addEventListener(
//         "click",
//         () => {
//             const blogId = blog.getAttribute("data-id");
//             console.log(blogId);

//             const commentForm = document.createElement("form");

//             const commentInput = document.createElement("input");
//             commentInput.setAttribute("type", "text");
//             commentInput.setAttribute("id", "add-comment");
//             commentInput.setAttribute("placeholder", "add comment");

//             const submitBtn = document.createElement("button");
//             submitBtn.setAttribute("type", "submit");
//             submitBtn.textContent = "Comment";

//             commentForm.appendChild(commentInput);
//             commentForm.appendChild(submitBtn);

//             commentForm.addEventListener("submit", (e) => {
//                 e.preventDefault;
//                 const commentObj = {
//                     text: document.querySelector("#add-comment").value,
//                     blogId,
//                 };
//                 fetch("/api/comment/", {
//                     method: "POST",
//                     body: JSON.stringify(commentObj),
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 }).then((res) => {
//                     if (res.ok) {
//                         location.href = "";
//                     }
//                 });
//             });
//             blog.appendChild(commentForm);
//         },
//         { once: true }
//     );
// });
