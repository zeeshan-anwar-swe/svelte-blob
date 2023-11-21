<script>
    const saveImage = (e) => {
        const input = document.getElementById("fileInput");
        const file = input.files[0];

        if (!file) {
            alert("No file selected");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            const image = event.target.result;

            fetch("http://localhost:3000/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ image }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! Status: ${response.status}`
                        );
                    }
                    return response.json();
                })
                .then((data) => {
                    alert("Image uploaded successfully:", data);
                })
                .catch((error) => {
                    console.error("Error uploading image:", error);
                });
        };
        reader.readAsDataURL(file);
    };

    const dropHandle = (e) => {
        e.preventDefault();
        const input = document.getElementById("fileInput");
        input.files = e.dataTransfer.files;
    };
</script>

<h1>Task 2</h1>
<a href="/">Go to images</a>
<form
    id="uploadImage"
    class="drop-area"
    on:dragover={(e) => e.preventDefault()}
    on:drop={(e) => dropHandle(e)}
>
    <h3>Choose file to upload</h3>
    <input type="file" id="fileInput" accept="image/*" required />
    <button id="uploadBtn" type="button" on:click={saveImage}>Upload</button>
</form>
