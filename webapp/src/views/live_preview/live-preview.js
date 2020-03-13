import mustache from 'https://unpkg.com/mustache@latest/mustache.mjs';
import template from './live-preview.handlebars'
import './live-preview.scss'
import startCounter from "./counter/counter";
import cameraService from '../../services/camera-service'

class LivePreview extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = mustache.render(template, {})

        // setTimeout(()=>{
        //     startCounter()
        // }, 2000)
        document.getElementById('take_picture').onclick = async () => {
            // startCounter(async () => {
            document.getElementById('flash').classList.add('flash')
            await cameraService.takePicture();
            // });
        }
    }
}

customElements.define('app-live-preview', LivePreview);