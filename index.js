const kakao = require("node-kakao");

let id = "Your ID";
let pw = "1q2w3e4r5t";
let uuid = "Run UUID.js first.";
let device_name = "OutLaw";

const client = new kakao.TalkClient();
kakao.AuthApiClient.create(device_name, uuid).then(api => {
    login(client, api, id, pw);
});
const login = (client, api, email, password) => {
    const form = {
        email: email,
        password: password,
        forced: true,
    };
    api.login(form).then(loginRes => {
        if(!loginRes.success) {
            if(loginRes.status == kakao.KnownAuthStatusCode.DEVICE_NOT_REGISTERED) {
                api.requestPasscode(form).then(r => {
                    if(!r.success) {
                        console.log("Node-Kakao::Auth Login Auth Fail " + kakao.KnownDataStatusCode[r.status]);
                        process.exit();
                    }
                    const readline = require("readline");
                    requestAuthCode(readline.createInterface({
                        input: process.stdin,
                        output: process.stdout
                    }), api, form).then(() => {
                        client.login(form).then(registerRes => {
                            if(!registerRes.success) {
                                console.log("Node-Kakao::Login Login Error -> " + kakao.KnownDataStatusCode[registerRes.status]);
                                process.exit();
                            }
                            console.log("Node-Kakao::Login Login Finished.");
                        });
                    });
                });
            }else {
                console.log("Node-Kakao::Login Login Error : " + kakao.KnownAuthStatusCode[loginRes.status]);
                process.exit();
            }
        }else {
            client.login(loginRes.result).then(r => {
                if(!r.success) {
                    console.log("Node-Kakao::Login Login Error.");
                    process.exit();
                }
                console.log("Node-Kakao::Login Login Finished.");
            });
        }
    });
}

const requestAuthCode = (read, api, form) => {
    return new Promise(resolve => {
        read.question("Auth Code: ", code => {
            api.registerDevice(form, code, true).then(r => {
                if(r.success) {
                    console.log("Node-Kakao::Login Auth Finished");
                    read.close();
                    resolve("Finished");
                }else {
                    console.log("Node-Kakao::Login Auth Error : " + kakao.KnownDataStatusCode[r.status]);
                    requestAuthCode(read, kakao, email, password);
                }
            })
        });
    });
}
