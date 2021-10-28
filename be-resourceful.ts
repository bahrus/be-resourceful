import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeResourcefulProps, BeResourcefulActions} from './types';

export class BeSourceful {

}
const tagName = 'be-resourceful';

define<BeResourcefulProps & BeDecoratedProps, BeResourcefulActions>({
    config: {
        tagName,
        propDefaults:{
            resource: '_self',
            target: '_self',
            URLPattern: {},
            rootPath: ''
        }
    }
})