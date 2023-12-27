async function load() {
  let v = "";
  await fetch(`./switcher.html`)
    .then(async (r) => {
      await r.text().then((r2) => {
        v = r2;
      });
    })
    .catch((error) => {
      console.error("file not found");
    });

  return v;
}

async function setSwticher(params) {
  const result = await load();
  const element = document.getElementById(params);
  element.classList.add("switcher-sun");
  element.innerHTML = result;
  element.setAttribute("onClick", "switchTheme(this)");
  getTheme();
}

function switchTheme(element) {
  const theme = element.className;
  if (theme.indexOf("moon") != -1) {
    document.getElementById("sun").classList.add("element-enter");
    document.getElementById("moon").classList.remove("element-enter");
    element.classList.remove("switcher-moon");
    element.classList.add("switcher-sun");
    switchVariables(sunValues);
    localStorage.setItem("theme", 1);
  } else {
    document.getElementById("sun").classList.remove("element-enter");
    document.getElementById("moon").classList.add("element-enter");
    element.classList.remove("switcher-sun");
    element.classList.add("switcher-moon");
    switchVariables(moonValues);
    localStorage.setItem("theme", 2);
  }
}

const moonValues = [
  "#393646",
  "#393646",
  "#393646",
  "#4f4557",
  "#6d5d6e",
  "#724a61",
  "#ffffff",
];

const sunValues = [
  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF",
  "#F5F5F5",
  "#E2E5DE",
  "#B2BEB5",
  "#000000",
];

function switchVariables(theme) {
  document.body.style.setProperty("--header-color", theme[0]);
  document.body.style.setProperty("--main-color", theme[1]);
  document.body.style.setProperty("--main-color-gradient-1", theme[2]);
  document.body.style.setProperty("--main-color-gradient-2", theme[3]);
  document.body.style.setProperty("--thread-color", theme[4]);
  document.body.style.setProperty("--tbody-color", theme[5]);
  document.body.style.setProperty("--color-text", theme[6]);
}

function getTheme() {
  const idTheme = localStorage.getItem("theme");
  if (idTheme) {
    if (idTheme == 1) {
      switchVariables(sunValues);
    } else if (idTheme == 2) {
      switchVariables(moonValues);
      switchTheme(document.getElementById("switcher"));
    }
  }
}
