"use strict";

import BDrawer from "./JS/AppComponents/BottomDrawer.js"

import DandDUtils from "./JS/DandDUtils.js";
import DragShadow from "./JS/DragShadow.js";
import Dummy from "./JS/Dummy.js";
import DynamicWidget from "./JS/DynamicWidget.js";
import Util from "./JS/Utils/Util.js";
import HTMLSrcRenderer from "./JS/HTMLSrcRenderer.js";
import DevUtils from "./JS/Utils/DevUtils.js";

//let content; //whole view except menubar
let controlLayer;
let controlbar;
let EditingDom; //iframe element
let canvas; //editing screen
let cssbar; //shows css settings
let selectborder; //this is the fieldset selection boundary box 
let ghostImg; //creates a ghostImg draggable element
let ghostImg_Dimensions; //gets the bounding rect of ghost
let toolbox; //load the toolbox and load widgets inside it using the tooldata defined in data.js
let dummy; //dummy view for indicating drop regions
let touchedView; // this returns the selected element to edit

//css drawer 
let css; //css drawer
let Drawer_DATA;


//modal
let modalBg;
let modaltxt;
let modalInp;
let modalCancelButton;
let modalOkButton;
var layerPane;

//here
let element_ID = 0; //integer suffix id ("example" + 1)

export let element_BEAN = {
  data: []
}


main();

function main() {

  layerPane = document.querySelector(".layer")

  // content = document.getElementsByClassName("content")[0];
  controlLayer = document.getElementsByClassName("controlLayer")[0];
  controlbar = document.getElementsByClassName("controlbar")[0];

  EditingDom = Util.$("canvas"); //iframe
  EditingDom.innerHTML = "<!DOCTYPE html> <head><style>body{margin:0px; padding:0px;}</style></head> <body> </body> </html>"
  canvas = EditingDom.contentWindow.document.body;

  cssbar = Util.$("tab_content_bar");
  selectborder = document.getElementsByClassName("control_highlighter")[0];
  ghostImg = DragShadow.createDragShadow({
    icon: "res/ic.png",
    label: "test",
    type: 1,
    custom: false
  });
  controlLayer.appendChild(ghostImg);
  ghostImg_Dimensions = ghostImg.getBoundingClientRect();

  toolbox = Util.$("toolbox");
  for (let tool of tooldata) {
    toolbox.appendChild(createWidget(tool));
  }

  dummy = Dummy.createDummy();

  touchedView = canvas;



  canvas._props = { isViewGroup: true };
  selectborder.style.visibility = "hidden";
  dummy._props = { isViewGroup: false };
  DragShadow.hideDragShadow(ghostImg);
  Dummy.showDummy(dummy, false);

  //_____css bar_____
  css = Util.$("css");

  Drawer_DATA = {
    currentPseudoSelection: "",
    currentTab: "",
    s1_ul: Util.$("s1ul"), // css drawer listview for showing css props styles
    s2_ul: Util.$('s2ul'), // showing inline attributes
    s3_ul: Util.$('s3ul'), // showing 
    s4_ul: Util.$('s4ul'),
  }


  //________css modal_________
  modalBg = Util.$("modal");
  modaltxt = Util.$("modal-property-text");
  modalInp = Util.$("modal-text-field");
  modalCancelButton = Util.$("modal-cancelbtn");
  modalOkButton = Util.$("modal-okbtn");


  init();
  hideModal();
  initTabs();
  // init_DrawerTabs();
}

function init() {
  hideModalOnClickOutside();
}



/*_____________WIDGETS____________*/


function createWidget(data) {
  let widget = document.createElement("div");
  let image = document.createElement('img');
  let label = document.createElement('p');
  widget.className = "widget-container";
  widget.id = data.label;
  widget.data = data;
  image.className = 'widget-icon';
  image.src = data.icon;
  label.className = 'widget-label';
  label.innerHTML = data.label;
  widget.draggable = true;
  widget.appendChild(image);
  widget.appendChild(label);
  drag(widget, true);
  return widget;
}

function customViewWidget(data) {

}

function drag(widget, canCreate) {
  let isHolding = false;
  let obj = {
    currentChild: undefined,
    canDrag: false,
    canCreate: canCreate,
    longclick: false,
    x: 0,
    y: 0,
    entered: false,
    bound: ghostImg_Dimensions,
    dropindex: 0,
    lastDragLocation: undefined,
    lastDragIndex: 0
  }

  //ON DRAG START
  widget.addEventListener(
    "mousedown",
    (event) => {
      event.preventDefault();
      layerPane.dispatchEvent(new Event("mousedown"));
    },
    false
  );

  //ON DRAG MOVE
  widget.addEventListener("mousemove", (event) => {
    event.preventDefault();
    layerPane.dispatchEvent(new Event("mousemove"));
  });

  //ON DRAG END
  widget.addEventListener("mouseup", (event) => {
    layerPane.dispatchEvent(new Event("mouseup"));
  });

  layerPane.addEventListener("mousedown", (event) => {
     event.preventDefault();
     event.stopPropagation()
    console.log("sjdk")
    isHolding = true;
    startDrag(widget, event, obj);
  });
  layerPane.addEventListener("mousemove", (event) => {
    event.preventDefault();
      event.stopPropagation();
    if (isHolding) {
      window.clearTimeout(obj.longclick);
      unselect();
      if (obj.canDrag) {
        moveDrag(widget, event, obj);
      } else {
        return;
      }
    } else {
      return;
    }
  });
  layerPane.addEventListener("mouseup", (event) => {
      event.stopPropagation();
    isHolding = false;
    DragShadow.hideDragShadow(ghostImg);
    window.clearTimeout(obj.longclick);
    Dummy.showDummy(dummy, false);
    dummy.remove();
    endDrag(widget, event, obj);
  });

  
}


function startDrag(widget, event, obj) {
  obj.x = (obj.canCreate) ? event.pageX - obj.bound.width : DandDUtils.getAbsPos(EditingDom).left + event.pageX - obj.bound.width;
  obj.y = (obj.canCreate) ? event.pageY - obj.bound.height : DandDUtils.getAbsPos(EditingDom).top + event.pageY - obj.bound.height;
  if (!obj.canCreate) {
    select(widget);
  }
  event.stopPropagation();
  obj.longclick = window.setTimeout(() => {
    obj.canDrag = true;
    if (obj.canDrag) {
      triggerDrag(widget, obj, obj.x, obj.y);
    }
  }, 500);
}

//perform this function on drag start
function triggerDrag(widget, obj, x, y) { //HELPER>> startDrag()
  window.navigator.vibrate(100);
  if (!obj.canCreate) {
    let par = widget.parentElement;
    obj.lastDragLocation = par;
    obj.lastDragIndex = Util.indexOf(widget)
    widget.remove(); //remove the widget for dragging
    DynamicWidget.updateDataBean(par, true);
    unselect();
  }
  DragShadow.startDragShadow(ghostImg);
  DragShadow.moveShadow(ghostImg, x, y);
}


function moveDrag(widget, event, obj) {
  obj.x = (obj.canCreate) ? event.pageX - obj.bound.width : DandDUtils.getAbsPos(EditingDom).left + event.pageX - obj.bound.width;
  obj.y = (obj.canCreate) ? event.pageY - obj.bound.height : DandDUtils.getAbsPos(EditingDom).top + event.pageY - obj.bound.height;
  DragShadow.moveShadow(ghostImg, obj.x, obj.y);
  let detect = detectTarget(obj.x, obj.y, canvas, dummy, EditingDom);
  obj.currentChild = detect.child;
  obj.entered = detect.entered;
  obj.dropindex = detect.index;
}

function detectTarget(x, y, parent, dummy, iframe) {
  let children = parent.children;
  let obj = { child: parent, entered: false, index: children.length };
  if (DandDUtils.hasEntered(x, y, parent, iframe)) {
    Dummy.addDummy(dummy, parent, obj.index);
    Dummy.showDummy(dummy, true);
    obj.entered = true
    for (let index = 0; index < children.length; ++index) {
      obj.child = children[index];
      if (DandDUtils.hasEntered(x, y, obj.child, iframe)) {
        if (obj.child !== dummy) {
          if (obj.child._props.isViewGroup) {
            return detectTarget(x, y, obj.child, dummy, iframe);
          } else {
            obj.child = parent;
            obj.index = index;
            obj.entered = true;
            Dummy.addDummy(dummy, parent, index);
            return obj;
          }
        }
      }
    }
  } else {
    Dummy.removeDummy(dummy)
  }
  obj.child = parent;
  return obj;
}



function endDrag(widget, event, obj) {
  if (obj.entered) {
    if (obj.canCreate) {
      if (obj.currentChild._props.isViewGroup === true) {
        let newelem = DynamicWidget.createElementFrom(widget.data, element_ID);
        drag(newelem, false);
        element_ID++;
        obj.currentChild.insertBefore(newelem, obj.currentChild.children[obj.dropindex]); //getElementIndex(currentChild, x, y)]);
        DynamicWidget.updateDataBean(obj.currentChild);
      }
    } else {
      obj.currentChild.insertBefore(widget, obj.currentChild.children[obj.dropindex]); //getElementIndex(currentChild, x, y)]);
      DynamicWidget.updateDataBean(obj.currentChild);
    }
    obj.canDrag = false;
  } else if (!obj.canCreate && obj.canDrag) {
    obj.canDrag = false;
    obj.lastDragLocation.insertBefore(widget, obj.lastDragLocation.children[obj.lastDragIndex]); //getElementIndex(currentChild, x, y)]);
    DynamicWidget.updateDataBean(obj.lastDragLocation);
  }
  obj.entered = false;
  EditingDom.innerHTML = `<!DOCTYPE html> <head><style>body{margin:0px; padding:0px;}</style></head> <body> ${canvas.innerHTML} </body> </html>`;
}







//selects the target element
function select(elem) {
  touchedView = elem;
  controlbar.innerHTML = "∆ " + elem.id;
  let bounds = DandDUtils.getAbsPosInsideCanvas(elem, EditingDom);
  selectborder.style.left = bounds.left + "px";
  selectborder.style.top = bounds.top + "px";
  selectborder.style.width = bounds.width + "px";
  selectborder.style.height = bounds.height + "px";
  selectborder.style.visibility = "visible";
  loadCssPropsToList(elem); //css drawer section1
  show(css, true);
}

//unselect all elements
function unselect() {
  selectborder.style.visibility = "hidden";
  show(css, false);
}




//____________________CSS PROPS DRAWER___________________

function initTabs() {
  let tabContainer = document.getElementsByClassName('cssnav')[0];
  let sectionContainer = Util.$('sections');
  let tabs = tabContainer.getElementsByClassName("tab");
  let sections = sectionContainer.getElementsByClassName('sec');
  for (let i = 0; i < sections.length; ++i) {
    sections[i].style.display = 'none';
  }
  sections[0].style.display = 'flex';
  tabs[0].style.background = '#233243';
  for (let n = 0; n < tabs.length; ++n) {
    tabClickListener(tabs[n], tabs, sections, n);
  }
}

function tabClickListener(tab, tabs, sections, num) {
  tab.addEventListener('click', () => {
    for (let n1 = 0; n1 < sections.length; ++n1) {
      if (n1 == num) {
        tabs[n1].style.background = '#233243';
        sections[n1].style.display = 'flex';
      } else {
        tabs[n1].style.background = 'transparent';
        sections[n1].style.display = 'none';
      }
    }
  });
}






//____________________CSS PROPS DRAWER - SECTION 1_____________

function loadCssPropsToList(elem) {
  Drawer_DATA.s1_ul.innerHTML = "";
  Drawer_DATA.s2_ul.innerHTML = "";
  Drawer_DATA.s3_ul.innerHTML = "";
  Drawer_DATA.s4_ul.innerHTML = "";


  let styleobj = elem._props.styles;
  let attrobj = elem._props.attrs;
  let pseudoclassobj = elem._props.pseudoclass;
  let pseudoelementobj = elem._props.pseudoelement;

  for (let prop1 in styleobj) {
    Drawer_DATA.s1_ul.appendChild(customListItem(elem, prop1, styleobj, 'styles'));
  }
  for (let prop2 in attrobj) {
    Drawer_DATA.s2_ul.appendChild(customListItem(elem, prop2, attrobj, 'attrs'));
  }
  for (let prop3 in pseudoclassobj) {
    Drawer_DATA.s3_ul.appendChild(customListItem(elem, prop3, pseudoclassobj, 'pseudoclass'));
  }
  loadSubTab(Util.$('pseudoclass'), elem, Drawer_DATA.s3_ul, 'pseudoelement');

  loadPseudoElements(elem, pseudoelementobj, 'pseudoelement')
}

function loadPseudoClasses(elem, obj, hinttype) {}

function loadPseudoElements(elem, obj, hinttype) {
  for (let prop4 in obj) {
    Drawer_DATA.s4_ul.appendChild(customListItem(elem, prop4, obj, hinttype));
  }
  loadSubTab(Util.$('pseudoelement'), elem, Drawer_DATA.s4_ul, hinttype);
}


function customListItem(elem, prop, obj, hinttype) {
  let item = document.createElement("li");
  item.className = "item";
  //item.setAttribute('propvalue' , object[prop]);
  item.innerHTML = `
          <img src = './res/ic1.png' class='item_icon'>
          </img>
          <p class ='item_label'>${prop}</p>
  `
  item.onclick = (ev) => {
    handleClick(ev, elem, prop, obj, hinttype);
  };
  return item;
}

function handleClick(event, elem, prop, object, hinttype) {
  // event.preventDefault();
  event.stopPropagation();
  showModal(elem, prop, object, hinttype);
}


//_______________css Pseudo elements tab____________
function loadSubTab(subtab, elem, listview, hinttype) {
  subtab.innerHTML = "";
  let prop = subtab.id.toString();
  let psSelect = PseudoTypeSelector(elem, prop);
  psSelect.onchange = () => {
    let obj = elem._props[prop];
    Drawer_DATA.currentPseudoSelection = psSelect.value;
    listview.innerHTML = "";
    for (let item in obj[psSelect.value]) {
      listview.appendChild(customListItem(elem, item, obj[psSelect.value], hinttype));
    }
  }
  subtab.appendChild(psSelect);
  subtab.appendChild(AddCustomSelector('jfj'))
}


//selector for pseudo selectors like hover , active etc
function PseudoTypeSelector(elem, prop) {
  let sel = document.createElement("select");
  sel.className = 'subtab-item';
  for (let option in elem._props[prop]) {
    let opt = document.createElement('option');
    opt.text = option;
    sel.options.add(opt, 0);
  }
  return sel;
}

//returns a button which iw used to add custom pseudoselectors
function AddCustomSelector(type) { //type{ pClass , pElement}
  let but = document.createElement('modal');
  but.className = 'subtab-item';
  but.innerText = 'Add Selector';
  but.onclick = () => {
    but.show;
    switch (type) {
      case 'pClass':
        break;
      case 'pElement':
        break
    }
  }
  return but;
}






//____________________CSS MODAL___________________________


function showModal(elem, property, obj, hinttype) {
  modaltxt.innerText = property;
  modalInp.value = obj[property]; //obj[property];
  modalBg.style.visibility = "visible";
  submitButtons(elem, event, property, obj, hinttype);
}

function submitButtons(elem, event, property, obj, hinttype) {
  modalOkButton.onclick = () => {
    event.stopPropagation();
    switch (hinttype) {
      case 'styles':
        elem.style[property] = modalInp.value;
        elem._props.styles[property] = modalInp.value;
        break;
      case 'attrs':
        elem[property] = modalInp.value;
        elem._props.attrs[property] = modalInp.value;
        break;
      case 'pseudoclass':
        elem._props.pseudoclass[Drawer_DATA.currentPseudoSelection][property] = modalInp.value;
        break;
      case 'pseudoelement':
        elem._props.pseudoelement[Drawer_DATA.currentPseudoSelection][property] = modalInp.value;
        break;
    }
    hideModal();
  }
}

//used to hide modal on touching on Modal background
function hideModalOnClickOutside() {
  modalBg.onclick = () => {
    event.stopPropagation();
    modalBg.style.visibility = "hidden";
  }
  modalInp.onclick = () => {
    event.stopPropagation();
  }
}

function hideModal() {
  modalBg.style.visibility = "hidden";
}




//________________NAVBAR_________________


let editor_btn = Util.$("nav_item1");
let source_btn = Util.$("nav_item2");
let preview_btn = Util.$("nav_item3");

let editorpage = Util.$("editorpage");
let sourcepage = Util.$("sourcepage");
let previewpage = Util.$("previewpage");



show(editorpage, true);
show(sourcepage, false);
show(previewpage, false);
highlight(1);
editor_btn.addEventListener("click", () => {
  show(editorpage, true);

  show(sourcepage, false);
  show(previewpage, false);
  highlight(1);
});

source_btn.addEventListener("click", () => {
  show(editorpage, false);
  show(css, false);
  show(sourcepage, true);
  show(previewpage, false);

  element_BEAN = { data: {} };
  getData(canvas);
  sourcepage.innerText = HTMLSrcRenderer.renderHTMLSource(element_BEAN.data).html + "\n\n\n" + HTMLSrcRenderer.renderHTMLSource(element_BEAN.data).css + "\n\n\n" + JSON.stringify(element_BEAN, undefined, 4); //format(EditingDom.innerHTML);
  highlight(2);
});

//gets appropriate exportable object data
function getData(iframe) {
  let arr = iframe.children;
  for (let i = 0; i < arr.length; ++i) { //(let elem of iframe.children) {
    let elem = arr[i];
    element_BEAN.data[elem.id] = elem._props;
    if (arr[i + 1] !== undefined) {
      element_BEAN.data[elem.id].next = arr[i + 1].id;
    }
    getData(elem);
  }
}



preview_btn.addEventListener("click", () => {
  show(editorpage, false);
  show(css, false);
  show(sourcepage, false);
  show(previewpage, true);
  highlight(3);
  getData(canvas);
  previewpage.srcdoc = `<!DOCTYPE html> <head><style>body{margin:0; padding:0;}${HTMLSrcRenderer.renderHTMLSource(element_BEAN.data).css}</style></head> <body id='body' style='border:1px solid green;'> ${HTMLSrcRenderer.renderHTMLSource(element_BEAN.data).html} </body> </html>` // EditingDom.innerHTML;
});

function show(elem, bool) {
  if (bool) {
    elem.style.display = "grid";
  } else {
    elem.style.display = "none";
  }
}

function highlight(no) {
  switch (no) {
    case 1:
      editor_btn.style.background = "#0C1D2F";
      source_btn.style.background = "#25405D";
      preview_btn.style.background = "#25405D";
      break;
    case 2:
      source_btn.style.background = "#0C1D2F";
      editor_btn.style.background = "#25405D";
      preview_btn.style.background = "#25405D";
      break;
    case 3:
      preview_btn.style.background = "#0C1D2F";
      source_btn.style.background = "#25405D";
      editor_btn.style.background = "#25405D";
      break;
  }
}