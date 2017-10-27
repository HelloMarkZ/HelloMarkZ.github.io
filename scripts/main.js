function showPic(picture) {
	if (!document.getElementById("placeholder")) return false;
	document.getElementById("placeholder").setAttribute("src", picture.getAttribute("href"));

	if (!document.getElementById("description")) return true;
	if (picture.getAttribute("title")) {
		var text = picture.getAttribute("title");
	} else {
		var text = "";
	}
	description.firstChild.nodeValue = text;
	return true;
}

function preparePlaceholder() {
	if ((!document.getElementById) || (!document.getElementById("gallery")) || (!document.createElement) || (!document.createTextNode)) return false;

	var placeholder = document.createElement("img");
	placeholder.setAttribute("src", "images/placeholder.gif");
	placeholder.setAttribute("id", "placeholder");
	placeholder.setAttribute("alt", "placeholder");

	var description = document.createElement("p");
	description.setAttribute("id", "description");
	description.appendChild(document.createTextNode("Choose an image"));

	insertAfter(placeholder, document.getElementById("gallery"));
	insertAfter(description, placeholder);
}

function prepareGallery() {
	if (!document.getElementById || !document.getElementsByTagName || !document.getElementById("gallery")) return false;

	var links = document.getElementById("gallery").getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function() {
			return !showPic(this);
		}
	}
}

addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);