window.addEventListener("load", () => {

  //connect each note with an audio sample in the samples object
  const samples = {};
  const notes = ["c", "db", "d", "eb", "e", "f", "gb", "g", "ab", "a", "bb", "b"];

  notes.forEach( note => {
    samples[note] = new Audio(`./samples/${note}.wav`);
  }); 

  //create buttons for all the notes
  const keyboard = document.getElementById("keyboard");
  
  notes.forEach( note => {
    const element = document.createElement("button")
    element.setAttribute("data-note", note);
    note.length === 1 ? element.classList.add("key", "whiteKey") : element.classList.add("key", "blackKey");
    keyboard.appendChild(element);  
  });

  //add listener to all keys that calls playNote on click 
  const keys = document.querySelectorAll(".key");

  keys.forEach( key => {
    key.addEventListener("click", e => {
      playNote(key.getAttribute("data-note"));
      
      //get coordinates of clicked element and send them with the animateKey function
      const cords = e.target.getClientRects()[0];
      animateKey(key, cords.left, cords.top);
    })
  });
  
  //play note from samples
  function playNote(note) {
    samples[note].play();
  }

  //create copy of key, and send it flying through awesome animations
  function animateKey(key, left, top) {
    const clone = key.cloneNode(true);
    
    //since black keys are offset with -15px margin, adjust it here 
    if (clone.classList.contains("blackKey")) {
      clone.setAttribute("style", `position:fixed; left:${left+15}px; top:${top}px`);
    } else {
      clone.setAttribute("style", `position:fixed; left:${left}px; top:${top}px`);
    }
    clone.classList.add("animate");
    keyboard.appendChild(clone);
    setTimeout( () => clone.remove(), 3000 );
  }
});