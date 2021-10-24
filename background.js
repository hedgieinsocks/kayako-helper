const ticketRegexp = "^\\[#([A-Z]{3}-[0-9]{3}-[0-9]{5})\]:";

const defaults = {
	copyMode: "ticket",
	toNotify: true,
};

function notify(text) {
	browser.notifications.create({
		"type": "basic",
		"title": "Kayako Helper",
		"message": text
	});
};

function copyToClipboard(copyMode, toNotify) {
	browser.tabs.query({ currentWindow: true, active: true }, tabs => {
		let title = tabs[0].title;
		let match = title.match(ticketRegexp);
		if (match) {
			let ticket = match[1]
			let url = new URL(tabs[0].url);
			if (copyMode === "ticket") {
				var reply = ticket;
			} else {
				var reply = 'https://' + url.hostname + url.pathname + '?/Tickets/Ticket/View/' + ticket;
			};
			navigator.clipboard.writeText(reply).then();
			if (toNotify) {
				notify(reply);
			}
		} else {
			if (toNotify) {
				notify("Kayako Ticket ID Not Found In The Title");
			};
		};
	});
};

browser.menus.create({
	id: "main",
	title: "Kayako Helper",
	contexts: ["all"],
	documentUrlPatterns: ['<all_urls>'],
	icons: {
		"16": "icon.svg",
		"32": "icon.svg"
	}
});

browser.menus.create({
	parentId: "main",
	id: "ticket",
	title: "Get Ticket ID",
	contexts: ["all"],
	documentUrlPatterns: ['<all_urls>']
});

browser.menus.create({
	parentId: "main",
	id: "link",
	title: "Get Ticket Link",
	contexts: ["all"],
	documentUrlPatterns: ['<all_urls>']
});

browser.menus.onClicked.addListener((info) => {
	browser.storage.local.get(defaults, (options) => {
		copyToClipboard(info.menuItemId, options.toNotify);
	});
});

browser.browserAction.onClicked.addListener(() => {
	browser.storage.local.get(defaults, (options) => {
		copyToClipboard(options.copyMode, options.toNotify);
	});
});
