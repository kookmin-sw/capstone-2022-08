export default class ContentContainer {
    constructor($target){
        this.content = document.createElement('div')
        this.content.className = "content-container"
        $target.appendChild(this.content);
    }

    setState(data) {
        this.data = data;
        this.render();
    }

    render(){
        this.result.innerHTML = `
        <div class="chat-container">
        <div class="chat-message1-container">
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
        </p>
        <div class="sender-container">
            <textarea id="chat" cols="30" rows="10"></textarea>
            <div class="sender-button" id="sendButton">평가하기</div>
        </div>
    </div>`
    }
}