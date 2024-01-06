import { generateRandomString, isWithinExpiration } from "lucia/utils";
import prisma from "$lib/server/prisma";

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours


/**
 * generates a password reset token and returns the token
 * 
 * @param userId 
 * @returns 
 */
export const generatePasswordResetToken = async (userId: string) => {
	try {
		const storedUserTokens = await prisma.password_reset_token.findMany({
			where: {
				user_id: userId
			}
		})
		if (storedUserTokens.length > 0) {
			const reusableStoredToken = storedUserTokens.find((token) => {
				// check if expiration is within 1 hour
				// and reuse the token if true
				return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
			});
			if (reusableStoredToken) return reusableStoredToken.id;
		}
		const token = generateRandomString(63);

		await prisma.password_reset_token.create({
			data: {
				id: token,
				expires: new Date().getTime() + EXPIRES_IN,
				user_id: userId

			}
		})

		if (!token) throw new Error("Failed to generate token");

		return token;
	} catch (e: any) {
		{
			throw new Error(e.message);
		}
	};
}

/**
 * validates the password reset token and returns the user ID
 * 
 * @param token 
 * @returns 
 */
export const validatePasswordResetToken = async (token: string) => {
	const storedToken = await prisma.$transaction(async (prismaTransaction) => {
		const storedToken = await prismaTransaction.password_reset_token.findUnique({
			where: { id: token }
		});

		if (!storedToken) {
			throw new Error("Invalid token");
		}

		await prismaTransaction.password_reset_token.delete({
			where: { id: storedToken.id }
		});

		return storedToken;
	});
	const tokenExpires = Number(storedToken.expires); // bigint => number conversion
	if (!isWithinExpiration(tokenExpires)) {
		throw new Error("Expired token");
	}
	return storedToken.user_id;
};

/**
 * generates an email verification token and returns the token
 * 
 * @param userId 
 * @returns 
 */

export const generateEmailVerificationToken = async (userId: string) => {
	// Retrieve all tokens for the user
	const storedUserTokens = await prisma.email_verification_token.findMany({
		where: {
			user_id: userId
		}
	});

	if (storedUserTokens.length > 0) {
		const reusableStoredToken = storedUserTokens.find((token) => {
			// Check if expiration is within 1 hour and reuse the token if true
			return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
		});
		if (reusableStoredToken) return reusableStoredToken.id;
	}

	const token = generateRandomString(63);

	// Insert new token
	await prisma.email_verification_token.create({
		data: {
			id: token,
			expires: new Date().getTime() + EXPIRES_IN,
			user_id: userId
		}
	});

	return token;
};

/**
 * Verifies the email verification token and returns the user ID
 * 
 * @param token 
 * @returns 
 */
export const validateEmailVerificationToken = async (token: string) => {
	let storedToken;

	try {
		storedToken = await prisma.$transaction(async (prisma) => {
			const tokenRecord = await prisma.email_verification_token.findUnique({
				where: { id: token }
			});

			if (!tokenRecord) throw new Error("Invalid token");

			await prisma.email_verification_token.deleteMany({
				where: { user_id: tokenRecord.user_id }
			});

			return tokenRecord;
		});
	} catch (error) {
		// Handle or rethrow the error as needed
		throw error;
	}

	const tokenExpires = Number(storedToken.expires); // bigint => number conversion
	if (!isWithinExpiration(tokenExpires)) {
		throw new Error("Expired token");
	}

	return storedToken.user_id;
};