const TENANT_ID = '8af9eae7-51bb-443f-ab87-cd55fa7ad5e8';

module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('Template', [
            {
                Id: 1,
                Name: 'Invitation: Set Up Your Account',
                Template: `<!DOCTYPE html PUBLIC ""-//W3C//DTD XHTML 1.0 Transitional //EN"" ""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"">

                <html xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"" xmlns:v=""urn:schemas-microsoft-com:vml"">
                <head>
                <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
                <meta content=""text/html; charset=utf-8"" http-equiv=""Content-Type""/>
                <meta content=""width=device-width"" name=""viewport""/>
                <!--[if !mso]><!-->
                <meta content=""IE=edge"" http-equiv=""X-UA-Compatible""/>
                <!--<![endif]-->
                <title></title>
                <!--[if !mso]><!-->
                <link href=""https://fonts.googleapis.com/css?family=Roboto"" rel=""stylesheet"" type=""text/css""/>
                <!--<![endif]-->
                <link rel=""preconnect"" href=""https://fonts.gstatic.com"">
                <link href=""https://fonts.googleapis.com/css2?family=Source+Serif+Pro&display=swap"" rel=""stylesheet"">

                <style type=""text/css"">
                    @font-face {
                        font-family: ""Transcript"";
                        src: url('{baseUrl}/transcript-regular.otf');
                        src: url('{baseUrl}/Transcript-Regular.woff') format('woff'), url('{baseUrl}/Transcript-Regular.ttf') format('truetype'), url('{baseUrl}/Transcript-Regular.svg#webfont') format('svg');
                    }

                    body {
                        margin: 0;
                        padding: 0;
                    }

                    table,
                    td,
                    tr {
                        vertical-align: top;
                        border-collapse: collapse;
                    }

                    * {
                        line-height: inherit;
                    }

                    a[x-apple-data-detectors=true] {
                        color: inherit !important;
                        text-decoration: none !important;
                    }
                </style>
                <style id=""media-query"" type=""text/css"">
                    @media (max-width: 520px) {
                        .block-grid,
                        .col {
                            min-width: 320px !important;
                            max-width: 100% !important;
                            display: block !important;
                        }

                        .block-grid {
                            width: 100% !important;
                        }

                        .col {
                            width: 100% !important;
                        }

                        .col_cont {
                            margin: 0 auto;
                        }

                        img.fullwidth,
                        img.fullwidthOnMobile {
                            max-width: 100% !important;
                        }

                        .no-stack .col {
                            min-width: 0 !important;
                            display: table-cell !important;
                        }

                        .no-stack.two-up .col {
                            width: 50% !important;
                        }

                        .no-stack .col.num2 {
                            width: 16.6% !important;
                        }

                        .no-stack .col.num3 {
                            width: 25% !important;
                        }

                        .no-stack .col.num4 {
                            width: 33% !important;
                        }

                        .no-stack .col.num5 {
                            width: 41.6% !important;
                        }

                        .no-stack .col.num6 {
                            width: 50% !important;
                        }

                        .no-stack .col.num7 {
                            width: 58.3% !important;
                        }

                        .no-stack .col.num8 {
                            width: 66.6% !important;
                        }

                        .no-stack .col.num9 {
                            width: 75% !important;
                        }

                        .no-stack .col.num10 {
                            width: 83.3% !important;
                        }

                        .video-block {
                            max-width: none !important;
                        }

                        .mobile_hide {
                            min-height: 0px;
                            max-height: 0px;
                            max-width: 0px;
                            display: none;
                            overflow: hidden;
                            font-size: 0px;
                        }

                        .desktop_hide {
                            display: block !important;
                            max-height: none !important;
                        }
                    }
                </style>
                </head>
                <body class=""clean-body"" style=""margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;"">
                <!--[if IE]><div class=""ie-browser""><![endif]-->
                <table bgcolor=""#FFFFFF"" cellpadding=""0"" cellspacing=""0"" class=""nl-container"" role=""presentation"" style=""table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;"" valign=""top"" width=""100%"">
                <tbody>
                <tr style=""vertical-align: top;"" valign=""top"">
                <td style=""word-break: break-word; vertical-align: top;"" valign=""top"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td align=""center"" style=""background-color:#FFFFFF""><![endif]-->
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <div style=""font-size:16px;text-align:center;font-family:Arial, Helvetica Neue, Helvetica, sans-serif""><a href=""{baseUrl}/""><img alt=""Victorious"" src=""{baseUrl}/logo.png"" style=""height:3em""/></a></div>
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#3b0d17;font-family:Arial,'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: Arial,'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #3b0d17; mso-line-height-alt: 14px;"">
                <p style=""line-height: 1.2; font-family: Georgia,Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Georgia,Arial,Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Georgia, Arial,Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; font-size: 38px; mso-line-height-alt: 46px; margin: 0;""><span style=""font-size: 38px;"">Hi, {userName}!</span></p>
                <p style=""line-height: 1.2; font-family: Georgia,Arial,Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#555555;font-family:Arial,'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: Arial,'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                <p style=""font-size: 17px; line-height: 1.2; font-family: Arial,Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">From everyone at Victorious, weâ€™re excited to have you on board and look forward to our partnership.</span></p>
                <p style=""font-size: 14px; line-height: 1.2; font-family: Arial,Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 17px; margin: 0;""><br/><span style=""font-size: 17px; mso-ansi-font-size: 18px;""> The next step is to join Victoriousâ€™s customer experience platform, where you can easily track ongoing tasks, as well as view analytics and insights into your SEO campaign at any time.</span></p>
                <p style=""font-size: 14px; line-height: 1.2; font-family: Arial,Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 17px; margin: 0;""><br/><span style=""font-size: 17px; mso-ansi-font-size: 18px;""> Please use the button below to set up your username and password, and get started:
                </span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <div align=""left"" class=""button-container"" style=""padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;""><tr><td style=""padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px"" align=""left""><v:roundrect xmlns:v=""urn:schemas-microsoft-com:vml"" xmlns:w=""urn:schemas-microsoft-com:office:word"" href=""{baseUrl}/sign-up/{notificationGuid}"" style=""height:39pt; width:234pt; v-text-anchor:middle;"" arcsize=""8%"" stroke=""false"" fillcolor=""#3b0d17""><w:anchorlock/><v:textbox inset=""0,0,0,0""><center style=""color:#ffffff; font-family:Arial,Arial, sans-serif; font-size:16px""><![endif]--><a href=""{baseUrl}/sign-up/{notificationGuid}"" style=""-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ffffff; background-color: #3b0d17; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; width: auto; border-top: 1px solid #3b0d17; border-right: 1px solid #3b0d17; border-bottom: 1px solid #3b0d17; border-left: 1px solid #3b0d17; padding-top: 10px; padding-bottom: 10px; font-family: Arial,Arial, Helvetica Neue, Helvetica, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;"" target=""_blank""><span style=""padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;""><span style=""font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"">SET UP YOUR ACCOUNT</span></span></a>
                <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                </div>
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial,Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#555555;font-family:Arial,'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: Arial,'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                <p style=""font-size: 17px; line-height: 1.2; font-family: Arial,Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">Welcome aboard,</span></p>
                <p style=""font-size: 17px; line-height: 1.2; font-family: Arial,Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">The Victorious team</span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Georgia,Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#3c4450;font-family:Georgia,'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: Georgia,'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #3c4450; mso-line-height-alt: 14px;"">
                <p style=""font-size: 15px; line-height: 1.2; font-family: Georgia,Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 18px; margin: 0;""><span style=""font-size: 15px;"">If youâ€™re having trouble with the button above, copy and paste the url below into your web browser:</span></p>
                <p style=""font-size: 14px; line-height: 1.2; font-family: Georgia,Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 17px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Georgia,Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Georgia,Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; font-size: 15px; mso-line-height-alt: 18px; margin: 0;""><span style=""font-size: 15px;""><a href=""{baseUrl}/sign-up/{notificationGuid}"" rel=""noopener"" style=""text-decoration: underline; color: #3c4450;"" target=""_blank"">{baseUrl}/sign-up/{notificationGuid}</a></span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
                </tr>
                </tbody>
                </table>
                <!--[if (IE)]></div><![endif]-->
                </body>
                </html>`,
                CreatedAt: new Date(),
                ModifiedAt: new Date(),
                TenantId: TENANT_ID,
                TemplateTypeId: 4,
            }, {
                Id: 2,
                Name: 'Invitation: Victorious Admin',
                Template: `<!DOCTYPE html PUBLIC ""-//W3C//DTD XHTML 1.0 Transitional //EN"" ""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"">
                <html xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"" xmlns:v=""urn:schemas-microsoft-com:vml"">
                <head>
                <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
                <meta content=""text/html; charset=utf-8"" http-equiv=""Content-Type""/>
                <meta content=""width=device-width"" name=""viewport""/>
                <!--[if !mso]><!-->
                <meta content=""IE=edge"" http-equiv=""X-UA-Compatible""/>
                <!--<![endif]-->
                <title></title>
                <!--[if !mso]><!-->
                <link href=""https://fonts.googleapis.com/css?family=Roboto"" rel=""stylesheet"" type=""text/css""/>
                <!--<![endif]-->
                <style type=""text/css"">
                    body {
                        margin: 0;
                        padding: 0;
                    }

                    table,
                    td,
                    tr {
                        vertical-align: top;
                        border-collapse: collapse;
                    }

                    * {
                        line-height: inherit;
                    }

                    a[x-apple-data-detectors=true] {
                        color: inherit !important;
                        text-decoration: none !important;
                    }
                </style>
                <style id=""media-query"" type=""text/css"">
                    @media (max-width: 520px) {
                        .block-grid,
                        .col {
                            min-width: 320px !important;
                            max-width: 100% !important;
                            display: block !important;
                        }

                        .block-grid {
                            width: 100% !important;
                        }

                        .col {
                            width: 100% !important;
                        }

                        .col_cont {
                            margin: 0 auto;
                        }

                        img.fullwidth,
                        img.fullwidthOnMobile {
                            max-width: 100% !important;
                        }

                        .no-stack .col {
                            min-width: 0 !important;
                            display: table-cell !important;
                        }

                        .no-stack.two-up .col {
                            width: 50% !important;
                        }

                        .no-stack .col.num2 {
                            width: 16.6% !important;
                        }

                        .no-stack .col.num3 {
                            width: 25% !important;
                        }

                        .no-stack .col.num4 {
                            width: 33% !important;
                        }

                        .no-stack .col.num5 {
                            width: 41.6% !important;
                        }

                        .no-stack .col.num6 {
                            width: 50% !important;
                        }

                        .no-stack .col.num7 {
                            width: 58.3% !important;
                        }

                        .no-stack .col.num8 {
                            width: 66.6% !important;
                        }

                        .no-stack .col.num9 {
                            width: 75% !important;
                        }

                        .no-stack .col.num10 {
                            width: 83.3% !important;
                        }

                        .video-block {
                            max-width: none !important;
                        }

                        .mobile_hide {
                            min-height: 0px;
                            max-height: 0px;
                            max-width: 0px;
                            display: none;
                            overflow: hidden;
                            font-size: 0px;
                        }

                        .desktop_hide {
                            display: block !important;
                            max-height: none !important;
                        }
                    }
                </style>
                </head>
                <body class=""clean-body"" style=""margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;"">
                <!--[if IE]><div class=""ie-browser""><![endif]-->
                <table bgcolor=""#FFFFFF"" cellpadding=""0"" cellspacing=""0"" class=""nl-container"" role=""presentation"" style=""table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;"" valign=""top"" width=""100%"">
                <tbody>
                <tr style=""vertical-align: top;"" valign=""top"">
                <td style=""word-break: break-word; vertical-align: top;"" valign=""top"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td align=""center"" style=""background-color:#FFFFFF""><![endif]-->
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <div style=""font-size:16px;text-align:center;font-family:Arial, Helvetica Neue, Helvetica, sans-serif""><a href=""{baseUrl}/""><img alt=""Victorious"" src=""{baseUrl}/logo.png"" style=""height:3em""/></a></div>
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#3b0d17;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #3b0d17; mso-line-height-alt: 14px;"">
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; font-size: 38px; mso-line-height-alt: 46px; margin: 0;""><span style=""font-size: 38px;"">Hi, {userName}!</span></p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; font-size: 17px; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">Please use the button below to become an admin in the Victorious Customer Experience Platform.</span></p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""font-size: 14px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 17px; margin: 0;""><br/><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">The app itself will walk you through the steps to set up your account and get started:</span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <div align=""left"" class=""button-container"" style=""padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;""><tr><td style=""padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px"" align=""left""><v:roundrect xmlns:v=""urn:schemas-microsoft-com:vml"" xmlns:w=""urn:schemas-microsoft-com:office:word"" href=""{baseUrl}/sign-up/{notificationGuid}"" style=""height:39pt; width:234pt; v-text-anchor:middle;"" arcsize=""8%"" stroke=""false"" fillcolor=""#3b0d17""><w:anchorlock/><v:textbox inset=""0,0,0,0""><center style=""color:#ffffff; font-family:Arial, sans-serif; font-size:16px""><![endif]--><a href=""{baseUrl}/sign-up/{notificationGuid}"" style=""-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ffffff; background-color: #3b0d17; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; width: auto; border-top: 1px solid #3b0d17; border-right: 1px solid #3b0d17; border-bottom: 1px solid #3b0d17; border-left: 1px solid #3b0d17; padding-top: 10px; padding-bottom: 10px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;"" target=""_blank""><span style=""padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;""><span style=""font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"">SET UP YOUR ACCOUNT</span></span></a>
                <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                </div>
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">Welcome!</span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#3c4450;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #3c4450; mso-line-height-alt: 14px;"">
                <p style=""font-size: 15px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 18px; margin: 0;""><span style=""font-size: 15px;"">If youâ€™re having trouble with the button above, copy and paste the url below into your web browser:</span></p>
                <p style=""font-size: 14px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 17px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; font-size: 15px; mso-line-height-alt: 18px; margin: 0;""><span style=""font-size: 15px;""><a href=""{baseUrl}/sign-up/{notificationGuid}"" rel=""noopener"" style=""text-decoration: underline; color: #3c4450;"" target=""_blank"">{baseUrl}/sign-up/{notificationGuid}</a></span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
                </tr>
                </tbody>
                </table>
                <!--[if (IE)]></div><![endif]-->
                </body>
                </html>`,
                CreatedAt: new Date(),
                ModifiedAt: new Date(),
                TenantId: TENANT_ID,
                TemplateTypeId: 2,
            }, {
                Id: 3,
                Name: 'Reset password',
                Template: `<!DOCTYPE html PUBLIC ""-//W3C//DTD XHTML 1.0 Transitional //EN"" ""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"">

                <html xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"" xmlns:v=""urn:schemas-microsoft-com:vml"">
                <head>
                <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
                <meta content=""text/html; charset=utf-8"" http-equiv=""Content-Type""/>
                <meta content=""width=device-width"" name=""viewport""/>
                <!--[if !mso]><!-->
                <meta content=""IE=edge"" http-equiv=""X-UA-Compatible""/>
                <!--<![endif]-->
                <title></title>
                <!--[if !mso]><!-->
                <link href=""https://fonts.googleapis.com/css?family=Roboto"" rel=""stylesheet"" type=""text/css""/>
                <!--<![endif]-->
                <style type=""text/css"">
                    body {
                        margin: 0;
                        padding: 0;
                    }

                    table,
                    td,
                    tr {
                        vertical-align: top;
                        border-collapse: collapse;
                    }

                    * {
                        line-height: inherit;
                    }

                    a[x-apple-data-detectors=true] {
                        color: inherit !important;
                        text-decoration: none !important;
                    }
                </style>
                <style id=""media-query"" type=""text/css"">
                    @media (max-width: 520px) {
                        .block-grid,
                        .col {
                            min-width: 320px !important;
                            max-width: 100% !important;
                            display: block !important;
                        }

                        .block-grid {
                            width: 100% !important;
                        }

                        .col {
                            width: 100% !important;
                        }

                        .col_cont {
                            margin: 0 auto;
                        }

                        img.fullwidth,
                        img.fullwidthOnMobile {
                            max-width: 100% !important;
                        }

                        .no-stack .col {
                            min-width: 0 !important;
                            display: table-cell !important;
                        }

                        .no-stack.two-up .col {
                            width: 50% !important;
                        }

                        .no-stack .col.num2 {
                            width: 16.6% !important;
                        }

                        .no-stack .col.num3 {
                            width: 25% !important;
                        }

                        .no-stack .col.num4 {
                            width: 33% !important;
                        }

                        .no-stack .col.num5 {
                            width: 41.6% !important;
                        }

                        .no-stack .col.num6 {
                            width: 50% !important;
                        }

                        .no-stack .col.num7 {
                            width: 58.3% !important;
                        }

                        .no-stack .col.num8 {
                            width: 66.6% !important;
                        }

                        .no-stack .col.num9 {
                            width: 75% !important;
                        }

                        .no-stack .col.num10 {
                            width: 83.3% !important;
                        }

                        .video-block {
                            max-width: none !important;
                        }

                        .mobile_hide {
                            min-height: 0px;
                            max-height: 0px;
                            max-width: 0px;
                            display: none;
                            overflow: hidden;
                            font-size: 0px;
                        }

                        .desktop_hide {
                            display: block !important;
                            max-height: none !important;
                        }
                    }
                </style>
                </head>
                <body class=""clean-body"" style=""margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;"">
                <!--[if IE]><div class=""ie-browser""><![endif]-->
                <table bgcolor=""#FFFFFF"" cellpadding=""0"" cellspacing=""0"" class=""nl-container"" role=""presentation"" style=""table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;"" valign=""top"" width=""100%"">
                <tbody>
                <tr style=""vertical-align: top;"" valign=""top"">
                <td style=""word-break: break-word; vertical-align: top;"" valign=""top"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td align=""center"" style=""background-color:#FFFFFF""><![endif]-->
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <div style=""font-size:16px;text-align:center;font-family:Arial, Helvetica Neue, Helvetica, sans-serif""><a href=""{baseUrl}/""><img alt=""Victorious"" src=""{baseUrl}/logo.png"" style=""height:3em""/></a></div>
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#3b0d17;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #3b0d17; mso-line-height-alt: 14px;"">
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; font-size: 38px; mso-line-height-alt: 46px; margin: 0;""><span style=""font-size: 38px;"">Hi, {userName}!</span></p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">You are receiving this email because you requested a password reset for the account associated with {userEmail}.</span></p>
                <p style=""font-size: 14px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 17px; margin: 0;""><br/><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">Please click on the button below to reset your password and create a new password for your account.</span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <div align=""left"" class=""button-container"" style=""padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;""><tr><td style=""padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px"" align=""left""><v:roundrect xmlns:v=""urn:schemas-microsoft-com:vml"" xmlns:w=""urn:schemas-microsoft-com:office:word"" href=""{baseUrl}/reset-password/{notificationGuid}"" style=""height:39pt; width:234pt; v-text-anchor:middle;"" arcsize=""8%"" stroke=""false"" fillcolor=""#3b0d17""><w:anchorlock/><v:textbox inset=""0,0,0,0""><center style=""color:#ffffff; font-family:Arial, sans-serif; font-size:16px""><![endif]--><a href=""{baseUrl}/reset-password/{notificationGuid}"" style=""-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ffffff; background-color: #3b0d17; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; width: auto; border-top: 1px solid #3b0d17; border-right: 1px solid #3b0d17; border-bottom: 1px solid #3b0d17; border-left: 1px solid #3b0d17; padding-top: 10px; padding-bottom: 10px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;"" target=""_blank""><span style=""padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;""><span style=""font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"">RESET PASSWORD</span></span></a>
                <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                </div>
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>

                <div style=""background-color:transparent;"">
                    <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                    <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                    <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                    <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                    <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                    <div class=""col_cont"" style=""width:100% !important;"">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                    <!--<![endif]-->
                    <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                    <div style=""color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                    <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                    <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">This URL will expire in 24 hours. If you did not request a password reset, please ignore this email.</span></p>
                    </div>
                    </div>
                    <!--[if mso]></td></tr></table><![endif]-->
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                    </div>

                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">Talk to you soon!</span></p>
                <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">The Victorious team</span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#3c4450;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #3c4450; mso-line-height-alt: 14px;"">
                <p style=""font-size: 15px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 18px; margin: 0;""><span style=""font-size: 15px;"">If youâ€™re having trouble with the button above, copy and paste the url below into your web browser:</span></p>
                <p style=""font-size: 14px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 17px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; font-size: 15px; mso-line-height-alt: 18px; margin: 0;""><span style=""font-size: 15px;""><a href=""{baseUrl}/reset-password/{notificationGuid}"" rel=""noopener"" style=""text-decoration: underline; color: #3c4450;"" target=""_blank"">{baseUrl}/reset-password/{notificationGuid}</a></span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
                </tr>
                </tbody>
                </table>
                <!--[if (IE)]></div><![endif]-->
                </body>
                </html>`,
                CreatedAt: new Date(),
                ModifiedAt: new Date(),
                TenantId: TENANT_ID,
                TemplateTypeId: 3,
            }, {
                Id: 4,
                Name: '{TASK_NAME} in Progress (No Action Required)',
                Template: `<!DOCTYPE html PUBLIC ""-//W3C//DTD XHTML 1.0 Transitional //EN"" ""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"">

                <html xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"" xmlns:v=""urn:schemas-microsoft-com:vml"">
                <head>
                <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
                <meta content=""text/html; charset=utf-8"" http-equiv=""Content-Type""/>
                <meta content=""width=device-width"" name=""viewport""/>
                <!--[if !mso]><!-->
                <meta content=""IE=edge"" http-equiv=""X-UA-Compatible""/>
                <!--<![endif]-->
                <title></title>
                <!--[if !mso]><!-->
                <link href=""https://fonts.googleapis.com/css?family=Roboto"" rel=""stylesheet"" type=""text/css""/>
                <!--<![endif]-->
                <style type=""text/css"">
                    body {
                        margin: 0;
                        padding: 0;
                    }

                    table,
                    td,
                    tr {
                        vertical-align: top;
                        border-collapse: collapse;
                    }

                    * {
                        line-height: inherit;
                    }

                    a[x-apple-data-detectors=true] {
                        color: inherit !important;
                        text-decoration: none !important;
                    }
                </style>
                <style id=""media-query"" type=""text/css"">
                    @media (max-width: 520px) {
                        .block-grid,
                        .col {
                            min-width: 320px !important;
                            max-width: 100% !important;
                            display: block !important;
                        }

                        .block-grid {
                            width: 100% !important;
                        }

                        .col {
                            width: 100% !important;
                        }

                        .col_cont {
                            margin: 0 auto;
                        }

                        img.fullwidth,
                        img.fullwidthOnMobile {
                            max-width: 100% !important;
                        }

                        .no-stack .col {
                            min-width: 0 !important;
                            display: table-cell !important;
                        }

                        .no-stack.two-up .col {
                            width: 50% !important;
                        }

                        .no-stack .col.num2 {
                            width: 16.6% !important;
                        }

                        .no-stack .col.num3 {
                            width: 25% !important;
                        }

                        .no-stack .col.num4 {
                            width: 33% !important;
                        }

                        .no-stack .col.num5 {
                            width: 41.6% !important;
                        }

                        .no-stack .col.num6 {
                            width: 50% !important;
                        }

                        .no-stack .col.num7 {
                            width: 58.3% !important;
                        }

                        .no-stack .col.num8 {
                            width: 66.6% !important;
                        }

                        .no-stack .col.num9 {
                            width: 75% !important;
                        }

                        .no-stack .col.num10 {
                            width: 83.3% !important;
                        }

                        .video-block {
                            max-width: none !important;
                        }

                        .mobile_hide {
                            min-height: 0px;
                            max-height: 0px;
                            max-width: 0px;
                            display: none;
                            overflow: hidden;
                            font-size: 0px;
                        }

                        .desktop_hide {
                            display: block !important;
                            max-height: none !important;
                        }
                    }
                </style>
                </head>
                <body class=""clean-body"" style=""margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;"">
                <!--[if IE]><div class=""ie-browser""><![endif]-->
                <table bgcolor=""#FFFFFF"" cellpadding=""0"" cellspacing=""0"" class=""nl-container"" role=""presentation"" style=""table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;"" valign=""top"" width=""100%"">
                <tbody>
                <tr style=""vertical-align: top;"" valign=""top"">
                <td style=""word-break: break-word; vertical-align: top;"" valign=""top"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td align=""center"" style=""background-color:#FFFFFF""><![endif]-->
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <div style=""font-size:16px;text-align:center;font-family:Arial, Helvetica Neue, Helvetica, sans-serif""><a href=""{baseUrl}/""><img alt=""Victorious"" src=""{baseUrl}/logo.png"" style=""height:3em""/></a></div>
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#3b0d17;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #3b0d17; mso-line-height-alt: 14px;"">
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; font-size: 38px; mso-line-height-alt: 46px; margin: 0;""><span style=""font-size: 38px;"">Hi, {userName}!</span></p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                    <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                    <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">Itâ€™s almost time to dig in! Weâ€™re writing to let you know that weâ€™ve started working on your {TASK_NAME}.</span></p>
                    <!-- <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><br /><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">It looks like you have a new task waiting for your approval.</span></p> -->
                    </div>
                    <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                    <!-- <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><br /><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">It looks like you have a new task waiting for your approval.</span></p> -->
                    </div>
                </div>
                <div style=""color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                    <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                    <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">Thereâ€™s no action needed from you at this time, but get ready! Youâ€™ll receive another notification when the completed deliverable is ready for review.</span></p>
                    <!-- <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><br /><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">It looks like you have a new task waiting for your approval.</span></p> -->
                    </div>
                    <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                    <!-- <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><br /><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">It looks like you have a new task waiting for your approval.</span></p> -->
                    </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <div align=""left"" class=""button-container"" style=""padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;""><tr><td style=""padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px"" align=""left""><v:roundrect xmlns:v=""urn:schemas-microsoft-com:vml"" xmlns:w=""urn:schemas-microsoft-com:office:word"" href=""{baseUrl}/tasks?active=your-tasks&projectId={projectId}"" style=""height:39pt; width:234pt; v-text-anchor:middle;"" arcsize=""8%"" stroke=""false"" fillcolor=""#3b0d17""><w:anchorlock/><v:textbox inset=""0,0,0,0""><center style=""color:#ffffff; font-family:Arial, sans-serif; font-size:16px""><![endif]--><a href=""{baseUrl}/tasks?active=your-tasks&projectId={projectId}"" style=""-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ffffff; background-color: #3b0d17; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; width: auto; border-top: 1px solid #3b0d17; border-right: 1px solid #3b0d17; border-bottom: 1px solid #3b0d17; border-left: 1px solid #3b0d17; padding-top: 10px; padding-bottom: 10px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;"" target=""_blank""><span style=""padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;""><span style=""font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"">OPEN TASK DETAILS</span></span></a>
                <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                </div>
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">Talk to you soon,</span></p>
                <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">The Victorious team</span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#3c4450;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #3c4450; mso-line-height-alt: 14px;"">
                <p style=""font-size: 15px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 18px; margin: 0;""><span style=""font-size: 15px;"">If youâ€™re having trouble with the button above, copy and paste the url below into your web browser:</span></p>
                <p style=""font-size: 14px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 17px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; font-size: 15px; mso-line-height-alt: 18px; margin: 0;""><span style=""font-size: 15px;""><a href=""{baseUrl}/tasks?active=your-tasks&projectId={projectId}"" rel=""noopener"" style=""text-decoration: underline; color: #3c4450;"" target=""_blank"">{baseUrl}/tasks?active=your-tasks&projectId={projectId}</a></span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
                </tr>
                </tbody>
                </table>
                <!--[if (IE)]></div><![endif]-->
                </body>
                </html>`,
                CreatedAt: new Date(),
                ModifiedAt: new Date(),
                TenantId: TENANT_ID,
                TemplateTypeId: 5,
            }, {
                Id: 5,
                Name: '{TASK_NAME} Ready For Your Review',
                Template: `<!DOCTYPE html PUBLIC ""-//W3C//DTD XHTML 1.0 Transitional //EN"" ""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"">
                <html xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"" xmlns:v=""urn:schemas-microsoft-com:vml"">
                <head>
                <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
                <meta content=""text/html; charset=utf-8"" http-equiv=""Content-Type""/>
                <meta content=""width=device-width"" name=""viewport""/>
                <!--[if !mso]><!-->
                <meta content=""IE=edge"" http-equiv=""X-UA-Compatible""/>
                <!--<![endif]-->
                <title></title>
                <!--[if !mso]><!-->
                <link href=""https://fonts.googleapis.com/css?family=Roboto"" rel=""stylesheet"" type=""text/css""/>
                <!--<![endif]-->
                <style type=""text/css"">
                        body {
                            margin: 0;
                            padding: 0;
                        }

                        table,
                        td,
                        tr {
                            vertical-align: top;
                            border-collapse: collapse;
                        }

                        * {
                            line-height: inherit;
                        }

                        a[x-apple-data-detectors=true] {
                            color: inherit !important;
                            text-decoration: none !important;
                        }
                    </style>
                <style id=""media-query"" type=""text/css"">
                    @media (max-width: 520px) {
                        .block-grid,
                        .col {
                            min-width: 320px !important;
                            max-width: 100% !important;
                            display: block !important;
                        }

                        .block-grid {
                            width: 100% !important;
                        }

                        .col {
                            width: 100% !important;
                        }

                        .col_cont {
                            margin: 0 auto;
                        }

                        img.fullwidth,
                        img.fullwidthOnMobile {
                            max-width: 100% !important;
                        }

                        .no-stack .col {
                            min-width: 0 !important;
                            display: table-cell !important;
                        }

                        .no-stack.two-up .col {
                            width: 50% !important;
                        }

                        .no-stack .col.num2 {
                            width: 16.6% !important;
                        }

                        .no-stack .col.num3 {
                            width: 25% !important;
                        }

                        .no-stack .col.num4 {
                            width: 33% !important;
                        }

                        .no-stack .col.num5 {
                            width: 41.6% !important;
                        }

                        .no-stack .col.num6 {
                            width: 50% !important;
                        }

                        .no-stack .col.num7 {
                            width: 58.3% !important;
                        }

                        .no-stack .col.num8 {
                            width: 66.6% !important;
                        }

                        .no-stack .col.num9 {
                            width: 75% !important;
                        }

                        .no-stack .col.num10 {
                            width: 83.3% !important;
                        }

                        .video-block {
                            max-width: none !important;
                        }

                        .mobile_hide {
                            min-height: 0px;
                            max-height: 0px;
                            max-width: 0px;
                            display: none;
                            overflow: hidden;
                            font-size: 0px;
                        }

                        .desktop_hide {
                            display: block !important;
                            max-height: none !important;
                        }
                    }
                </style>
                </head>
                <body class=""clean-body"" style=""margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;"">
                <!--[if IE]><div class=""ie-browser""><![endif]-->
                <table bgcolor=""#FFFFFF"" cellpadding=""0"" cellspacing=""0"" class=""nl-container"" role=""presentation"" style=""table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;"" valign=""top"" width=""100%"">
                <tbody>
                <tr style=""vertical-align: top;"" valign=""top"">
                <td style=""word-break: break-word; vertical-align: top;"" valign=""top"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td align=""center"" style=""background-color:#FFFFFF""><![endif]-->
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <div style=""font-size:16px;text-align:center;font-family:Arial, Helvetica Neue, Helvetica, sans-serif""><a href=""{baseUrl}/""><img alt=""Victorious"" src=""{baseUrl}/logo.png"" style=""height:3em""/></a></div>
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#3b0d17;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #3b0d17; mso-line-height-alt: 14px;"">
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; font-size: 38px; mso-line-height-alt: 46px; margin: 0;""><span style=""font-size: 38px;"">Hi, {userName}!</span></p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                    <!--<![endif]-->
                    <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                    <div style=""color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                        <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                        <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">Good news â€” {ASSIGNEE} just completed {TASK_NAME} and it is now ready for your review.</span></p>
                        </div>
                        </div>
                    <!--[if mso]></td></tr></table><![endif]-->
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                    <!--<![endif]-->
                    <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                    <div style=""color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                        <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                        <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">Please click the button below to review the task and give us your feedback.
                        </span></p>
                        </div>
                        </div>
                    <!--[if mso]></td></tr></table><![endif]-->
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <div align=""left"" class=""button-container"" style=""padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;""><tr><td style=""padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px"" align=""left""><v:roundrect xmlns:v=""urn:schemas-microsoft-com:vml"" xmlns:w=""urn:schemas-microsoft-com:office:word"" href=""{baseUrl}/tasks?active=victorious-tasks&projectId={projectId}"" style=""height:39pt; width:234pt; v-text-anchor:middle;"" arcsize=""8%"" stroke=""false"" fillcolor=""#3b0d17""><w:anchorlock/><v:textbox inset=""0,0,0,0""><center style=""color:#ffffff; font-family:Arial, sans-serif; font-size:16px""><![endif]--><a href=""{baseUrl}/tasks?active=victorious-tasks&projectId={projectId}"" style=""-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ffffff; background-color: #3b0d17; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; width: auto; border-top: 1px solid #3b0d17; border-right: 1px solid #3b0d17; border-bottom: 1px solid #3b0d17; border-left: 1px solid #3b0d17; padding-top: 10px; padding-bottom: 10px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;"" target=""_blank""><span style=""padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;""><span style=""font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"">REVIEW AND APPROVE</span></span></a>
                <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                </div>
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">Talk to you soon,</span></p>
                <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">The Victorious team</span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#3c4450;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #3c4450; mso-line-height-alt: 14px;"">
                <p style=""font-size: 15px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 18px; margin: 0;""><span style=""font-size: 15px;"">If youâ€™re having trouble with the button above, copy and paste the url below into your web browser:</span></p>
                <p style=""font-size: 14px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 17px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; font-size: 15px; mso-line-height-alt: 18px; margin: 0;""><span style=""font-size: 15px;""><a href=""{baseUrl}/tasks?active=victorious-tasks&projectId={projectId}"" rel=""noopener"" style=""text-decoration: underline; color: #3c4450;"" target=""_blank"">{baseUrl}/tasks?active=victorious-tasks&projectId={projectId}</a></span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
                </tr>
                </tbody>
                </table>
                <!--[if (IE)]></div><![endif]-->
                </body>
                </html>`,
                CreatedAt: new Date(),
                ModifiedAt: new Date(),
                TenantId: TENANT_ID,
                TemplateTypeId: 6,
            }, {
                Id: 6,
                Name: '{TASK_NAME} is Complete',
                Template: `<!DOCTYPE html PUBLIC ""-//W3C//DTD XHTML 1.0 Transitional //EN"" ""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"">
                <html xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"" xmlns:v=""urn:schemas-microsoft-com:vml"">
                <head>
                <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
                <meta content=""text/html; charset=utf-8"" http-equiv=""Content-Type""/>
                <meta content=""width=device-width"" name=""viewport""/>
                <!--[if !mso]><!-->
                <meta content=""IE=edge"" http-equiv=""X-UA-Compatible""/>
                <!--<![endif]-->
                <title></title>
                <!--[if !mso]><!-->
                <link href=""https://fonts.googleapis.com/css?family=Roboto"" rel=""stylesheet"" type=""text/css""/>
                <!--<![endif]-->
                <style type=""text/css"">
                    body {
                        margin: 0;
                        padding: 0;
                    }

                    table,
                    td,
                    tr {
                        vertical-align: top;
                        border-collapse: collapse;
                    }

                    * {
                        line-height: inherit;
                    }

                    a[x-apple-data-detectors=true] {
                        color: inherit !important;
                        text-decoration: none !important;
                    }
                </style>
                <style id=""media-query"" type=""text/css"">
                    @media (max-width: 520px) {
                        .block-grid,
                        .col {
                            min-width: 320px !important;
                            max-width: 100% !important;
                            display: block !important;
                        }

                        .block-grid {
                            width: 100% !important;
                        }

                        .col {
                            width: 100% !important;
                        }

                        .col_cont {
                            margin: 0 auto;
                        }

                        img.fullwidth,
                        img.fullwidthOnMobile {
                            max-width: 100% !important;
                        }

                        .no-stack .col {
                            min-width: 0 !important;
                            display: table-cell !important;
                        }

                        .no-stack.two-up .col {
                            width: 50% !important;
                        }

                        .no-stack .col.num2 {
                            width: 16.6% !important;
                        }

                        .no-stack .col.num3 {
                            width: 25% !important;
                        }

                        .no-stack .col.num4 {
                            width: 33% !important;
                        }

                        .no-stack .col.num5 {
                            width: 41.6% !important;
                        }

                        .no-stack .col.num6 {
                            width: 50% !important;
                        }

                        .no-stack .col.num7 {
                            width: 58.3% !important;
                        }

                        .no-stack .col.num8 {
                            width: 66.6% !important;
                        }

                        .no-stack .col.num9 {
                            width: 75% !important;
                        }

                        .no-stack .col.num10 {
                            width: 83.3% !important;
                        }

                        .video-block {
                            max-width: none !important;
                        }

                        .mobile_hide {
                            min-height: 0px;
                            max-height: 0px;
                            max-width: 0px;
                            display: none;
                            overflow: hidden;
                            font-size: 0px;
                        }

                        .desktop_hide {
                            display: block !important;
                            max-height: none !important;
                        }
                    }
                </style>
                </head>
                <body class=""clean-body"" style=""margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;"">
                <!--[if IE]><div class=""ie-browser""><![endif]-->
                <table bgcolor=""#FFFFFF"" cellpadding=""0"" cellspacing=""0"" class=""nl-container"" role=""presentation"" style=""table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;"" valign=""top"" width=""100%"">
                <tbody>
                <tr style=""vertical-align: top;"" valign=""top"">
                <td style=""word-break: break-word; vertical-align: top;"" valign=""top"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td align=""center"" style=""background-color:#FFFFFF""><![endif]-->
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <div style=""font-size:16px;text-align:center;font-family:Arial, Helvetica Neue, Helvetica, sans-serif""><a href=""{baseUrl}/""><img alt=""Victorious"" src=""{baseUrl}/logo.png"" style=""height:3em""/></a></div>
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#3b0d17;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #3b0d17; mso-line-height-alt: 14px;"">
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; font-size: 38px; mso-line-height-alt: 46px; margin: 0;""><span style=""font-size: 38px;"">Hi, {userName}!</span></p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">Good news â€” {ASSIGNEE} just completed {TASK_NAME}. You can view the finished deliverable by clicking on the button below.
                </span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <div align=""left"" class=""button-container"" style=""padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;""><tr><td style=""padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px"" align=""left""><v:roundrect xmlns:v=""urn:schemas-microsoft-com:vml"" xmlns:w=""urn:schemas-microsoft-com:office:word"" href=""{baseUrl}/tasks?active=victorious-tasks&projectId={projectId}"" style=""height:39pt; width:234pt; v-text-anchor:middle;"" arcsize=""8%"" stroke=""false"" fillcolor=""#3b0d17""><w:anchorlock/><v:textbox inset=""0,0,0,0""><center style=""color:#ffffff; font-family:Arial, sans-serif; font-size:16px""><![endif]--><a href=""{baseUrl}/tasks?active=victorious-tasks&projectId={projectId}"" style=""-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ffffff; background-color: #3b0d17; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; width: auto; border-top: 1px solid #3b0d17; border-right: 1px solid #3b0d17; border-bottom: 1px solid #3b0d17; border-left: 1px solid #3b0d17; padding-top: 10px; padding-bottom: 10px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;"" target=""_blank""><span style=""padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;""><span style=""font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"">VIEW DETAILS</span></span></a>
                <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                </div>
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">Talk soon!</span></p>
                <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">The Victorious team</span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#3c4450;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #3c4450; mso-line-height-alt: 14px;"">
                <p style=""font-size: 15px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 18px; margin: 0;""><span style=""font-size: 15px;"">If youâ€™re having trouble with the button above, copy and paste the url below into your web browser:</span></p>
                <p style=""font-size: 14px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 17px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; font-size: 15px; mso-line-height-alt: 18px; margin: 0;""><span style=""font-size: 15px;""><a href=""{baseUrl}/tasks?active=victorious-tasks&projectId={projectId}"" rel=""noopener"" style=""text-decoration: underline; color: #3c4450;"" target=""_blank"">{baseUrl}/tasks?active=victorious-tasks&projectId={projectId}</a></span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
                </tr>
                </tbody>
                </table>
                <!--[if (IE)]></div><![endif]-->
                </body>
                </html>`,
                CreatedAt: new Date(),
                ModifiedAt: new Date(),
                TenantId: TENANT_ID,
                TemplateTypeId: 7,
            }, {
                Id: 7,
                Name: '{TASK_NAME} Requires Your Action',
                Template: `<!DOCTYPE html PUBLIC ""-//W3C//DTD XHTML 1.0 Transitional //EN"" ""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"">
                <html xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"" xmlns:v=""urn:schemas-microsoft-com:vml"">
                <head>
                <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
                <meta content=""text/html; charset=utf-8"" http-equiv=""Content-Type""/>
                <meta content=""width=device-width"" name=""viewport""/>
                <!--[if !mso]><!-->
                <meta content=""IE=edge"" http-equiv=""X-UA-Compatible""/>
                <!--<![endif]-->
                <title></title>
                <!--[if !mso]><!-->
                <link href=""https://fonts.googleapis.com/css?family=Roboto"" rel=""stylesheet"" type=""text/css""/>
                <!--<![endif]-->
                <style type=""text/css"">
                    body {
                        margin: 0;
                        padding: 0;
                    }

                    table,
                    td,
                    tr {
                        vertical-align: top;
                        border-collapse: collapse;
                    }

                    * {
                        line-height: inherit;
                    }

                    a[x-apple-data-detectors=true] {
                        color: inherit !important;
                        text-decoration: none !important;
                    }
                </style>
                <style id=""media-query"" type=""text/css"">
                    @media (max-width: 520px) {
                        .block-grid,
                        .col {
                            min-width: 320px !important;
                            max-width: 100% !important;
                            display: block !important;
                        }

                        .block-grid {
                            width: 100% !important;
                        }

                        .col {
                            width: 100% !important;
                        }

                        .col_cont {
                            margin: 0 auto;
                        }

                        img.fullwidth,
                        img.fullwidthOnMobile {
                            max-width: 100% !important;
                        }

                        .no-stack .col {
                            min-width: 0 !important;
                            display: table-cell !important;
                        }

                        .no-stack.two-up .col {
                            width: 50% !important;
                        }

                        .no-stack .col.num2 {
                            width: 16.6% !important;
                        }

                        .no-stack .col.num3 {
                            width: 25% !important;
                        }

                        .no-stack .col.num4 {
                            width: 33% !important;
                        }

                        .no-stack .col.num5 {
                            width: 41.6% !important;
                        }

                        .no-stack .col.num6 {
                            width: 50% !important;
                        }

                        .no-stack .col.num7 {
                            width: 58.3% !important;
                        }

                        .no-stack .col.num8 {
                            width: 66.6% !important;
                        }

                        .no-stack .col.num9 {
                            width: 75% !important;
                        }

                        .no-stack .col.num10 {
                            width: 83.3% !important;
                        }

                        .video-block {
                            max-width: none !important;
                        }

                        .mobile_hide {
                            min-height: 0px;
                            max-height: 0px;
                            max-width: 0px;
                            display: none;
                            overflow: hidden;
                            font-size: 0px;
                        }

                        .desktop_hide {
                            display: block !important;
                            max-height: none !important;
                        }
                    }
                </style>
                </head>
                <body class=""clean-body"" style=""margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;"">
                <!--[if IE]><div class=""ie-browser""><![endif]-->
                <table bgcolor=""#FFFFFF"" cellpadding=""0"" cellspacing=""0"" class=""nl-container"" role=""presentation"" style=""table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;"" valign=""top"" width=""100%"">
                <tbody>
                <tr style=""vertical-align: top;"" valign=""top"">
                <td style=""word-break: break-word; vertical-align: top;"" valign=""top"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td align=""center"" style=""background-color:#FFFFFF""><![endif]-->
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <div style=""font-size:16px;text-align:center;font-family:Arial, Helvetica Neue, Helvetica, sans-serif""><a href=""{baseUrl}/""><img alt=""Victorious"" src=""{baseUrl}/logo.png"" style=""height:3em""/></a></div>
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#3b0d17;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #3b0d17; mso-line-height-alt: 14px;"">
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; font-size: 38px; mso-line-height-alt: 46px; margin: 0;""><span style=""font-size: 38px;"">Hi, {userName}!</span></p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">Itâ€™s time for you to complete a task for our SEO campaign. </span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <div align=""left"" class=""button-container"" style=""padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;""><tr><td style=""padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px"" align=""left""><v:roundrect xmlns:v=""urn:schemas-microsoft-com:vml"" xmlns:w=""urn:schemas-microsoft-com:office:word"" href=""{baseUrl}/tasks?active=your-tasks&projectId={projectId}"" style=""height:39pt; width:234pt; v-text-anchor:middle;"" arcsize=""8%"" stroke=""false"" fillcolor=""#3b0d17""><w:anchorlock/><v:textbox inset=""0,0,0,0""><center style=""color:#ffffff; font-family:Arial, sans-serif; font-size:16px""><![endif]--><a href=""{baseUrl}/tasks?active=your-tasks&projectId={projectId}"" style=""-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ffffff; background-color: #3b0d17; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; width: auto; border-top: 1px solid #3b0d17; border-right: 1px solid #3b0d17; border-bottom: 1px solid #3b0d17; border-left: 1px solid #3b0d17; padding-top: 10px; padding-bottom: 10px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;"" target=""_blank""><span style=""padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;""><span style=""font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"">VIEW DETAILS</span></span></a>
                <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                </div>
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">When you are finished, mark it complete, and then we can celebrate together!
                </span></p>
                </div>
                </div>
                <div style=""color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">As always, let us know if you have any questions.</span></p>
                </div>
                </div>
                <div style=""color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">Talk soon,</span></p>
                <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">Victorious</span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#3c4450;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #3c4450; mso-line-height-alt: 14px;"">
                <p style=""font-size: 15px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 18px; margin: 0;""><span style=""font-size: 15px;"">If youâ€™re having trouble with the button above, copy and paste the url below into your web browser:</span></p>
                <p style=""font-size: 14px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 17px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; font-size: 15px; mso-line-height-alt: 18px; margin: 0;""><span style=""font-size: 15px;""><a href=""{baseUrl}/tasks?active=your-tasks&projectId={projectId}"" rel=""noopener"" style=""text-decoration: underline; color: #3c4450;"" target=""_blank"">{baseUrl}/tasks?active=your-tasks&projectId={projectId}</a></span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
                </tr>
                </tbody>
                </table>
                <!--[if (IE)]></div><![endif]-->
                </body>
                </html>`,
                CreatedAt: new Date(),
                ModifiedAt: new Date(),
                TenantId: TENANT_ID,
                TemplateTypeId: 8,
            }, {
                Id: 8,
                Name: 'New comment from Victorious',
                Template: `<!DOCTYPE html PUBLIC ""-//W3C//DTD XHTML 1.0 Transitional //EN"" ""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"">
                <html xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"" xmlns:v=""urn:schemas-microsoft-com:vml"">
                <head>
                <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
                <meta content=""text/html; charset=utf-8"" http-equiv=""Content-Type""/>
                <meta content=""width=device-width"" name=""viewport""/>
                <!--[if !mso]><!-->
                <meta content=""IE=edge"" http-equiv=""X-UA-Compatible""/>
                <!--<![endif]-->
                <title></title>
                <!--[if !mso]><!-->
                <link href=""https://fonts.googleapis.com/css?family=Roboto"" rel=""stylesheet"" type=""text/css""/>
                <!--<![endif]-->
                <style type=""text/css"">
                    body {
                        margin: 0;
                        padding: 0;
                    }

                    table,
                    td,
                    tr {
                        vertical-align: top;
                        border-collapse: collapse;
                    }

                    * {
                        line-height: inherit;
                    }

                    a[x-apple-data-detectors=true] {
                        color: inherit !important;
                        text-decoration: none !important;
                    }
                </style>
                <style id=""media-query"" type=""text/css"">
                    @media (max-width: 520px) {
                        .block-grid,
                        .col {
                            min-width: 320px !important;
                            max-width: 100% !important;
                            display: block !important;
                        }

                        .block-grid {
                            width: 100% !important;
                        }

                        .col {
                            width: 100% !important;
                        }

                        .col_cont {
                            margin: 0 auto;
                        }

                        img.fullwidth,
                        img.fullwidthOnMobile {
                            max-width: 100% !important;
                        }

                        .no-stack .col {
                            min-width: 0 !important;
                            display: table-cell !important;
                        }

                        .no-stack.two-up .col {
                            width: 50% !important;
                        }

                        .no-stack .col.num2 {
                            width: 16.6% !important;
                        }

                        .no-stack .col.num3 {
                            width: 25% !important;
                        }

                        .no-stack .col.num4 {
                            width: 33% !important;
                        }

                        .no-stack .col.num5 {
                            width: 41.6% !important;
                        }

                        .no-stack .col.num6 {
                            width: 50% !important;
                        }

                        .no-stack .col.num7 {
                            width: 58.3% !important;
                        }

                        .no-stack .col.num8 {
                            width: 66.6% !important;
                        }

                        .no-stack .col.num9 {
                            width: 75% !important;
                        }

                        .no-stack .col.num10 {
                            width: 83.3% !important;
                        }

                        .video-block {
                            max-width: none !important;
                        }

                        .mobile_hide {
                            min-height: 0px;
                            max-height: 0px;
                            max-width: 0px;
                            display: none;
                            overflow: hidden;
                            font-size: 0px;
                        }

                        .desktop_hide {
                            display: block !important;
                            max-height: none !important;
                        }
                    }
                </style>
                </head>
                <body class=""clean-body"" style=""margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;"">
                <!--[if IE]><div class=""ie-browser""><![endif]-->
                <table bgcolor=""#FFFFFF"" cellpadding=""0"" cellspacing=""0"" class=""nl-container"" role=""presentation"" style=""table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;"" valign=""top"" width=""100%"">
                <tbody>
                <tr style=""vertical-align: top;"" valign=""top"">
                <td style=""word-break: break-word; vertical-align: top;"" valign=""top"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td align=""center"" style=""background-color:#FFFFFF""><![endif]-->
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <div style=""font-size:16px;text-align:center;font-family:Arial, Helvetica Neue, Helvetica, sans-serif""><a href=""{baseUrl}/""><img alt=""Victorious"" src=""{baseUrl}/logo.png"" style=""height:3em""/></a></div>
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#3b0d17;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #3b0d17; mso-line-height-alt: 14px;"">
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; font-size: 38px; mso-line-height-alt: 46px; margin: 0;""><span style=""font-size: 38px;"">Hi, {userName}!</span></p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">Someone left a comment for you in the Victorious platform. Take a look by clicking on the button below.</span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <div align=""left"" class=""button-container"" style=""padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;""><tr><td style=""padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px"" align=""left""><v:roundrect xmlns:v=""urn:schemas-microsoft-com:vml"" xmlns:w=""urn:schemas-microsoft-com:office:word"" href=""{baseUrl}/{landingPage}"" style=""height:39pt; width:234pt; v-text-anchor:middle;"" arcsize=""8%"" stroke=""false"" fillcolor=""#3b0d17""><w:anchorlock/><v:textbox inset=""0,0,0,0""><center style=""color:#ffffff; font-family:Arial, sans-serif; font-size:16px""><![endif]--><a href=""{baseUrl}/{landingPage}&projectId={projectId}"" style=""-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ffffff; background-color: #3b0d17; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; width: auto; border-top: 1px solid #3b0d17; border-right: 1px solid #3b0d17; border-bottom: 1px solid #3b0d17; border-left: 1px solid #3b0d17; padding-top: 10px; padding-bottom: 10px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;"" target=""_blank""><span style=""padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;""><span style=""font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"">VIEW COMMENT</span></span></a>
                <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                </div>
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">Talk to you soon!</span></p>
                <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">The Victorious team</span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#3c4450;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #3c4450; mso-line-height-alt: 14px;"">
                <p style=""font-size: 15px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 18px; margin: 0;""><span style=""font-size: 15px;"">If youâ€™re having trouble with the button above, copy and paste the url below into your web browser:</span></p>
                <p style=""font-size: 14px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 17px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; font-size: 15px; mso-line-height-alt: 18px; margin: 0;""><span style=""font-size: 15px;""><a href=""{baseUrl}/{landingPage}&projectId={projectId}"" rel=""noopener"" style=""text-decoration: underline; color: #3c4450;"" target=""_blank"">{baseUrl}/{landingPage}&projectId={projectId}</a></span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
                </tr>
                </tbody>
                </table>
                <!--[if (IE)]></div><![endif]-->
                </body>
                </html>`,
                CreatedAt: new Date(),
                ModifiedAt: new Date(),
                TenantId: TENANT_ID,
                TemplateTypeId: 9,
            }, {
                Id: 9,
                Name: 'Your Weekly Update',
                Template: `<!DOCTYPE html PUBLIC ""-//W3C//DTD XHTML 1.0 Transitional //EN"" ""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"">
                <html xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"" xmlns:v=""urn:schemas-microsoft-com:vml"">
                <head>
                <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
                <meta content=""text/html; charset=utf-8"" http-equiv=""Content-Type""/>
                <meta content=""width=device-width"" name=""viewport""/>
                <!--[if !mso]><!-->
                <meta content=""IE=edge"" http-equiv=""X-UA-Compatible""/>
                <!--<![endif]-->
                <title></title>
                <!--[if !mso]><!-->
                <link href=""https://fonts.googleapis.com/css?family=Roboto"" rel=""stylesheet"" type=""text/css""/>
                <!--<![endif]-->
                <style type=""text/css"">
                    body {
                        margin: 0;
                        padding: 0;
                    }

                    table,
                    td,
                    tr {
                        vertical-align: top;
                        border-collapse: collapse;
                    }

                    * {
                        line-height: inherit;
                    }

                    a[x-apple-data-detectors=true] {
                        color: inherit !important;
                        text-decoration: none !important;
                    }
                </style>
                <style id=""media-query"" type=""text/css"">
                    @media (max-width: 520px) {
                        .block-grid,
                        .col {
                            min-width: 320px !important;
                            max-width: 100% !important;
                            display: block !important;
                        }

                        .block-grid {
                            width: 100% !important;
                        }

                        .col {
                            width: 100% !important;
                        }

                        .col_cont {
                            margin: 0 auto;
                        }

                        img.fullwidth,
                        img.fullwidthOnMobile {
                            max-width: 100% !important;
                        }

                        .no-stack .col {
                            min-width: 0 !important;
                            display: table-cell !important;
                        }

                        .no-stack.two-up .col {
                            width: 50% !important;
                        }

                        .no-stack .col.num2 {
                            width: 16.6% !important;
                        }

                        .no-stack .col.num3 {
                            width: 25% !important;
                        }

                        .no-stack .col.num4 {
                            width: 33% !important;
                        }

                        .no-stack .col.num5 {
                            width: 41.6% !important;
                        }

                        .no-stack .col.num6 {
                            width: 50% !important;
                        }

                        .no-stack .col.num7 {
                            width: 58.3% !important;
                        }

                        .no-stack .col.num8 {
                            width: 66.6% !important;
                        }

                        .no-stack .col.num9 {
                            width: 75% !important;
                        }

                        .no-stack .col.num10 {
                            width: 83.3% !important;
                        }

                        .video-block {
                            max-width: none !important;
                        }

                        .mobile_hide {
                            min-height: 0px;
                            max-height: 0px;
                            max-width: 0px;
                            display: none;
                            overflow: hidden;
                            font-size: 0px;
                        }

                        .desktop_hide {
                            display: block !important;
                            max-height: none !important;
                        }

                        .comment-wrapper {
                            border-radius: 5%;
                            border: 1px solid black;
                        }
                    }
                </style>
                </head>
                <body class=""clean-body"" style=""margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;"">
                <!--[if IE]><div class=""ie-browser""><![endif]-->
                <table bgcolor=""#FFFFFF"" cellpadding=""0"" cellspacing=""0"" class=""nl-container"" role=""presentation"" style=""table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;"" valign=""top"" width=""100%"">
                <tbody>
                <tr style=""vertical-align: top;"" valign=""top"">
                <td style=""word-break: break-word; vertical-align: top;"" valign=""top"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td align=""center"" style=""background-color:#FFFFFF""><![endif]-->
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <div style=""font-size:16px;text-align:center;font-family:Arial, Helvetica Neue, Helvetica, sans-serif""><a href=""{baseUrl}/""><img alt=""Victorious"" src=""{baseUrl}/logo.png"" style=""height:3em""/></a></div>
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>

                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#3b0d17;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #3b0d17; mso-line-height-alt: 14px;"">
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; font-size: 38px; mso-line-height-alt: 46px; margin: 0;""><span style=""font-size: 38px;"">Hi, {userName}!</span></p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>

                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <div style=""color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                    <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                    <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">Happy Monday â€” hereâ€™s your weekly update from Victorious:
                    </span></p>
                    </div>
                    </div>
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>

                {content}

                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div align=""left"" class=""button-container"" style=""padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                    <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;""><tr><td style=""padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px"" align=""left""><v:roundrect xmlns:v=""urn:schemas-microsoft-com:vml"" xmlns:w=""urn:schemas-microsoft-com:office:word"" href=""{baseUrl}"" style=""height:39pt; width:234pt; v-text-anchor:middle;"" arcsize=""8%"" stroke=""false"" fillcolor=""#3b0d17""><w:anchorlock/><v:textbox inset=""0,0,0,0""><center style=""color:#ffffff; font-family:Arial, sans-serif; font-size:16px""><![endif]--><a href=""{baseUrl}"" style=""-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ffffff; background-color: #3b0d17; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; width: auto; border-top: 1px solid #3b0d17; border-right: 1px solid #3b0d17; border-bottom: 1px solid #3b0d17; border-left: 1px solid #3b0d17; padding-top: 10px; padding-bottom: 10px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;"" target=""_blank""><span style=""padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;""><span style=""font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"">VIEW DETAILS</span></span></a>
                    <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                    </div>
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;"">
                <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">Looking forward to connecting soon!
                </span></p>
                <p style=""font-size: 17px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin: 0;""><span style=""font-size: 17px; mso-ansi-font-size: 18px;"">The Victorious Team</span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style=""background-color:transparent;"">
                <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
                <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
                <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
                <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;""><![endif]-->
                <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
                <div class=""col_cont"" style=""width:100% !important;"">
                <!--[if (!mso)&(!IE)]><!-->
                <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"">
                <!--<![endif]-->
                <!--[if mso]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif""><![endif]-->
                <div style=""color:#3c4450;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"">
                <div style=""line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #3c4450; mso-line-height-alt: 14px;"">
                <p style=""font-size: 15px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 18px; margin: 0;""><span style=""font-size: 15px;"">If youâ€™re having trouble with the button above, copy and paste the url below into your web browser:</span></p>
                <p style=""font-size: 14px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 17px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"">Â</p>
                <p style=""line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; word-break: break-word; font-size: 15px; mso-line-height-alt: 18px; margin: 0;""><span style=""font-size: 15px;""><a href=""{baseUrl}"" rel=""noopener"" style=""text-decoration: underline; color: #3c4450;"" target=""_blank"">{baseUrl}/</a></span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
                </tr>
                </tbody>
                </table>
                <!--[if (IE)]></div><![endif]-->
                </body>
                </html>`,
                CreatedAt: new Date(),
                ModifiedAt: new Date(),
                TenantId: TENANT_ID,
                TemplateTypeId: 10,
            },
        ], {});
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('Template', null, {});
    },
};
