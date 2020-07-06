"use strict";

const mainImagesContainer = document.querySelector(".main-images");
const container = document.querySelector(".container");

// Infinite scroll
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (clientHeight + scrollTop >= scrollHeight - 5) {
    loadImages(6);
  }
});

// Fetching data from server
async function getData(data) {
  let response = await fetch("/api", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  let apiData = response.json();
  return apiData;
}

// Adding data to the page
const loadImages = (range) => {
  for (let i = 0; i < range; i++) {
    let image = document.createElement("div");
    image.classList.add("col");

    const data = { id: i };
    getData(data).then((apiData) => {
      let imageData = apiData.imageData;

      image.innerHTML = `
          <img src="${apiData.url}${imageData.id}/200/300" alt="" />
          <h4>${imageData.author}</h4>
        `;
    });
    mainImagesContainer.appendChild(image);
  }
};

loadImages(9);
