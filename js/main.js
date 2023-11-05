// filtering - categories
const buttons = document.querySelectorAll(".btn"); 
const storeImages = document.querySelectorAll(".store-item"); 
// gallery
const imageList = document.querySelector(".slider-wrapper .image-list");
const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

//categories
buttons.forEach((button) => { 
    button.addEventListener("click", (e) => { 
        e.preventDefault() 
        const filter = e.target.dataset.filter

        storeImages.forEach((item) => {  
            if (filter === "all") {  
                item.style.display = "block";
            } else { 
                if (item.classList.contains(filter)) { 
                    item.style.display = "block";
                } else { 
                    item.style.display = "none";  
                } 
            } 
        }) 
    }) 
})  

//gallery

// Handle scrollbar thumb drag
scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;
    const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
    
    // Update thumb position on mouse move
    const handleMouseMove = (e) => {
        const deltaX = e.clientX - startX;
        const newThumbPosition = thumbPosition + deltaX;

        // Ensure the scrollbar thumb stays within bounds
        const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
        const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
        
        scrollbarThumb.style.left = `${boundedPosition}px`;
        imageList.scrollLeft = scrollPosition;
    }

    // Remove event listeners on mouse up
    const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }

    // Add event listeners for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
});

// Slide images according to the slide button clicks
slideButtons.forEach(button => {
    let key = button.dataset.filter;
    button.addEventListener("click", () => {
        const direction = button.id === "prev-"+ key +"-slide" ? -1 : 1;
        const scrollAmount = imageList.clientWidth * direction;
        document.getElementById("image-"+ key +"-list").scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
});

 // Show or hide slide buttons based on scroll position
const handleSlideButtons = () => {
    slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
    slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
}

// Update scrollbar thumb position based on image scroll
const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
}

// Call these two functions when image list scrolls
imageList.addEventListener("scroll", () => {
    updateScrollThumbPosition();
    handleSlideButtons();
});


