document.addEventListener('DOMContentLoaded', function() {
    const heartsContainer = document.querySelector('.hearts-container');
    const galleryImagesContainer = document.getElementById('galleryImages');
    const revealBtn = document.getElementById('revealBtn');
    const hiddenMessage = document.getElementById('hiddenMessage');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');

    // Array of photo objects with src and alt
    const photos = [
        { src: 'assets/IMG_20240124_220612_368.jpg', alt: 'Memory 1' },
        { src: 'assets/IMG_20240510_113744.jpg', alt: 'Memory 2' },
        { src: 'assets/IMG_20240822_140512.jpg', alt: 'Memory 3' },
        { src: 'assets/IMG_20250110_123704.jpg', alt: 'Memory 4' },
        { src: 'assets/IMG_20250124_004337_735.jpg', alt: 'Memory 5' },
        { src: 'assets/IMG_20250205_162302.jpg', alt: 'Memory 6' },
        { src: 'assets/IMG_20250205_162816.jpg', alt: 'Memory 7' },
        { src: 'assets/IMG_20250205_162825.jpg', alt: 'Memory 8' },
        { src: 'assets/IMG_20250312_121916.jpg', alt: 'Memory 9' },
        { src: 'assets/Videoframe_20240216_190316_com.huawei.himovie.overseas.jpg', alt: 'Memory 10' }
    ];

    // GIF URLs for explosion effects (cycled)
    const explosionGifs = [
        'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWxrcnN0Nmt5MmloMTh3aWhjYXdxYmU4bmFmM3Rhb3dnamM4aHFyNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/BfQSemy35U6AvmBvuJ/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExN252dzNmeGgwbG84eXY5bGNvbHlnazlpOXgwMGZvdXpzdnJ1em90MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/k8khAAHuNPw1PMWN1r/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExejFudnloNndubmF6azBwa2h1czNvZTBsOGdlMm1lZjM0aHl1NTk3OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/nifCXJOTfAk7psRVn6/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmdsbTM2NXRnc3c3aWpyaGQweHg1eXpjMjhsOXQ4aTFsdDYxM3R6ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/lOaMPfXXuaw5PRSDZv/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWp6aDNnaW1sczBxb3I4eTk2YjFxOTJxcnFxbHZmNWNnNHp2b2pyNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/W2hSXUFEruSuRSFe8K/giphy.gif'
    ];

    let gifIndex = 0;
    let activePhotos = [];

    // Event listener for reveal button
    revealBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        setTimeout(() => hiddenMessage.classList.remove('hidden'), 100);
        // Burst of hearts
        for (let i = 0; i < 20; i++) {
            setTimeout(() => createFloatingHeart(), i * 100);
        }
    });

    // Event listener for close button
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        hiddenMessage.classList.add('hidden');
    });

    // Event listener for clicking outside modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            hiddenMessage.classList.add('hidden');
        }
    });

    // Create heart buttons for each photo
    photos.forEach((photo, index) => {
        const heartBtn = document.createElement('button');
        heartBtn.classList.add('heart-button');
        heartBtn.innerHTML = '❤️';
        heartBtn.title = photo.alt;
        heartBtn.dataset.index = index;

        galleryImagesContainer.appendChild(heartBtn);

        // Click event to explode heart and show photo
        heartBtn.addEventListener('click', () => {
            explodeHeart(heartBtn);
        });
    });

    // Function to create exploding hearts animation at element position using GIFs
    function explodeHeart(element) {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        // Select GIF URL cyclically
        const gifUrl = explosionGifs[gifIndex];
        gifIndex = (gifIndex + 1) % explosionGifs.length;

        // Create GIF element for explosion effect
        const gif = document.createElement('img');
        gif.src = gifUrl;
        gif.style.position = 'fixed';
        gif.style.left = (x - 75) + 'px'; // Center the gif (assuming 150px width)
        gif.style.top = (y - 75) + 'px';  // Center the gif (assuming 150px height)
        gif.style.width = '150px';
        gif.style.height = '150px';
        gif.style.pointerEvents = 'none';
        gif.style.zIndex = '1000';

        document.body.appendChild(gif);

        // Remove GIF after 1.5 seconds (duration of gif)
        setTimeout(() => {
            gif.remove();

            // After explosion, replace heart button with photo
            const index = parseInt(element.dataset.index);
            const photo = photos[index];

            const img = document.createElement('img');
            img.src = photo.src;
            img.alt = photo.alt;
            // Remove pop-in class to disable pop animation
            // img.classList.add('pop-in');

            element.replaceWith(img);

            // Add click event to toggle back to heart button
            img.addEventListener('click', () => {
                img.replaceWith(element);
            });

            // Add to active photos for continuous floating
            if (!activePhotos.includes(img.src)) {
                activePhotos.push(img.src);
            }
        }, 1500);
    }

    // Function to create floating photo like hearts
    function createFloatingPhoto() {
        if (activePhotos.length > 0) {
            const src = activePhotos[Math.floor(Math.random() * activePhotos.length)];
            const floatingImg = document.createElement('img');
            floatingImg.src = src;
            floatingImg.style.position = 'fixed';
            floatingImg.style.left = Math.random() * 100 + 'vw';
            floatingImg.style.top = '0px';  // Set to very top border of window
            floatingImg.style.width = '32px';
            floatingImg.style.height = '32px';
            floatingImg.style.borderRadius = '50%';
            floatingImg.style.objectFit = 'cover';
            floatingImg.style.zIndex = '500';
            floatingImg.style.pointerEvents = 'none';
            floatingImg.style.animation = 'floatHeart 6s infinite';
            floatingImg.style.animationDelay = Math.random() * 6 + 's';
            document.body.appendChild(floatingImg);

            setTimeout(() => {
                floatingImg.remove();
            }, 6000);
        }
    }

    // Floating hearts animation (background)
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = Math.random() * 6 + 's';
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }

    setInterval(createFloatingHeart, 300);
    setInterval(createFloatingPhoto, 300);
});

document.addEventListener('DOMContentLoaded', function() {
    const deepMessageBtn = document.getElementById('deepMessageBtn');
    const deepMessageAudio = document.getElementById('deepMessageAudio');

    if (deepMessageBtn && deepMessageAudio) {
        deepMessageBtn.addEventListener('click', () => {
            if (deepMessageAudio.paused) {
                deepMessageAudio.play();
            } else {
                deepMessageAudio.pause();
            }
        });
    }
});

