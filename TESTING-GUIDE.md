# Testing Guide - Email Forms

## Quick Test Instructions

### Development Server
✅ Server running on: **http://localhost:3002**

### Forms to Test

#### 1. Home Page Form
**URL**: http://localhost:3002/
- Location: Hero section (right side)
- Fields: Name, Phone, Email, Service Type, SMS Consent
- Expected behavior:
  - Fill out form
  - Click "Submit Request"
  - Button changes to "Sending..."
  - Redirects to http://localhost:3002/thank-you
  - Email sent to premierremodelingoftexas@gmail.com and max@amarketology.com

#### 2. Services Page Form
**URL**: http://localhost:3002/services
- Location: Hero section (right side)
- Same fields and behavior as home page form

#### 3. Contact Page Form
**URL**: http://localhost:3002/contact
- Location: Right column
- Fields: Name, Email, Phone, Project Details (optional)
- Expected behavior:
  - Fill out form
  - Click "Request Free Quote"
  - Button changes to "Sending..."
  - Redirects to thank you page
  - Email sent with inquiry details

### Thank You Page
**URL**: http://localhost:3002/thank-you
- Features:
  - ✅ Success checkmark animation
  - 📧 Confirmation message
  - 📞 Quick call button (512-706-9577)
  - 🏠 Return to home button
  - 📸 View gallery button
  - ⏱️ 10-second countdown to auto-redirect

### Email Details
**Emails sent to:**
- premierremodelingoftexas@gmail.com
- max@amarketology.com

**Email format:**
- Subject: "New Service Request: [Service Type]" or "New Contact Form Submission"
- From: Tile Pros Austin Website (info@amarketology.com)
- Professional HTML template with:
  - Tile Pros Austin branding
  - Dark blue gradient (#1e3a8a)
  - All form fields clearly displayed
  - Clickable email and phone links

### Test Scenarios

#### Scenario 1: Successful Submission
1. Go to http://localhost:3002/
2. Fill in all required fields
3. Click Submit
4. ✅ Should redirect to thank you page
5. ✅ Check email inbox for notification

#### Scenario 2: Missing Required Fields
1. Go to http://localhost:3002/contact
2. Leave name field empty
3. Try to submit
4. ✅ Browser validation should prevent submission

#### Scenario 3: Network Error Handling
1. Turn off internet/WiFi
2. Fill out and submit form
3. ✅ Error message should appear above form
4. ✅ Button should re-enable for retry

#### Scenario 4: Thank You Page Experience
1. Successfully submit any form
2. Observe thank you page:
   - ✅ Animated checkmark appears
   - ✅ Success message displays
   - ✅ Countdown timer shows
   - ✅ After 10 seconds, redirects to home

### Troubleshooting

**If emails don't send:**
1. Check `.env.local` file exists with Mailjet credentials
2. Verify Mailjet API keys are valid
3. Check browser console for errors
4. Check terminal for API errors

**If form doesn't redirect:**
1. Check browser console for JavaScript errors
2. Verify `/api/send-email` route is accessible
3. Check network tab in browser DevTools

**If thank you page doesn't load:**
1. Manually navigate to http://localhost:3002/thank-you
2. Verify the file exists at `/app/thank-you/page.tsx`

### Console Commands for Testing

**Check if API route responds:**
```bash
curl -X POST http://localhost:3002/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"512-555-0123","service":"tile-installation"}'
```

**Expected response:**
```json
{"success":true,"message":"Email sent successfully"}
```

### Environment Check
```bash
# Verify environment variables
cat .env.local
```

Should show:
- MAILJET_API_KEY
- MAILJET_SECRET_KEY
- NOTIFICATION_EMAIL_1
- NOTIFICATION_EMAIL_2

## Production Deployment Notes

Before deploying to production:
1. ✅ Verify all environment variables are set in hosting platform
2. ✅ Test email sending in production environment
3. ✅ Update recipient email addresses if needed
4. ✅ Consider adding spam protection (reCAPTCHA)
5. ✅ Set up email tracking/monitoring
6. ✅ Test thank you page redirect
7. ✅ Verify all form validations work

## Status: ✅ READY FOR TESTING
All three forms are now fully integrated with Mailjet and redirect to the thank you page!
