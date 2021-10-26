# be-resourceful [TODO]

```html
<nav be-resourceful='{
    "URLPattern":{
        "protocol": "https",
        "pathname": "/foo/:test.html"
    },
    "transform":{
        ":host": "...",
        "input[-value]": "pathname.groups.test"
    }
}'>
```

Limitations:  Only initializes value.  Doesn't listen for address changes.
