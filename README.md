# be-resourceful [WIP]

be-resourceful initializes appHistory's state based on the current URL and other queryable settings and events.

Some (perhaps a small minority of) SPA's have seen the light, and look to history.state (and appHistory going forward) as a kind of "application uniter" -- a consistent location where key aspects of the application state can be found.  

The ability of deeply nested components to access this state means a large number of cases where "deep drilling of properties" is a problem is now solved.

The tricky thing, though, is that these enlightened applications have to think about two ways the state can get there:

1.  Via navigation while the browser tab is open, or 
2.  The user bookmarks the page, or shares the page with others, so now people directly jump straight to that view / link, bypassing the navigation steps that brought them there.

So the question becomes how to encode this state in the application, and avoid doubling the effort to maintain state consistently?

That is the purpose of be-resourceful, to help with that task.

Just to give an example of such an application, try opening:  https://www.msn.com/en-us/news/coronavirus?ocid=msedgntp and inspecting history.state.  What you will see is:

```JSON
{
    "display": "Coronavirus",
    "id": "news-coronavirus",
    "renderInfo": {
        "renderType": 3,
        "externalUrl": "https://www.msn.com/en-us/news/coronavirus",
        "path": "news/coronavirus",
        "usePathNameAsIs": true,
        "context": {
            "feedId": "Y_46cba2b4-26fd-492e-a1c0-41ec9917c10b"
        },
        "experienceConfigRef": {
            "instanceId": "",
            "configRef": {
                "experienceType": "River",
                "instanceSrc": "_hub-news-coronavirus-river-index-BB10Xdfl",
                "sharedNs": "msn-ns"
            }
        }
    },
    "pageTitle": "Coronavirus (COVID-19)",
    "verticalKey": "news",
    "categoryKey": "coronavirus",
    "destinationUrl": "https://www.msn.com/en-us/news/coronavirus?ocid=msedgntp",
    "parentId": "news",
    "telemetryMetadata": {
        "n": "Coronavirus",
        "a": "click",
        "b": 1,
        "d": "https://www.msn.com/en-us/news/coronavirus?ocid=msedgntp",
        "f.i": "news-coronavirus",
        "f.n": "Coronavirus",
        "f.t": "category filter",
        "c.hl": "Coronavirus"
    }
}
```

be-resourceful focuses on extracting the information needed to populate state from three locations:

1.  The address bar, and 
2.  Captured events from within the nav element.
2.  Server rendered HTML.

## From the address bar

Example 1: Single path

```html
<nav be-resourceful="/foo/:view">
    <a href=foo/myFirstView be-selectable>My First View</a>
    <a href=foo/mySecondView be-selectable>My Second View</a>
</nav>
```

If appHistory.current.getState().beResourceful doesn't already exist, then currentState is appended with:

```JavaScript
{
    ...otherStateFromOtherCode,
    beResourceful:{
        path: {
            view: myFirstView
        }
    }

}
```




Example 2:  Multiple paths

```html
<nav be-resourceful='["foo/:view", "foo/:edit"]'></nav>
```

Example 3:  Capturing selected events from within the nav element. 

be-resourceful can work well with be-selectable, and transfer metadata from the selected hyperlink into appHistory.state.

For example:

```html
    <nav be-resourceful=/demo/foo/:view>
        <a href="/demo/foo/firstView" be-selectable data-test="hello">My First View</a>
        <a href="/demo/foo/secondView" be-selectable>My Second View</a>
    </nav>
```

shallow merges object:

```JSON
{
    "beResourceful": {
        "metadata": {
            "test": "hello"
        }
    }
}
```

into appHistory.current.getState().



Example 4:  Full Access to everything [TODO]


```html
<nav be-resourceful='{
    "resources": [
        {
            "URLPattern":{
                "pathname": "/foo/:view"
            },
            "rootPath": "be-resourceful",
        }
    ],
    "validation":{
        "cancelIf": ":not(.selectable)"
    }
}'>


</nav>
```

https://css-tricks.com/how-to-disable-links/


