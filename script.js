document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3000/signUp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, username, phone, password }),
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById("signupMessage").innerText = "Sign up successful!";
        } else {
            document.getElementById("signupMessage").innerText = `Error: ${result.message}`;
        }
    } catch (error) {
        document.getElementById("signupMessage").innerText = "Failed to connect to the server.";
    }
});
// login form 
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
    .then((response) => response.json())
    .then((result) => {
        if (result.message === "login successful") {
            loginMessage.innerText = "Login successful!";
            // Save the token for future requests
            localStorage.setItem("token", result.token);
            // Optional: Redirect or show logged-in user content
        } else {
            loginMessage.innerText = result.message;
        }
    })
    .catch((error) => {
        loginMessage.innerText = "Error logging in. Please try again.";
        console.error("Error:", error);
    });
});
// post creation 
const createPostForm = document.getElementById("createPostForm");
const postMessage = document.getElementById("postMessage");

createPostForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;
    const token = localStorage.getItem("token"); // Retrieve token for authorization

    fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "token": token, // Send token in headers
        },
        body: JSON.stringify({ title, content }),
    })
    .then((response) => response.json())
    .then((result) => {
        if (result.message === "posts created successfully") {
            postMessage.innerText = "Post created successfully!";
            createPostForm.reset(); // Clear the form
        } else {
            postMessage.innerText = result.message;
        }
    })
    .catch((error) => {
        postMessage.innerText = "Error creating post. Please try again.";
        console.error("Error:", error);
    });
});
// update post 
const updatePostForm = document.getElementById("updatePostForm");
const updateMessage = document.getElementById("updateMessage");

updatePostForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const postId = document.getElementById("updatePostId").value;
    const title = document.getElementById("updatePostTitle").value;
    const content = document.getElementById("updatePostContent").value;
    const token = localStorage.getItem("token"); // Retrieve token for authorization

    fetch(`http://localhost:3000/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "token": token, // Send token in headers
        },
        body: JSON.stringify({ title, content }),
    })
    .then((response) => response.json())
    .then((result) => {
        if (result.message === "Post updated successfully") {
            updateMessage.innerText = "Post updated successfully!";
            updatePostForm.reset(); // Clear the form
        } else {
            updateMessage.innerText = result.message;
        }
    })
    .catch((error) => {
        updateMessage.innerText = "Error updating post. Please try again.";
        console.error("Error:", error);
    });
});
// post delte 
const deletePostForm = document.getElementById("deletePostForm");
const deleteMessage = document.getElementById("deleteMessage");

deletePostForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const postId = document.getElementById("deletePostId").value;
    const token = localStorage.getItem("token"); // Retrieve token for authorization

    fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "token": token, // Send token in headers
        },
    })
    .then((response) => response.json())
    .then((result) => {
        if (result.message === "Post deleted successfully") {
            deleteMessage.innerText = "Post deleted successfully!";
            deletePostForm.reset(); // Clear the form
        } else {
            deleteMessage.innerText = result.message;
        }
    })
    .catch((error) => {
        deleteMessage.innerText = "Error deleting post. Please try again.";
        console.error("Error:", error);
    });
});
