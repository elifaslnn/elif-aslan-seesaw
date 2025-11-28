const seesawPlank = document.querySelector("#seesawPlank");
const cursorPoint = document.querySelector("#cursorPoint");
const seesawContainer = document.querySelector(".seesawContainer");
const logUl = document.querySelector(".logUl");
const nextWeightInfoBox = document.querySelector("#nextWeight");
const rightWeightInfoBox = document.querySelector("#rightWeight");
const leftWeightInfoBox = document.querySelector("#leftWeight");
const tiltAngleInfoBox = document.querySelector("#tiltAngle");

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
const popAudio = document.querySelector("#popAudio");
let nextWeight;

const weightObject = {
  1: { color: "#FFB300", width: 20 },
  2: { color: "#FF7043", width: 22 },
  3: { color: "#ff7676ff", width: 24 },
  4: { color: "#FF4081", width: 26 },
  5: { color: "#E040FB", width: 28 },
  6: { color: "#a88bf8ff", width: 30 },
  7: { color: "#7187ffff", width: 32 },
  8: { color: "#40C4FF", width: 34 },
  9: { color: "#18FFFF", width: 36 },
  10: { color: "#64FFDA", width: 38 },
};

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
  const childNodesCount = seesawPlank.childElementCount; //önce 1 olacak(cursor point var) o yüzden -1 değerini alacağım
  weight.setAttribute("id", `weight-${childNodesCount - 1}`);
  //CSS
  console.log(`${weightObject[nextWeight].width}`);
  weight.style.height = `${weightObject[nextWeight].width}px`;
  weight.style.width = `${weightObject[nextWeight].width}px`;
  weight.style.backgroundColor = `${weightObject[nextWeight].color}`;
  weight.style.borderRadius = "50%";
  weight.style.textAlign = "center";
  weight.style.position = "absolute";
  weight.style.bottom = "0";
  weight.style.zIndex = 2;
  weight.style.textAlign = "center";
  weight.style.justifyItems = "center";
  weight.style.animation = "createCircle 0.5s";

  weight.style.left = `${x - startPlankX - 10}px`;
  //sayıyı al
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

seesawPlank.addEventListener("mousemove", (e) => {
  move(e);
});
seesawPlank.addEventListener("touchmove", (e) => {
  move(e);
  cursorPoint.style.display = "none";
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
seesawPlank.addEventListener("click", (e) => {
  if (e.pageX >= startPlankX - cursorWidth + 10 && e.pageX <= endPlankX + 10) {
    popAudio.play();
    popAudio.currenTime = 0;
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

function isMobile() {
  const regex =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
}

if (isMobile()) {
  cursorPoint.style.display = "none";
}
