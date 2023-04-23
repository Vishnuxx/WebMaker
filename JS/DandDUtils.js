//____________Drag and Drop______________

"use strict";

export default class DandDUtils {
  //value: boolean >> checks wheather touch entered or not
  static hasEntered(x, y, target, iframe) {
    let bound = DandDUtils.getAbsPosInsideCanvas(target, iframe); // target.getBoundingClientRect();
    return target.style.visibility !== "hidden" && (x > bound.left && x < (bound.left + bound.width) && y > bound.top && y < (bound.top + bound.height));
  }


  //returns the index of a viewgroup inside parent element
  static getElementIndex(parent, x, y, iframe) {
    let index;
    let children = parent.children;
    let count = children.length;
    for (index = 0; index < count; ++index) {
      let child = children[index];
      if (DandDUtils.hasEntered(x, y, child, iframe)) {
        count = index;
        return count;
      }
    }
    return count;
  }


  static hasDummy(parent) {
    let child;
    for (child of parent.children) {
      if (child === dummy) {
        return true;
      }
    }
    return false;
  }

  //gets absolute position of an element relative to the document
  static getAbsPos(element) {
    let b = element.getBoundingClientRect();
    return {
      top: b.top + window.scrollY,
      left: b.left + window.scrollX,
      width: b.width,
      height: b.height
    }
  }

  //returns abs position relwtive to document + abs pos of iframe
  static getAbsPosInsideCanvas(element, iframe) {
    let iframeBounds = DandDUtils.getAbsPos(iframe);
    let b = DandDUtils.getAbsPos(element); //element.getBoundingClientRect();
    return {
      top: b.top + iframeBounds.top + iframe.contentWindow.scrollY + window.scrollY,
      left: b.left + iframeBounds.left + iframe.contentWindow.scrollX + window.scrollX,
      width: b.width ,
      height: b.height
    }
  }

}