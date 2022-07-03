import { Selector } from "./selector.js";

document.addEventListener("click", (e) => {
  if (e.target.closest(".selector-container")) return;
  Selector.closeAllListBoxes();
});

const selectorOne = new Selector(["Lada", "Fiat", "Kia"]);
const selectorTwo = new Selector(["Red", "Green", "Blue"]);
const selectorThree = new Selector(["JS", "CSS", "HTML", "React"]);

selectorOne.init(document.getElementById("root"));
selectorTwo.init(document.getElementById("root"));
selectorThree.init(document.getElementById("root"));
