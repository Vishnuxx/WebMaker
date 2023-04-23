//____________Dummy____________________
export default class Dummy {
  static createDummy() {
    let dummy = document.createElement("div");
    dummy.style.display = "block";
    dummy.style.background = "#E0e0e0";
    dummy.style.width = "60px";
    dummy.style.height = "30px";
    dummy.style.position = "relative";
    dummy.style.boxShadow = "0px 2px 3px 1px #BFBFBF"
    return dummy;
  }

  static addDummy(dummy , toview , index) {
    if (dummy.parent !== null || dummy.parent !== undefined) {
      dummy.remove();
      toview.insertBefore(dummy, toview.children[index]);
    } else {
      toview.insertBefore(dummy, toview.children[index]);
    }
  }

  static removeDummy(dummy , toview){
    if (dummy.parent !== null || dummy.parent !== undefined) {
      dummy.remove();
    }
  }

  static showDummy(dummy, bool) {
    dummy.style.visibility = (bool) ? "visible" : "hidden";
    if (bool) {
      dummy.style.display = "flex";
    } else {
      dummy.style.display = "none";
    }
  }

}