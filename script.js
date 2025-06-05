const agps = [
  {
    lat: 34.0522,
    lng: -118.2437,
    label: "California Business Journal",
    description: "Business news from California.",
    url: "https://californiabusinessjournal.com"
  },
  {
    lat: 40.7128,
    lng: -74.006,
    label: "Crypto Times Gazette",
    description: "Latest on crypto trends.",
    url: "https://cryptotimesgazette.com"
  },
  {
    lat: 41.8781,
    lng: -87.6298,
    label: "Chicago Local News",
    description: "What’s happening in Chicago.",
    url: "#"
  },
  {
    lat: 29.7604,
    lng: -95.3698,
    label: "Houston Industry Review",
    description: "Houston's economic pulse.",
    url: "#"
  }
];

// Add more US points
for (let i = 0; i < 150; i++) {
  agps.push({
    lat: 24 + Math.random() * 26,
    lng: -125 + Math.random() * 59,
    label: `AGP ${i + 1}`,
    description: "A local AGP publication.",
    url: "#"
  });
}

// Add Europe points
for (let i = 0; i < 30; i++) {
  agps.push({
    lat: 35 + Math.random() * 30, // Europe
    lng: -10 + Math.random() * 50,
    label: `AGP Europe ${i + 1}`,
    description: "A European AGP publication.",
    url: "#"
  });
}

const tooltip = document.getElementById("tooltip");

const globe = Globe()(document.getElementById('globeViz'))
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
  .backgroundColor('#0f0f17')
  .pointLat('lat')
  .pointLng('lng')
  .pointAltitude(() => 0.01)
  .pointRadius(() => 0.15)
  .pointColor(() => '#B9065D')
  .pointsData(agps)
  .onPointHover(point => {
    tooltip.style.display = point ? 'block' : 'none';
    tooltip.innerHTML = point ? point.label : '';
  })
  .onPointClick(point => {
    showAGPInfo(point);
  });

window.addEventListener('mousemove', e => {
  tooltip.style.left = e.pageX + 'px';
  tooltip.style.top = (e.pageY - 10) + 'px';
});

window.addEventListener('click', e => {
  if (!e.target.closest('#globeViz') && !e.target.closest('#header') && !e.target.closest('#searchBox')) {
    showAGPInfo(null);
  }
});

const defaultText = document.querySelector(".default-text");
const agpInfoBox = document.querySelector(".agp-info");
const nameElem = document.querySelector(".agp-name");
const descElem = document.querySelector(".agp-description");
const visitBtn = document.querySelector(".visit-button");

function showAGPInfo(point) {
  if (point) {
    defaultText.style.display = "none";
    agpInfoBox.style.display = "flex";

    nameElem.textContent = point.label || "Unnamed Publication";
    nameElem.style.display = "block";  // <--- Ensure it's visible

    descElem.textContent = point.description || "No description available.";
    descElem.style.display = "block";

    visitBtn.href = point.url || "#";
    visitBtn.style.display = "inline-flex";
  } else {
    agpInfoBox.style.display = "none";
    defaultText.style.display = "block";
  }
}

// Toggle Search Panel
const toggleSearch = document.getElementById("toggleSearch");
const searchBox = document.getElementById("searchBox");

toggleSearch.addEventListener("click", () => {
  const active = searchBox.classList.toggle("active");
  toggleSearch.src = active ? "assets/x.svg" : "assets/search.svg";
});
