
let topTwittsTrendCount = (datas) => {
    let perTrends = 5;
    let allTwitts = datas.map((x) => x.post.match(/#[\w]+/gi)).flat(Infinity);
    let twitsCount = allTwitts.reduce((acc, val) => {
        let value = val.toLowerCase();
        if (acc[value]) {
            acc[value]++;
        } else {
            acc[value] = 1;
        }
        return acc;
    }, {});
    let sortedTopTwitts = Object.entries(twitsCount).sort((a, b) => {
        if (a[1] == b[1]) {
            return a[0] < b[0] ? -1 : 1;
        }
        return b[1] - a[1];
    });

    return sortedTopTwitts.slice(0, perTrends);
}


let errorHandlerTwitts = (post) => {
    let error = null;
    if (post.length <= 10) {
        error = " twitt should be minimum 10 characters long";
    }
    return {
        hasError: !error ? false : true,
        error,
    };
}



export { topTwittsTrendCount, errorHandlerTwitts }