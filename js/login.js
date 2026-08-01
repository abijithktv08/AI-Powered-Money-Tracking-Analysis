// If already signed in, skip straight to the tracker
if (localStorage.getItem("user")) {
  window.location.href = "index.html";
}

// Google calls this automatically after a successful Gmail sign-in
function handleCredentialResponse(response) {
  const payload = decodeJwt(response.credential);

  const user = {
    name: payload.name,
    email: payload.email,
    picture: payload.picture
  };

  localStorage.setItem("user", JSON.stringify(user));
  window.location.href = "index.html";
}

// Google's credential is a JWT — this reads the middle part (the payload) without any library
function decodeJwt(token) {
  const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(decodeURIComponent(escape(atob(base64))));
}

const clientId = document.getElementById("g_id_onload").dataset.client_id;
document.getElementById("hint").textContent = clientId.startsWith("YOUR_GOOGLE_CLIENT_ID")
  ? "Note: add your own Google Client ID in login.html to activate this button."
  : "";