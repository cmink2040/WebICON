

const galleryContainer = document.getElementById('target');
galleryContainer.style.backgroundColor = 'grey';

// Function to get image files from a directory
collectImages('');
const searchButton = document.getElementById('search');
searchButton.addEventListener('input', searchQuery);

function searchQuery(e) {
    console.log(e.target.value);
    const list_of_images = document.getElementsByTagName('img');
    for(const image of list_of_images) {
        if(image.alt.includes(e.target.value)) {
            image.style.display = '';
        }
        else {
            image.style.display = 'none';
        }
    }
}

function collectImages(url) {
    fetch('http://localhost:8912/available_files/'+url).then(response => {
        console.log(response);
        return response.json();
    })
        .then (imageUrls => {
            for(const imageUrl of imageUrls) {
                if(imageUrl.endsWith('.svg') || imageUrl.endsWith('.png') || imageUrl.endsWith('.gif')) {
                    const image = document.createElement('img');
                    image.src = 'http://localhost:8912/'+url+'/'+imageUrl;
                    image.alt = imageUrl;
                    galleryContainer.appendChild(image);
                }
                else if(imageUrl=='LICENSE') {
                    continue;              
        
                }
                else {
                    collectImages(url + '/' + imageUrl);
                }
            }

        })
        .catch(error => {
            console.error('Error:', error.message);})
        
}