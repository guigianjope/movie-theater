
//carousel

const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow, i) => {
    const itemNumber = movieLists[i].querySelectorAll("img").length;
    let clickCounter = 0;
    arrow.addEventListener("click", () => {
      const ratio = Math.floor(window.innerWidth / 320);
      clickCounter++;
      if (itemNumber - (5 + clickCounter) + (5 - ratio) >= 0) {
        movieLists[i].style.transform = `translateX(${
          movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
        }px)`;
      } else {
        movieLists[i].style.transform = "translateX(0)";
        clickCounter = 0;
      }
    });
  
    console.log(Math.floor(window.innerWidth / 270));
  });

//toggle: dark/light mode

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(".container,.movie-list-item-title,.navbar,.menu-list-item,.sidebar,.left-menu-icon,.toggle,.toggle-ball,.toggle-icon, footer");

ball.addEventListener("click", ()=>{
    items.forEach(item=>{
        item.classList.toggle("active")
    })
})



