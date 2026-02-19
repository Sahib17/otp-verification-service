const sgMail = require("@sendgrid/mail");
const { log } = require("node:console");

function generateOtp(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const controller = (req, res) => {
  const otp = generateOtp(100000, 999999);
  const { to, subject, text } = req.body;

  const msg = {
    to,
    from: process.env.FROM,
    subject,
    text,
    html: ` <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>${subject}</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" 
            style="background:#ffffff; border-radius:12px; padding:40px; box-shadow:0 10px 25px rgba(0,0,0,0.05);">
            
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <h1 style="margin:0; font-size:24px; color:#111;">
                  ${subject}
                </h1>
              </td>
            </tr>

            <tr>
              <td style="font-size:16px; color:#444; line-height:1.6; padding-bottom:20px;">
                Use the OTP below to complete your verification.
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:20px 0;">
                <div style="
                  display:inline-block;
                  padding:16px 32px;
                  font-size:28px;
                  letter-spacing:6px;
                  font-weight:bold;
                  background:#f3f4f6;
                  border-radius:10px;
                  color:#111;
                ">
                  ${otp}
                </div>
              </td>
            </tr>

            <tr>
              <td style="font-size:14px; color:#777; padding-top:20px; text-align:center;">
                This OTP is valid for a limited time. Do not share it with anyone.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`,
  };
  if (!to || !subject || !text) {
    return res.status(400).send("input all fields");
  }
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  sgMail
    .send(msg)
    .then(() => {
      log("email sent");
      res.status(200).send("email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = controller;
