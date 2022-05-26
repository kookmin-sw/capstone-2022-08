export default class ResultContainer {
    constructor($target, initialData){
        this.result = document.createElement('div')
        this.result.className = "result-container"
        this.data = initialData
        $target.appendChild(this.result);
        this.render()
    }

    setState(data) {
        this.data = data;
        this.render();
    }
    
    render(){
        this.result.innerHTML = `
        <div class="emoji" id="resultEmoji">${this.data.result.emoji}</div>
        <div class="result-circle">
            <p class="bad-horse-text">나쁜 말 🐎</p>
            <div class="percentage-container">
                <span class="number-text" id="percentageText">${this.data.result.percentage}</span><span class="percentage-text">%</span>
            </div>  
        </div>
        `
    }
}