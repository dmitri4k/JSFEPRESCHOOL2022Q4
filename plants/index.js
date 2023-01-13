let adr = `[
    {
      "dataValue": "ny",
      "data": {
        "city": "New York City",
        "phone": "+1 212 456 0002",
        "adress": "9 East 91st Street"
      }
    },
  
    {
      "dataValue": "ca",
      "data": {
        "city": "Canandaigua, NY",
        "phone": "+1 585 393 0001",
        "adress": "151 Charlotte Street"
      }
    },
    {
      "dataValue": "yo",
      "data": {
        "city": "Yonkers, NY",
        "phone": "+1 914 678 0003",
        "adress": "511 Warburton Ave"
      }
    },
    {
      "dataValue": "sh",
      "data": {
        "city": "Sherrill, NY",
        "phone": "+1 315908 0004",
        "adress": "14 WEST Noyes BLVD"
      }
    }
  ]`;
let adressList = JSON.parse(adr);

const elSelectCustom = document.getElementsByClassName("js-selectCustom")[0];
const elSelectCustomValue = elSelectCustom.children[0];
const elSelectCustomOptions = elSelectCustom.children[1];
const defaultLabel = elSelectCustomValue.getAttribute("data-value");
let adressValue;
const city = document.getElementById('city');
const phone = document.getElementById('phone');
const adress = document.getElementById('adress');
const adressCard = document.getElementsByClassName("adressCard")[0];

// Listen for each custom option click
Array.from(elSelectCustomOptions.children).forEach(function (elOption) {
  elOption.addEventListener("click", (e) => {
    // Update custom select text too
    elSelectCustomValue.textContent = e.target.textContent;
    adressValue = e.target.getAttribute("data-value");

    for (let i =0; i < adressList.length; i++) {
        if (adressList[i].dataValue == adressValue) {
            city.textContent = adressList[i].data.city;
            phone.textContent = adressList[i].data.phone;
            adress.textContent = adressList[i].data.adress;
            adressCard.classList.add("isVisible");
            break;
        };
    };
    // adressValue = event.target.dataset.value;
    elSelectCustom.classList.add("isSelected");
    // Close select
    elSelectCustom.classList.remove("isActive");
  });
});

// Toggle select on label click
elSelectCustomValue.addEventListener("click", (e) => {
  elSelectCustom.classList.toggle("isActive");
});

// close the custom select when clicking outside.
document.addEventListener("click", (e) => {
  const didClickedOutside = !elSelectCustom.contains(event.target);
  if (didClickedOutside) {
    elSelectCustom.classList.remove("isActive");
  }
});


// console.log(adressValue);
// console.log(adressCard);

// adressValue = event.target.dataset.value;
/* adressCard.city.textContent = adress[i].data.city;
adressCard.phone.textContent = adress[i].data.phone;
adressCard.adress.textContent = adress[i].data.adress; */


