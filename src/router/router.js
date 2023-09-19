const commentHandler = require("../handler/commentHandler")
const postHandler = require("../handler/postHandler")
const post = require("../handler/post")
const comment = require("../handler/comment")

const router = {}

function gabung(data, data2) {
    
  const commentPostId = {};

  data2.forEach(comments => {
    const postId = comments.postId;
    if (!commentPostId[postId]) {
      commentPostId[postId] = [];
    }
    commentPostId[postId].push(comments);
  });


  data.forEach(data => {
    const id = data.id;
    if (commentPostId[id]) {
      data.comments = commentPostId[id];
    }
  });

  return data;
}


router.init = async (req,res) => {
    if(req.url === "/api/post/get"){
        postHandler.getAllPost(req,res) 
    } else if(req.url === "/api/comment/get") {
        commentHandler.getAllComment(req,res) 
        
    } else if (req.url === "/api/post-comment/get") {
        const data = await post()
        const data2 = await comment()

        const dataArray = gabung(data,data2)

        res.write(JSON.stringify(dataArray))
        res.end()
    }

    // silahkan tambahkan routing lain disini

    else {
        res.end("Not Found Route !")
    }
}


  


module.exports = router