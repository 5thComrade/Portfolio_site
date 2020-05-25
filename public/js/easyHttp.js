class EasyHttp {
    post(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(res => resolve(res.status))
            .catch(err => reject(err));
        })  
    }
}