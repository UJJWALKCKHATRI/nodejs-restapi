const mongoose = require('mongoose');

const BootcampSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Please add a name'],
        unique:true,
        trim: true,
        maxlength:[50,'Name can not be more than 50 characters']
    },
    slug:String,
    description:{
        type:String,
        required:[true, 'Please add a description'],
        maxlength:[500,'Description can not be more than 50 characters']
    },
    website:{
        type:String,
        match:[
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'please use a valid url with http or https'
        ]
    },
    phone:{
        type:String,
        maxlength:[20,'Phone number can not be longer than 20 characters']
    },
    email:{
        type:String,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    address:{
        type:String,
        required:[true,'Please add an address']
    },
    // location:{
    //     type: {
    //         type: String, // Don't do `{ location: { type: String } }`
    //         enum: ['Point'], // 'location.type' must be 'Point'
    //         required: true
    //       },
    //       coordinates: {
    //         type: [Number],
    //         required: true,
    //         index:'2dsphere'
    //       },
    //       formattedAddress: String,
    //       street: String,
    //       city: String,
    //       state: String,
    //       zipcode: String,
    //       country: String
    // },
    careers:{
        type:[String],
        required:true,
        enum:[
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Other'
        ]
    },
    averageRating:{
        type:Number,
        min:[1,'must be one'],
        max:[10,'not more than 10'],
    },
    averageCost:Number,
    photo:{
        type:String,
        default:'no-photo.jpg'
    },
    housing:{
        type: Boolean,
        default:false
    },
    jobAssistance:{
        type: Boolean,
        default:false
    },
    jobGuarantee:{
        type: Boolean,
        default:false
    },
   acceptGi:{
        type: Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
  
});

module.exports = mongoose.model('Bootcamp',BootcampSchema);