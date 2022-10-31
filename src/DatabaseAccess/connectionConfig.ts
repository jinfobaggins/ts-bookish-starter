export var config = {
    server: "localhost",
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    },
    authentication: {
        type: "default",
        options: {  
            userName: "mainUser",
            password: "password",
        }
    }

};
