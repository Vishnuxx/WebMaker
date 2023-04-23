class DynamicWidget {

  //create new primitive element for the editor(div , li , input , button etc...)
  static createElementFrom(obj, element_ID) {
    let elem = document.createElement(obj.type);
    elem.id = "elem" + element_ID;
    if(elem.className == undefined){
      elem.className = obj.className;
    }
    elem._props = JSON.parse(JSON.stringify(DynamicWidget._convertToDataBean(elem, obj))); // obj;
    DynamicWidget.setDefaultAttributes(elem, elem._props);
    DynamicWidget.setDefaultStyling(elem, elem._props);
    elem.style.transition = "0.8s";
    return elem;
  }

  //styles elements using template data (templateData is in widget.templateStyles )
  static setDefaultStyling(element, obj) {
    var styles = obj.styles;
    for (let key in styles) {
      element.style[key] = styles[key];
    }
  }

  //sets attrobutes defined in widgets to newly created elements
  static setDefaultAttributes(element, obj) {
    let i;
    let txt = "";
    let attrs = obj.attrs;
    for (i in attrs) {
      if (attrs[i] != "style") {
        element.setAttribute(i, attrs[i]);
      }
    }
  }

  //widget dataye extract cheyd new element inu vendi aavishyamulla data mathram output tharum
  static _convertToDataBean(elem, obj) {
    return {
      id: elem.id,
      className: elem.className,
      type: elem.tagName,
      label: obj.label,
      isViewGroup: obj.isViewGroup,
      attrs: obj.attrs,
      styles: obj.styles,
      pseudoclass: obj.pseudoclass,
      pseudoelement: obj.pseudoelement,
      parent: "",
      child: "",
      next: ""
    }
  }
  
  //updates the values of databeans whenever the element is moved from one place to other 
static updateDataBean(parent) {
  let nxtElem;
  const children = parent.children;
  let i, len = children.length;
  (len == 0) ? parent._props.child = "": parent._props.child = children[0]._props.id; //parents child is the child at inded 0
  for (i = 0; i < len; ++i) {
    if (parent.tagName.toLowerCase() == "body") {
      if (i == 0) {
        children[i]._props.parent = "@1main-body"; //sets the first child of the body element to this name
      } else {
        children[i]._props.parent = "@$main-body"; //sets names of all other children of body to this
      }
    } else if (i == 0) {
      children[i]._props.parent = parent._props.id;

    } else {
      children[i]._props.parent = parent._props.id;
    }
    nxtElem = (i < (len - 1)) ? children[i + 1]._props.id : "-1";
    children[i]._props.next = nxtElem;
  }
}


}


export default DynamicWidget;