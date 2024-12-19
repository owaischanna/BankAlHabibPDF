const fontPath = 'D:\\Dynamic Pdf Generator\\fonts\\NotoNastaliqUrdu-Bold.ttf';

const addFooterText = (doc) => {
  try {
    // English text (left side)
    doc.font('Helvetica').fontSize(9);
    
    const englishText1 = `
    This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to which they are addressed. If you have received this email in error please notify the sender or the Bank's Call Center at 111-014-014 or 92-21-32446978-9 (for International Customers) or email at info@bankalhabib.com and delete it from your system and do not copy, disclose or otherwise act upon any part of this email or its attachment.
    `;

    const englishText2 = `
    Bank AL Habib Limited does not guarantee the integrity of this email or its attachments and accepts no responsibility for viruses or other malicious software. Recipients are advised to check this email and its attachments for any virus or malicious software. Furthermore, Bank AL Habib Limited does not accept liability for any errors or omission in the contents of this email or its attachments and reserves the right to correct the same at its discretion. However, without prejudice to the foregoing, unless any errors or omissions in this email or its attachments are reported to Bank AL Habib within 7 (seven) working days, the same will be deemed to be correct.
    `;

    const englishText3 = `
    "If you receive a call/SMS or email from anybody asking you for your personal details, complete account information or to click on links to fake websites, please do not divulge such information under any circumstance. Bank Al Habib will never call nor will send emails/SMS or send links that require you to give account information or passwords to us via public email or pop-up windows"
    `;

    doc.text(englishText1, 50, 270, { width: 250, align: 'justify' });
    doc.moveDown(0.5);
    doc.text(englishText2, 50, doc.y, { width: 250, align: 'justify' });
    doc.moveDown(0.5);
    doc.text(englishText3, 50, doc.y, { width: 250, align: 'justify' });

    // Urdu text (right side)
    // doc.registerFont('NotoNastaliqUrdu', fontPath);
    // doc.font('NotoNastaliqUrdu').fontSize(9);

    // const urduText1 = `
    //   یہ ای میل اور اس کے ساتھ منسلک تمام فائلیں خفیہ ہیں اور صرف اس فرد یا ادارے کے استعمال کے لیے ہیں جنہیں یہ بھیجی گئی ہیں۔ اگر آپ نے غلطی سے یہ ای میل وصول کی ہے تو براہ کرم بھیجنے والے یا بینک کے کال سینٹر کو 111-014-014 یا +92-21-32446929 پر مطلع کریں (بین الاقوامی صارفین کے لیے) یا info@bankalhabib.com پر ای میل کریں اور پھر اپنے سسٹم سے حذف کریں اور اس ای میل یا اس کے کسی بھی حصے کی نقل، افشا یا اس پر عمل نہ کریں۔
    // `;

    // const urduText2 = `
    //   بینک الحبیب لمیٹڈ اس ای میل یا اس کے منسلکات کی سالمیت کی ضمانت نہیں دیتا اور کسی وائرس یا بدنیتی کوڈ کے لیے کوئی ذمہ داری قبول نہیں کرتا۔ براہ کرم تسلیم شدہ اینٹی وائرس سافٹ ویئر استعمال کریں تاکہ اس ای میل اور اس کے ساتھ منسلک کسی بھی فائل کو چیک کیا جا سکے۔ مزید برآں، بینک الحبیب لمیٹڈ کسی بھی ذمہ داری کو قبول نہیں کرتا اگر اس ای میل کو کسی بھی طرح سے ترسیل کے دوران روکا یا تبدیل کیا جائے۔ اگر آپ کو بینک الحبیب لمیٹڈ سے مشتبہ ای میل موصول ہوتی ہے جو اصل بھیجنے والے کے طور پر ظاہر ہوتی ہے، تو ہم آپ سے درخواست کرتے ہیں کہ ای میل کو مسترد کریں، مواد کو نظر انداز کریں، اور اپنے میل باکس سے اسے فوری طور پر حذف کر دیں۔ مزید مدد کے لیے، اوپر دیے گئے ای میل یا فون نمبروں پر ہم سے رابطہ کریں۔
    // `;

    // const urduText3 = `
    //   آپ کی ذاتی تفصیلات، مکمل اکاؤنٹ کی معلومات یا جعلی ویب سائٹس کے لنکس پر کلک کرنے کے لیے کسی سے کال/ایس ایم ایس یا ای میل وصول کریں تو براہ کرم اس قسم کی معلومات کسی بھی حالت میں ظاہر نہ کریں۔ بینک الحبیب کبھی آپ کو کال نہیں کرے گا اور نہ ہی آپ کو عوامی ای میل یا پاپ اپ ونڈوز کے ذریعے اکاؤنٹ کی معلومات یا پاس ورڈ فراہم کرنے کے لیے ای میلز/ایس ایم ایس بھیجے گا۔
    // `;

    // doc.text(urduText1, 320, 270, { width: 230, align: 'right' });
    // doc.moveDown(1);
    // doc.text(urduText2, 320, doc.y, { width: 230, align: 'right' });
    // doc.moveDown(1);
    // doc.text(urduText3, 320, doc.y, { width: 230, align: 'right' });
  } catch (error) {
    console.error('Error adding footer text:', error.message);
  }
};

module.exports = { addFooterText };


