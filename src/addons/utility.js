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
    },
    getBlur(src){
        const explodedPath = src.split('/')
        let s = "";
        let i=0;
        explodedPath.forEach((e) => {
            i++
            if(i == explodedPath.length)
                s+= "blur/"+e
            else
                s+=e+"/"
        })
        return s
    }
}

module.exports = utility;