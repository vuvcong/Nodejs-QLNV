let userServices = require("../services/userServices");

function getAllUserController(req, res) {
    userServices.getAllUser().then(function(data) {
        return res.json({
            error: false,
            status: 200,
            message: 'Hiển thị người dùng thành công',
            data: data
        })
    }).catch(function() {
        return res.json({
            error: true,
            status: 500,
            message: 'Hiển thị người dùng không thành công'
        })
    })
}

function getDetailUserController(req, res) {
    userServices.getDetailUser(req.params.idUser).then(function(data) {
        if (!data) {
            return res.json({
                error: false,
                status: 200,
                message: 'Người dùng không tồn tại',
            })
        } else {
            return res.json({
                error: false,
                status: 200,
                message: 'Hiển thị người dùng thành công',
                data: data
            })
        }
    }).catch(function() {
        return res.json({
            error: true,
            status: 500,
            message: 'Hiển thị người dùng không thành công'
        })
    })
}

function deleteUserController(req, res) {
    userServices.deleteUser(req.params.idUser).then(function(data) {
        if (data.ok > 0) {
            return res.json({
                error: false,
                status: 200,
                message: 'Xóa người dùng thành công'
            })
        } else {
            return res.json({
                error: false,
                status: 200,
                message: 'Người dùng không tồn tại'
            })
        }
    }).catch(function() {
        return res.json({
            error: true,
            status: 500,
            message: 'Xóa người dùng không thành công'
        })
    })
}


function updateUserController(req, res) {
    let { username, email, password, age } = req.body;
    userServices.updateUser(req.params.idUser, email, username, password, age).then(function(data) {
        if (data.nModified > 0) {
            return res.json({
                error: false,
                status: 200,
                message: 'Cập nhật người dùng thành công'
            })
        } else {
            return res.json({
                error: false,
                status: 200,
                message: 'Người dùng không tồn tại'
            })
        }
    }).catch(function() {
        return res.json({
            error: true,
            status: 500,
            message: 'Xóa người dùng không thành công'
        })
    })
}




function signUpController(req, res) {
    let { email, username, password } = req.body
    userServices.signUp(email, username, password).then(function() {
        return res.json({
            error: false,
            status: 200,
            message: 'Tạo tài khoản thành công'
        })
    }).catch(function(err) {
        return res.json({
            error: true,
            status: 500,
            message: 'Tạo tài khoản không thành công'
        })
    })
}



function loginController(req, res) {
    let { email, password } = req.body
    userServices.login(email, password).then(function(data) {
        if (!data) {
            return res.json({
                error: false,
                status: 500,
                message: 'Sai tài khoản hoặc mật khẩu'
            })
        } else {
            return res.json({
                error: false,
                status: 200,
                message: 'Đăng nhập thành công'
            })
        }

    }).catch(function(err) {
        return res.json({
            error: true,
            status: 500,
            message: 'Tài khoản không tồn tại'
        })
    })
}

module.exports = {
    signUpController,
    getAllUserController,
    getDetailUserController,
    deleteUserController,
    updateUserController,
    loginController
}