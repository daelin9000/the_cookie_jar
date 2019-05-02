const Pantry = {
    recipeTime: 500,
    cookieTime: 33, // roughly 30 fps
    avgCpsMaxCount: 5,
    qaTime: 1000
}

const Kitchen = {

    cookiesPs: 0,
    avgCps: 0.0,
    avgCpsLog: [],
    avgCpsTrack: 0,
    cookieCount: 0,
    clickCookie: false,
    bakeInterval: null,
    recipeCheckTime: 0,
    qaCheckTime: 0,    
    shareRecipe () { // write the secret sauce up on the board
        console.log('Sharing Recipe...')

        // Create unordered list
        let debugList = document.createElement('ul');

        // Create list items

        // write down how many cookies we're pumpin out
        let cpsItem = document.createElement('li');
        let cpsText = document.createTextNode('Actual CPS: ' + this.cookiesPs);
        cpsItem.appendChild(cpsText);
        cpsItem.id = 'realCps'

        // do a little math on em
        let avgCpsItem = document.createElement('li');
        let avgCpsText = document.createTextNode('Average CPS: ' + this.avgCps);
        avgCpsItem.appendChild(avgCpsText);
        avgCpsItem.id = 'avgCps'

        // add start button 
        let startBtn = document.createElement('input');
        startBtn.name = 'startBtn';
        startBtn.id = 'startBtn';
        startBtn.value = 'Toggle Bake';
        startBtn.type = 'button';
        startBtn.onclick = Kitchen.staffChange.bind(this);
        // put button in list
        let startItem = document.createElement('li');
        startItem.appendChild(startBtn);

        // put items in the list
        debugList.appendChild(cpsItem); // cps
        debugList.appendChild(avgCpsItem); // cpsAvg
        debugList.appendChild(startItem); // start button
    
        // paper for the recipe
        var debugMenu = document.createElement('Div');
        debugMenu.id = 'debugMenu';
        debugMenu.style.position = 'absolute';
        debugMenu.style.color = 'white';
        debugMenu.style.top = '0px';
        debugMenu.style.left = '0px';
        debugMenu.style.fontSize = '20px';
        debugMenu.style.zIndex = '9999';
        debugMenu.style.background = 'black';
        debugMenu.style.padding = '20px';
        debugMenu.style.paddingLeft = '40px';
    
        // put recipe on the paper
        debugMenu.appendChild(debugList);
        // put paper on the board 
        document.getElementsByTagName('body')[0].appendChild(debugMenu);
    },
    updateRecipe () {
        console.log('Updating Recipe...')
        document.getElementById("realCps").innerHTML = 'Actual CPS: ' + this.cookiesPs;
        document.getElementById("avgCps").innerHTML = 'Average CPS: ' + this.avgCps;
    },
    fireUpTheOven () {
        console.log('Firing up the ovens...')
        // show the recipe
        this.shareRecipe();

        // start up the baking loop
        this.bakeInterval = setInterval(this.bakeCookies.bind(this), Pantry.cookieTime);
    },
    bakeCookies () {
        console.log('Baking');
        console.log('clickCookie ', this.clickCookie);
        if (this.clickCookie) {
            Game.ClickCookie();
            this.cookieCount += Game.computedMouseCps;
        }

        // keep the watchers watching
        this.qaCheckTime += Pantry.cookieTime;
        console.log('qaCheckTime ', this.qaCheckTime);
        if (this.qaCheckTime > Pantry.qaTime) {
            this.qaCheckTime = 0;
            this.qualityCheck();
        }

        // keep that recipe up to date
        this.recipeCheckTime += Pantry.cookieTime;
        console.log('recipeCheckTime ', this.recipeCheckTime);
        if (this.recipeCheckTime > Pantry.recipeTime) {
            this.recipeCheckTime = 0;
            this.updateRecipe();
        }
    },
    qualityCheck () {
        console.log('~~ Checking Quality ~~')
        this.cookiesPs = (this.cookieCount + Game.cookiesPs).toFixed(2);
        this.cookieCount = 0;

        this.avgCpsTrack++;
        if (this.avgCpsLog.length > Pantry.avgCpsMaxCount) this.avgCpsLog.shift();
        this.avgCpsLog.push(this.cookiesPs);
        this.avgCps = parseInt((this.avgCpsLog.reduce((total, val) => total + val) / this.avgCpsLog.length))
    },
    staffChange () {
        console.log('Changing Staff')

        if (!this.bakeInterval) this.fireUpTheOven()
        else this.clickCookie = !this.clickCookie;
    },
    shutItAllDown () {
        console.log('Shut It ALL Down')
        if (this.bakeInterval) clearInterval(this.bakeInterval);
    },
}

Kitchen.fireUpTheOven();