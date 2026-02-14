interface BaseTemplateOptions {
  title: string;
  previewText?: string;
  content: string;
  unsubscribeEmail?: string;
  unsubscribeUrl?: string;
}

export const baseEmailTemplate = (options: BaseTemplateOptions): string => {
  const { title, previewText, content } = options;
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  ${previewText ? `<meta name="x-apple-disable-message-reformatting">` : ''}
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #0c111f 0%, #1a1f3a 100%);
      font-family: 'Inter', 'Segoe UI', Roboto, Arial, sans-serif;
      color: #e9f1ff;
      line-height: 1.6;
      min-height: 100vh;
    }

    .container {
      max-width: 600px;
      margin: 48px auto;
      padding: 0 24px;
    }

    .card {
      background: linear-gradient(135deg, #0b1d33, #091c48 45%, #132e72);
      border-radius: 24px;
      box-shadow:
        0 18px 50px rgba(10, 122, 255, 0.35),
        0 8px 30px rgba(10, 122, 255, 0.15);
      overflow: hidden;
      border: 1px solid rgba(10, 122, 255, 0.1);
      position: relative;
    }

    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #0a7aff, #5b3ee6, #0a7aff);
      background-size: 200% 100%;
    }

    .header {
      padding: 40px 32px 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      text-align: center;
      background: linear-gradient(135deg, rgba(10, 122, 255, 0.1), rgba(91, 62, 230, 0.1));
    }

    .logo {
      font-size: 28px;
      font-weight: 800;
      color: #ffffff;
      text-decoration: none;
    }

    .logo span {
      color: #0a7aff;
    }

    .body {
      padding: 32px;
    }

    .greeting {
      font-size: 18px;
      margin-bottom: 20px;
      color: #e9f1ff;
    }

    .content {
      font-size: 15px;
      line-height: 1.7;
      color: #b4c6e0;
    }

    .content p {
      margin-bottom: 16px;
    }

    .button {
      display: inline-block;
      padding: 14px 32px;
      background: linear-gradient(135deg, #0a7aff, #5b3ee6);
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 12px;
      font-weight: 700;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 20px 0;
    }

    .footer {
      padding: 24px 32px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      text-align: center;
      font-size: 12px;
      color: #6b7c93;
    }

    .footer a {
      color: #0a7aff;
      text-decoration: none;
    }

    .highlight {
      color: #0a7aff;
      font-weight: 600;
    }

    .info-box {
      background: rgba(10, 122, 255, 0.1);
      border: 1px solid rgba(10, 122, 255, 0.2);
      border-radius: 12px;
      padding: 20px;
      margin: 20px 0;
    }

    .info-box strong {
      color: #0a7aff;
    }
  </style>
</head>
<body>
  ${previewText ? `<div style="display:none;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${previewText}</div>` : ''}
  <div class="container">
    <div class="card">
      <div class="header">
        <a href="#" class="logo">LOGAN<span>.</span></a>
      </div>
      <div class="body">
        ${content}
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Yao David Logan. Tous droits reserves.</p>
        <p style="margin-top: 8px;">
          <a href="#">Portfolio</a> | <a href="#">LinkedIn</a> | <a href="#">GitHub</a>
        </p>
        ${options.unsubscribeEmail ? `<p style="margin-top: 12px; font-size: 11px; color: #4a5568;">Vous recevez cet email car vous etes inscrit a la newsletter.<br><a href="${options.unsubscribeUrl || '#'}" style="color: #0a7aff;">Se desabonner</a></p>` : ''}
      </div>
    </div>
  </div>
</body>
</html>`;
};

export default baseEmailTemplate;
