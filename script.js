
let vehicles = [
  {
    id: 1,
    brand: "Hyundai",
    model: "i30",
    productionYear: "2012",
    price: "31 000",
    type: "benzyna",
    milage: "150 000",
    horsePwr: "140",
    img: "https://aaaautoeuimg.vshcdn.net/thumb/300127603_360x270x75.jpg?68165",
  },
  {
    id: 2,
    brand: "Opel",
    model: "Astra",
    productionYear: "2015",
    price: "30 000",
    type: "benzyna",
    milage: "30 000",
    horsePwr: "105",
    img: "https://aaaautoeuimg.vshcdn.net/thumb/1010009274_360x270x75.jpg?74713",
  },
  {
    id: 3,
    brand: "Dacia",
    model: "Duster",
    productionYear: "2022",
    price: "66 000",
    type: " benzyna",
    milage: "55 000",
    horsePwr: "115",
    img: "https://aaaautoeuimg.vshcdn.net/thumb/300121291_1024x768x95.jpg?36144",
  },
  {
    id: 4,
    brand: "Skoda",
    model: "Kamiq",
    productionYear: "2023",
    price: "96 000",
    type: "benzyna",
    milage: "100 000",
    horsePwr: "150",
    img: "https://aaaautoeuimg.vshcdn.net/thumb/900386432_1024x768x95.jpg?97023",
  },
];
function calculateTotalPrice(vehiclePrice, accessoriesPrice) {
  const totalPrice =  parseInt(vehiclePrice) + parseInt(accessoriesPrice);
  return totalPrice;
}
document.addEventListener("DOMContentLoaded", () => {
  displayCards(vehicles);
});
function displayCards(vehicles) {
  let html = "";
  for (let i = 0; i < vehicles.length; i += 2) {
    let row = `<div class="row">`;
    for (let j = i; j < i + 2 && j < vehicles.length; j++) {
      let vehicle = vehicles[j];
      row += `
      <div class="col-md-6">
      <div class="card" style="margin-top: 2rem;">
      <img src="${vehicle.img}" alt="${vehicle.model}" class="card-img-top" style="height: 200px; object-fit: cover;">
      <div class="card-body">
      <h5 class="card-title">${vehicle.brand} ${vehicle.model}</h5>
      <h6 class="card-price">${vehicle.price}PLN </h6>
      <p class="card-text">${vehicle.productionYear} • ${vehicle.type} • ${vehicle.milage}km • ${vehicle.horsePwr}KM</p>
      <br>
      <button onclick="showMoreInfo(${j})" class="btn btn-primary">Kupuję</button>
      </div>
      </div>
      </div>
      `;
    }
    row += "</div>";
    html += row;
  }
  const cardContainer = document.getElementById("card-container");
  if (cardContainer) {
    cardContainer.innerHTML = html;
  } else {
    console.error("Element with id 'card-container' not found.");
  }
  // document.getElementById("card-container").innerHTML = html;
}

// wyszukiwanie aut

function searchCars() {
  const brand = document.getElementById("carBrand").value.toLowerCase();
  const model = document.getElementById("carModel").value.toLowerCase();
  const prodYear = parseInt(document.getElementById("carProdYear").value, 10);
  const priceRange =
    parseInt(document.getElementById("floatingSelect").value, 10) * 10000;

  const results = vehicles.filter((vehicle) => {
    const matchesBrand = !brand || vehicle.brand.toLowerCase().includes(brand);
    const matchesModel = !model || vehicle.model.toLowerCase().includes(model);
    const matchesYear = !prodYear || vehicle.productionYear >= prodYear;
    const matchesPrice =
      !priceRange || parseInt(vehicle.price.replace(" ", ""), 10) >= priceRange;

    return matchesBrand && matchesModel && matchesYear && matchesPrice;
  });

  displayCards(results, "searchResults");
  
}

// SECOND PAGE

document.addEventListener("DOMContentLoaded", () => {
let accessories = [
  {
    name: "opony zimowe",
    price: "7000",
  },
  {
    name: "pokrowce na fotele",
    price: "1500",
  },
  {
    name: "kołpaki",
    price: "1000",
  },
  {
    name: "powłoka ceramiczna",
    price: "15000",
  },
  {
    name: "przyciemnianie szyb",
    price: "4000",
  },
  {
    name: "pakiet serwisowy 1 rok",
    price: "900",
  },
];

function generateAccessoryCheckboxes(accessories) {
  let html = "";
  for (let i = 0; i < accessories.length; i++) {
    let accessory = accessories[i];
    html += `
    <div class="form-check">
    <input class="form-check-input" type="checkbox" name="accessory[]" id="${accessory.name}" value="${accessory.price}">
    <label class="form-check-label" for="${accessory.name}">
    ${accessory.name} - ${accessory.price} zł
    </label>
    </div>
    `;
  }

  document.getElementById("accessory-container").innerHTML =html;
  calculateTotalPrice(getUrlParameter("price"), accessories);
  return html;
}

function calculateTotalPrice(vehiclePrice, accessories) {
  let totalPrice = 0;
  let selectedAccessories = document.querySelectorAll(
    'input[name="accessory[]"]:checked'
    );
    for (let i = 0; i < selectedAccessories.length; i++) {
      totalPrice += parseInt(selectedAccessories[i].value);
    }
    totalPrice += parseInt(vehiclePrice,10)
    document.getElementById("total-price").innerText = `Suma: ${totalPrice} zł`;
  }
  
  
  document.getElementById("accessory-container").innerHTML =
  generateAccessoryCheckboxes(accessories);
  calculateTotalPrice(getUrlParameter("price"), accessories);
  
  document
  .querySelectorAll('input[name="accessory[]"]')
  .forEach((accessory) => {
    accessory.addEventListener("change", () => {
      calculateTotalPrice(getUrlParameter("price"), accessories);
    });
  });
});


// przekierowanie z 1 do 2 strony za pomocą przycisku "Kupuje"

function showMoreInfo(index) {
  const vehicle = vehicles[index];
  const accessories = document.querySelectorAll(
    'input[name="accessory[]"]:checked'
    );
    let accessoriesPrice = 0;
    for (let i = 0; i < accessories.length; i++) {
      accessoriesPrice += parseInt(accessories[i].value);
    }
    const url = `orderConfig.html?image=${encodeURIComponent(
      vehicle.img
      )}&price=${encodeURIComponent(vehicle.price)}&accessoriesPrice=${encodeURIComponent(
        accessoriesPrice
        )}`;
        window.location.href = url;
      }
      // / Calculate the total price
      const totalPrice = calculateTotalPrice(vehicle.price, accessoriesPrice);
      document.getElementById("total-price").innerText = `Suma: ${totalPrice} zł`;
      
      function getUrlParameter(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
      const results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    
    
    document.addEventListener("DOMContentLoaded", () => {
      const image = getUrlParameter("image");
      const price = getUrlParameter("price");
      
      
      
      const carImage = document.getElementById("car-image");
      carImage.src = image;
      carImage.style.width = "900px";
      carImage.style.height = "500px";
      
      
      
      // Display the selected car's image and price on the second page
      document.getElementById("car-image").src = image;
      document.getElementById("car-price").innerText = price;
    
    });
    
 