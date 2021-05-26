function append(parent, el) {
  return parent.appendChild(el);
}

function makeNode(type) {
  return document.createElement(type);
}

function highlight() {
  let itemColor = this.style.color;
  if (itemColor === "black") {
    itemColor = "red";
  } else {
    itemColor = "black";
  }
  this.style.color = itemColor;
}

function filterBreed() {
  clearList(dogUl);
  getBreeds(this.value);
}

let dogDiv = document.querySelector("#dog-image-container");
let dogUl = document.querySelector("#dog-breeds");

let dogList = [];

function getImages() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  fetch(imgUrl)
    .then((response) => response.json())
    .then(function (data) {
      return data.message.map((dog) => {
        let img = makeNode("img");
        img.src = dog;
        append(dogDiv, img);
      });
    })
    .catch((err) => console.log(err));
}
function getBreeds(letter = " ") {
  const breedUrl = "https://dog.ceo/api/breeds/list/all";
  fetch(breedUrl)
    .then((response) => response.json())
    .then(function (data) {
      dogList = Object.keys(data.message);
      return dogList.map((breed) => {
        if (letter === " " || letter === breed[0]) {
          let li = makeNode("li");
          li.innerText = breed;
          li.addEventListener("click", highlight);
          append(dogUl, li);
        }
        let dropDown = document.querySelector("#breed-dropdown");
        dropDown.addEventListener("change", filterBreed);
      });
    })
    .catch((err) => console.log(err));
}

function getEverything() {
  getImages();
  getBreeds();
}

function updateDogList() {}

function clearList(list) {
  let lastLi = list.lastChild;
  while (lastLi !== null) {
    list.removeChild(lastLi);
    lastLi = list.lastChild;
  }
}

document.addEventListener("DOMContentLoaded", getEverything);
