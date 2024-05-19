document.addEventListener("DOMContentLoaded", () => {
    let vehicles = [
      {
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
          return html;
        }
  
        function calculateTotalPrice(accessories) {
          let totalPrice = 0;
          let selectedAccessories = document.querySelectorAll('input[name="accessory[]"]:checked');
          for (let i = 0; i < selectedAccessories.length; i++) {
            totalPrice += parseInt(selectedAccessories[i].value);
          }
          document.getElementById("total-price").innerText = `Suma: ${totalPrice} zł`;
        }
  
        document.getElementById("accessory-container").innerHTML = generateAccessoryCheckboxes(accessories);
        calculateTotalPrice(accessories);
  
        document.querySelectorAll('input[name="accessory[]"]').forEach((accessory) => {
          accessory.addEventListener("change", () => {
            calculateTotalPrice(accessories);
          });
        });
      });
 