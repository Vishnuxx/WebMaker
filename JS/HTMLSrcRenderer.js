export default class HTMLSrcRenderer {
  //_______________HTML RENDERING___________________
  //renders the html content to from the datavto peview
  

  static renderHTMLSource(beans){ //<<<Higher Order method
    return {
      html : HTMLSrcRenderer.renderHTML(beans) ,
      css : HTMLSrcRenderer.renderCss(beans)
    }
  }


  static renderHTML(beans) {
    let firstId = (Object.keys(beans)[0] !== undefined)?beans[Object.keys(beans)[0]].id : undefined;
    return (firstId !== undefined)? HTMLSrcRenderer.format(HTMLSrcRenderer.renderElementBean(beans, firstId)) : ""; //  + "\n\n\n" + HTMLSrcRenderer.renderCss(beans) : "";
  }

  static renderElementBean(beans, parentId) {
    let str;
    let obj = beans[parentId];
    if (obj !== undefined) {
      let idname = (obj.id != undefined || obj.id != "")? `id='${obj.id}'` : "";
      let clsname = (obj.className != "")? `class='${obj.className}'` : ""; //`class='${obj.className}'` : "";
      let inHtml = (obj.child !== "") ? HTMLSrcRenderer.renderElementBean(beans, obj.child) : "";
      let nxtHtml = (obj.next !== "") ? HTMLSrcRenderer.renderElementBean(beans, obj.next) : "";
      str = `<${obj.type.toLowerCase()} ${idname} ${clsname} ${HTMLSrcRenderer.renderAttr(obj.attrs)}>${inHtml}</${obj.type.toLowerCase()}> \n ${nxtHtml}`;
    } else {
      str = "";
    }
    
    return str;
  }

  static renderAttr(attrobj) { //HELPER >> renderElementbean()
    let str = "";
    for (let attr in attrobj) {
      str += `${attr} = "${attrobj[attr]}" `
    }
    return str;
  }

  //______________CSS RENDERER________________
  static renderCss(beans) {
    let css = "";
    let props = "";
    for (let obj in beans) {
      props = "";
      let styleproperties = beans[obj].styles;
      for (let css in styleproperties) {
        props += `\t${css} : ${styleproperties[css]};\n`;
      }
      css += `#${beans[obj].id}{\n${props} } \n ${HTMLSrcRenderer.renderPseudoClass(beans , obj)} \n\n`;
    }
    return css;
  }

  static renderPseudoClass(beans, obj) { //HELPER >> renderCss()
    let psdcls = "";
    let pseudoprops = beans[obj].pseudoclass;
    psdcls = "";
    for (let ps in pseudoprops) {
      let psdprop = "";
      let prop;
      for (prop in pseudoprops[ps]) {

        psdprop += `\t${prop} : ${pseudoprops[ps][prop]};\n`;
      }
      if (prop == undefined) continue;
      psdcls += `${obj}${ps}{\n${psdprop}}\n`;
    }
    return psdcls;
  }
  //_____________end___________
  
  //_____________CUSTOMVIEW____________

  static renderCustomViewHTMLSrc(customViewBeans, global_Id) {
    let firstId = (Object.keys(beans)[0] !== undefined)?beans[Object.keys(beans)[0]].id : undefined;
    return (firstId !== undefined)? HTMLSrcRenderer.format(HTMLSrcRenderer.renderElementBean(beans, firstId)) + "\n\n\n" + HTMLSrcRenderer.renderCss(beans) : "";
  }

  static renderCustomView(customViewBeans , parentId){
    let str;
    let obj = beans[parentId];
    if (obj !== undefined) {
      let inHtml = (obj.child !== "") ? HTMLSrcRenderer.renderElementBean(beans, obj.child) : "";
      let nxtHtml = (obj.next !== "") ? HTMLSrcRenderer.renderElementBean(beans, obj.next) : "";
      str = `<${obj.type.toLowerCase()} ${HTMLSrcRenderer.renderAttr(obj.attrs)}>${inHtml}</${obj.type.toLowerCase()}> \n ${nxtHtml}`;
    } else {
      str = "";
    }
    return str;
  }
  
  //______________end_____________

  static format(html) {
    var tab = '\t';
    var result = '';
    var indent = '';

    html.split(/>\s*</).forEach(function(element) {
      if (element.match(/^\/\w/)) {
        indent = indent.substring(tab.length);
      }
      result += indent + '<' + element + '>\r\n';
      if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input")) {
        indent += tab;
      }

    });

    return result.substring(1, result.length - 3);
  }


}