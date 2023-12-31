const https = require('https');

function rubahPost(data) {
   
    const ubahData = data.map(item => {
    
      const newItem = { ...item };
      return  {
        id: newItem.id,
        judulPost: newItem.title,
        contentPost: newItem.body,
       
      };
    });
  
    return ubahData;
  
}

function post() {
    const url = 'https://jsonplaceholder.typicode.com/posts'; // Gantilah dengan URL website kedua

    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                try {
                    const dataArray = rubahPost(JSON.parse(data));
                    resolve(dataArray);
                } catch (error) {
                    reject(error);
                }
            });

            response.on('error', (error) => {
                reject(error);
            });
        });
    });
}

module.exports = post;
