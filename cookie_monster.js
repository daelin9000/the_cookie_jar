function bakeCookies () {

    var debugTest = document.createElement("LI")
    var debugTestText = document.createTextNode("Testing Debug Menu");
    debugTest.appendChild(debugTestText)
    var debugList = document.createElement("UL")
    debugList.appendChild(debugTest)

    var debugMenu = document.createElement("Div");
    debugMenu.id = "debugMenu";

    debugMenu.style.position = "absolute";
    debugMenu.style.color = "white";
    debugMenu.style.top = "0px";
    debugMenu.style.left = "0px";
    debugMenu.style.fontSize = "20px";
    debugMenu.style.zIndex = "9999";
    debugMenu.style.background = "black";
    debugMenu.style.padding = "20px";
    debugMenu.style.paddingLeft = "40px";


    debugMenu.appendChild(debugList)

    document.getElementsByTagName('body')[0].appendChild(debugMenu)
}