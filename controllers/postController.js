const Post = require("../models/post_schema");
const Comment = require('../models/comment_schema');
module.exports.create = function(req,res)
{
    let post =  Post.create({
        content: req.body.content,
        user: req.user._id
    });
        return res.redirect('/');
}
module.exports.destroy = async function(req,res)
{
    let post = await Post.findById(req.params.id);
    try {
        if(post.user == req.user.id)
        {
            post.remove();
            Comment.deleteMany({post:req.params.id},function(err){
                if(err)
                {
                    console.log("Error In deleting COmment");
                    return res.redirect('back');
                }
            });
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    } catch (error) {
        if(error)
        {
            console.log("Error :: ",error);
        }
        return res.redirect('back');
    }
}