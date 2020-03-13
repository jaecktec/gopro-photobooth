import './app.scss'
import mustache from 'https://unpkg.com/mustache@latest/mustache.mjs';
import memoryRouter from "./memory-router";
import template from './main.handlebars'

import './views/live_preview/live-preview'

class App extends HTMLElement {

    constructor(props) {
        super(props);
        this.__templateParams = {
            'route': {}
        };
        const self = this;
        memoryRouter.routeChange$.subscribe(activeRoute => {
            this.__templateParams.route = {};
            this.__templateParams.route[activeRoute] = true;
            self.__updateTemplate()
        });
        memoryRouter.activeRoute = 'live-preview';
    }

    __updateTemplate(){
        this.innerHTML = mustache.render(template, this.__templateParams);
    }
}

customElements.define("app-component", App);