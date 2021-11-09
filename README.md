# be-resourceful

be-resourceful initiates appHistory's state based on the current URL.


Example 1: Single path

```html
<nav be-resourceful="/foo/:view"></nav>
```

If appHistory.entries.length is 0 (if available, else history.state?), and url:  https://my-site.com/foo/myFirstView is opened, sets appHistory.currentState to {view: myFirstView}

Example 2:  Multiple paths

```html
<nav be-resourceful='["foo/:view", "foo/:edit"]'></nav>
```

Example 3:  Full Access to everything [TODO]

```html
<nav be-resourceful='{
    "resources": [
        {
            "URLPattern":{
                "pathname": "/foo/:view"
            },
            "resource": "myFrame",
            "target": "myOtherFrame",
            "resourcePath":"a.b.c",
            "targetPath": "e.f.g"
        }
    ],
}'></nav>
```




Limitations:  Only initializes value.  Doesn't listen for address changes.
