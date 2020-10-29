window.addEventListener("load", () => {

  // --- variables ---
  const samples = {};
  const notesAndButtons = [
    ["C", "d"],
    ["Db", "r"],
    ["D", "f"],
    ["Eb", "t"],
    ["E", "g"],
    ["F", "h"],
    ["Gb", "u"],
    ["G", "j"],
    ["Ab", "i"],
    ["A", "k"],
    ["Bb", "o"],
    ["B", "l"],
  ];

  // --- functions ---

  //create the keyboard inside specified div
  function createKeyboard(div) {
    //connect each note with an audio sample in the samples object
    notesAndButtons.forEach( note => {
      samples[note[0]] = new Audio(`./samples/${note[0]}.wav`);
    }); 

    //create buttons for all the notesAndButtons
    notesAndButtons.forEach( note => {
      const element = document.createElement("button")
      element.setAttribute("data-note", note[0]);
      element.setAttribute("data-button", note[1]);
      note[0].length === 1 ? element.classList.add("key", "whiteKey") : element.classList.add("key", "blackKey");
      div.appendChild(element);  
    });
  }

  //create labels for each key
  function createLabels() { 
    keys.forEach( key => {
      const cords = key.getBoundingClientRect();

      const note = key.getAttribute("data-note");
      let noteLabel = document.createElement("label");
      noteLabel.innerHTML = note
      noteLabel.classList.add("keyLabel", "noteLabel");

      const button = key.getAttribute("data-button");
      let buttonLabel = document.createElement("label");
      buttonLabel.innerHTML = button.toUpperCase()
      buttonLabel.classList.add("keyLabel", "buttonLabel", "hidden")
      
      //set style with coordinates and append it to correct div
      if (key.classList.contains("whiteKey")) {
        noteLabel = positionElementByCords(noteLabel, cords.left+15, cords.top+205)
        buttonLabel = positionElementByCords(buttonLabel, cords.left+15, cords.top+205)
        document.getElementById("whiteLabels").append(noteLabel, buttonLabel);
      } else {
        noteLabel = positionElementByCords(noteLabel, cords.left, cords.top-40)
        buttonLabel = positionElementByCords(buttonLabel, cords.left, cords.top-40)
        document.getElementById("blackLabels").append(noteLabel, buttonLabel);
      }
    });
  }

  //play note from samples
  function playNote(note) {
    samples[note].play();
  }

  //create a copy of key, and send it flying through awesome animations
  function animateKey(key, left, top) {
    let clone = key.cloneNode(true);
    
    //set coordinates for keys and since black keys are offset with -15px margin, adjust it here 
    if (clone.classList.contains("blackKey")) {
      clone = positionElementByCords(clone, left+15, top)
    } else {
      clone = positionElementByCords(clone, left, top);
    }
    clone.classList.add("animate");
    keyboard.appendChild(clone);
    setTimeout( () => clone.remove(), 3000 );
  }

  //make an element fixed to a specific place on the users screen
  function positionElementByCords(element, x, y) {
    const newElement = element.cloneNode(true)
    newElement.setAttribute("style", `position:fixed; left:${x}px; top:${y}px`);
    return newElement;
  }

  function keyPressed(key) {
    playNote(key.getAttribute("data-note"));
    
    //get coordinates of element and pass as arguments to the animateKey function
    const cords = key.getBoundingClientRect();
    animateKey(key, cords.left, cords.top);
  }

  // --- program start ---

  //create keyboard 
  const keyboard = document.getElementById("keyboard");
  createKeyboard(keyboard); 

  //create labels
  const keys = document.querySelectorAll(".key");
  createLabels();

  // --- event listeners --- 

  //add listeners to all keys that calls playNote on click and on button press
  keys.forEach( key => {
    key.addEventListener("click", e => {
      keyPressed(key);
    });
  });

  document.addEventListener("keydown", function(e) {
    keys.forEach( key => {
      if(key.getAttribute("data-button") === e.key) {
        keyPressed(key);
      }
    });
  })

  document.getElementById("showNotes").addEventListener("click", e => {
    document.querySelectorAll(".noteLabel").forEach( label => {
      label.classList.remove("hidden");
    });

    document.querySelectorAll(".buttonLabel").forEach( label => {
      label.classList.add("hidden");
    });
  })

  document.getElementById("showButtons").addEventListener("click", e => {
    document.querySelectorAll(".noteLabel").forEach( label => {
      label.classList.add("hidden");
    });

    document.querySelectorAll(".buttonLabel").forEach( label => {
      label.classList.remove("hidden");
    });
  })

});