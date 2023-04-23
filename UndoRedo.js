class Tracker {
  list = [];
  index = 0;
  object;
  count = 0;
  constructor() {
    this.list = [];
    this.index = 0;
    this.count = 0;
  }
  
 /* {
      id: ,
      attr:  ,
      value: 
    } */
  
  track(obj) {
    
    if(this.index < this.count-1){
      console.log(1)
      this.list.splice(this.index + 1 , (this.count -1)- this.index);
      this.list.push(obj);
      this.count = this.list.length;
      ++this.index;
    }else{
     // console.log(2)
      this.list.push(obj);
      this.count = this.list.length;
      ++this.index;
    }
  }

  undo(value) {
    if(this.index > 0){
      --this.index;
      return this.list[this.index];
    }else{
      return 0;
    }
  }

  redo() {
    if(this.index < (this.count-1)){
      ++this.index;
      return this.list[this.index];
    }else{
      return this.count - 1;
    }
  }
}

let a = document.getElementById("one");
let undo = document.getElementById("undo");
let redo = document.getElementById("redo");
let an = 0;

tracker = new Tracker();
a.addEventListener("click" , ()=>{
  tracker.track(an++);
  console.log(tracker.list);
});

undo.addEventListener("click" , () => {
  console.log(tracker.undo());
//  console.log(tracker.list);
});

redo.addEventListener("click", () => {
  console.log(tracker.redo());
 // console.tracker(list);
});

