const { default: axios } = require("axios");

exports.lineNotify = async (token,message) => {
    try {
        const respon = await axios({
            method: 'post',
            url: 'https://notify-api.line.me/api/notify',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: "message=" + message
        })
        console.log("🚀 ~ file: notify.js:14 ~ exports.lineNotify= ~ respon:", respon)
        
    } catch (error) {
    console.log("🚀 ~ file: notify.js:15 ~ exports.lineNotify= ~ error:", error)
    }
}