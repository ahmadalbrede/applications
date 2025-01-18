const fs = require('fs');

// عدد المستخدمين المطلوب
const numberOfUsers = 100;

// اسم ملف CSV
const fileName = 'users.csv';

// كتابة العناوين (Header) لملف CSV
fs.writeFileSync(fileName, 'email,password,name\n');

// توليد بيانات المستخدمين
for (let i = 1; i <= numberOfUsers; i++) {
    const email = `user${i}@example.com`;
    const password = `password${i}`;
    const name = `User ${i}`;
    fs.appendFileSync(fileName, `${email},${password},${name}\n`);
}

console.log(`تم إنشاء ${numberOfUsers} مستخدم وحفظهم في الملف ${fileName}`);
