export default class DevUtils{
  //________DEVELOPER OPTIONS___________
  
  //showOutlines(document.body);
  static showOutlines(elem) {
    let children, len;
    children = elem.children;
    len = children.length;
    for (let child of children) {
      if (child.style.outline !== "") {
        child.style.isOut = true;
        showOutlines(child);
      } else {
        child.style.isOut = false;
        child.style.outline = "1px solid gray";
        showOutlines(child);
      }
    }
  }
  //hideOutlines(document.body);
  static hideOutlines(elem) {
    let children, len;
    children = elem.children;
    len = children.length;
    for (let child of children) {
      if (child.style.isOut) {
        delete child.style.isOut;
        hideOutlines(child);
      } else {
        child.style.outline = "";
        delete child.style.isOut;
        hideOutlines(child);
      }
    }
  }
  
  //___________DEVELOPER OPTIONS_____________
}