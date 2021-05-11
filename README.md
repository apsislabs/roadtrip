# Roadtrip

An intentionally busted server.

## Endpoints

### `GET http://localhost:9923/api/roadtrip` Get a State

Returns on success:

```json
{
   "data":{
      "state":"Washington"
   }
}
```

Returns on error:

```json
{
  "status": 451,
  "errors": [
    {
      "status": 451,
      "detail": "Connecticut: is unavailable for legal reasons."
    }
  ]
}
```

* **NOTE**: To force an error append `?error=1` to your request
* **NOTE**: To force an success append `?success=1` to your request
* **NOTE**: To force a timeout append `?timeout=1` to your request

### `POST http://localhost:9923/api/roadtrip/:state` Get the next state

Will never return the value sent in `:state` URL param.

Returns on success:

```json
{
   "data":{
      "state":"Washington"
   }
}
```

Returns on error:

```json
{
  "status": 451,
  "errors": [
    {
      "status": 451,
      "detail": "Connecticut: is unavailable for legal reasons."
    }
  ]
}
```

* **NOTE**: To force an error append `?error=1` to your request
* **NOTE**: To force an success append `?success=1` to your request
* **NOTE**: To force a timeout append `?timeout=1` to your request

##

## Dev Setup

1. `npm install`
2. `npm run dev`
3. `http://localhost:9923/api/roadtrip`
