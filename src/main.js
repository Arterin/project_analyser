const { invoke } = window.__TAURI__.tauri;

let greetInputEl;
let greetMsgEl;

// async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  // greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
// }

async function score() {
  var form = document.querySelector("#form-container");
  var inputs = {
    integration: form.elements["Integration"].value,
    scope: form.elements["Scope"].value,
    schedule: form.elements["Schedule"].value,
    cost: form.elements["Cost"].value,
    quality: form.elements["Quality"].value,
    resource: form.elements["Resource"].value,
    communications: form.elements["Communications"].value,
    risk: form.elements["Risk"].value,
    procurement: form.elements["Procurement"].value,
    stakeholder: form.elements["Stakeholder"].value
  }

  //await invoke("score", {});


  console.log("hewwo\n");
  console.log(inputs);
}

window.addEventListener("DOMContentLoaded", () => {
  // greetInputEl = document.querySelector("#greet-input");
  // greetMsgEl = document.querySelector("#greet-msg");
  
  document.querySelector("#form-container").addEventListener("submit", (e) => {
    e.preventDefault();
    score();
  });
});
