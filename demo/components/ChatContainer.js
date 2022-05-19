export default class ChatContainer {
    constructor($target, onClick) {
        this.$content = document.createElement('div')
        this.$content.className = "chat-container"
        this.template = `<div class="chat-message1-container">
                <img class="profile-image" src="./resources/img/cowboy.png"></img>
                <div class="message-container">
                    <p class="username">Bad Horse Owner</p>
                    <p class="chat-message1">
                        환영합니다
                    </p>
                </div>
            </div>
            <p class="chat-message2">
                여러분이 쓰는 문장이 얼마나 나쁜 말인지 알려드리지요.
            </p>`
        this.$content.innerHTML = this.template

        this.$sender = document.createElement('div')
        this.$sender.className = "sender-container"

        this.$textarea = document.createElement('textarea')
        this.$textarea.cols = 30
        this.$textarea.rows = 10
        this.$textarea.id = "chat"

        this.$sendBtn = document.createElement('div')
        this.$sendBtn.className = "sender-button"
        this.$sendBtn.innerHTML = "평가하기"
        this.$sendBtn.addEventListener('click', ()=>{
            const text = this.$textarea.value
            onClick(text)
        })


        this.$sender.appendChild(this.$textarea)
        this.$sender.appendChild(this.$sendBtn)
        this.$content.appendChild(this.$sender)

        $target.appendChild(this.$content);
        this.render()
    }

    setState(data) {
        this.data = data;
        this.render();
    }

    render() {
    }
}