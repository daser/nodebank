module.exports = {
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secureConnection: true,
  //name: "servername",
  auth: {
    user: "daserlinux@gmail.com",
    pass: "kinky1289"
  },
  ignoreTLS: false,
  debug: false,
  maxConnections: 5 // Default is 5
}