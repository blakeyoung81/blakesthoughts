# 💝 Romantic Envelope Unlock Website - Setup Instructions

## Project Overview
You've created a beautiful, interactive website with a romantic envelope that opens progressively as she completes three dates with you. Each date unlocks a "scratch-off ticket" and opens the envelope a bit more until finally revealing a special PDF invitation.

## 🎯 How It Works

1. **Main Page**: `blakesthoughts.com/envelope`
   - Shows a closed envelope with 3 scratch-off tickets
   - Displays romantic animations and floating hearts
   - Tickets can't be manually scratched - they require the unlock URLs

2. **Date Unlock URLs** (with secure tokens):
   - **Date 1**: `blakesthoughts.com/unlock-date-1-a7k9m2x5`
   - **Date 2**: `blakesthoughts.com/unlock-date-2-p3w8q6n1`
   - **Date 3**: `blakesthoughts.com/unlock-date-3-r5t2y9h4`

3. **Progressive Unlocking**:
   - After Date 1: First ticket scratched, envelope slightly opens
   - After Date 2: Second ticket scratched, envelope opens more
   - After Date 3: All tickets scratched, envelope fully opens, PDF revealed

## 📱 Creating Your QR Codes

### Option 1: Online QR Code Generator (Easiest)
1. Go to [QR Code Generator](https://www.qr-code-generator.com/)
2. Create 3 separate QR codes:
   - QR Code 1: `https://blakesthoughts.com/unlock-date-1-a7k9m2x5`
   - QR Code 2: `https://blakesthoughts.com/unlock-date-2-p3w8q6n1`
   - QR Code 3: `https://blakesthoughts.com/unlock-date-3-r5t2y9h4`
3. Download and print them on nice cards

### Option 2: Using a Mac/iPhone Shortcut
1. Open Safari
2. Navigate to each URL
3. Click Share → Add to Photos (iOS) or Take Screenshot (Mac)
4. Share the QR code

### Creative QR Code Presentation Ideas:
- Print on cute cards with hints about each date
- Create a "Date Passport" with all three QR codes
- Hide them in creative places she'll find
- Include them with flowers or small gifts

## 🎨 Customization Options

### Change the Final PDF
1. Replace the file at: `/public/final-invitation.pdf`
2. Create your PDF with your special invitation
3. Make it romantic and personal!

### Customize Messages
Edit these files to change the unlock messages:
- `/src/pages/unlock-date-1-a7k9m2x5.astro` - Date 1 message
- `/src/pages/unlock-date-2-p3w8q6n1.astro` - Date 2 message
- `/src/pages/unlock-date-3-r5t2y9h4.astro` - Date 3 message

### Change Colors/Theme
Edit `/src/pages/envelope.astro`:
- Line 29-32: Background gradient colors
- Line 203-206: Envelope colors
- Line 226-228: Ticket colors

## 🚀 Deployment Instructions

### Building and Deploying to Vercel

1. **Build the site**:
   ```bash
   cd /Users/blakeyoung/Library/Mobile\ Documents/com~apple~CloudDocs/Coding/Websites/BlakesThoughts
   npm run build
   ```

2. **Deploy to Vercel** (if not auto-deployed):
   ```bash
   npm run vercel
   # or
   vercel --prod
   ```

3. **Verify the URLs work**:
   - Visit `blakesthoughts.com/envelope`
   - Test each unlock URL (but don't save - have her do it!)

## 🧪 Testing Before Giving Her the QR Codes

### Important: Use Incognito/Private Mode!
To test without ruining the experience, always use incognito/private browsing mode.

1. **Test the main page**:
   - Open incognito window
   - Go to `blakesthoughts.com/envelope`
   - Should see closed envelope with 3 tickets

2. **Test unlock sequence**:
   - In same incognito window, visit unlock URLs in order
   - After each, return to `/envelope` to see progress
   - Close incognito window when done (clears localStorage)

3. **Mobile test**:
   - Open on your phone in private mode
   - Check that everything looks good
   - Verify QR codes scan correctly

## 💡 Presentation Strategy

### Getting Started:
1. Don't tell her about the full website initially
2. Give her the first QR code at the end of your first date
3. Let her discover the surprise!

### Date 1:
- Give her QR Code 1 with a note: "Scan me when you get home 💕"
- She discovers the envelope website
- Sees she needs 2 more dates to unlock the surprise

### Date 2:
- Give her QR Code 2 at the end
- She sees the envelope opening more
- Builds anticipation for Date 3

### Date 3:
- Give her QR Code 3
- She unlocks the final surprise PDF
- The big date invitation is revealed!

## 🔒 Security Features

### Why the Random Tokens?
- The URLs use random tokens (`a7k9m2x5`, etc.) instead of simple numbers
- This prevents her from guessing `unlock-date-2` or `unlock-date-3`
- She MUST scan each QR code to progress
- Creates anticipation and makes each date count

### How It Works:
- Each unlock page checks localStorage in the browser
- State persists across visits on the same device
- If she clears browser data, it resets (feature, not bug!)

## 🎭 Advanced Customization

### Add Your Own Animations
The envelope uses CSS animations. You can customize:
- Envelope opening angles (line 142-154)
- Ticket reveal effects (line 272-276)
- Floating hearts (line 49-54)

### Change the Particle Effects
Edit the floating hearts:
- Different emojis (line 363-364)
- Different positions (line 368-372)
- Different timing (line 375)

## 📝 Content Suggestions for Your PDF

Your final PDF should include:
- A romantic invitation to the "big date"
- Specific date, time, and location
- Dress code (if fancy)
- A heartfelt message
- Maybe a hint about what you have planned

### Creating a Beautiful PDF:
1. Use Canva (free templates)
2. Design in Google Docs/Pages and export to PDF
3. Use Adobe Express
4. Hand-write and scan (very romantic!)

## 🆘 Troubleshooting

### "The envelope isn't updating"
- Check browser console for errors
- Ensure localStorage isn't blocked
- Try clearing and re-testing

### "QR codes not scanning"
- Make sure URLs are exactly correct
- Test with multiple QR code readers
- Ensure high enough contrast when printed

### "She's on a different device"
- localStorage is device-specific
- She should use the same device for all unlocks
- Or, she can scan all QR codes on her new device

### "Want to reset progress"
- In browser console: `localStorage.clear()`
- Or use incognito mode for testing

## 🎉 Final Checklist

Before giving her the first QR code:

- [ ] Site is deployed and live
- [ ] All unlock URLs work correctly
- [ ] PDF is uploaded and displays correctly
- [ ] Tested full sequence in incognito mode
- [ ] Mobile responsive looks good
- [ ] QR codes are printed and ready
- [ ] You've planned all three dates!
- [ ] Final PDF has the big date details
- [ ] You're ready to be romantic! 💕

## 💝 Why This Works

This website creates:
- **Anticipation**: She can see what's coming but can't skip ahead
- **Engagement**: Each date has a reward beyond just spending time together
- **Mystery**: What's in that envelope?!
- **Effort**: Shows you put thought and work into something special
- **Fun**: Interactive and modern, not just a text message
- **Memorable**: She'll remember this unique approach

## 🎊 Good Luck!

You've created something really special. The combination of:
- Beautiful design
- Progressive unlocking
- QR code integration
- Romantic themes
- Mobile-friendly interface

...will definitely impress and create a memorable experience!

---

**Pro Tip**: Take screenshots of her reactions when she discovers each unlock! These will be great memories later.

**Remember**: The website is just the tool - the real magic is in the dates you plan and the time you spend together. Make each date count! 💕

