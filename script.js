
let currentItem = "";

function selectItem(item) {
  currentItem = item;
  loadData();
}

function addDot(event) {
  const img = document.getElementById("mainImage");
  const wrapper = document.getElementById("image-wrapper");

  const dot = document.createElement("div");
  dot.className = "dot";
  const x = event.offsetX;
  const y = event.offsetY;
  dot.style.left = x + "px";
  dot.style.top = y + "px";
  wrapper.appendChild(dot);

  saveData();
}

function saveData() {
  if (!currentItem) return;
  const notes = document.getElementById("notes").value;
  const req1 = document.getElementById("req1").checked;
  const req2 = document.getElementById("req2").checked;
  const dots = [...document.querySelectorAll(".dot")].map(dot => ({
    x: dot.style.left,
    y: dot.style.top
  }));

  const data = { notes, req1, req2, dots };
  localStorage.setItem(currentItem, JSON.stringify(data));
}

function loadData() {
  const wrapper = document.getElementById("image-wrapper");
  wrapper.innerHTML = '<img id="mainImage" onclick="addDot(event)">';

  const data = JSON.parse(localStorage.getItem(currentItem) || "{}");
  document.getElementById("notes").value = data.notes || "";
  document.getElementById("req1").checked = data.req1 || false;
  document.getElementById("req2").checked = data.req2 || false;

  const img = document.getElementById("mainImage");
  img.src = data.image || "";

  (data.dots || []).forEach(dotData => {
    const dot = document.createElement("div");
    dot.className = "dot";
    dot.style.left = dotData.x;
    dot.style.top = dotData.y;
    wrapper.appendChild(dot);
  });
}

document.getElementById("imageUpload").addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = document.getElementById("mainImage");
    img.src = event.target.result;

    // Save image as part of current item
    const data = JSON.parse(localStorage.getItem(currentItem) || "{}");
    data.image = event.target.result;
    localStorage.setItem(currentItem, JSON.stringify(data));
  };
  reader.readAsDataURL(file);
});
