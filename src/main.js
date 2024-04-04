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
	// Get the output field
	const outputField = document.querySelector(`output[name="${category}-output"]`);

	// Set the color based on the input or score
	if (category === 'total') {
		if (score < 25) {
			outputField.style.color = 'red';
		} else if (score < 50) {
			outputField.style.color = 'yellow';
		} else {
			outputField.style.color = ''; // Default color
		}
	} else {
		if (input < 25) {
			outputField.style.color = 'red';
		} else if (input < 50) {
			outputField.style.color = 'yellow';
		} else {
			outputField.style.color = ''; // Default color
		}
	}
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
