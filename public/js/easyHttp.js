class EasyHttp {
    async post(url, data) {
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            return res.status;
        } catch(err) {
            throw new Error('Fetch API did not work')
        }
    }
}