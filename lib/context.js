module.exports = function context(maxsize) {
    var log = [];

    var self = {};

    self.push = function contextPush(content, timestamp) {
        log.unshift({
            text: content,
            timestamp: timestamp
        });
        while (log.length > maxsize) log.pop();
    };

    self.get = function contextGet() {
        return log;
    }

    return self;
}
