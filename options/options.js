const defaults = {
	copyMode: "ticket",
	toNotify: true,
};

browser.storage.local.get(defaults, (options) => {
	document.getElementById("select").checked = options.copyMode;
	document.getElementById("checkbox").checked = options.toNotify;
});

document.getElementById("select").addEventListener("change", () => {
	browser.storage.local.set({
		copyMode: document.getElementById("select").value
	});
});

document.getElementById("checkbox").addEventListener("change", () => {
	browser.storage.local.set({
		toNotify: document.getElementById("checkbox").checked
	});
});
