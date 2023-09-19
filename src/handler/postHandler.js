const postHandler = {}

const https = require('https')

const url = 'https://jsonplaceholder.typicode.com/posts'

function rubahPost(data) {
   
    const ubahData = data.map(item => {
    
      const newItem = { ...item };
      return  {
        userId: newItem.userId,
        postId: newItem.id,
        judulPost: newItem.title,
        content: newItem.body,
       
      };
    });
  
    return ubahData;
  
  }
 
  

postHandler.getAllPost = (req,res) => {
    https.get(url, response => {

        let rawData = ''

        response.on('data', chunk => {
            rawData += chunk
            
          })
          
          response.on('end', () => {
            const data = rubahPost(JSON.parse(rawData))
            res.write(JSON.stringify(data))
            
            res.end()
            
          })

    }).on('error', (error) => {
        console.error(error);
        
        res.end("Internal Server Error")
        
    })
}

module.exports = postHandler







