export default class DescriptionContainer {
    constructor($target){
        this.description = document.createElement('div')
        this.description.className = "description-container"
        $target.appendChild(this.description);
    }

    setState(data) {
        this.data = data;
        this.render();
    }

    render(){
        this.description.innerHTML = `<pre class="description">점점 늘어나는 악성 댓글을 빠르게 알아낼 수 있다면
그것으로 피해보는 사람이 지금보다 줄어들 수 있습니다.
        </pre>
        <div class="good-horse">
            <p class="good-horse-text">말은 착하다</p>
        </div>`
    }
}