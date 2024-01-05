import { Resend } from 'resend';
import { RESEND_API_KEY, DOMAIN } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

export const sendEmailVerificationLink = async (token: string, email: string) => {
    const url = `${DOMAIN}/email-verification/${token}`;
    console.log(`Your email verification link: ${url}`);
    await resend.emails.send({
        from: 'Dis-scription <send@dis-scription.com>',
        to: ['jsjazzau@gmail.com'],
        subject: 'Email verification link',
        text: `it works! like magic! ${url}`,
    });
};

export const sendOAuthNotice = async (email: string, type: string) => {
    const url = `${DOMAIN}/login/${type}`;
    console.log(`Your OAuth link: ${url}`);
    await resend.emails.send({
        from: 'Dis-scription  <send@dis-scription.com>',
        to: ['jsjazzau@gmail.com'],
        subject: 'Email verification link',
        text: `you have signed up using a ${type} OAuth account. Please verify your email address by clicking this link:${url} `,
    });
}

export const sendPasswordResetLink = async (token: string, email: string) => {
    const url = `${DOMAIN}/forgotten/${token}`;
    console.log(`Your password reset link: ${url}`);
    try {
        let sent = await resend.emails.send({
            from: 'Dis-scription <send@dis-scription.com>',
            to: ['jsjazzau@gmail.com'],
            subject: 'Password Rest link',
            text: ` Password reset link ! ${url}`,
        });
        console.log('sent', sent);
    } catch (e) {
        console.log("Error::", e)
    }
};

export const isValidEmail = (maybeEmail: unknown): maybeEmail is string => {
    if (typeof maybeEmail !== 'string') return false;
    if (maybeEmail.length > 255) return false;
    const emailRegexp = /^.+@.+$/; // [one or more character]@[one or more character]
    return emailRegexp.test(maybeEmail);
};