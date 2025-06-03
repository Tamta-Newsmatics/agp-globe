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

// Generate dummy dots inside continental US
for (let i = 0; i < 150; i++) {
  agps.push({
    lat: 24 + Math.random() * 26,
    lng: -125 + Math.random() * 59,
    label: `AGP ${i + 1}`,
    description: "A local AGP publication.",
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
  //.pointLabel('label')   // <-- remove this line
  .pointsData(agps)
  .onPointHover(point => {
    tooltip.style.display = point ? 'block' : 'none';
    tooltip.innerHTML = point ? point.label : '';
  })
  .onPointClick(point => {
    showAGPInfo(point); // Show info in the box on click
  });

window.addEventListener('mousemove', e => {
  tooltip.style.left = e.pageX + 'px';
  tooltip.style.top = (e.pageY - 10) + 'px';
});

window.addEventListener('click', e => {
  // If clicked outside the globe container or dots, hide info box and show default text
  if (!e.target.closest('#globeViz')) {
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
    descElem.textContent = point.description || "No description available.";
    visitBtn.href = point.url || "#";
    visitBtn.style.display = "inline-flex";
  } else {
    agpInfoBox.style.display = "none";
    defaultText.style.display = "block";
  }
}

