

var Logger = log4javascript.getLogger("Whale");
var appender = new log4javascript.InPageAppender();
Logger.addAppender(appender);