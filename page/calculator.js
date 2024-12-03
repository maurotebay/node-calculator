const form = document.querySelector("#calculator");
const resultContainer = document.querySelector("#resultContainer");
const resultText = document.querySelector("#result");
const resultTitle = document.querySelector("#resultTitle");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const equation = document.querySelector("#equation");

  try {
    const response = await fetch("http://localhost:3000/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ equation: equation.value }),
    });
    if (response.ok) {
      const { result } = await response.json();
      resultContainer.className = "ok";
      resultTitle.innerHTML = "Result:";
      resultText.innerHTML = result;
    } else {
      const error = await response.text();
      resultContainer.className = "error";
      resultTitle.innerHTML = "Error:";
      result.innerHTML = error;
    }
  } catch (error) {
    resultContainer.className = "error";
    resultTitle.innerHTML = "Error:";
    result.innerHTML = error.message;
  }
});
