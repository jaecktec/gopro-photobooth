const singleton = Symbol();
const singletonEnforcer = Symbol();

class CameraService {

    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) throw "Cannot construct singleton";
    }

    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new CameraService(singletonEnforcer);
        }
        return this[singleton];
    }

    async takePicture() {
        await fetch('/take-picture', {
            method: 'POST',
        })
    }

    async listMedia() {
        return await fetch('/galery')
    }
}

export default CameraService.instance