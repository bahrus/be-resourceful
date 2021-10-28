# be-resourceful [TODO]

Example 1: Single path

```html
<nav be-resourceful="/foo/:view"></nav>
```

If appHistory.current is null (if available, else history.state?), and url:  https://my-site.com/foot/myFirstView.html is opened, sets current to {view: myFirstView}

Example 2:  Multiple paths

```html
<nav be-resourceful='["foo/:view", "foo/:edit"]'></nav>
```

Example 3:  Full Access to everything

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
    ]
}'></nav>
```


Limitations:  Only initializes value.  Doesn't listen for address changes.
