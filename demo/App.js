// import SearchSection from "./components/SearchSection.js";
// import ResultSection from "./components/ResultSection.js";
// import Loader from "./components/Loader.js";
// import DarkMode from "./components/ChangeMode.js";
// import api from "./api/theCatAPI.js";
// import { getItem, setItem } from "./util/localStorage.js";

import ContentContainer from "./components/ContentContainer.js";
import DescriptionContainer from "./components/DescriptionContainer.js";
import ResultContainer from "./components/ResultContainer.js";

export default class App {
    constructor($target) {
        const contentContainer = new ContentContainer($target)
        const resultContainer = new ResultContainer($target)
        const descriptionContainer = new DescriptionContainer($target)
        
        // let initialData = null;
        // if (keywords) {
        //     keywords = keywords.split(",");
        // } else {
        //     keywords = [];
        // }

        // const getInitialData = async (keywords) => {
        //     if (keywords) {
        //         initialData = JSON.parse(getItem("recent"));
        //     } else {
        //         return null;
        //     }
        // };

        // const onSearch = async (keyword, isRandom) => {
        //     const loader = new Loader($target);
        //     let response = null;
        //     if (isRandom) {
        //         response = await api.fetchCats(keyword);
        //     } else {
        //         response = await api.fetchRandomCats();
        //         console.log(response);
        //     }
        //     resultSection.setState(response);
        //     const recent = JSON.stringify(response);
        //     setItem("recent", recent);
        //     loader.closeLoader();
        // };

        // const darkMode = new DarkMode($target);

        // const searchSection = new SearchSection({
        //     $target,
        //     onSearch,
        //     keywords,
        // });

        // getInitialData(keywords);
        // const resultSection = new ResultSection($target, initialData);
    }
}
