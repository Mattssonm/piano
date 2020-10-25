window.addEventListener("load", () => {

  // --- variables ---
  const samples = {};
  const notes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

  // --- functions ---

  //create the keyboard inside specified div
  function createKeyboard(div) {
    //connect each note with an audio sample in the samples object
    notes.forEach( note => {
      samples[note] = new Audio(`./samples/${note}.wav`);
    }); 
    
    //create buttons for all the notes
    notes.forEach( note => {
      const element = document.createElement("button")
      element.setAttribute("data-note", note);
      note.length === 1 ? element.classList.add("key", "whiteKey") : element.classList.add("key", "blackKey");
      div.appendChild(element);  
    });
  }

  //create labels for each key
  function createLabels() { 
    keys.forEach( key => {
      const cords = key.getClientRects()[0];
      const note = key.getAttribute("data-note");

      let noteLabel = document.createElement("label");
      noteLabel.innerHTML = note
      noteLabel.classList.add("noteLabel");
      
      //set style with coordinates and append it to correct div
      if (key.classList.contains("whiteKey")) {
        noteLabel = positionElementByCords(noteLabel, cords.left+24, cords.top+205)
        document.getElementById("whiteLabels").appendChild(noteLabel);
      } else {
        noteLabel = positionElementByCords(noteLabel, cords.left+2, cords.top-40)
        document.getElementById("blackLabels").appendChild(noteLabel);
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

  function keyPressed(event, key) {
    playNote(key.getAttribute("data-note"));
      
      //get coordinates of clicked element and send them with the animateKey function
      const cords = event.target.getClientRects()[0];
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

  //add listener to all keys that calls playNote on click 
  keys.forEach( key => {
    key.addEventListener("click", e => {
      keyPressed(e, key);
    });
  });

});