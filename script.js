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
  const totalPrice = parseInt(vehiclePrice) + parseInt(accessoriesPrice);
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
      <button onclick="showMoreInfo(${j}, vehicles)" class="btn btn-primary">Kupuję</button>
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

}

function searchCars() {
  const brand = document.getElementById("carBrand").value.toLowerCase();
  const model = document.getElementById("carModel").value.toLowerCase();
  const prodYear = parseInt(document.getElementById("carProdYear").value, 10);
  const priceRange = parseInt(
    document.getElementById("floatingSelect").value,
    10
  );

  const results = vehicles.filter((vehicle) => {
    const matchesBrand = !brand || vehicle.brand.toLowerCase().includes(brand);
    const matchesModel = !model || vehicle.model.toLowerCase().includes(model);
    const matchesYear = !prodYear || vehicle.productionYear >= prodYear;
    const matchesPrice =
      !priceRange || parseInt(vehicle.price.replace(" ", ""), 10) > priceRange;

    return matchesBrand && matchesModel && matchesYear && matchesPrice;
  });

  displayCards(results, "searchResults");
}

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

    document.getElementById("accessory-container").innerHTML = html;
    calculateTotalPrice(getUrlParameter("price"), accessories);
    return html;
  }

  function calculateTotalPrice(vehiclePrice, accessories) {
    let totalPrice = parseInt(vehiclePrice.replace(/\s/g, ""), 10);
    let selectedAccessories = document.querySelectorAll(
      'input[name="accessory[]"]:checked'
    );
    for (let i = 0; i < selectedAccessories.length; i++) {
      totalPrice += parseInt(selectedAccessories[i].value);
    }

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

function showMoreInfo(index, vehicles) {
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
  )}&price=${encodeURIComponent(
    vehicle.price
  )}&accessoriesPrice=${encodeURIComponent(accessoriesPrice)}`;
  const image = encodeURIComponent(vehicle.img);
  const price = encodeURIComponent(vehicle.price);
  window.location.href = url;

  const totalPrice = calculateTotalPrice(vehicle.price, accessoriesPrice);
  document.getElementById("total-price").innerText = `Suma: ${totalPrice} zł`;
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

document.addEventListener("DOMContentLoaded", () => {
  const image = decodeURIComponent(getUrlParameter("image"));

  const carImage = document.getElementById("car-image");
  carImage.src = image;
  carImage.style.width = "900px";
  carImage.style.height = "500px";

  document.getElementById("car-image").src = image;
  document.getElementById("car-price").innerText = price;
});

function displayDeliveryDate() {
  const today = new Date();
  const deliveryDate = new Date(today.getTime() + 1209600 * 1000);
  const formattedDate = deliveryDate.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  document.getElementById("delivery-date").innerText = formattedDate;
}

displayDeliveryDate();

let formData = {};

function storeFormData() {
  formData = {
    financing: document.querySelector('input[name="financing"]:checked').id,
    fname: document.getElementById("fname").value,
    lname: document.getElementById("lname").value,
    deliveryDate: document.getElementById("delivery-date").innerText,
    totalPrice: document
      .getElementById("total-price")
      .innerText.replace("Suma: ", ""),
    imageUrl: document.getElementById("car-image").src,
  };

  localStorage.setItem("carForm", JSON.stringify(formData));
}

function retrieveFormData() {
  const storedData = localStorage.getItem("carForm");
  if (storedData) {
    formData = JSON.parse(storedData);
    document.getElementById("financing").innerText = formData.financing;
    document.getElementById("fname").innerText = formData.fname;
    document.getElementById("lname").innerText = formData.lname;
    document.getElementById("delivery-date").innerText = formData.deliveryDate;
  }
}

if (document.getElementById("carForm")) {
  document.addEventListener("input", storeFormData);

  const submitButton = document.createElement("button");
  submitButton.textContent = "Zamów";
  submitButton.className = "submitButton";
  submitButton.onclick = function () {
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;

    if (!fname) {
      alert("Proszę wprowadzić swoje imię.");
      return;
    } else if (!lname) {
      alert("Proszę wprowadzić swoje nazwisko.");
      return;
    }

    storeFormData();
    const totalPrice = formData.totalPrice;
    const imageUrl = formData.imageUrl;
    const url = `congrats.html?totalPrice=${totalPrice}&imageUrl=${encodeURIComponent(
      imageUrl
    )}`;
    window.location.href = url;
  };
  document.body.appendChild(submitButton);
} else {
  retrieveFormData();
}

function displayTotalPrice() {
  const totalPrice = getUrlParameter("totalPrice");
  if (totalPrice) {
    document.getElementById("total-price-final").innerText =
      "Suma: " + totalPrice;
  }
}

displayTotalPrice();

document.addEventListener("DOMContentLoaded", () => {
  function displayImage() {
    const imageUrl = getUrlParameter("imageUrl");
    if (imageUrl) {
      document.getElementById("result-image").src = imageUrl;
    }
  }

  displayImage();
});

const submitButton = document.getElementById('goBackBtn');
submitButton.addEventListener('click', function() {
  window.location.href = 'index.html';
});



