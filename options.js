function saveOptions(e) {
    var path = document.querySelector("#folder").value;
    path = path.replace(/\/+$/g, "");
    path = path.replace(/^\/+/, "");
    if (path.length > 0) path = path + "/";
    browser.storage.sync.set({
        folder: path
    });
    restoreOptions();
    e.preventDefault();
}

function restoreOptions() {
    var gettingItem = browser.storage.sync.get('folder');
    gettingItem.then((res) => {
        document.querySelector("#folder").value = res.folder;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);