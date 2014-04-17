(function($cc$, document)
{
  "use strict";
  function zeichnen(main)
  {
    this.canvas = document.getElementById("zeichenflaeche");
    this.context = this.canvas.getContext("2d");
    this.isDown = false; //ist die Maustaste noch gedrückt

    // Mauslistener
    document.addEventListener("mousedown", (function(event)
    {
      var mousePos = this.getMousePos(event, this.canvas);
      this.begin(mousePos);
      this.isDown = true;
      main.publishmousedown(mousePos);
    }).bind(this));

    document.addEventListener("mousemove", (function(event)
    {
      if (this.isDown)
      {
        var mousePos = this.getMousePos(event, this.canvas);
        this.moveOn(mousePos);
        console.log(this);
        main.publishmousemove(mousePos);
      }
    }).bind(this));

    document.addEventListener("mouseup", (function(event)
    {
      this.isDown = false;
    }).bind(this));
  }
  ;

  zeichnen.prototype =
  {
      // Gibt die Position der Maus relativ zum Canvas an
      getMousePos: function(event, canvas) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        };
      },
      
      // Beginne einen neuen Path
      begin: function(mousePos) {
        this.context.beginPath();
        this.context.moveTo(mousePos.x, mousePos.y);
      },
      
      // Zeichne den Path
      moveOn: function(mousePos) {
        this.context.lineTo(mousePos.x, mousePos.y);
        this.context.stroke();
      }
  };

  // Im Package platzieren
  $cc$.game.zeichnen = zeichnen;

}(this.$cc$, this.document));
