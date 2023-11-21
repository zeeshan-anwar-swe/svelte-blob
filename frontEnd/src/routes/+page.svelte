<script>
    import { onMount } from "svelte";
    onMount(() => {
        fetch("http://localhost:3000/images")
            .then((response) => response.json())
            .then((data) => {
                const imageContainer =
                    document.getElementById("image-container");

                data.imageSources.forEach((imgSrc) => {
                    const img = document.createElement("img");
                    img.src = imgSrc;
                    img.alt = "Image";
                    imageContainer.appendChild(img);
                });
            })
            .catch((error) => {
                console.log("ERROR>>>", error);
                alert("Restart the server api not found");
            });
    });
</script>

<h1>Welcome to Home</h1>
<p>Visit <a href="upload">Upload</a> to upload images</p>
<div id="image-container" />

<style>
    @import "../style.css";
</style>
