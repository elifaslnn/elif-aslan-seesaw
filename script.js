const seesawPlank = document.querySelector("#seesawPlank");
const cursorPoint = document.querySelector("#cursorPoint");
const seesawContainer = document.querySelector(".seesawContainer");

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
  //add
  //first get count of planks child for set id
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

//follow cursor for add weights
const plankPosition = seesawPlank.getBoundingClientRect();
const cursorPosition = cursorPoint.getBoundingClientRect();
const cursorWidth = cursorPosition.width / 2;
const startPlankX = plankPosition.left;
const endPlankX = startPlankX + plankPosition.width - cursorWidth;

const move = (e) => {
  try {
    var x = !isTouchDiv() ? e.pageX : e.touches[0].pageX;
    if (x >= startPlankX - cursorWidth && x <= endPlankX) {
      cursorPoint.style.left = `${x - startPlankX - 10}px`;
      //   document.addEventListener("click", () => {
      //     console.log(x);
      //     //weight.style.left = `${x - startPlankX - 10}px`;
      //     createWeight(x, startPlankX);
      //   });
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

document.addEventListener("click", (e) => {
  if (e.pageX >= startPlankX - cursorWidth && e.pageX <= endPlankX) {
    console.log("burada");
    console.log(e.pageX);
    createWeight(e.pageX, startPlankX);
  }
  //createWeight(e.pageX, startPlankX);
});
//seesawPlank.style.transform = "translate(-50%, -50%) rotate(30deg)";
