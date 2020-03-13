import {Observable, Subject} from 'rxjs'

const singleton = Symbol();
const singletonEnforcer = Symbol();


class MemoryRouter {

    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) throw "Cannot construct singleton";

        this.__active_route = 'live-preview';
        this.__route_change$ = new Subject()
    }

    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new MemoryRouter(singletonEnforcer);
        }
        return this[singleton];
    }

    get routeChange$(){
        return this.__route_change$
    }

    set activeRoute(activeRoute){
        this.__active_route = activeRoute;
        this.__route_change$.next(activeRoute);
    }

    get activeRoute(){
        return this.__active_route;
    }
}

export default MemoryRouter.instance