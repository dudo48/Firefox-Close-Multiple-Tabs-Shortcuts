// returns all tabs and the open tab in one array
async function getTabsDetails(){
    var all_tabs = await browser.tabs.query({});
    var open_tab = await browser.tabs.query({currentWindow: true, active: true});

    return [all_tabs, open_tab];
}

function closeOtherTabs() {
    getTabsDetails().then(function(tabs_details){

        var tabs_toremove = [];

        // loop over all tabs
        for(var i in tabs_details[0]){

            // if the looped tab index doesn't equal the open tab index
            if(tabs_details[0][i].index !== tabs_details[1][0].index){
                tabs_toremove.push(tabs_details[0][i].id);
            }
        }

        browser.tabs.remove(tabs_toremove);
    });
}

function closeRightTabs() {
    getTabsDetails().then(function(tabs_details){

        var tabs_toremove = [];

        for(var i in tabs_details[0]){

            // if the looped tab index is larger than the open tab index
            if(tabs_details[0][i].index > tabs_details[1][0].index){
                tabs_toremove.push(tabs_details[0][i].id);
            }
        }
        
        browser.tabs.remove(tabs_toremove);
    });
}

function closeLeftTabs() {
    getTabsDetails().then(function(tabs_details){

        var tabs_toremove = [];

        for(var i in tabs_details[0]){

            // if the looped tab index is smaller than the open tab index
            if(tabs_details[0][i].index < tabs_details[1][0].index){
                tabs_toremove.push(tabs_details[0][i].id);
            }
        }
        
        browser.tabs.remove(tabs_toremove);
    });
}

browser.commands.onCommand.addListener(function (command) {

        if (command === "other-tabs") {
            closeOtherTabs();
        }
        else if (command === "right-tabs") {
            closeRightTabs();
        }
        else if (command === "left-tabs") {
            closeLeftTabs();
        }
});