/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

/*
Called when the item has been removed.
We'll just log success here.
*/
function onRemoved() {
  console.log("Item removed successfully");
}

/*
Called when there was an error.
We'll just log the error here.
*/
function onError(error) {
    console.log(`Error: ${error}`);
}

/*
Create all the context menu items.
*/
browser.menus.create({
    id: "capture-image",
    title: browser.i18n.getMessage("menuItemCapturePicture"),
    contexts: ["image"]
}, onCreated);

browser.menus.create({
    id: "capture-content",
    title: browser.i18n.getMessage("menuItemCaptureLinkContent"),
    contexts: ["link"]
}, onCreated);

/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
browser.menus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "capture-image":
            browser.downloads.download({
                filename: "memfolder/" + info.srcUrl.substring(info.srcUrl.lastIndexOf('/')+1),
                url: info.srcUrl
            });
        break;
        case "capture-content":
            browser.downloads.download({
                filename: "memfolder/" + info.linkUrl.substring(info.linkUrl.lastIndexOf('/')+1),
                url: info.linkUrl
            });
        break;
    }
});

browser.runtime.onInstalled.addListener(() => {
    console.log("CapturePicture installed!");
    var storage = browser.storage.sync.get('folder');
    storage.then((res) => {
        if (res.folder.length == 0) {
            console.log("Writting storage");
            browser.storage.sync.set({
                folder: 'CapturedPictures/'
            });
        }
    });
});
