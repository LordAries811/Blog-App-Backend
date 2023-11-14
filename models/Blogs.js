// const mongoose = require("mongoose");
// const schema = mongoose.Schema;

// const blogSchema = new schema({
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String,
//         required: true
//     },
//     user: {
//         type: String,
//         required: true
//     }
// });

// module.exports = blogSchema;

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const blogSchema = new schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

const BlogModel = mongoose.model("Blog", blogSchema);

module.exports = BlogModel;
