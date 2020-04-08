function POST(url,params,success,failure) {
    let fetchOptions = {
        method: 'POST',
        headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    };

    fetch(url,fetchOptions)
        .then((response)=>response.json())
        .then(data=>{
            success(data);
        }).catch((err)=>{
            failure(err);
    });
}

function GET(url,params,success,failure){
    let fetchOptions = {
        method: 'GET',
        headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    };

    fetch(url,fetchOptions)
        .then((response)=>response.json())
        .then(data=>{
            success(data);
        }).catch((err)=>{
        failure(err);
    });
}

export {POST,GET}
