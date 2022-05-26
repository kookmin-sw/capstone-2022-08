import api from "../api/badhorseAPI.js"
import ChatContainer from "./ChatContainer.js"
import ResultContainer from "./ResultContainer.js"

export default class ContentContainer {
    constructor($target, initialData) {
        this.content = document.createElement('div')
        this.content.className = "content-container"
        this.$chat = document.createElement('div')
        this.$result = document.createElement('div')
        this.data = initialData
        this.chatContainer = new ChatContainer(this.$chat, async (text) => {
            const res = await api.fetchPredict(text)
            let percentage = parseInt(res["bad_prob"] * 100)
            let emoji = res["is_bad"] ? "😭" : "😆"
            this.setState({
                ...this.data,
                result: {emoji, percentage}
            })
        })

        this.resultContainer = new ResultContainer(this.$result, {result:{emoji:"😆", percentage:0}})
        this.content.appendChild(this.$chat)
        this.content.appendChild(this.$result)
        $target.appendChild(this.content);
        this.render()
    }

    setState(data) {
        this.data = data;
        this.resultContainer.setState(data)
        this.render();
    }

    render() {
    }
}