document.addEventListener('DOMContentLoaded', function() {
    const revealBtn = document.getElementById('revealBtn');
    const hiddenMessage = document.getElementById('hiddenMessage');
    const heartsContainer = document.querySelector('.hearts-container');

    // Function to create floating hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = Math.random() * 6 + 's';
        heartsContainer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }

    // Create hearts every 300ms
    setInterval(createHeart, 300);

    // Reveal message on button click
    revealBtn.addEventListener('click', function() {
        hiddenMessage.classList.remove('hidden');
        revealBtn.style.display = 'none';
    });

    // Add click handlers to images for explode GIF
    const images = document.querySelectorAll('.clickable-image');
    images.forEach(image => {
        image.addEventListener('click', function() {
            // Create or get the explode GIF
            let explodeGif = document.querySelector('.explode-gif');
            if (!explodeGif) {
                explodeGif = document.createElement('img');
                explodeGif.src = 'assets/giphy.gif';
                explodeGif.classList.add('explode-gif');
                document.body.appendChild(explodeGif);
            }
            // Get position of the image
            const rect = image.getBoundingClientRect();
            explodeGif.style.width = rect.width + 'px';
            explodeGif.style.height = rect.height + 'px';
            explodeGif.style.left = rect.left + 'px';
            explodeGif.style.top = rect.top + 'px';
            explodeGif.style.display = 'block';
            // Hide after 2 seconds
            setTimeout(() => {
                explodeGif.style.display = 'none';
            }, 2000);
        });
    });
});
