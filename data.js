//data to create template widgets
const tooldata = [
  {
    label: "Scaffold",
    type: "div",
    icon: "res/icons/plugins.png",
    custom: false,
    isViewGroup: true,
    attrs: {
      color: "white",
      padding: "PaddingField.ltr"
    },
    styles: {
      "background": "transparent",
      "outline": "0.3px solid gray",
      "display": "block",
      "padding": "8px",
      "margin": "0px",
      "width": "100%",
      "min-height": "20px",
      "height": "fit-content",
      "position ": "relative",
      "overflow": "scroll"
    },
    pseudoclass: {
      "::hover": {
        background: "red",
        color: "white"
      },
      "::before" : {
        pode: "kwopp" ,
        kollam: "myr"
      }
    },
    pseudoelement: {
      
    }
      },
  {
    label: "Button",
    type: "button",
    icon: "res/icons/button.png",
    custom: false,
    isViewGroup: false,
    attrs: {
      "contenteditable": true
    },
    styles: {
      "display": "block",
      "outline": "0px solid gray",
      "padding": "0px",
      "margin": "0px",
      "width": "40px",
      "height": "25px",
      "position": "static"
    },
    pseudoclass: {
      "::hover": {
        
      }
    },
    pseudoelement: {
      
    }
      },
  {
    label: "Image",
    type: "img",
    icon: "res/icons/image.png",
    custom: false,
    isViewGroup: false,
    attrs: {
      "src": "res/icon.png"
    },
    styles: {
      "display": "block",
      "outline": "0px solid gray",
      "padding": "8px",
      "margin": "0px",
      "width": "20px",
      "height": "20px",
      "background-repeat": "no-repeat",
      "background-position": "center",
      "background-size": "cover"
    },
    pseudoclass: {
      "::hover": {
        background: "red"
      }
    },
    pseudoelement:{
      
    }
      },
  {
    label: "input",
    type: "input",
    icon: "res/icons/input.png",
    custom: false,
    isViewGroup: false,
    attrs: {
      "type": "email",
      "placeholder": "Enter your values here"
    },
    styles: {
      "outline": "0px solid gray",
      "padding": "0px",
      "margin": "0px",
      "min-width": "100px",
      "min-height": "auto"
    },
    pseudoclass: {
      "::hover": {
        background: "red"
      }
    },
    pseudoelement:{
      
    }
      },
  {
    label: "TimePicker",
    type: "input",
    icon: "res/ic.png",
    custom: false,
    isViewGroup: false,
    attrs: {
      type: "time",
      placeholder: "name"
    },
    styles: {
      "outline": "0px solid gray",
      "padding": "0px",
      "margin": "0px",
      "min-width": "100px",
      "min-height": "auto"
    },
    pseudoclass: {
      "::hover": {
        background: "red"
      }
    },
    pseudoelement:{
      
    }
      },
  {
    label: "LocalDateTime",
    type: "input",
    icon: "res/ic.png",
    custom: false,
    isViewGroup: false,
    attrs: {
      type: "datetime-local",
    },
    styles: {

    },
    pseudoclass: {
      "::hover": {
        background: "red"
      }
    },
    pseudoelement:{
      
    }
      },
  {
    label: "MonthPicker",
    type: "input",
    icon: "res/ic.png",
    custom: false,
    isViewGroup: false,
    attrs: {
      type: "month",
    },
    styles: {

    },
    pseudoclass: {
      "::hover": {
        background: "red"
      }
    },
    pseudoelement:{
      
    }
      },
  {
    label: "paragraph",
    type: "p",
    icon: "res/ic1.png",
    custom: false,
    isViewGroup: false,
    attrs: {
      "contenteditable": "true"
    },
    styles: {
      "content": "vishnucc",
      "outline": "0px solid gray",
      "padding": "8px",
      "margin": "0px",
      "width": "fit-content",
      "height": "fit-content",
      "font-size": "10px",
      "color": "white"
    },
    pseudoclass: {
      "::hover": {
        background: "red"
      }
    },
    pseudoelement:{
      
    }
      },

  {
    label: "ColorPicker",
    type: "input",
    icon: "res/ic1.png",
    custom: false,
    isViewGroup: false,
    attrs: {
      "contenteditable": "true",
      type: "color",
      name: "color"
    },
    styles: {
      "outline": "0px solid gray",
    },
    pseudoclass: {
      "::hover": {
        background: "red"
      }
    },
    pseudoelement:{
      
    }
      },

  {
    label: "Testemonials",
    type: "div",
    icon: "res/ic.png",
    custom: false,
    isViewGroup: true,
    attrs: {

    },
    styles: {
      "outline": "0px solid gray",
      "margin": "0px",
      "padding": "8px",
      "width": "100%",
      "height": "100px",
      "background-image": "url('res/testimonials.png')",
      "background-repeat": "no-repeat",
      "background-position": "center",
      "background-size": "cover"
    },
    pseudoclass: {
      "::hover": {
        background: "red"
      }
    },
    pseudoelement:{
      
    }
      },
  {
    label: "list",
    type: "li",
    icon: "res/ic1.png",
    custom: false,
    isViewGroup: true,
    attrs: {
      "contenteditable": true
    },
    styles: {
      "outline": "0px solid gray",
      "padding": "0px",
      "margin": "0px",
      "min-width": "100px",
      "min-height": "fit-content"
    },
    pseudoclass: {
      "::hover": {
        background: "red"
      }
    },
    pseudoelement:{
      
    }
      },
  {
    label: "Selector",
    type: "selector",
    icon: "res/ic.png",
    custom: false,
    isViewGroup: false,
    attrs: {

    },
    styles: {
      "display": "flex",
      "outline": "1px solid gray",
      "padding": "8px",
      "margin": "0px",
      "width": "100px",
      "height": "30px",

    },
    pseudoclass: {
      "::hover": {
        background: "red"
      }
    },
    pseudoelement:{
      
    }
      },
  {
    label: "SlideShow",
    type: "div",
    icon: "res/ic.png",
    custom: false,
    isViewGroup: false,
    attrs: {

    },
    styles: {
      "display": "block",
      "outline": "0px solid gray",
      "padding": "8px",
      "margin": "0px",
      "width": "100%",
      "height": "100px",
      "background-image": "url('res/carausal.png')",
      "background-repeat": "no-repeat",
      "background-position": "center",
      "background-size": "cover"
    },
    pseudoclass: {
      "::hover": {
        background: "red"
      }
    },
    pseudoelement:{
      
    }
      },
  {
    label: "TopNavigation",
    type: "div",
    icon: "res/ic.png",
    custom: false,
    isViewGroup: true,
    attrs: {

    },
    styles: {
      "display": "block",
      "outline": "0px solid gray",
      "padding": "8px",
      "margin": "0px",
      "width": "100%",
      "height": "fit-content",
      "background": "black"
    },
    pseudoclass: {
      "::hover": {
        background: "red"
      }
    },
    pseudoelement:{
      
    }
      }
    ]

//template styling data is temporary data to style newly created elemets as default (eg. temporary border for div elements)
/*var templateData = {
  div: {
    "outline": "1px solid gray",
    "padding": "8px",
    "min-width": "100%",
    "min-height": "40px"
  }

};*/