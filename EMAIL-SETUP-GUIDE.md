# Email Setup Guide

## Setting Up Form Email Notifications

To receive email notifications when customers submit forms on your website, follow these steps:

### Option 1: Resend (Recommended - Easy & Free)

1. **Sign up for Resend**
   - Visit https://resend.com
   - Create a free account (100 emails/day free)

2. **Verify Your Domain (Recommended)**
   - Go to "Domains" in Resend dashboard
   - Add your domain (e.g., premierbathroomremodel.com)
   - Add the DNS records they provide to your domain registrar
   - Wait for verification (usually 5-15 minutes)

3. **Or Use Their Test Domain (Quick Start)**
   - You can use `onboarding@resend.dev` for testing
   - Note: Emails may go to spam with test domain

4. **Get Your API Key**
   - Go to "API Keys" in Resend dashboard
   - Click "Create API Key"
   - Give it a name (e.g., "Premier Bathroom Website")
   - Copy the API key (starts with `re_`)

5. **Add API Key to Your Project**
   - Open `.env.local` file in your project root
   - Replace `your_resend_api_key_here` with your actual API key
   - Example: `RESEND_API_KEY=re_abc123def456...`

6. **Restart Your Server**
   ```bash
   npm run dev
   ```

7. **Test the Form**
   - Fill out a form on your website
   - Check your email at info@amarketology.com
   - Check the console logs for confirmation

### Option 2: Alternative Email Services

If you prefer a different service, update `/app/api/send-email/route.ts`:

#### SendGrid
```bash
npm install @sendgrid/mail
```
Add to .env.local:
```
SENDGRID_API_KEY=your_key_here
```

#### Mailgun
Add to .env.local:
```
MAILGUN_API_KEY=your_key_here
MAILGUN_DOMAIN=your_domain_here
```

#### Gmail SMTP (via Nodemailer)
```bash
npm install nodemailer
```
Add to .env.local:
```
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_16_char_password
```

## Testing Without Email Service

The form will still work without an email service configured. Form submissions will:
- ✅ Show success message to user
- ✅ Redirect to thank-you page
- ✅ Log data to server console
- ❌ Not send actual emails

To test locally:
1. Run `npm run dev`
2. Submit a form
3. Check the terminal/console for the form data
4. Verify redirect to `/thank-you` page works

## Email Configuration

**Current Settings:**
- **To:** info@amarketology.com
- **From:** noreply@premierbathroomremodel.com (or your verified domain)
- **Reply-To:** Customer's email address

To change the recipient email, edit `/app/api/send-email/route.ts`:
```typescript
to: ['info@amarketology.com'],  // Change this email
```

## Troubleshooting

### Emails Not Arriving
1. ✅ Check spam/junk folder
2. ✅ Verify API key is correct in `.env.local`
3. ✅ Check domain is verified in Resend
4. ✅ View server logs for errors (`npm run dev` terminal)
5. ✅ Check Resend dashboard "Logs" section

### Forms Not Submitting
1. ✅ Check browser console for errors (F12)
2. ✅ Verify all required fields are filled
3. ✅ Check network tab for API call status
4. ✅ View server logs for errors

### Production Deployment
When deploying to Vercel/production:
1. Add `RESEND_API_KEY` to environment variables in hosting platform
2. Verify domain in Resend for better deliverability
3. Update `from` address to use your verified domain
4. Test form after deployment

## Form Features

✅ **Homepage Form** (`/`)
- Name, phone, email, service type
- SMS consent checkbox
- Redirects to `/thank-you` on success

✅ **Contact Page Form** (`/contact`)
- Name, phone, email, message
- Redirects to `/thank-you` on success

✅ **Thank You Page** (`/thank-you`)
- Confirmation message
- Next steps information
- Quick contact options

## Support

For issues with:
- **Resend:** https://resend.com/docs
- **Website Code:** Check console logs or contact developer
- **Email Deliverability:** Use verified domain, check DNS settings
