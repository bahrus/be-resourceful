import { define } from 'be-decorated/be-decorated.js';
import { register } from 'be-hive/register.js';
export class BeResourcefulController {
    intro(proxy, target, bdp) {
        //  Create Resources Array Virtual Prop based on ifWantsToBe Attribute
        const attr = target.getAttribute(`is-${bdp.ifWantsToBe}`).trim();
        let virtualProps;
        switch (attr[0]) {
            case '[':
                const resourceApprox = JSON.parse(attr);
                const resources = [];
                for (const item of resourceApprox) {
                    if (typeof item === 'string') {
                        resources.push(this.createResource(item));
                    }
                    else {
                        resources.push(item);
                    }
                }
                virtualProps = {
                    resources,
                };
                break;
            case '{':
                virtualProps = JSON.parse(attr);
                break;
            default:
                virtualProps = {
                    resources: [this.createResource(attr)],
                };
                break;
        }
        Object.assign(proxy, virtualProps);
    }
    onResources({ proxy, resources }) {
        for (const resource of resources) {
            //for now, just use window
            const aWin = window;
            if (aWin.appHistory.entries.length > 0)
                continue;
            const p = new URLPattern(resource.URLPatternInit);
            const result = p.exec(window.location);
            const searchParams = new URLSearchParams(window.location.search);
            const search = {};
            for (const [key, value] of searchParams) {
                search[key] = value;
            }
            console.log(result);
            if (result !== null) {
                aWin.appHistory.updateCurrent({
                    state: {
                        path: {
                            ...result.pathname.groups
                        },
                        search
                    }
                });
            }
        }
    }
    createResource(path) {
        //  Create Resource
        const resource = {
            URLPatternInit: {
                pathname: path,
            }
        };
        return resource;
    }
}
const tagName = 'be-resourceful';
const ifWantsToBe = 'resourceful';
const upgrade = '*';
define({
    config: {
        tagName,
        propDefaults: {
            noParse: true,
            ifWantsToBe,
            upgrade,
            virtualProps: ['resources'],
            intro: 'intro',
        },
        actions: {
            onResources: {
                ifAllOf: ['resources'],
            }
        }
    },
    complexPropDefaults: {
        controller: BeResourcefulController,
    },
});
register(ifWantsToBe, upgrade, tagName);
