import {BeDecoratedProps} from 'be-decorated/types';

export interface BeResourcefulVirtualProps{
    resources?: Resource[];
    updateFromURLPatternOnce?: boolean;
}
export interface BeResourcefulProps extends BeResourcefulVirtualProps{
    proxy: Element & BeResourcefulVirtualProps;
}

export interface BeResourcefulActions{
    intro(proxy: Element & BeResourcefulVirtualProps, target: Element, bdp: BeDecoratedProps): void;
    onResources(self: this): void;
}

export interface Resource{
    URLPatternInit: URLPatternInit;
    // resource?: string; // window to parse url
    // target?: string; // window to set state on
    // resourcePath?: string; // subsection of object to extract
    targetPath?: string; // nested path where resource will be set
}

export interface URLPatternInit {
    protocol?: string;
    username?: string;
    password?: string;
    hostname?: string;
    port?: string;
    pathname?: string;
    search?: string;
    hash?: string;
    baseURL?: string;
}