function addLoadEvent(func) {
	var oldfunc = window.onload;
	if (typeof window.onload != "function") {
		window.onload = func;
	} else {
		window.onload = function() {
			oldfunc();
			func();
		}
	}
}

function addClass(element, value) {
	if (!element.className) {
		element.className = value;
	} else {
		var newClassName = element.className + " " + value;
		element.className = newClassName;
	}
}

function insertAfter(element, target) {
	var parent = target.parentNode;
	if (parent.lastChild == target) {
		parent.appendChild(element);
	} else {
		parent.insertBefore(element, target.nextSibling);
	}
}

function highlightPage() {
	if (!document.getElementsByTagName || !document.getElementById) return false;

	var headers = document.getElementsByTagName('header');
	if (headers.length == 0) return false;
	var navs = headers[0].getElementsByTagName("nav");
	if (navs.length == 0) return false;
	var links = navs[0].getElementsByTagName("a");

	for (var i = 0; i < links.length; i++) {
		if (window.location.href.indexOf(links[i].getAttribute("href")) != -1) {
			addClass(links[i], "here");
			document.body.setAttribute("id", links[i].lastChild.nodeValue.toLowerCase());
		}
	}
}

function moveElement(elementID, final_x, final_y, interval) {
	if (!document.getElementById || !document.getElementById(elementID)) return false;

	var elem = document.getElementById(elementID);

	if (elem.movement) {
		clearTimeout(elem.movement);
	}
	if (!elem.style.left) {
		elem.style.left = "0px";
	}
	if (!elem.style.top) {
		elem.style.top = "0px"
	}

	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if (xpos  == final_x && ypos == final_y) {
		return true;
	}

	if (xpos < final_x) {
		xpos = xpos + (Math.ceil((final_x - xpos)/10));
	}
	if (xpos > final_x) {
		xpos = xpos - (Math.ceil((xpos - final_x)/10));
	}
	if (ypos < final_y) {
		ypos = ypos + (Math.ceil((final_y - ypos)/10));
	}
	if (ypos > final_y) {
		ypos = ypos + (Math.ceil((ypos - final_y)/10));
	}

	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat  = "moveElement('" + elementID + "'," + final_x + "," + final_y + "," + interval + ")";
	elem.movement = setTimeout(repeat,interval);
}

function prepareSlideshow() {
	if (!(document.getElementsByTagName && document.getElementById && document.getElementById("intro"))) return false;

	var slideshow = document.createElement("div");
	slideshow.setAttribute("id", "slideshow");
	var preview = document.createElement("img");
	preview.setAttribute("src", "images/slideshow.gif");
	preview.setAttribute("alt", "a glimpse of what awaits you");
	preview.setAttribute("id", "preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow, intro);

	var links = document.getElementsByTagName("a");
	var destination;
	for (var i = 0; i < links.length; i++) {
		links[i].onmouseover = function() {
			destination = this.getAttribute('href');
			if (destination.indexOf("index.html") != -1) {
				moveElement("preview", 0, 0, 5);
			}
			if (destination.indexOf("about.html") != -1) {
				moveElement("preview", -150, 0, 5)
			}
			if (destination.indexOf("photos.html") != -1) {
				moveElement("preview", -300, 0, 5);
			}
			if (destination.indexOf("live.html") != -1) {
				moveElement("preview", -450, 0, 5)
			}
			if (destination.indexOf("contact.html") != -1) {
				moveElement("preview", -600, 0, 5)
			}
		}
	}
}

function showSection(id) {
	var sections = document.getElementsByTagName("section");
	for (var i = 0; i < sections.length; i++)  {
		if (sections[i].getAttribute("id") != id) {
			sections[i].style.display = "none";
		} else {
			sections[i].style.display = "block";
		}
	}
}

function prepareInternalnav() {
	if (!(document.getElementById && document.getElementsByTagName)) return false;

	var articles = document.getElementsByTagName("article");
	if (articles.length == 0) return false;
	var navs = articles[0].getElementsByTagName('nav');
	if (navs.length == 0) return false;
	var links = navs[0].getElementsByTagName("a");

	for (var i = 0; i < links.length; i++) {
		var sectionId = links[i].getAttribute("href").split("#")[1];
		if (!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display = "none";
		links[i].destination = sectionId;
		links[i].onclick = function() {
			showSection(this.destination);
			return false;
		}
	}
}

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
	if ((!document.getElementById) || (!document.getElementById("imagegallery")) || (!document.createElement) || (!document.createTextNode)) return false;

	var placeholder = document.createElement("img");
	placeholder.setAttribute("src", "images/placeholder.gif");
	placeholder.setAttribute("id", "placeholder");
	placeholder.setAttribute("alt", "placeholder");

	var description = document.createElement("p");
	description.setAttribute("id", "description");
	description.appendChild(document.createTextNode("Choose an image"));

	insertAfter(description, document.getElementById("imagegallery"));
	insertAfter(placeholder, description);
}

function prepareGallery() {
	if (!document.getElementById || !document.getElementsByTagName || !document.getElementById("imagegallery")) return false;

	var links = document.getElementById("imagegallery").getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function() {
			return !showPic(this);
		}
	}
}

function stripeTables() {
	if (!document.getElementsByTagName) return false;
	var tables = document.getElementsByTagName("table");
	var odd, rows;

	for (var i = 0; i < tables.length; i++) {
		odd = false;
		rows = tables[i].getElementsByTagName("tr");
		for (var j = 0; j < rows.length; j++) {
			if (odd == true) {
				addClass(rows[j], "odd");
				odd = false;
			} else {
				odd = true;
			}
		}
	}
}

function isFilled(field) {
	if (field.value.replace(' ','').length == 0) return false;
	var placeholder = field.placeholder || field.getAttribute("placeholder");
	return (field.value != placeholder);
}

function isEmail(field) {
	return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}

function validateForm(whichform) {
	for (var i = 0; i < whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if (element.required == "required") {
			if (!isFilled(element)) {
				alert("Please fill in the " +element.name+ " field.");
				return false;
			}
		}
		if (element.type == "email") {
			if (!isEmail(element)) {
				alert("The " + element.name + " field must be a valid email address.");
				return false;
			}
		}
	}
	return true;
}

function prepareForms() {
	for (var i = 0; i < document.forms.length; i++) {
		var thisform = document.forms[i];
		thisform.onsubmit = function() {
			return validateForm(this);
		}
	}
}

addLoadEvent(stripeTables);
addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);
addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(prepareForms);