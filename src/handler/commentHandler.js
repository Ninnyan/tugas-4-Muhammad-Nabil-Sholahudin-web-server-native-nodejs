const commentHandler = {}

const https = require('https')

const url = 'https://jsonplaceholder.typicode.com/comments'

function rubahComment(data) {
   
    const ubahData = data.map(item => {

      const newItem = { ...item };
      delete newItem.id
      return  {
        postId: newItem.postId,
        name: newItem.name,
        email: newItem.email,
        content: newItem.body,
      };
    });
  
    return ubahData;
  
  }

commentHandler.getAllComment = (req,res) => {
    https.get(url, response => {

        let rawData = ''

        response.on('data', chunk => {
            rawData += chunk
        })
    
        response.on('end', () => {
            const data = rubahComment(JSON.parse(rawData))
            res.write(JSON.stringify(data))
            res.end()

        })
    }).on('error', (error) => {
        console.error(error);
        
        res.end("Internal Server Error")

    })
}

module.exports = commentHandler

