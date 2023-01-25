// Feature#2  Burger handler
const burgerItem = document.getElementsByClassName("burger")[0]
const nav = document.getElementsByClassName("nav")[0]
const menuCloseItem = document.getElementsByClassName("nav-close")[0]
const menuLinks = document.getElementsByClassName("nav-link")

burgerItem.addEventListener("click", () => {
    nav.classList.add("nav_active")
})
menuCloseItem.addEventListener("click", () => {
    nav.classList.remove("nav_active")
})

Array.from(menuLinks).forEach(function (menuLink) {
  menuLink.addEventListener("click", (e) => {
    nav.classList.remove("nav_active")
  })
})

// Feature#3.3 Address select handler
let adressJson = `[
    {
      "dataValue": "ny",
      "data": {
        "city": "New York City",
        "phoneText": "+1 212 456 0002",
        "phone": "+12124560002",
        "adress": "9 East 91st Street"
      }
    },
  
    {
      "dataValue": "ca",
      "data": {
        "city": "Canandaigua, NY",
        "phoneText": "+1 585 393 0001",
        "phone": "+15853930001",
        "adress": "151 Charlotte Street"
      }
    },
    {
      "dataValue": "yo",
      "data": {
        "city": "Yonkers, NY",
        "phoneText": "+1 914 678 0003",
        "phone": "+19146780003",
        "adress": "511 Warburton Ave"
      }
    },
    {
      "dataValue": "sh",
      "data": {
        "city": "Sherrill, NY",
        "phoneText": "+1 315 908 0004",
        "phone": "+13159080004",
        "adress": "14 WEST Noyes BLVD"
      }
    }
  ]`

let adressList = JSON.parse(adressJson)

const elSelectCustom = document.getElementsByClassName("js-selectCustom")[0]
const elSelectCustomVal = document.getElementsByClassName("selectCustom-value")[0]
const elSelectCustomValue = elSelectCustom.children[0]
const elSelectCustomOptions = elSelectCustom.children[1]
const defaultLabel = elSelectCustomValue.getAttribute("data-value")
let adressValue
const city = document.getElementById("city")
const phoneText = document.getElementById("phoneText")
const phone = document.getElementById("phoneCall")
const adress = document.getElementById("adress")
const adressCard = document.getElementsByClassName("adressCard")[0]
let phoneLink
const contactsWrapper = document.getElementsByClassName("contacts-wrapper")[0]

// Listen for each custom option click
Array.from(elSelectCustomOptions.children).forEach(function (elOption) {
  elOption.addEventListener("click", (e) => {
    // Update custom select text too
    elSelectCustomVal.textContent = e.target.textContent
    adressValue = e.target.getAttribute("data-value")

    for (let i = 0; i < adressList.length; i++) {
      if (adressList[i].dataValue == adressValue) {
        city.textContent = adressList[i].data.city
        phoneText.textContent = adressList[i].data.phoneText
        adress.textContent = adressList[i].data.adress
        phoneLink = `location.href='tel:` + adressList[i].data.phone + `';`
        phone.setAttribute("onclick", phoneLink)
        break
      }
    }

    adressCard.classList.add("isVisible")
    elSelectCustom.classList.add("isSelected")
    elSelectCustom.classList.remove("isActive")
    // Hide Image
    contactsWrapper.classList.add("pic-hide")
  })
})

// Toggle select on label click
elSelectCustomValue.addEventListener("click", (e) => {
  elSelectCustom.classList.toggle("isActive")
})

// close the custom select when clicking outside.
document.addEventListener("click", (e) => {
  const didClickedOutside = !elSelectCustom.contains(event.target)
  if (didClickedOutside) {
    elSelectCustom.classList.remove("isActive")
  }
})




// Feature#3.2 Price plan select handler
const priceTrigger = document.getElementsByClassName("priceTrigger")
const pricePlan = document.getElementsByClassName("pricePlan")
const closeButton = document.getElementsByClassName("price-arrow")
const orderButton = document.getElementsByClassName("buttonOrder")
let planId


function selectPlan(planId) {
  clearPlans()
  if (planId != undefined) {

    document.getElementsByClassName("priceTrigger")[planId].classList.add("isSelected")
    document.getElementsByClassName("pricePlan")[planId].classList.add("isSelected")
  }
}

function clearPlans() {
  Array.from(priceTrigger).forEach(function (element) {
    element.classList.remove("isSelected")
  })
  Array.from(pricePlan).forEach(function (element) {
    element.classList.remove("isSelected")
  })
}

Array.from(priceTrigger).forEach(function (plan) {
  plan.addEventListener("click", (e) => {
    planId = e.target.getAttribute("plan-id")
    selectPlan(planId)
  })
})

Array.from(closeButton).forEach(function (button) {
  button.setAttribute("onclick", "clearPlans()")
})
Array.from(orderButton).forEach(function (button) {
  button.setAttribute("onclick", 'location.href="#contacts"')
})

// Feature#3.1 Service Category select handler

let print = () => console.log(categoriesSelected)

const buttons = document.getElementsByClassName("buttonService")
const cards = document.getElementsByClassName("card")
// let categoriesSelected;
let categoriesSelected = new Set()

function categoryCheck() {
  if (categoriesSelected.size < 3) {
    return true
  } else {
    return false
  }
}

function cardSet() {
  Array.from(cards).forEach(function (card) {
    if (categoriesSelected.size != 0) {
      if (categoriesSelected.has(card.getAttribute("category-id"))) {
        card.classList.add("isSelected")
        card.classList.remove("notSelected")
      } else {
        card.classList.remove("isSelected")
        card.classList.add("notSelected")
      }
    } else {
      card.classList.remove("notSelected")
      card.classList.remove("isSelected")
    }
  })
}

/* function buttonSet2() {
  for (i; i < 3; i++) {
    button = buttons[i]

  } */

function buttonSet() {
  Array.from(buttons).forEach(function (button) {
    button.classList.add("buttonService_isActive")
    if (categoriesSelected.has(button.getAttribute("category-id"))) {
      button.classList.add("buttonService_isSelected")
      button.classList.remove("buttonService_notSelected")
    } else {
      if (categoriesSelected.size != 2) {
        button.classList.remove("buttonService_isSelected")
        button.classList.add("buttonService_notSelected")
      } else {
        button.classList.remove("buttonService_isActive")
      }
    }
  })
}

function service (currentCat) {
  if (!categoriesSelected.has(currentCat)) {
    categoriesSelected.add(currentCat)
    if (categoriesSelected.size < 3) {
      cardSet()
      buttonSet()
    } else {
      categoriesSelected.delete(currentCat)
      buttonSet()
    }
  } else {
    categoriesSelected.delete(currentCat)
    cardSet()
    buttonSet()
  }
}

Array.from(buttons).forEach(function (button) {
  button.addEventListener("click", (e) => {
    let currentCat = e.target.getAttribute("category-id")
    service (currentCat)
    print()
  })
})
