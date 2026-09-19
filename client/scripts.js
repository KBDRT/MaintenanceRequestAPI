const baseURL = "http:localhost:3000/api/requests"
const form = document.forms["requestForm"];   
const filterForm = document.forms["filterForm"];   

class HttpClient{ 
  #requestBody = null;
  #baseURL = baseURL;

  constructor(requestMethod) {
    this.method = requestMethod;
  }

  setBody(body) {
    this.#requestBody = body
  }

  #createRequestInfo() {
    let result = {method: this.method, headers: { "Accept": "application/json", "Content-Type": "application/json" } };

    if (this.#requestBody) {
      result["body"] = this.#requestBody;
    }

    return result;
  }

  setURL(url) {
    this.#baseURL = url;
  }

  async performRequest() {
    let result = {isSuccess: false, data: []}
    try {
    const response = await fetch(this.#baseURL, this.#createRequestInfo());

      if (response.ok === true) {
        result["data"] = await response.json();
        result["isSuccess"] = true;
      }
      else {
        const result = await response.json();
        
        let errorInfo = result.error.message + '\n';

        result.error.details.map(detail => {
          errorInfo += `${detail.field}: ${detail.message} \n`;
        });

        alert(errorInfo);
      }
    }
    catch (error) {
      alert("Ошибка обращения к API");
    }

    return result;
  }
}

form.addEventListener("submit", e => {
  e.preventDefault();

  let date = form?.elements["plannedAt"]?.value;
  if (!date || date.length === 0) {
    date = undefined;
  }
  else {
    date = new Date(date).toISOString();
  }

  const data = {
    equipmentId: form.elements["equipmentId"].value,
    title: form.elements["title"].value,
    priority: form.elements["priority"].value,
    description: form?.elements["description"]?.value,
    plannedAt: date
  };

  const jsonData = JSON.stringify(
    Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined)
    )
  );

  const client = new HttpClient("POST");
  client.setBody(jsonData);
  client.performRequest();

  getRequests();
});

async function getRequests() {
  const client = new HttpClient("GET");

  const url = new URL(baseURL);
  const ids = filterForm?.elements["filter_equipmentId"]?.value
  if (ids) {
    url.searchParams.append('equipmentsIds', ids);
  }

  const priorities = filterForm?.elements["filter_priority"]?.value
  if (priorities) {
    url.searchParams.append('priority', priorities);
  }

  const statuses = filterForm?.elements["filter_status"]?.value
  if (statuses) {
    url.searchParams.append('status', statuses);
  }

  client.setURL(url);
  const result = await client.performRequest();

  if (result.isSuccess)
    createReport(result.data.data);
}

getRequests();


filterForm.addEventListener("submit", e => {
  e.preventDefault();

  if (e.submitter.id == "clearBtn") {
    for (let fieldName of ["filter_equipmentId", "filter_priority", "filter_status"]) {
      filterForm.elements[fieldName].value = null
    }
  }

  getRequests();
});

function createReport(data) {

  const header = document.getElementById('requestsTable');
  if (header) document.body.removeChild(header);

  const baseDiv = document.createElement('div');
  baseDiv.id = 'requestsTable';

  const tableHeader = `<br />
  <table>
  <thead>
  <tr>
    <th>ID заявки</th>
    <th>ID оборудования</th>
    <th>Заголовок</th>
    <th>Описание</th>
    <th>Приоритет</th>
    <th>Статус</th>
    <th>Плановая дата</th>
  </tr>
  </thead>
  <tbody>`;

  let tableBody = ``;
  for (let index = 0; index < data.length; index++) {
    const request = data[index];
    tableBody += `<tr>
      <td class="tdCenter">${request.id}</td>
      <td class="tdCenter">${request.equipmentId}</td>
      <td class="tdCenter">${request.title}</td>
      <td class="tdCenter">${request.description ?? ""}</td>
      <td class="tdCenter">${request.priority}</td>
      <td class="tdCenter">${request.status}</td>
      <td class="tdCenter">${getDate(request.plannedAt)}</td>
    </tr>`;
  }

  const tableClose = `</tbody> </table>`;
  baseDiv.innerHTML = tableHeader + tableBody + tableClose;
  document.body.appendChild(baseDiv);
}

function getDate(date) {
  if (!date) return "";

  const baseDate = new Date(date);

  const year = baseDate.getFullYear();
  let month = baseDate.getMonth();
  if (month < 10) 
    month = `0${month}`;

  let day = baseDate.getDate();
  if (day < 10) 
    day = `0${day}`;

  return `${day}.${month}.${year}`;
}
