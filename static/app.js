const text = (id, value) => {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value || "Unavailable";
  }
};

const setHealth = (status) => {
  const dot = document.getElementById("health-dot");
  text("health-status", status);
  if (dot) {
    dot.classList.toggle("is-up", status.toLowerCase() === "up");
  }
};

const loadPlatformDetails = async () => {
  try {
    const [detailsResponse, versionResponse, healthResponse, apiResponse] = await Promise.all([
      fetch("/api/v1/details"),
      fetch("/api/v1/version"),
      fetch("/api/v1/healthz"),
      fetch("/api/v1"),
    ]);

    const details = await detailsResponse.json();
    const version = await versionResponse.json();
    const health = await healthResponse.json();
    const api = await apiResponse.json();

    text("hostname", details.hostname);
    text("server-time", details.time);
    text("app-version", version.version);
    text("app-env", version.environment);
    setHealth(health.status);

    const routes = document.getElementById("route-list");
    if (routes && Array.isArray(api.routes)) {
      routes.innerHTML = api.routes.map((route) => `<li>${route}</li>`).join("");
    }
  } catch (error) {
    setHealth("degraded");
    text("hostname", "API unavailable");
    text("server-time", "API unavailable");
  }
};

loadPlatformDetails();
setInterval(loadPlatformDetails, 30000);
