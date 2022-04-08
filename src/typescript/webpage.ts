// handles the webpage, settings/menu. that shit y'know
import { version } from './../../package.json';
import { etf2html } from "./etf";
import { splashText } from "./splash";
import { join } from "path";

if (document.getElementById("game_version") != null) document.getElementById("game_version").innerHTML = `v${version}`

if (document.getElementById("latest_version") != null) {
	const ulog = document.getElementById("update_log")
	const changelogURI = "https://raw.githubusercontent.com/Schematell/game/master/package.json"
	fetch(changelogURI)
		.then(data => data.json())
		.then(data => {
			// console.log(data)
			const versions = {
				latest: data.version,
				current: version
			}

			document.getElementById("latest_version").innerHTML = `v${data.version}`
			if (parseInt(versions.latest.split(".").join("")) > parseInt(versions.current.split(".").join(""))) {
				document.getElementById("latest_version").style.color = "#ff0000"
			}
		})
}

const menuItems = [
	document.getElementById("play"),
	document.getElementById("edit"),
	document.getElementById("settings"),
	document.getElementById("exit"),
	document.getElementById("return")
]

if (menuItems[0]){
	menuItems[0].addEventListener("click", function() {
		window.location.href = window.location.href + "/../game.html"
	}, false)
}

if (menuItems[1]){
	menuItems[1].addEventListener("click", function() {
		console.log("fail")
	}, false)
}

if (menuItems[2]){
	menuItems[2].addEventListener("click", function() {
		console.log("fail")
	}, false)
}

if (menuItems[3]){
	menuItems[3].addEventListener("click", function() {
		window.close()
	}, false)
}

if (menuItems[4]){
	menuItems[4].addEventListener("click", function() {
		window.location.href = window.location.href + "/../index.html"
	}, false)
}

if (document.getElementById("splash")) {
	const splash = document.getElementById("splash")
	splash.textContent = splashText[Math.floor(Math.random() * splashText.length)]
}

if (document.getElementById("update_log")) {
	const ulog = document.getElementById("update_log")
	const changelogURI = "https://raw.githubusercontent.com/Schematell/game/master/changelog.etf"
	fetch(changelogURI)
		.then(data => data.text())
		.then(data => {
			ulog.innerHTML = etf2html(data)
		})
}

// const audio = new Audio('./../music/cell_destroy.wav');
// audio.loop = true;
// audio.play();