var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var upload = multer({ storage: storage });

var checkLogin = (req, res, next) => {
    try {
        var token = req.cookies.token
        var ketqua = jwt.verify(token, 'mk')
        if (ketqua) {
            next();
        }
    } catch (error) {
        return res.json('Bạn cần phải login')
    }
}

var AccountModel = require('../models/user.model');
var DepartModel = require('../models/depart.model');
var StaffModel = require('../models/staff.model');
var RecordModel = require('../models/record.model');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Index' });
});

///////////////////////////--------////////////////////////////////////
//View Account
router.get('/account', checkLogin, function(req, res, next) {
    AccountModel.find({}, function(err, dulieu) {
        res.render('account', { title: 'Account Management ', data: dulieu });
    })
});
// Delete Account
router.get('/deleteAccount/:idAccount', function(req, res, next) {
    var id = req.params.idAccount;
    AccountModel.findByIdAndRemove(id).exec();
    res.redirect('/account');
});
// Update Account Get
router.get('/updateAccount/:idAccount', function(req, res, next) {
    var id2 = req.params.idAccount;
    AccountModel.find({ _id: id2 }, function(err, dulieu) {
        res.render('updateAccount', { title: "Update Account", data: dulieu });
    })
});
// Update Account Post
router.post('/updateAccount/:idAccount', function(req, res, next) {
    var id = req.params.idAccount;
    AccountModel.findById(id, function(err, dulieu) {
        if (err) return handleError(err);
        dulieu.email = req.body.email;
        dulieu.username = req.body.username;
        dulieu.password = req.body.password;
        dulieu.save();
        res.redirect('/account');
    });
});
// Insert Account Get
router.get('/insertAccount', checkLogin, function(req, res, next) {
    res.render('insertAccount', { title: "Insert Account" });
});
// Insert Account Post
router.post('/insertAccount', function(req, res, next) {
    var phantu = {
        'email': req.body.email,
        'username': req.body.username,
        'password': req.body.password
    }
    var dulieu = new AccountModel(phantu);
    dulieu.save();
    res.redirect('/account');
});


///////////////////////////--------////////////////////////////////////
//View Depart
router.get('/depart', checkLogin, function(req, res, next) {
    DepartModel.find({}, function(err, dulieu) {
        res.render('depart', { title: 'Depart Management', data: dulieu });
    })
});
// Delete Depart
router.get('/deleteDepart/:idDepart', function(req, res, next) {
    var id = req.params.idDepart;
    DepartModel.findByIdAndRemove(id).exec();
    res.redirect('/depart');
});
// Update Depart Get
router.get('/updateDepart/:idDepart', function(req, res, next) {
    var id = req.params.idDepart;
    DepartModel.find({ _id: id }, function(err, dulieu) {
        res.render('updateDepart', { title: "Update Depart", data: dulieu });
    })
});
// Update Depart Post
router.post('/updateDepart/:idDepart', function(req, res, next) {
    var id = req.params.idDepart;
    DepartModel.findById(id, function(err, dulieu) {
        if (err) return handleError(err);
        dulieu.departID = req.body.departID;
        dulieu.departName = req.body.departName;
        dulieu.save();
        res.redirect('/depart');
    });
});
// Insert Depart Get
router.get('/insertDepart', function(req, res, next) {
    res.render('insertDepart', { title: "Insert Depart" });
});
// Insert Depart Post
router.post('/insertDepart', function(req, res, next) {
    var phantu = {
        'departID': req.body.departID,
        'departName': req.body.departName
    }
    var dulieu = new DepartModel(phantu);
    dulieu.save();
    res.redirect('/depart');
});

///////////////////////////--------////////////////////////////////////
//View Staff
router.get('/staff', checkLogin, function(req, res, next) {
    StaffModel.find({}, function(err, dulieu) {
        res.render('staff', { title: 'Staff Management', data: dulieu });
    })
});
// Delete Staff
router.get('/deleteStaff/:idStaff', function(req, res, next) {
    var id = req.params.idStaff;
    StaffModel.findByIdAndRemove(id).exec();
    res.redirect('/staff');
});
// Update Staff Get
router.get('/updateStaff/:idStaff', function(req, res, next) {
    var id = req.params.idStaff;
    StaffModel.find({ _id: id }, function(err, dulieu) {
        res.render('updateStaff', { title: "Update Staff", data: dulieu });
    })
});
// Update Staff Post
router.post('/updateStaff/:idStaff', upload.single("image"), function(req, res, next) {
    var id = req.params.idStaff;
    StaffModel.findById(id, function(err, dulieu) {
        if (err) return handleError(err);
        dulieu.staffName = req.body.staffName;
        dulieu.gender = req.body.gender;
        dulieu.birthday = req.body.birthday;
        dulieu.image = 'http://localhost:3000/uploads/' + req.file.filename;
        dulieu.salary = req.body.salary;
        dulieu.departID = req.body.departID;
        dulieu.save();
        res.redirect('/staff');
    });
});
// Insert Staff Get
router.get('/insertStaff', function(req, res, next) {
    res.render('insertStaff', { title: "Insert Staff" });
});
// Insert Staff Post
router.post('/insertStaff', upload.single("image"), function(req, res, next) {
    var phantu = {
        'staffName': req.body.staffName,
        'gender': req.body.gender,
        'birthday': req.body.birthday,
        'image': req.file,
        'salary': req.body.salary,
        'departID': req.body.departID,
    }
    var dulieu = new StaffModel(phantu);
    dulieu.save();
    res.redirect('/staff');
});

///////////////////////////--------////////////////////////////////////
//View Record
router.get('/record', checkLogin, function(req, res, next) {
    RecordModel.find({}, function(err, dulieu) {
        res.render('record', { title: 'Record Management', data: dulieu });
    })
});
// Delete Record
router.get('/deleteRecord/:idRecord', function(req, res, next) {
    var id = req.params.idRecord;
    RecordModel.findByIdAndRemove(id).exec();
    res.redirect('/Record');
});
// Update Record Get
router.get('/updateRecord/:idRecord', function(req, res, next) {
    var id = req.params.idRecord;
    RecordModel.find({ _id: id }, function(err, dulieu) {
        res.render('updateRecord', { title: "Update Record", data: dulieu });
    })
});
// Update Record Post
router.post('/updateRecord/:idRecord', function(req, res, next) {
    var id = req.params.idRecord;
    RecordModel.findById(id, function(err, dulieu) {
        if (err) return handleError(err);
        dulieu.recordType = req.body.recordType;
        dulieu.recordDate = req.body.recordDate;
        dulieu.staffID = req.body.staffID;
        dulieu.save();
        res.redirect('/record');
    });
});
// Insert Record Get
router.get('/insertRecord', function(req, res, next) {
    res.render('insertRecord', { title: "Insert Record" });
});
// Insert Record Post
router.post('/insertRecord', function(req, res, next) {
    var phantu = {
        'recordType': req.body.recordType,
        'recordDate': req.body.recordDate,
        'staffID': req.body.staffID,
    }
    var dulieu = new RecordModel(phantu);
    dulieu.save();
    res.redirect('/record');
});


//////////////////////////

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Home' });
});
router.post('/login', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    UserModel.findOne({
            email: email,
            password: password
        })
        .then(data => {
            if (data) {
                var token = jwt.sign({
                    _id: data._id
                }, 'mk')
                res.json({
                    message: 'Đăng Nhập Thành Công',
                    token: token
                })
            } else {
                return res.json('Đăng Nhập Thất Bại')
            }
        })
        .catch(err => {
            res.status(500).json('Loi server');
        })
});

router.get('/sign-up', function(req, res, next) {
    res.render('signUp', { title: 'SignUp' });
});
router.get('/home', function(req, res, next) {
    res.render('home');
});
router.get('/del-cookie', function(req, res, next) {
    res.clearCookie('token');
    res.redirect('/')
});

module.exports = router;