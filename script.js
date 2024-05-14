document.addEventListener("DOMContentLoaded", () => {
    let vehicles = [
      {
        brand: "Hyundai",
        model: "i30",
        productionYear: "2012",
        price: "31 000",
        type: "benzyna",
        img: "https://aaaautoeuimg.vshcdn.net/thumb/300127603_360x270x75.jpg?68165",
      },
      {
        brand: "Opel",
        model: "Astra",
        productionYear: "2015",
        price: "30 000",
        type: "benzyna",
        img: "https://aaaautoeuimg.vshcdn.net/thumb/1010009274_360x270x75.jpg?74713",
      },
      {
        brand: "Dacia",
        model: "Duster",
        productionYear: "2022",
        price: "66 000",
        type: " benzyna",
        img: "https://aaaautoeuimg.vshcdn.net/thumb/300121291_1024x768x95.jpg?36144",
      },
      {
        brand: "Skoda",
        model: "Kamiq",
        productionYear: "2023",
        price: "96 000",
        type: "benzyna",
        img: "https://aaaautoeuimg.vshcdn.net/thumb/900386432_1024x768x95.jpg?97023",
      },
    ];
  
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
                  <p class="card-text">Production Year: ${vehicle.productionYear}</p>
                  <p class="card-text">Price: ${vehicle.price}</p>
                  <p class="card-text">Type: ${vehicle.type}</p>
                  <button onclick="showMoreInfo(${j})" class="btn btn-primary">More Information</button>
                </div>
              </div>
            </div>
          `;
        }
        row += "</div>";
        html += row;
      }
      document.getElementById("card-container").innerHTML = html;
    }

  
    displayCards(vehicles);
  });