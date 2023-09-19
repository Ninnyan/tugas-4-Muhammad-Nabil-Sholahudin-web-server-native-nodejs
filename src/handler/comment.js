const https = require('https');

function rubahComment(data) {
   
    const ubahData = data.map(item => {

      const newItem = { ...item };
      delete newItem.id
      return  {
        postId: newItem.postId,
        namaUser: newItem.name,
        emailUser: newItem.email,
        contentComment: newItem.body,
      };
    });
  
    return ubahData;
  
  }



function comment() {
    const url = 'https://jsonplaceholder.typicode.com/comments'; // Gantilah dengan URL website pertama

    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                try {
                    const dataArray = rubahComment(JSON.parse(data));
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

module.exports = comment;
