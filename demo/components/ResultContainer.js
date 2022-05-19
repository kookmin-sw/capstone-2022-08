export default class ResultContainer {
    constructor($target){
        this.result = document.createElement('div')
        this.result.className = "result-container"
        $target.appendChild(this.result);
    }

    setState(data) {
        this.data = data;
        this.render();
    }

    render(){
        this.result.innerHTML = `
        <div class="emoji" id="resultEmoji">😆</div>
        <div class="result-circle">
            <p class="bad-horse-text">나쁜 말 🐎</p>
            <div class="percentage-container">
                <span class="number-text" id="percentageText">0</span><span class="percentage-text">%</span>
            </div>  
        </div>
        `
    }
}