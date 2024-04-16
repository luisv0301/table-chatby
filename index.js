const data = [
  {
    name: "Luis",
    phone: 60488,
    house: "new york",
    money: "es",
    languaje: "espanol",
    saving: 600,
  },
  {
    name: "Pepe",
    phone: 60488,
    house: "new york",
    money: "es",
    languaje: "espanol",
    saving: 600,
  },
  {
    name: "David",
    phone: 60488,
    house: "new york",
    money: "es",
    languaje: "espanol",
    saving: 600,
  },
  {
    name: "Luis",
    phone: 60488,
    house: "new york",
    money: "es",
    languaje: "espanol",
    saving: 600,
  },
  {
    name: "Pepe",
    phone: 60488,
    house: "new york",
    money: "es",
    languaje: "espanol",
    saving: 600,
  },
];

const workspaceIdDOM = document.getElementById("workspaceID");
const workspaceNameDOM = document.getElementById("workspaceName");
const containerDOM = document.getElementById("container");
const overlayLoaderDOM = document.getElementById("overlay-loader");

const handleError = () => {
  const modal = document.createElement("div");
  const title = document.createElement("p");
  const btn = document.createElement("button");

  title.textContent = "Ha ocurrido un error. Intentelo de nuevo";
  btn.textContent = "Aceptar";

  modal.classList.add("modal--active");

  modal.appendChild(title);
  modal.appendChild(btn);

  document.body.appendChild(modal);

  btn.addEventListener("click", () => (modal.style.display = "none"));
};

const paintTableData = (data) => {
  const table = document.getElementById("invoice-table");
  let tableBody = "";

  data.sort((a, b) => {
    const yearA = a.date.slice(6);
    const monthA = a.date.slice(3, 5);
    const dayA = a.date.slice(0, 2);
    const formateDdateA = new Date(yearA + "-" + monthA + "-" + dayA);

    const yearB = b.date.slice(6);
    const monthB = b.date.slice(3, 5);
    const dayB = b.date.slice(0, 2);
    const formateDdateB = new Date(yearB + "-" + monthB + "-" + dayB);

    return formateDdateB - formateDdateA;
  });

  data.forEach((el) => {
    let tr = "";
    if (el.pdf_url == null) {
      tr = `
     <tr>
        <td>${el.invoice_id}</td>
        <td>${el.workspace_id}</td>
        <td>${el.plan_name}</td>
        <td>${el.date}</td>
        <td class="align-right" >${el.amount}</td>
        <td></td>
      </tr>`;
    } else {
      tr = `
     <tr>
        <td>${el.invoice_id}</td>
        <td>${el.workspace_id}</td>
        <td>${el.plan_name}</td>
        <td>${el.date}</td>
        <td class="align-right" >${el.amount}</td>
        <td>
          <a href=${el.pdf_url} download class="btn__download"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </a>
        </td>
      </tr>`;
    }

    tableBody += tr;
  });

  table.insertAdjacentHTML("beforeend", tableBody);
  //hide overlay loader
  overlayLoaderDOM.style.display = "none";

  containerDOM.style.opacity = 1;
};

const getData = async (userData) => {
  const url = "https://hook.us1.make.com/jesj1jsbr5671igyp4jj5fa44tibx2mi";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData), // Stringify JSON data for the body
    });

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("data recibida", data);
    paintTableData(data);
  } catch (error) {
    console.error("Error fetching API data:", error);
    //hide overlay loader
    overlayLoaderDOM.style.display = "none";
    handleError();
  }
};

const verifyURLParams = () => {
  const keyValues = window.location.search;
  const urlParams = new URLSearchParams(keyValues);

  //Obligatory params
  const workspaceId = urlParams.get("workspace_id");
  const userEmail = urlParams.get("user_email");
  const userId = urlParams.get("user_id");

  //Optional params
  const workspaceName = urlParams.get("workspace_name");
  const userName = urlParams.get("user_name");
  const userLangCode = urlParams.get("user_lang_code");

  if (workspaceId && userEmail && userId) {
    const data = {
      workspace_id: workspaceId,
      workspace_name: workspaceName,
      user_name: userName,
      user_email: userEmail,
      user_id: userId,
      user_lang_code: userLangCode,
    };

    console.log("data to send", data);

    /* const testData = {
      workspace_id: 58003,
      workspace_name: "Tienda Fast",
      user_name: "Joyson",
      user_email: "joyson@chatby.io",
      user_id: 1234,
      user_lang_code: "wdfwff",
    };
    */

    // paint user info
    workspaceIdDOM.textContent = workspaceId;
    workspaceNameDOM.textContent = workspaceName ? workspaceName : "";

    getData(data);
  } else {
    //hide overlay loader
    overlayLoaderDOM.style.display = "none";

    const overlay = document.getElementById("overlay");
    overlay.style.opacity = 1;
  }
};

verifyURLParams();

const dateToTest = "22/11/2023";

const year = dateToTest.slice(6);
const month = dateToTest.slice(3, 5);

const day = dateToTest.slice(0, 2);

const formateddate = year + "-" + month + "-" + day;
console.log(formateddate);
console.log(new Date(formateddate));

// file:///C:/Users/luisv/invoice-table-chatby/index.html?workspace_id=58003&user_email=joyson@chatby.io&user_id=1234
