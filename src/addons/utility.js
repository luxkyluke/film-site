const utility = {
    clamp(value, min, max){
        if(value > max)
            return max;
        if(value <min)
            return min;
        return value;
    },
    isFirefox(){
    	return (window.navigator.appVersion.indexOf("Win")!=-1) ? typeof InstallTrigger !== 'undefined' : false;
    }
}

module.exports = utility;