const cardContainer = document.getElementById("card-container");
const loader = document.getElementById("loader");

const cardLimit = Infinity;
const cardIncrease = 9;
const pageCount = Math.ceil(cardLimit / cardIncrease);
let currentPage = 1;

var throttleTimer;
const throttle = (callback, time) => {
  if (throttleTimer) return;

  throttleTimer = true;

  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
};
const getRandomColor = () => {
  const h = Math.floor(Math.random() * 360);

  return `hsl(${h}deg, 90%, 85%)`;
};
const createCard = () => {
  const card = document.createElement("div");
  card.className = "card";
  card.style.backgroundColor = getRandomColor();
  cardContainer.appendChild(card);
};
const addCards = (pageIndex) => {

  const startRange = (pageIndex - 1) * cardIncrease;
  const endRange =
    currentPage == pageCount ? cardLimit : pageIndex * cardIncrease;

  for (let i = startRange + 1; i <= endRange; i++) {
    createCard(i);
  }
};
const handleInfiniteScroll = () => {
  throttle(() => {
    const endOfPage =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
    if (endOfPage) {
      addCards(currentPage + 1);
    }
    if (currentPage === pageCount) {
      removeInfiniteScroll();
    }
  }, 1000);
};
const removeInfiniteScroll = () => {
  loader.remove();
  window.removeEventListener("scroll", handleInfiniteScroll);
};
window.onload = function () {
  addCards(currentPage);
};
window.addEventListener("scroll", handleInfiniteScroll);