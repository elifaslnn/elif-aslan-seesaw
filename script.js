const seesawPlank = document.querySelector("#seesawPlank");
const cursorPoint = document.querySelector("#cursorPoint");
const seesawContainer = document.querySelector(".seesawContainer");
const logUl = document.querySelector(".logUl");
const nextWeightInfoBox = document.querySelector("#nextWeight");
const rightWeightInfoBox = document.querySelector("#rightWeight");
const leftWeightInfoBox = document.querySelector("#leftWeight");
const tiltAngleInfoBox = document.querySelector("#tiltAngle");

const clicable = document.querySelector(".clicable");

const h4nextWeight = nextWeightInfoBox.querySelector("h4");
const h4leftWeight = leftWeightInfoBox.querySelector("h4");
const h4rightWeight = rightWeightInfoBox.querySelector("h4");
const h4tilAngle = tiltAngleInfoBox.querySelector("h4");

//getting positions
const plankPosition = seesawPlank.getBoundingClientRect();
const cursorPosition = cursorPoint.getBoundingClientRect();
const cursorWidth = cursorPosition.width / 2;
const startPlankX = plankPosition.left;
const endPlankX = startPlankX + plankPosition.width - cursorWidth;

const resetBtn = document.querySelector("#resetBtn");

let nextWeight;

//creating random number
const createRondomNumber = () => {
  let x = Math.floor(Math.random() * 10 + 1);
  //ağrılığı ui'da gösterme

  h4nextWeight.innerHTML = `${x}kg`;
  // nextWeightInfoBox.appendChild(p);
  console.log(x);
  return x;
};
//ilk ağırlığı oluştur
nextWeight = createRondomNumber();

const createWeight = (x, startPlankX) => {
  //CREATING weight and add class
  const weight = Object.assign(document.createElement("div"), {
    className: "allWeights",
  });
  //add id: first get count of planks child for set id
  const childNodesCount = seesawPlank.childElementCount; //önce 1 olacak1(cursor point var) o yüzden -1 değerini alacağım
  weight.setAttribute("id", `weight-${childNodesCount - 1}`);
  //CSS
  weight.style.height = "30px";
  weight.style.width = "30px";
  weight.style.backgroundColor = "white";
  weight.style.borderRadius = "50%";
  weight.style.textAlign = "center";
  weight.style.position = "absolute";
  weight.style.bottom = "0";
  weight.style.zIndex = 2;
  weight.style.textAlign = "center";
  weight.style.justifyItems = "center";

  weight.style.left = `${x - startPlankX - 10}px`;
  //sayıyı al
  //const randomNumber = createRondomNumber();
  //sayıyı weight İÇİNE YAZ
  weight.innerHTML = `${nextWeight}kg`;
  //seesaw' a kaydet
  seesawPlank.appendChild(weight);
  return nextWeight;
};

//çubuk üzerinde nokta belirleme
function isTouchDiv() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (error) {
    return false;
  }
}

//follow cursor to get adding weight position
const move = (e) => {
  try {
    var x = !isTouchDiv() ? e.pageX : e.touches[0].pageX;
    if (x >= startPlankX - cursorWidth + 10 && x <= endPlankX + 10) {
      cursorPoint.style.left = `${x - startPlankX - 10}px`;
      return true;
    } else {
      return false;
    }
  } catch (error) {}
};

clicable.addEventListener("mousemove", (e) => {
  move(e);
});
clicable.addEventListener("touchmove", (e) => {
  move(e);
});

let leftTorque = 0;
let rightTorque = 0;
const leftWeights = [];
const rightWeights = [];
let isLeft;

//left or right
const determiningDirectionAndDistance = (clickedPoint, weight) => {
  const centerPoint = startPlankX + (endPlankX - startPlankX) / 2;
  const distance = clickedPoint - centerPoint;
  const absoluteDistance = Math.abs(distance);
  const obj = {
    weight: weight,
    distance: absoluteDistance,
  };
  if (clickedPoint - centerPoint > 0) {
    rightWeights.push(obj);
    creatLog("right", weight, Math.floor(absoluteDistance));
  } else {
    leftWeights.push(obj);
    isLeft = true;
    creatLog("left", weight, Math.floor(absoluteDistance));
  }
};

const calculateSidesWeight = (arr) => {
  let sum = 0;
  arr.forEach((obj) => {
    sum += obj.weight;
  });
  return sum;
};

const calculateTorque = (arr) => {
  let torque = 0;
  arr.forEach((obj) => {
    torque += obj.weight * obj.distance;
  });
  return torque;
};

const calculateAngle = (rightTorque, leftTorque) => {
  const angle = Math.max(-30, Math.min(30, (rightTorque - leftTorque) / 10));
  console.log("angle: ", angle);
  return angle;
};

//log kayıtları
const creatLog = (side, weight, distance) => {
  const logLi = Object.assign(document.createElement("li"), {
    className: "log",
  });
  logLi.innerHTML = `${weight}kg added on ${side} side at ${distance}px from center`;

  logUl.appendChild(logLi);
};

//FINAL
//adding weigths to clicked point
clicable.addEventListener("click", (e) => {
  if (e.pageX >= startPlankX - cursorWidth + 10 && e.pageX <= endPlankX + 10) {
    const weight = createWeight(e.pageX, startPlankX);
    nextWeight = createRondomNumber();
    determiningDirectionAndDistance(e.pageX, weight);
    const leftTorque = calculateTorque(leftWeights);
    const rightTorque = calculateTorque(rightWeights);
    const angle = calculateAngle(rightTorque, leftTorque);

    seesawPlank.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    h4leftWeight.innerHTML = `${calculateSidesWeight(leftWeights)}`;
    h4rightWeight.innerHTML = `${calculateSidesWeight(rightWeights)}`;
    h4tilAngle.innerHTML = `${Math.floor(angle)}`;
  }
});

//RESET
resetBtn.addEventListener("click", () => {
  location.reload();
});
