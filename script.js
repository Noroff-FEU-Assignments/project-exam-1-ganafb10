// script.js

document.addEventListener("DOMContentLoaded", function() {
  const carouselContainer = document.getElementById("carousel-container");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentSlideIndex = 0;

  function fetchPosts() {
    fetch("https://fascinating-malabi-5e49f3.netlify.app/wp-json/wp/v2/posts?_embed&per_page=5")
      .then(response => response.json())
      .then(data => {
        carouselContainer.innerHTML = ''; // Clear previous posts

        data.forEach((post, index) => {
          const postCard = document.createElement("div");
          postCard.classList.add("post-card");
          if (index === 0) {
            postCard.classList.add("slide-animation"); // Apply animation to the first post
          }

          const postImage = document.createElement("img");
          postImage.src = post._embedded["wp:featuredmedia"][0].source_url;
          postImage.alt = post.title.rendered;

          const postTitle = document.createElement("h3");
          postTitle.textContent = post.title.rendered;

          const postExcerpt = document.createElement("p");
          postExcerpt.textContent = post.excerpt.rendered;

          const readMoreLink = document.createElement("a");
          readMoreLink.textContent = "Read More";
          readMoreLink.href = post.link;
          readMoreLink.target = "_blank"; // Open link in a new tab

          postCard.appendChild(postImage);
          postCard.appendChild(postTitle);
          postCard.appendChild(postExcerpt);
          postCard.appendChild(readMoreLink);

          carouselContainer.appendChild(postCard);
        });
      })
      .catch(error => console.error("Error fetching latest posts:", error));
  }

  fetchPosts(); // Initial fetch

  // Fetch posts every 10 seconds
  setInterval(fetchPosts, 10000);

  // Previous button event listener
  prevBtn.addEventListener("click", function() {
    currentSlideIndex = Math.max(currentSlideIndex - 1, 0);
    updateSlide();
  });

  // Next button event listener
  nextBtn.addEventListener("click", function() {
    currentSlideIndex = Math.min(currentSlideIndex + 1, document.querySelectorAll(".post-card").length - 1);
    updateSlide();
  });

  // Function to update slide based on currentSlideIndex
  function updateSlide() {
    const postCards = document.querySelectorAll(".post-card");
    postCards.forEach((card, index) => {
      if (index === currentSlideIndex) {
        card.classList.add("slide-animation");
      } else {
        card.classList.remove("slide-animation");
      }
    });
  }
});
