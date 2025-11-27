const seesawPlank = document.querySelector("#seesawPlank");
const cursorPoint = document.querySelector("#cursorPoint");
const seesawContainer = document.querySelector(".seesawContainer");

//getting positions
const plankPosition = seesawPlank.getBoundingClientRect();
const cursorPosition = cursorPoint.getBoundingClientRect();
const cursorWidth = cursorPosition.width / 2;
const startPlankX = plankPosition.left;
const endPlankX = startPlankX + plankPosition.width - cursorWidth;

//creating random number
const createRondomNumber = () => {
  let x = Math.floor(Math.random() * 10 + 1);
  return x;
};

const createWeight = (x, startPlankX) => {
  //CREATING weight and add class
  //const el = Object.assign(document.createElement('div'), { className: 'foo' });
  const weight = Object.assign(document.createElement("div"), {
    className: "allWeights",
  });
  //add id: first get count of planks child for set id
  const childNodesCount = seesawPlank.childElementCount; //önce 1 olacak1(cursor point var) o yüzden -1 değerini alacağım
  weight.setAttribute("id", `weight-${childNodesCount - 1}`);
  //CSS
  weight.style.height = "25px";
  weight.style.width = "25px";
  weight.style.backgroundColor = "white";
  weight.style.borderRadius = "50%";
  weight.style.textAlign = "center";
  weight.style.position = "absolute";
  weight.style.top = "0";
  weight.style.zIndex = 2;
  weight.style.left = `${x - startPlankX - 10}px`;
  //sayıyı al
  const randomNumber = createRondomNumber();
  //sayıyı weight İÇİNE YAZ
  weight.innerHTML = randomNumber;
  //seesaw' a kaydet
  seesawPlank.appendChild(weight);
  return randomNumber;
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
    if (x >= startPlankX - cursorWidth && x <= endPlankX) {
      cursorPoint.style.left = `${x - startPlankX - 10}px`;
      return true;
    } else {
      return false;
    }
  } catch (error) {}
};

document.addEventListener("mousemove", (e) => {
  move(e);
});
document.addEventListener("touchmove", (e) => {
  move(e);
});

//adding weigths to clicked point
document.addEventListener("click", (e) => {
  if (e.pageX >= startPlankX - cursorWidth && e.pageX <= endPlankX) {
    console.log("burada");
    console.log(e.pageX);
    const weight = createWeight(e.pageX, startPlankX);
    determiningDirectionAndDistance(e.pageX, weight);
  }
});

const leftWeights = [];
const rightWeights = [];

//left or right
const determiningDirectionAndDistance = (clickedPoint, weight) => {
  const centerPoint = startPlankX + (endPlankX - startPlankX) / 2;
  //const absoluteValue = Math.abs(negativeNumber)
  const distance = clickedPoint - centerPoint;
  const absoluteDistance = Math.abs(distance);
  const obj = {
    weight: weight,
    distance: absoluteDistance,
  };
  if (clickedPoint - centerPoint > 0) {
    rightWeights.push(obj);
  } else {
    leftWeights.push(obj);
  }
  console.log("left array: ", leftWeights);
  console.log("right array: ", rightWeights);
};

const sumFunc = (arr) => {
  let sum = 0;
  arr.forEach((element) => {});
};
const calculateTorque = () => {
  //const torque = sum(weight × distance)
};
const calculateAngle = () => {
  //const angle = Math.max(-30, Math.min(30, (rightTorque - leftTorque) / 10))
};
//seesawPlank.style.transform = "translate(-50%, -50%) rotate(30deg)";
