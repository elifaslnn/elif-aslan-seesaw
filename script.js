//creating random number
let x = Math.floor(Math.random() * 10 + 1);
console.log(x);

//CREATING CIRCLE
const circle = document.createElement("div");
//CSS
circle.style.height = "25px";
circle.style.width = "25px";
circle.style.backgroundColor = "white";
circle.style.borderRadius = "50%";
circle.style.textAlign = "center";

//APIRLIK TEXT İ OLUŞTUR
const weight = document.createElement("p");
weight.innerHTML = x;

circle.appendChild(weight);
//CONTAINERA EKLE
const seesawContainer = document.querySelector(".seesawContainer");

seesawContainer.appendChild(circle);

//çubuk üzerinde nokta belirleme

const seesawPlank = document.querySelector("#seesawPlank");
const cursorPoint = document.querySelector("#cursorPoint");

function isTouchDiv() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (error) {
    return false;
  }
}

//follow cursor for add weights
const plankPosition = seesawPlank.getBoundingClientRect();
const cursorPosition = cursorPoint.getBoundingClientRect();
const cursorWidth = cursorPosition.width / 2;
const startPlankX = plankPosition.left;
const endPlankX = startPlankX + plankPosition.width - cursorWidth;

const move = (e) => {
  try {
    var x = !isTouchDiv() ? e.pageX : e.touches[0].pageX;
  } catch (error) {}

  console.log(x);
  if (x >= startPlankX - cursorWidth && x <= endPlankX)
    cursorPoint.style.left = `${x - startPlankX - 10}px`;
};

document.addEventListener("mousemove", (e) => {
  move(e);
});
document.addEventListener("touchmove", (e) => {
  move(e);
});
