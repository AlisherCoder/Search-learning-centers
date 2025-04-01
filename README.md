# Project Description: Online Educational Center Search Platform

## **General Information**
This project allows users to search for educational centers, courses, and various training programs online. By registering on the platform, users can find suitable courses and enroll in them.

## **User Roles**

### **1. Regular User**
- Registers and logs into the system.
- Searches for educational centers based on their desired field of study.
- Views detailed information about an educational center, including its branches.
- Selects a specific branch and schedules a visit for a particular date.
- Can upload useful resources (PDF books, video links, etc.) and categorize them.
- Can leave comments and like educational centers.

### **2. Educational Center CEO**
- Registers as a "CEO" during sign-up.
- Creates an educational center profile and provides details, including:
  - Fields of study (subjects and professions offered).
  - Branch locations.
- Can upload useful resources to the platform.

### **3. Administrator**
- Has full control over the system, including:
  - Managing regions.
  - Defining resource categories.
  - Managing professions and subjects (which are used to create educational fields).
  - Controlling educational center data.

## **Key Features**

### **1. Registration and Authentication**
- Users can register as either a **Regular User** or a **CEO**.
- Authentication is handled using JWT.

### **2. Searching for Educational Centers**
- Users can search for centers based on their field of study and location.
- Each educational center has a detailed page displaying its branches.
- Users can select a branch and schedule a visit.

### **3. Educational Center Page**
- Displays detailed information about the center.
- Shows available courses and branches.
- Allows users to schedule a visit.
- Supports user reviews and likes.

### **4. Uploading Resources**
- Both users and CEOs can upload useful resources (PDFs, video links, etc.).
- Resources are categorized for better organization.

### **5. Rating and Reviews**
- Users can leave reviews about educational centers.
- Centers can receive likes based on user feedback.

### **6. Admin Panel**
- Admin can create and manage:
  - Regions
  - Educational fields (linked to professions and subjects)
  - Resource categories
  - Educational centers

## **Frontend Notes**
- **Backend is fully developed and documented via Swagger.**
- **Authentication is managed using JWT.**
- **Data is accessed through a REST API.**
- **Key UI elements should include:**
  - Search and filtering options.
  - Comparison and rating display for educational centers.
  - Enrollment form for scheduling visits.
  - Resource upload and categorization.

## **Backend Technologies Used**
- **Programming Language:** JavaScript
- **Frameworks & Libraries:** Node.js, Express
- **Validation:** Joi
- **File Uploading:** Multer
- **Authentication & Security:** JWT, OTP, bcrypt
- **Database & ORM:** MySQL, Sequelize

