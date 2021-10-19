const taskName = ["backlog", "progress", "complete", "onHold"];

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns(listArray) {
    if (localStorage.getItem("backlogItems")) {
      listArray[0] = JSON.parse(localStorage.backlogItems);
      listArray[1] = JSON.parse(localStorage.progressItems);
      listArray[2] = JSON.parse(localStorage.completeItems);
      listArray[3] = JSON.parse(localStorage.onHoldItems);
    } else {
      listArray[0] = ["Release the course", "Sit back and relax"];
      listArray[1] = ["Work on projects", "Listen to music"];
      listArray[2] = ["Being cool", "Getting stuff done"];
      listArray[3] = ["Being uncool"];
    }
  }
  
  // Set localStorage Arrays
  function updateSavedColumns() {
    taskName.forEach((task, index) =>
      localStorage.setItem(`${task}Items`, JSON.stringify(listArray[index]))
    );
  }