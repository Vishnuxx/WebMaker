
export default class BDrawer{
  
  static Drawer(method , parent){
     let obj = {
       drawer: BDrawer.create('div' , {id: 'css' , className: 'css'}) ,
       navPane: BDrawer.create('div', {id: 'cssnav', className: 'cssnav' })
       
     }
     method(obj);
     parent.appendChild(obj.drawer);
  }
  
  static create(tagname, attrs) {
    let a = document.createElement(tagname);
    for (let attr in attrs) {
      a[attr] = attrs[attr];
    }
    return a;
  }
  
  static addTabs(obj , parent){
    for(ob of object){
      le
    }
  }

/*  
  static init_DrawerTabs() {
  let sections = document.getElementsByClassName('sec');
  let drawerTabs = css.getElementsByClassName('cssnav')[0].getElementsByTagName('li');
  drawerTabs[0].style.background = "#233243"
  let ind = 0;
  for (let tab of drawerTabs) {
    sections[ind].style.display = 'none';
    tab.onclick = () => {
       clickHandler(sections, tab)
    }
  }

  sections[0].style.display = 'flex';

  function clickHandler(sections, tab) {
    let index = 0;
    for (let tabl of drawerTabs) {
      if (tab === tabl) {
        tabl.style.background = "#233243";
        tabl.style.borderTop = "2px solid lightblue"
        sections[index].style.display = 'flex';
      } else {
        tabl.style.background = "transparent";
        tabl.style.borderTop = ""
        sections[index].style.display = 'none';
      }
      index++;
    }
  }
}*/

}