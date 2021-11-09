import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeResourcefulProps, BeResourcefulVirtualProps, BeResourcefulActions, Resource} from './types';
import {register} from 'be-hive/register.js';

export class BeResourcefulController implements BeResourcefulActions {
    intro(proxy: Element & BeResourcefulVirtualProps, target: Element, bdp: BeDecoratedProps) {
        //  Create Resources Array Virtual Prop based on ifWantsToBe Attribute
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
const tagName = 'be-resourceful';
const ifWantsToBe = 'resourceful';
const upgrade = '*';

define<BeResourcefulProps & BeDecoratedProps, BeResourcefulActions>({
    config: {
        tagName,
        propDefaults:{
            noParse: true,
            ifWantsToBe,
            upgrade,
            virtualProps: ['resources']
        }
    },
    complexPropDefaults:{
        controller: BeResourcefulController,
    },
});

register(ifWantsToBe, upgrade, tagName);

