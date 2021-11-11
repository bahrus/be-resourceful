import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeResourcefulProps, BeResourcefulVirtualProps, BeResourcefulActions, Resource} from './types';
import {register} from 'be-hive/register.js';
declare const URLPattern: any;
import {AppHistory} from './appHistory';
import {getProxy} from 'be-observant/getProxy.js';

export class BeResourcefulController implements BeResourcefulActions {
    async intro(proxy: Element & BeResourcefulVirtualProps, target: Element, bdp: BeDecoratedProps) {
        //  Create Resources Array Virtual Prop based on ifWantsToBe Attribute
        switch(target.localName){
            case 'nav': {
                const attr = target.getAttribute(`is-${bdp.ifWantsToBe}`)!.trim();
                let virtualProps: BeResourcefulVirtualProps | undefined;        
                switch(attr[0]){
                    case '[':
                        const resourceApprox = JSON.parse(attr) as (string | Resource)[];
                        const resources: Resource[] = [];
                        for(const item of resourceApprox){
                            if(typeof item === 'string'){
                                resources.push(this.createResource(item));
                            } else {
                                resources.push(item as Resource);
                            }
                        }
                        virtualProps = {
                            resources,
                        };
                        break;
                    case '{':
                        virtualProps = JSON.parse(attr) as BeResourcefulVirtualProps;
                        break;
                    default:
                        virtualProps = {
                            resources: [this.createResource(attr)],
                        };
                        break;
                }
                Object.assign(proxy, virtualProps);
            }
            break;
            case 'a':
                const anchor = target as HTMLAnchorElement;
                const navResource = await getProxy(target.closest('nav')!, bdp.ifWantsToBe) as BeResourcefulVirtualProps;
                for(const resource of navResource.resources!){
                    //const p = new URLPattern(resource.URLPatternInit);
                    //const result = p.exec(anchor.href);
                    if(anchor.href === location.href){
                        anchor.dataset.isSelected = 'true';
                        
                    }else{
                        delete anchor.dataset.isSelected;
                    }
                }
                break;
        }

    }
    onResources({proxy, resources}: this){
        for(const resource of resources!){
            //for now, just use window
            const aWin = window as any;
            const appHistory = aWin.appHistory as AppHistory;
            if(appHistory.entries.length > 0) continue;
            const p = new URLPattern(resource.URLPatternInit);
            const result = p.exec(window.location);
            const searchParams = new URLSearchParams(window.location.search);
            const search: any = {};
            for(const [key, value] of searchParams){
                search[key] = value;
            }
            console.log(result);
            if(result !== null){
                aWin.appHistory.updateCurrent({
                    state:{
                        path: {
                            ...result.pathname.groups
                        },
                        search
                    }
                });
            }
            
        }
    }
    createResource(path: string){
        //  Create Resource
        const resource: Resource = {
            URLPatternInit:{
                pathname: path,
            }
        };
        return resource;
    }
}

export interface BeResourcefulController extends BeResourcefulProps {}
const tagName = 'be-resourceful';
const ifWantsToBe = 'resourceful';
const upgrade = 'nav,a';

define<BeResourcefulProps & BeDecoratedProps, BeResourcefulActions>({
    config: {
        tagName,
        propDefaults:{
            noParse: true,
            ifWantsToBe,
            upgrade,
            virtualProps: ['resources'],
            intro: 'intro',
        },
        actions:{
            onResources:{
                ifAllOf: ['resources'],
            }
        }
    },
    complexPropDefaults:{
        controller: BeResourcefulController,
    },
});

register(ifWantsToBe, upgrade, tagName);

