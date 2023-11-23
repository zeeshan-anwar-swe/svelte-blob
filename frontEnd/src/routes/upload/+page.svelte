<script>
    const dropHandle = (e) => {
        e.preventDefault();
        const input = document.getElementById("fileInput");
        input.files = e.dataTransfer.files;
    };
</script>

<h1>Task 2</h1>
<a href="/">Go to Home</a>
<form
    action="http://localhost:3000/upload"
    enctype="multipart/form-data"
    class="drop-area"
    id="uploadImage"
    method="post"
    on:dragover={(e) => e.preventDefault()}
    on:drop={(e) => dropHandle(e)}
>
    <h3>Choose file to upload</h3>
    <input type="file" id="fileInput" name="fileInput" required />
    <button id="uploadBtn" type="submit">Upload</button>
</form>

<style>
    @import "../../style.css";
</style>
