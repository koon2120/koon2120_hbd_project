let setup = true

function loadXMLDoc() {
  if (setup) {
    document.getElementById("hbd_message").classList.add("anim_show")
    setup = false
  }
  let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      if (this.responseText != "no content") {
        hbd_message = JSON.parse(this.responseText)
        document.getElementById("message").innerHTML = hbd_message["message"]
        document.getElementById("from").innerHTML = hbd_message["from"]
      }
    }
  }
  xhttp.open("GET", "/api/get-hbd-message", true)
  xhttp.send()
}

loadXMLDoc()
setInterval(() => { loadXMLDoc() }, 5000);