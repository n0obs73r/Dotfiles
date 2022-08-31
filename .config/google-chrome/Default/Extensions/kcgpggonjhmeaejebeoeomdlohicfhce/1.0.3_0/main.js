(function() {
    C = document.cookie.split("; ");
    for (d = "." + location.host; d; d = ("" + d).substr(1).match(/..*$/))
        for (sl = 0; sl < 2; ++sl)
            for (p = "/" + location.pathname; p; p = p.substring(0, p.lastIndexOf('/')))
                for (i in C)
                    if (c = C[i]) {
                        document.cookie = c + "; domain=" + d.slice(sl) + "; path=" + p.slice(1) + "/" + "; expires=" + new Date((new Date).getTime() - 1e11).toGMTString()
                    }
  const msg = C.length + " cookies removed from " + location.host;
  showMessage(msg, 2000);
  window.localStorage.clear();
  sessionStorage.clear();
})()

function showMessage(msg, duration)
{
  var el = document.createElement("div");
  el.setAttribute("style","position:fixed;top:40%;left:40%;z-index:99;padding:4px;font-family: Arial, sans-serif;font-size:18px;color:white;background-color:blue; opacity:0.7;");
  el.innerHTML = msg;
  setTimeout(function() {
    el.parentNode.removeChild(el);
  }, duration);
  document.body.appendChild(el);
}

