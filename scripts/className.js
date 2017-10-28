function addClass(element, value) {
	if (!element.className) {
		element.className = value;
	} else {
		var newClassName = element.className + " " + value;
		element.className = newClassName;
	}
}