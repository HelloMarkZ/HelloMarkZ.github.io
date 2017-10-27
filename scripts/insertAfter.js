function insertAfter(element, target) {
	var parent = target.parentNode;
	if (parent.lastChild == target) {
		parent.appendChild(element);
	} else {
		parent.insertBefore(element, target.nextSibling);
	}
}