//creating random number
let x = Math.floor(Math.random() * 10 + 1);
console.log(x);

//creating dot
/*.dot {
  height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}*/

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
