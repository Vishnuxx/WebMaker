export default class Util {
  //____________________HELPER METHODS______________________

  static $(elem) {
    return document.getElementById(elem);
  }

  static setStyle($element, $property, value) {
    $element.style.$property = value;
  }

  static getStyle(element, property) {
    return element.style.property;
  }

  static cloneArray(src) {
    return JSON.parse(JSON.stringify(src));
  }
  
  static indexOf(elem){
    let index = 0;
    let child = elem.previousSibling;
    while(child != null){
      ++index;
      child = child.previousSibling;
    }
    return index;
  }

  static create(tagname) {
    return document.createElement(tagname);
  }
  
  static create(tagname , nest){
    let a = document.createElement(tagname);
    for (let attr in attrs) {
      if(attr != 'child'){
        a.setAttribute(attr, attrs[attr]);
      }else{
        a.appendChild(attrs[attr]);
      }
    }
    return a;
  }

  static create(tagname, attrs) {
    let a = document.createElement(tagname);
    for (let attr in attrs) {
      a.setAttribute(attr, attrs[attr]);
    }
    return a;
  }
}