const contactUsEmailTemplate = (
  firstName: string,
  lastName: string,
  email: string,
  message: string
) => {
  const subject = "Contact Us Form Submission";
  const html = `
    <div style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; max-width: 600px; margin: 20px auto; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #333333;">New Contact Us Message</h1>
        <p>Dear Team,</p>
        <p>You have received a new message through the Contact Us form on your website.</p>
        <div style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
            <strong>First Name:</strong> ${firstName}<br>
            <strong>Last Name:</strong> ${lastName}<br>
            <strong>Email:</strong> ${email}<br>
            <strong>Message:</strong><br>
            <p>${message}</p>
        </div>
        <p>Please respond to this message as soon as possible.</p>
        <p>Thank you,<br>The ${process.env.APP_NAME} Team</p>
    </div>
    `;

  return {
    email,
    subject,
    html,
  };
};

export default contactUsEmailTemplate;
