import ContentContainer from "./components/ContentContainer.js";
import DescriptionContainer from "./components/DescriptionContainer.js";
import ResultContainer from "./components/ResultContainer.js";

export default class App {
    constructor($target) {
        console.log($target)
        const contentContainer = new ContentContainer($target)
        const descriptionContainer = new DescriptionContainer($target)
    }
}
