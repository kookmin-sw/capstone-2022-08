import ChatContainer from "./ChatContainer.js"
import ResultContainer from "./ResultContainer.js"

export default class ContentContainer {
    constructor($target){
        this.content = document.createElement('div')
        this.content.className = "content-container"
        this.$chat = document.createElement('div')
        this.$result = document.createElement('div')
        const chatContainer = new ChatContainer(this.$chat)
        const resultContainer = new ResultContainer(this.$result)
        this.content.appendChild(this.$chat)
        this.content.appendChild(this.$result)
        $target.appendChild(this.content);
        this.render()
    }

    setState(data) {
        this.data = data;
        this.render();
    }

    render(){
    }
}