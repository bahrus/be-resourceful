# be-resourceful

```html
<input be-resourceful='{
    "URLPattern":{
        "protocol": "https",
        "pathname": "/foo/:test.html"
    },
    "set":{
        "value": "pathname.groups.test"
    }
}'>
```

Limitations:  Only initializes value.  Doesn't listen for address changes.