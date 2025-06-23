const tooltip = document.getElementById("tooltip");

fetch('https://unpkg.com/world-atlas@2/countries-110m.json')
  .then(res => res.json())
  .then(worldData => {
    const countries = window.topojson.feature(worldData, worldData.objects.countries).features;

    let hovered = null;
    let isMoving = false;

    const globe = Globe()(document.getElementById('globeViz'))
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .backgroundColor('#0f0f17')
      .polygonsData(countries)
      .polygonCapColor(d => d === hovered ? 'rgba(225, 29, 124, 0.5)' : 'rgba(255, 255, 255, 0.05)')
      .polygonSideColor(() => 'rgba(0, 100, 200, 0.15)')
      .polygonStrokeColor(d => d === hovered ? '#B9065D' : '#ffffff')
      .polygonAltitude(d => d === hovered ? 0.008 : 0.005)
      .onPolygonHover(polygon => {
        hovered = polygon;
        tooltip.style.display = polygon ? 'block' : 'none';
        tooltip.innerHTML = polygon
          ? `<div class="tooltip-title">${polygon.properties.name || 'Unknown'}</div>
             <div class="tooltip-sub">12 AGPs</div>`
          : '';

        globe.polygonsData([...countries]); // trigger re-render
      });

    globe.controls().enableDamping = true;

    /* Globescene
    const globeScene = globe.scene();
    globeScene.children
      .filter(obj => obj.isLight)
      .forEach(light => globeScene.remove(light));

    // Add very soft ambient light
    globeScene.add(new THREE.AmbientLight(0xffffff, 0.2)); // lower intensity
    */

    // zoom button code here
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');

    zoomInBtn.addEventListener('click', () => {
      const { lat, lng, altitude } = globe.pointOfView();
      globe.pointOfView({ lat, lng, altitude: Math.max(0.8, altitude * 0.8) }, 500);
    });

    zoomOutBtn.addEventListener('click', () => {
      const { lat, lng, altitude } = globe.pointOfView();
      globe.pointOfView({ lat, lng, altitude: Math.min(10, altitude * 1.2) }, 500);
    });

    // then comes the mousemove listener
    window.addEventListener('mousemove', e => {
      tooltip.style.left = e.pageX + 'px';
      tooltip.style.top = (e.pageY - 10) + 'px';
    });

    const infoBox2 = document.getElementById('infoBox2');
    const pubList = infoBox2.querySelector('.pub-list');

    const pubs = [
      'argentinaentertainmentchannel',
      'angolaartsjournal',
      'artsdailynewcaledonia',
      'artstodaydrcongo',
      'artsweeklypapuanewguinea',
      'artswirecookislands'
    ];

    function showInfoBox2() {
      infoBox2.classList.add('visible');
      pubList.innerHTML = '';

      pubs.forEach(name => {
        const item = document.createElement('div');
        item.className = 'pub-item';

        item.innerHTML = `
          <img src="assets/${name}.SVG" alt="${name}" class="pub-item-logo" />
          <button class="pub-item-button">View publication</button>
        `;

        pubList.appendChild(item);
      });
    }

    document.getElementById('closeInfoBox2').addEventListener('click', () => {
      infoBox2.classList.remove('visible');
    });

    // Helper to calculate centroid of polygon or multipolygon
    function getCentroid(coords) {
      try {
        let flatCoords = [];

        // Handle MultiPolygon
        if (Array.isArray(coords[0][0][0])) {
          coords.forEach(polygon => {
            polygon.forEach(ring => {
              flatCoords.push(...ring);
            });
          });
        } else {
          coords.forEach(ring => {
            flatCoords.push(...ring);
          });
        }

        let x = 0, y = 0, z = 0;
        flatCoords.forEach(coord => {
          const lng = coord[0] * Math.PI / 180;
          const lat = coord[1] * Math.PI / 180;

          x += Math.cos(lat) * Math.cos(lng);
          y += Math.cos(lat) * Math.sin(lng);
          z += Math.sin(lat);
        });

        const total = flatCoords.length;
        x /= total;
        y /= total;
        z /= total;

        const lng = Math.atan2(y, x);
        const hyp = Math.sqrt(x * x + y * y);
        const lat = Math.atan2(z, hyp);

        return {
          lat: lat * 180 / Math.PI,
          lng: lng * 180 / Math.PI
        };
      } catch (e) {
        console.warn('Centroid calculation failed:', e);
        return null;
      }
    }

    // Zoom on country click
    globe.onPolygonClick(polygon => {
      if (!polygon || !polygon.geometry || !polygon.geometry.coordinates) return;

      const centroid = getCentroid(polygon.geometry.coordinates);
      if (!centroid) return;

      globe.pointOfView(
        { lat: centroid.lat, lng: centroid.lng, altitude: 1.3 },
        1500
      );

      showInfoBox2();
    });

    // Show info box on search submit
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', e => {
      e.preventDefault();
      showInfoBox2();
    });

  })
  .catch(err => {
    console.error('Error loading world atlas data:', err);
  });
