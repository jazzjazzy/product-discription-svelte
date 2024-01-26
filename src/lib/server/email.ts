import { Resend } from 'resend';
import { RESEND_API_KEY, DOMAIN, DEV_EMAIL } from '$env/static/private';
import { dev } from '$app/environment';

const resend = new Resend(RESEND_API_KEY);

const devEmail = DEV_EMAIL

export const sendEmailVerificationLink = async (token: string, email: string) => {
    const url = `${DOMAIN}/email-verification/${token}`;

    // If we are in development mode, send the email to the developer instead
    if (dev) {
        email = devEmail;
    }


    // try {
    let sent = await resend.emails.send({
        from: 'Dis-scription <send@dis-scription.com>',
        to: [email],
        subject: 'Email verification link',
        text: `Verify your email by clicking this link ${url} `,
        html: getHTMLemail("Verify", url)
    });

    if (sent.error !== null) {
        return sent.error;
    }

    // } catch (e: any) {
    //     console.log(e)
    //     throw e;
    // }
}

export const sendOAuthNotice = async (type: string, email: string) => {
    const url = `${DOMAIN}/login/${type}`;

    // If we are in development mode, send the email to the developer instead
    if (devEmail) {
        email = devEmail;
    }

    try {
        let sent = await resend.emails.send({
            from: 'Dis-scription  <send@dis-scription.com>',
            to: [email],
            subject: 'Email verification link',
            text: `you have signed up using a ${type} OAuth account. Please verify your email address by clicking this link:${url} `,
            html: getHTMLemail("oAuth", url, type)
        });

        if (sent.error !== null) {
            throw sent.error;
        }

    } catch (e: unknown) {
        console.log(e)
        throw e;
    }
}

export const sendPasswordResetLink = async (token: string, email: string) => {
    const url = `${DOMAIN}/forgotten/${token}`;

    // If we are in development mode, send the email to the developer instead
    if (devEmail) {
        email = devEmail;
    }
    console.log("email", email);
    try {
        let sent = await resend.emails.send({
            from: 'Dis-scription <send@dis-scription.com>',
            to: [email],
            subject: 'Password Rest link',
            text: ` Password reset link ! ${url}`,
            html: getHTMLemail("Reset", url)
        });

        if (sent.error !== null) {
            throw sent.error;
        }

    } catch (e: unknown) {
        console.log(e)
        throw e;
    }
};

export const isValidEmail = (maybeEmail: unknown): maybeEmail is string => {
    if (typeof maybeEmail !== 'string') return false;
    if (maybeEmail.length > 255) return false;

    //todo: testing new email regex, keeping old one commented for now. jason:5/1/2024
    //const emailRegexp = /^.+@.+$/; // [one or more character]@[one or more character]
    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegexp.test(maybeEmail);
};


/**
 * Creates the HTML for the email.
 * 
 * @param {string} type The type of email to be created.
 * @param {string} link The link to be included in the email.
 * @param {string|null} oAuthType The type of OAuth, if applicable, otherwise null.
 * @returns {string} The generated HTML for the email.
 */
function getHTMLemail(type: string, link: string, oAuthType?: string) {

    let content = "";
    if (type === "Verify") {
        content = `<h2>Verify Your Account</h2>
        <p>Thank you for registering Dis.scription. Please click the button below to verify your email address and activate your account.</p>
        <a href="${link}" class="verify-button">Verify Account</a>`
    } else if (type === "Reset") {
        content = `<h2>Reset Your Password</h2>
        <p>You have requested to reset your password for Dis.scription. Please click the button below to set a new password for your account.</p>
        <a href="${link}" class="verify-button">Reset Password</a>`
    } else if (type === "oAuth") {
        content = `<h2>Reset Password Account</h2>
        <p>You have signed up using a ${oAuthType} OAuth account. Please verify your email address by clicking the link below:</p>
        <a href="${link}" class="verify-button">Verify Account</a>`
    } else {
        throw new Error("Invalid email type");
    }


    return `
<head>
    <title>Verify Your Account</title>
    <style>
        .verify-button {
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            text-align: center;
            display: inline-block;
        }

        .email-container {
            text-align: center;
            padding: 20px;
        }
    </style>
</head>
<body>
    
    <div class="email-container">
        ${content}
    </div>
</body>
</html>`


}