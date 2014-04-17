// Package definieren
this.$cc$ = {game : {}};

(function($cc$, window)
{
  function main()
  {
    // Zeichenklasse initialisieren
    var zeichnen = new $cc$.game.zeichnen(this);

    AUTOBAHN_DEBUG = true;
    DEBUG = false;

    this.connection = new autobahn.Connection(
    {
      url : 'ws://127.0.0.1:8080/ws',
      realm : 'realm1'
    });

    // Wird ausgeführt wenn die Verbindung hergestellt ist
    this.connection.onopen = function(session)
    {

      console.log("session established!");

      // Die Eventhändler
      //
      function onmousedown(mousePos)
      {
        if (DEBUG) {
           console.log(mousePos);
        }
        zeichnen.begin(mousePos[0]);
      };

      function onmousemove(mousePos)
      {
        if (DEBUG) {
           console.log(mousePos);
           console.log(zeichnen);
           console.log(zeichnen.moveOn);
        }
        zeichnen.moveOn(mousePos[0]);
      };

      // Für die verschiedenen Themen registrieren
      //
      session.subscribe('de.copycat.mousedown', onmousedown).then(
          function(subscription)
          {
            console.log("ok, subscribed with ID " + subscription.id);
          }, function(error)
          {
            console.log(error);
          });

      session.subscribe('de.copycat.mousemove', onmousemove).then(
          function(subscription)
          {
            console.log("ok, subscribed with ID " + subscription.id);
          }, function(error)
          {
            console.log(error);
          });
    };

    // Wird ausgeführt wenn die Verbindung abbricht
    this.connection.onclose = function(reason, details)
    {
      console.log("connection lost", reason);
    };

    // Öffnet die Verbindung
    this.connection.open();
   
  }

  main.prototype =
  {
    // Unsere Publishmethoden  
    publishmousedown : function(mousePos)
    {
      if (this.connection.session)
      {
        this.connection.session.publish("de.copycat.mousedown",
        [mousePos]);
      } else
      {
        console.log("cannot publish: no session");
      }
    },

    publishmousemove : function(mousePos)
    {
      if (this.connection.session)
      {
        this.connection.session.publish("de.copycat.mousemove",
        [mousePos]);
      } else
      {
        console.log("cannot publish: no session");
      }
    },

    
  };

  window.onload = function() {new main();};

}(this.$cc$, this.window));
