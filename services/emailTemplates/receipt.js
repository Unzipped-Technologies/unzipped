const keys = require('../../config/keys');

module.exports = (mailer) => {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <!--<![endif]-->
        <!--[if (gte mso 9)|(IE)]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <!--[if (gte mso 9)|(IE)]>
    <style type="text/css">
      body {width: 600px;margin: 0 auto;}
      table {border-collapse: collapse;}
      table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
      img {-ms-interpolation-mode: bicubic;}
    </style>
  <![endif]-->
        <style type="text/css">
      body, p, div {
        font-family: arial,helvetica,sans-serif;
        font-size: 14px;
      }
      body {
        color: #000000;
      }
      body a {
        color: #1188E6;
        text-decoration: none;
      }
      p { margin: 0; padding: 0; }
      table.wrapper {
        width:100% !important;
        table-layout: fixed;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      img.max-width {
        max-width: 100% !important;
      }
      .mobile-quantity {
        display: none;
      }
      .column.of-2 {
        width: 50%;
      }
      .column.of-3 {
        width: 33.333%;
      }
      .column.of-4 {
        width: 25%;
      }
      ul ul ul ul  {
        list-style-type: disc !important;
      }
      ol ol {
        list-style-type: lower-roman !important;
      }
      ol ol ol {
        list-style-type: lower-latin !important;
      }
      ol ol ol ol {
        list-style-type: decimal !important;
      }
      @media screen and (max-width:480px) {
        .preheader .rightColumnContent,
        .footer .rightColumnContent {
          text-align: left !important;
        }
        .preheader .rightColumnContent div,
        .preheader .rightColumnContent span,
        .footer .rightColumnContent div,
        .footer .rightColumnContent span {
          text-align: left !important;
        }
        .preheader .rightColumnContent,
        .preheader .leftColumnContent {
          font-size: 80% !important;
          padding: 5px 0;
        }
        table.wrapper-mobile {
          width: 100% !important;
          table-layout: fixed;
        }
        img.max-width {
          height: auto !important;
          max-width: 100% !important;
        }
        a.bulletproof-button {
          display: block !important;
          width: auto !important;
          font-size: 80%;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .columns {
          width: 100% !important;
        }
        .column-0 {
          width: 50%;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        .column-1 {
          width: 40%;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        .column-2 {
          display: none;
        }
        .mobile-quantity {
          display: block;
          color: white;
        }
        .social-icon-column {
          display: inline-block !important;
        }
      }
    </style>
        <!--user entered Head Start--><!--End Head user entered-->
      </head>
      <body>
        <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#f6f9fc;">
          <div class="webkit">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#f6f9fc">
              <tr>
                <td valign="top" bgcolor="#f6f9fc" width="100%">
                  <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="100%">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td>
                              <!--[if mso]>
      <center>
      <table><tr><td width="600">
    <![endif]-->
                                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                        <tr>
                                          <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#ffffff" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
      <tr>
        <td role="module-content">
          <p></p>
        </td>
      </tr>
    </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="16556ba5-7a4b-4c8d-a7a1-8e0b8b2c5a3b">
      <tbody>
        <tr>
          <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 40px;" valign="top" align="left"><img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, font-size; max-width:25% !important; width:25%; height:auto !important;" width="150" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/fa51fc1f5918e8a3/5df4403e-cb82-4192-8124-8f56ba41e17a/2810x1438.png"></td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="614cfde5-37da-46f6-9b53-19402691db52.1">
      <tbody>
        <tr>
          <td style="padding:20px 30px 0px 30px;" role="module-content" height="100%" valign="top" bgcolor="">
            <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="1px" style="line-height:1px; font-size:1px;">
              <tbody>
                <tr>
                  <td style="padding:0px 0px 1px 0px;" bgcolor="#bababa"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="0b7ff616-b5be-4c38-a106-c11a2235dbb3" data-mc-module-version="2019-10-22">
      <tbody>
        <tr>
          <td style="padding:24px 40px 8px 40px; line-height:20px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="color: #4e4e4e; font-size: 30px">Thank You!</span></div><div></div></div></td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="9e6dc82a-f237-4ca7-a373-2a8dd1c50b7f" data-mc-module-version="2019-10-22">
      <tbody>
        <tr>
          <td style="padding:8px 10px 8px 40px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit">Your Vohnt.com order has been processed and is scheduled for &nbsp;<span style="color: #000000; font-family: arial, helvetica, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline">${mailer.currentDate}!</span></div><div></div></div></td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="907258ee-20d3-45c8-94e0-3a9474571cda" data-mc-module-version="2019-10-22">
      <tbody>
        <tr>
          <td style="padding:8px 0px 0px 40px; line-height:20px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="font-family: arial, helvetica, sans-serif; font-size: 14px">Order #: ${mailer.order}</span></div>
  <div style="font-family: inherit; text-align: inherit"><span style="color: #000000; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-family: arial, helvetica, sans-serif; font-size: 14px">Service Date: ${mailer.date}</span></div>
  <div style="font-family: inherit; text-align: inherit"><span style="color: #000000; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-family: arial, helvetica, sans-serif; font-size: 14px">Appointment Time: ${mailer.time}</span></div>
  <div style="font-family: inherit; text-align: inherit"><span style="color: #000000; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-family: arial, helvetica, sans-serif; font-size: 14px">Location: ${mailer.location.name}</span></div>
  <div style="font-family: inherit; text-align: inherit"><br></div><div></div></div></td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="faee8440-c9e6-40c1-82ad-1a60507d3c4c" data-mc-module-version="2019-10-22">
      <tbody>
        <tr>
          <td style="padding:0px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center">${mailer.location.address}</div><div></div></div></td>
        </tr>
      </tbody>
    </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:0px 0px 0px 0px;" bgcolor="#FFFFFF" data-distribution="1,1,1">
      <tbody>
        <tr role="module-content">
          <td height="100%" valign="top"><table width="186" style="width:186px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
        <tbody>
          <tr>
            <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="6c519f5a-5c3c-4748-8035-d06bed01c532" data-mc-module-version="2019-10-22">
      <tbody>
        <tr>
          <td style="padding:8px 0px 18px 30px; line-height:26px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="font-family: arial, helvetica, sans-serif; font-size: 14px">Item:</span></div>
  <div style="font-family: inherit; text-align: inherit"><span style="font-family: arial, helvetica, sans-serif; font-size: 14px">${mailer.service[0]}</span></div>
  <div style="font-family: inherit; text-align: inherit"><span style="color: #000000; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-family: arial, helvetica, sans-serif; font-size: 14px">${mailer.service[1] ? mailer.service[1] : ''}</span><span style="font-family: arial, helvetica, sans-serif; font-size: 14px">&nbsp;</span></div>
  <div style="font-family: inherit; text-align: inherit"><span style="color: #000000; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-family: arial, helvetica, sans-serif; font-size: 14px">${mailer.service[2] ? mailer.service[2] : ''}</span><span style="font-family: arial, helvetica, sans-serif; font-size: 14px">&nbsp;</span></div>
  <div style="font-family: inherit; text-align: inherit"><span style="color: #000000; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-family: arial, helvetica, sans-serif; font-size: 14px">${mailer.service[3] ? mailer.service[3] : ''}</span><span style="font-family: arial, helvetica, sans-serif; font-size: 14px">&nbsp;</span></div><div></div></div></td>
        </tr>
      </tbody>
    </table></td>
          </tr>
        </tbody>
      </table><table width="186" style="width:186px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 10px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-1">
        <tbody>
          <tr>
            <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="d1eca2cd-5e2d-495a-add4-9a730edb59e9" data-mc-module-version="2019-10-22">
      <tbody>
        <tr>
          <td style="padding:8px 0px 18px 0px; line-height:26px; text-align:center;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="font-family: arial, helvetica, sans-serif; font-size: 14px">Price:</span></div>
  <div style="font-family: inherit; text-align: inherit"><span style="color: #000000; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-family: arial, helvetica, sans-serif; font-size: 14px">${`$` + mailer.price[0] + `.00`} <span class="mobile-quantity"> ${mailer.quantity[0] ? '  x' + mailer.quantity[0] : ''}</span></span></div>
  <div style="font-family: inherit; text-align: inherit"><span style="color: #000000; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-family: arial, helvetica, sans-serif; font-size: 14px">${mailer.price[1] ? `$` + mailer.price[1] + `.00` : ''} <span class="mobile-quantity"> ${mailer.quantity[1] ? '  x' + mailer.quantity[1] : ''}</span></span><span style="font-family: arial, helvetica, sans-serif; font-size: 14px">&nbsp;</span></div>
  <div style="font-family: inherit; text-align: inherit"><span style="color: #000000; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-family: arial, helvetica, sans-serif; font-size: 14px">${mailer.price[2] ? `$` + mailer.price[2] + `.00` : ''} <span class="mobile-quantity"> ${mailer.quantity[2] ? '  x' + mailer.quantity[2] : ''}</span></span><span style="font-family: arial, helvetica, sans-serif; font-size: 14px">&nbsp;</span></div>
  <div style="font-family: inherit; text-align: inherit"><span style="color: #000000; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-family: arial, helvetica, sans-serif; font-size: 14px">${mailer.price[3] ? `$` + mailer.price[3] + `.00` : ''} <span class="mobile-quantity"> ${mailer.quantity[3] ? '  x' + mailer.quantity[3] : ''}</span></span><span style="font-family: arial, helvetica, sans-serif; font-size: 14px"> &nbsp;</span></div><div></div></div></td>
        </tr>
      </tbody>
    </table></td>
          </tr>
        </tbody>
      </table><table width="186" style="width:186px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 10px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-2">
        <tbody>
          <tr>
            <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="4e1502a8-472d-4aa9-9a81-471ea2587fbc" data-mc-module-version="2019-10-22">
      <tbody>
        <tr>
          <td style="padding:8px 0px 18px 0px; line-height:26px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit">Quantity:</div>
  <div style="font-family: inherit; text-align: inherit">${mailer.quantity[0]}</div>
  <div style="font-family: inherit; text-align: inherit">${mailer.quantity[1] ? mailer.quantity[1] : ''}</div>
  <div style="font-family: inherit; text-align: inherit">${mailer.quantity[2] ? mailer.quantity[2] : ''}</div>
  <div style="font-family: inherit; text-align: inherit">${mailer.quantity[3] ? mailer.quantity[3] : ''}</div><div></div></div></td>
        </tr>
      </tbody>
    </table></td>
          </tr>
        </tbody>
      </table></td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b26dd1af-1295-450c-b5a4-17bcf26d5db7" data-mc-module-version="2019-10-22">
      <tbody>
        <tr>
          <td style="padding:18px 40px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: right">Total: ${`$` + mailer.total + `.00`}</div><div></div></div></td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="72b30960-28ba-4e95-b56f-96aa3bb169e8" data-mc-module-version="2019-10-22">
      <tbody>
        <tr>
          <td style="padding:18px 30px 28px 30px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: normal; font-variant-east-asian: normal; text-decoration-line: none; text-decoration-style: initial; text-decoration-color: initial; vertical-align: baseline; white-space: pre-wrap">Thank you for choosing Vohnt for your car care needs. Please drop your keys at a secure designated drop box at your selected location. </span>&nbsp;</div><div></div></div></td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="614cfde5-37da-46f6-9b53-19402691db52">
      <tbody>
        <tr>
          <td style="padding:0px 30px 0px 30px;" role="module-content" height="100%" valign="top" bgcolor="">
            <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="1px" style="line-height:1px; font-size:1px;">
              <tbody>
                <tr>
                  <td style="padding:0px 0px 1px 0px;" bgcolor="#bababa"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="0323025a-d924-4dee-9ea6-e9d979b60002">
      <tbody>
        <tr>
          <td style="font-size:6px; line-height:10px; padding:10px 0px 0px 0px;" valign="top" align="center">
            <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:40% !important; width:40%; height:auto !important;" width="240" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/fa51fc1f5918e8a3/60c4847d-5da3-4e60-a2cf-7e2bb5158e39/402x71.png">
          </td>
        </tr>
      </tbody>
    </table><div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"><div class="Unsubscribe--addressLine"></div><p style="font-size:12px; line-height:20px;"><a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="">Unsubscribe</a></p></div></td>
                                        </tr>
                                      </table>
                                      <!--[if mso]>
                                    </td>
                                  </tr>
                                </table>
                              </center>
                              <![endif]-->
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </center>
      </body>
    </html>
  `;
};

