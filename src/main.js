const { invoke } = window.__TAURI__.tauri;

let greetInputEl;
let greetMsgEl;

// async function greet() {
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
// }

// TODO: add green and blue!

async function score() {
	var form = document.querySelector("#form-container");
	var inputs = {
        integration: parseFloat(form.elements["integration"].value),
        scope: parseFloat(form.elements["scope"].value),
        schedule: parseFloat(form.elements["schedule"].value),
        cost: parseFloat(form.elements["cost"].value),
        quality: parseFloat(form.elements["quality"].value),
        resource: parseFloat(form.elements["resource"].value),
        communications: parseFloat(form.elements["communications"].value),
        risk: parseFloat(form.elements["risk"].value),
        procurement: parseFloat(form.elements["procurement"].value),
        stakeholder: parseFloat(form.elements["stakeholder"].value),
		total: 0.0
    };

	var outputs = await invoke("score", {data: inputs});

	Object.keys(outputs).forEach(key => {
		const score = parseFloat(outputs[key]);
		form.elements[`${key}-output`].value = score.toFixed(0);
		setColor(key, inputs[key], score);
	});
}

function setColor(category, input, score) {
    const outputField = document.querySelector(`output[name="${category}-output"]`);
    const value = category === 'total' ? score : input;
    outputField.style.color = value < 31 ? '#fb4934'
		: value < 51 ? '#fabd2f'
		: value < 81 ? '#83a598'
		: value < 101 ? '#b8bb26'
		: '';
}



window.addEventListener("DOMContentLoaded", () => {
	// greetInputEl = document.querySelector("#greet-input");
	// greetMsgEl = document.querySelector("#greet-msg");

	document
		.querySelector("#form-container")
		.addEventListener("submit", (e) => {
			e.preventDefault();
			score().catch(error => console.error('An error occurred during score calculation. This may be related to the Promise returned by the score function:', error.message));
		});
});
