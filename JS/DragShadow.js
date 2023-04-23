//____________DRAG SHADOW_____________
export default class DragShadow {

  static createDragShadow(data) {
    let ghostImg = document.createElement("div");
    let icon = document.createElement("img");
    let label = document.createElement("p");
    ghostImg.className = "ghostImg";
    label.className = "ghostImg-label"
    ghostImg.style.display = "flex";
    ghostImg.style.opacity = "0.4";
    ghostImg.style.justifycanv = "start";
    ghostImg.style.border = "1px solid black";
    ghostImg.style.minWidth = "70px";
    ghostImg.style.height = "fit-canvas";
    ghostImg.style.margin = "5px";
    ghostImg.appendChild(icon);
    ghostImg.appendChild(label);
    icon.src = data.icon;
    icon.style.width = "40px";
    icon.style.height = "40px";
    label.innerHTML = data.label;
    label.style.fontSize = "10px";
    label.style.fontFamily = "600em";
    label.style.margin = "5px";
    ghostImg.style.position = "absolute";
    ghostImg.style.display = "visible";
    
    return ghostImg;
  }

  static startDragShadow(ghostImg) {
    // let ghostImg = document.getElementsByClassName("ghostImg")[0];
    ghostImg.style.visibility = "visible";
  }

  static moveShadow(ghostImg, x, y) {
    ghostImg.style.left = (x) + "px";
    ghostImg.style.top = (y) + "px";
  }

  static hideDragShadow(ghostImg) {
    ghostImg.style.visibility = "hidden";
  }

}