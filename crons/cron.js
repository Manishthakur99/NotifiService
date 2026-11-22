/**
 * Cron job for processing pending notification emails.
 * 
 * This module schedules a recurring task that finds all notifications
 * with PENDING status, sends them via email, and updates their status
 * to SUCCESS upon successful delivery.
 */

const cron = require('node-cron');
const Ticket = require('../models/ticketNotification');
const { sendMail } = require('../services/email.service');

/**
 * Initializes and starts the mailer cron job.
 * 
 * The cron runs every 2 minutes (cron expression: */2 * * * *).
 * On each run:
 *  1. Fetches all tickets with status 'PENDING'
 *  2. Sends an email to each recipient using Nodemailer
 *  3. Updates the ticket status to 'SUCCESS' on successful delivery
 *  4. Logs any errors encountered during sending
 * 
 * @returns {void}
 */
const mailerCron = () => {
    // Schedule the cron to run every 2 minutes
    cron.schedule('*/2 * * * *', async () => {
        console.log("Executing Cron Again");

        // Fetch all notifications that are still pending
        const notificationsToBeSent = await Ticket.find({
            status: 'PENDING'
        });

        // Process each pending notification
        notificationsToBeSent.forEach(notification => {
            // Construct email data for Nodemailer
            const mailData = {
                from: 'mba@support.com',                                    // Sender address
                to: notification.recepientEmails,                           // Recipient(s)
                subject: notification.subject,                              // Email subject
                text: notification.content                                  // Email body
            };

            // Send the email asynchronously
            sendMail(mailData, async (err, data) => {
                if (err) {
                    // Log error if email fails to send
                    console.log(err);
                } else {
                    // Log success and update ticket status to SUCCESS
                    console.log(data);
                    const savedNotification = await Ticket.findOne({ _id: notification._id });
                    savedNotification.status = "SUCCESS";
                    await savedNotification.save();
                }
            });
        });
    });
}

module.exports = {
    mailerCron
}
