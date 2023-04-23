export default class{
  
  //_____________FLUTTER RENDERER___________________

static renderFlutter(beans) {
  let tab = '\t';
  return renderFlutterWidget(beans, "elem0", tab);
}

static renderFlutterWidget(beans, name, tab) {
  let str = "";
  let obj = beans[name];
  tab += '\t';
  if (obj !== undefined) {
    let child = (obj.child !== "") ? renderFlutterWidget(beans, obj.child, tab) : "";
    let nxt = (obj.next !== "") ? renderFlutterWidget(beans, obj.next, tab) : "";
    str = `${obj.label}( \n ${tab} ${renderProps(obj.attrs , tab)}   ${tab} child: ${child} ,  ${tab} ${nxt} \n ${tab})`;
  }

  return str;
}

static renderProps(attrobj, tab) {
  let str = "";
  tab += '\t';
  for (let attr in attrobj) {
    str += `${attr}:"${attrobj[attr]}"\n ${tab}`
  }
  return str;
}

//________________FLUTTER RENDERER END_________________


  
}