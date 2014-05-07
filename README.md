# Schedulejs

Schedule.js is licensed under the terms of the [MIT License](/LICENSE).

## Usage

```javascript
var R = Schedule({second: 0.01}).start(function(loop) {
    console.log('R stoped afeter ' + this.settings.auto_stop + ' cycles');
}).stop(2);
```

```javascript
var C = Schedule({second: 0.01}).delay().start(function(loop) {
    console.log('C stoped afeter ' + this.settings.auto_stop + ' cycles');
}).stop(8);
```
## Methods

### Schedule.init

### Schedule.start

### Schedule.stop

### Schedule.delay

### Schedule.interval

## Options
| Option        | Default       |
| ------------- | -------------:|
| month         |             0 |
| day           |             0 |
| hour          |             0 |
| minute        |             0 |
| second        |             0 |


## Contributing

You can help this project by reporting problems, suggestions, or contributing to the code.

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Creator

**Rodolfo Silva**

+ [https://rodolfosilva.com](https://rodolfosilva.com)
+ [https://twitter.com/ro_dolfosilva](https://twitter.com/ro_dolfosilva)
+ [https://github.com/rodolfosilva](https://github.com/rodolfosilva)
