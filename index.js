const burgerMenu = document.querySelector("#burger-menu")
const orderList = document.querySelector("ul#order-list")
const burgerForm = document.querySelector("form#custom-burger")

function fetchAllBurgers(){
  fetch("http://localhost:3000/burgers")
  .then(resp => resp.json())
  .then(burgerArr => {
      burgerArr.forEach(burger => {
         putOnMenu(burger)
      })
  })
}

fetchAllBurgers()

// **********DOM Manip***

//append to menu V
function putOnMenu(burger){

    const burgerDiv = document.createElement('div')
    burgerDiv.className = "burger"
    burgerDiv.innerHTML = 
    `
     <h3 class="burger_title">${burger.name}</h3>
     <img src=${burger.image}>
     <p class="burger_description">
     ${burger.description}
     </p>
     <button class="button">Add to Order</button>
    `
    burgerMenu.append(burgerDiv)
}

//**********Event Handling */

burgerMenu.addEventListener("click", (event) => {
  
  if(event.target.className === "button"){
    
      burgerTitle = event.target.parentElement.querySelector('h3').textContent
      let burgerItem = document.createElement('li')
      burgerItem.append(burgerTitle)
      // console.log(burgerItem)
      orderList.append(burgerItem)
  }
})


// ADD Burger to MENU
burgerForm.addEventListener("submit", event =>{
    event.preventDefault()

    const newBurgerObj = {
      // id: event.target.,
      name: event.target.name.value,
      description: event.target.description.value,
      image: event.target.url.value
    }
  
  fetch(`http://localhost:3000/burgers`,{
    method: "POST",
    headers:
    {
      'Content-Type': "application/json",
       'Accept': "application/json"
    },
    body: JSON.stringify(newBurgerObj)
  })
    burgerForm.reset()
})




