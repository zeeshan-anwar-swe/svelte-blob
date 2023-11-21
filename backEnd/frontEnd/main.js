    fetch('http://localhost:3000/images')
    .then(response => response.json())
    .then(data => {
        const imageContainer = document.getElementById('image-container');
        
    data.imageSources.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = 'Image';
        imageContainer.appendChild(img);
    });
})
.catch(error => console.error('Error:', error));

function handleSubmit(e) { 
    const input = document.getElementById('fileInput');
    const file = input.files[0];

    if (!file) {
        console.error('No file selected');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const image = event.target.result;

        fetch('http://localhost:3000/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image }),
        })
        .then(response => console.log(response))
        .then(data => {
            ('Image uploaded successfully:', data);
        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });
    };

    reader.readAsDataURL(file);
}
