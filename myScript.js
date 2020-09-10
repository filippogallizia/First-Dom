  
  document.addEventListener("DOMContentLoaded",function() {
    // ACCESSORS AND HELPER FUNCTIONS

  const formOne = document.querySelector('form')
  const userInput = document.querySelector('.user-input');
  const tplForm = document.querySelector('#tpl-form');
  const divContainer = document.querySelector('.wishList-item-container');
  const divFooter = document.querySelector('.wishlist-footer');
  const deleteButton = document.querySelector(".delete-btn");

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // STATE

  let items = [
    { id: uuidv4(), title: 'item one', state: false },
    { id: uuidv4(), title: 'item two', state: false },
    { id: uuidv4(), title: 'item three', state: false },
  ];

  let cleared = [];

  const FILTER_STATES = ['ALL', 'ACTIVE', 'COMPLETED', "CLEAR-COMPLETED"];
  let CURRENT_STATE = FILTER_STATES[0];


  // RENDERING

  function render() {
    divContainer.innerHTML = '';
    items.filter(itm => {
      if (CURRENT_STATE === FILTER_STATES[1]) return !itm.state;
      if (CURRENT_STATE === FILTER_STATES[2]) return itm.state;   
      return true;
    }).forEach(itm => {
      let clone = tplForm.content.cloneNode(true);
      let templateText = clone.querySelector('span');
      let templateInput = clone.querySelector('input');
      templateText.textContent = itm.title;
      templateInput.checked = itm.state;
      templateInput.setAttribute('id', itm.id);
      templateInput.addEventListener('change', checkboxChangeHandler);
      templateInput.addEventListener('change', function(e) {
        let counter = 0
        items.forEach(function(n) {
          if(n.state === true){
            counter ++
          }
          if(counter > 0) {
            deleteButton.setAttribute("style", "visibility: visible")
          } else {
            deleteButton.setAttribute("style", "visibility: hidden")
          }
        })      
      });
      divContainer.appendChild(clone);    
    });
      if (items.length === 0) {
        divFooter.setAttribute('style', 'visibility: hidden;');
        deleteButton.setAttribute("style", "visibility: hidden")
      } else {
        divFooter.setAttribute('style', 'visibility: visible;');
      }
      userInput.value = ""
      };
  render();

  function deleteCompleted() {
     items.filter(function(e) {
        return e.state;
      }).forEach(function(e) {
        cleared.push(e);
      });
      items = items.filter(function(e) {
        return !e.state;
      });
      render();
     }

  deleteButton.addEventListener("click", function(e) {
    deleteCompleted();
  })

  function setFilterState(state) {
    if (FILTER_STATES.indexOf(state) < 0) return;
    CURRENT_STATE = state;
    render();
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      setFilterState(e.target.getAttribute('data-action'));
    });
  });

  formOne.addEventListener('submit', function(event) {
    event.preventDefault();
    let userInputValue = userInput.value;
    if(userInputValue) {
      items.push({
        id: uuidv4(),
        title: userInputValue,
        state: false,
      });
      render();
      deleteCompleted();
    }
   });

  function checkboxChangeHandler() {
    const respectiveItem = items.find((itm) => itm.id === this.getAttribute('id'));
    if(respectiveItem) {
      respectiveItem.state = this.checked;
    } 
  }

}) 

  