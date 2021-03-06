var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var bcrypt = require('bcrypt-nodejs');

const MotorcycleSchema = new Schema({
	_id: {
		type: ObjectId,
		required: true
	},
	motorcycleId: {
		type: ObjectId,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	make: {
		type: String,
		required: false
	},
	model: {
		type: String,
		required: false
	},
	year: {
		type: Number,
		required: false
	},
	miles: {
		type: String || Number,
		required: false
	},
	image: { // Check for file size limits
		type: String,
		required: false
	}
});

var UserSchema = new Schema({
  username: {
		type: String,
		unique: true,
		required: true,
		validate: {
			isAsync: true,
			validator: function(value, isValid) {
					const self = this;
					return self.constructor.findOne({ email: value })
					.exec(function(err, user){
							if(err){
									throw err;
							}
							else if(user) {
									if(self.id === user.id) {  // if finding and saving then it's valid even for existing email
											return isValid(true);
									}
									return isValid(false);  
							}
							else{
									return isValid(true);
							}

					})
			},
			message:  'The email address is already taken!'
		}
	},
	password: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	motorcycles: {
		type: [MotorcycleSchema],
		required: false
	}
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
