แบบทดสอบ สำหรับทดสอบผู้สมัครงาน บริษัท Ascript

- สามารถติดตั้ง package เพิ่มเติมได้
- สามารถใช้ AI เพื่อช่วยในการทำแบบทดสอบได้

## Exam 1 - Form

ผู้ทดสอบ จะต้องออกแบบ และสร้างหน้าเว็บสำหรับการ register โดยมีข้อมูลที่ต้องการดังนี้

- email
- password
- confirmPassword
- fullName
- phone
- address
- gender

และจะต้องส่งข้อมูลไปที่ server เพื่อตรวจสอบข้อมูลด้วย zod หลังจากตรวจสอบข้อมูลสำเร็จ ให้แสดงข้อความ "ลงทะเบียนสำเร็จ"
ผู้ทดสอบ จะต้อง validate form และแสดง error message หากมีข้อมูลที่ไม่ถูกต้อง

## Exam 2 - List

ผู้ทดสอบ จะต้องออกแบบ และสร้างหน้าเว็บสำหรับการแสดงข้อมูล users ตามเงื่อนไขดังนี้

- มี pagination แสดงข้อมูล 10 รายการต่อหน้า
- สามารถ search ข้อมูล ด้วยชื่อ email หรือ เบอร์โทรศัพท์
- สามารถ filter ข้อมูล ด้วย gender
- สามารถ sort ข้อมูล ด้วย id และ age

โดยผู้ทดสอบ จะต้องเขียน action สำหรับดึงไฟล์ json จาก public folder exam-2/exam-2.json และส่งข้อมูลไปแสดงผล

## Exam 3 - CRUD

ผู้ทดสอบ จะต้องเขียน REST API สำหรับ CRUD User ดังนี้

- get users
- get user by id
- create user
- update user
- delete user

ข้อมูลที่ต้องการมีดังนี้

- id
- email
- password
- fullName
- phone
- address
- gender

ใช้การอ่าน เขียนข้อมูลลงในไฟล์ json ที่อยู่ใน public folder exam-3/exam-3.json