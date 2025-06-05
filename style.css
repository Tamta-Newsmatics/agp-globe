@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

body, html {
  height: 100%;
  overflow: hidden;
  background-color: #0f0f17;
  color: white;
}

#globeViz {
  width: 100vw;
  height: 100vh;
  z-index: 0;
}

.tooltip {
  position: absolute;
  background: white;
  color: black;
  padding: 6px 10px;
  border-radius: 5px;
  font-size: 13px;
  pointer-events: none;
  transform: translate(-50%, -100%);
  z-index: 20;
  display: none;
}

#header {
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 10;
  width: 360px;
  height: 200px;
  background: rgba(28, 28, 41, 0.85);
  padding: 15px 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  overflow: hidden;
}

#header .agp-name {
  font-weight: bold;
  font-size: 16px;
  display: block;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  width: 120px;
}

.search-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: #ffffff;
}

.divider {
  height: 1px;
  background-color: #444;
  margin: 4px 0;
}

.default-text {
  font-size: 15px;
  color: #e0d9e9;
  line-height: 1.5;
}

.agp-info {
  display: none;
  flex-direction: column;
  gap: 8px;
  color: #e0d9e9;
  flex-grow: 1;
  justify-content: center;
}

.agp-description {
  font-size: 14px;
}

.visit-button {
  margin-top: auto;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  background-color: #B9065D;
  color: white;
  text-decoration: none;
  font-size: 14px;
  align-self: flex-start;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.visit-button::after {
  content: "→";
  font-weight: bold;
  transition: transform 0.2s ease;
}

.visit-button:hover {
  background-color: #9c054f;
  transform: translateY(2px);
}

.visit-button:hover::after {
  transform: translateX(3px);
}

/* Search Box */

.search-box {
  position: absolute;
  bottom: 230px;
  left: 20px;
  z-index: 11;
  width: 360px;
  height: 240px;
  background: rgba(28, 28, 41, 0.95);
  padding: 15px 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transform: translateX(-420px);  /* offscreen to the left */
  opacity: 0;
  transition: all 0.3s ease;
}

.search-box.active {
  transform: translateX(0);
  opacity: 1;
}

.search-box h3 {
  font-size: 16px;
  margin-bottom: 6px;
}

.search-box select,
.search-box input {
  padding: 8px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
}

.search-box select:focus,
.search-box input:focus {
  outline: 2px solid #B9065D;
}
