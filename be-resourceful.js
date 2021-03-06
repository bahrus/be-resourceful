import { define } from 'be-decorated/be-decorated.js';
import { register } from 'be-hive/register.js';
export class BeResourcefulController {
    async intro(proxy, target, bdp) {
        //  Create Resources Array Virtual Prop based on ifWantsToBe Attribute
        switch (target.localName) {
            case 'nav':
                {
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
                break;
        }
    }
    onResources({ proxy, resources, updateFromURLPatternOnce }) {
        const aWin = window;
        const appHistory = aWin.appHistory;
        const current = appHistory.current?.getState();
        if (updateFromURLPatternOnce && current.beResourceful !== undefined)
            return;
        for (const resource of resources) {
            const p = new URLPattern(resource.URLPatternInit);
            const result = p.exec(window.location);
            const searchParams = new URLSearchParams(window.location.search);
            const search = {};
            for (const [key, value] of searchParams) {
                search[key] = value;
            }
            if (result !== null) {
                console.log('updateCurrent');
                appHistory.updateCurrent({
                    state: {
                        ...current,
                        beResourceful: {
                            path: {
                                ...result.pathname.groups
                            },
                            search
                        }
                    },
                });
            }
        }
        const selectable = proxy.getRootNode().querySelector('be-selectable');
        if (selectable !== null) {
            proxy.addEventListener(`${selectable.ifWantsToBe}::selected-changed`, e => {
                console.log(e);
                if (!e.detail.value)
                    return;
                const current = appHistory.current?.getState();
                const beResourceful = current.beResourceful || {};
                const dataset = e.target.dataset;
                const metadata = {};
                for (const key in dataset) {
                    metadata[key] = dataset[key];
                }
                beResourceful.metaData = metadata;
                appHistory.updateCurrent({
                    state: {
                        ...current,
                        beResourceful
                    }
                });
            }, {
                capture: true,
            });
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
const upgrade = 'nav';
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
