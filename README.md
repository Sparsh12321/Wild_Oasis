
# 🛠️ Wild Oasis – Admin Dashboard

An advanced and intuitive admin dashboard for **The Wild Oasis**, designed to manage cabins, bookings, and guests. This interface empowers the admin to oversee the business with ease, with full CRUD functionality and insights built using a modern tech stack.

🚀 **Live Demo:** [wild-oasis-pzz9.vercel.app](https://wild-oasis-pzz9.vercel.app/)

---

## 📸 Screenshots

### Dashboard Overview
![image](https://github.com/user-attachments/assets/9c5a1a38-3e8a-45c2-9326-969335f6bbb7)


### Cabin Management
![image](https://github.com/user-attachments/assets/3ef64ec7-1473-4921-964e-b7c59fdba178)

### Booking Interface
![image](https://github.com/user-attachments/assets/41ee8c54-5cfa-4254-9820-053cc443707a)

### Booking Details
![image](https://github.com/user-attachments/assets/33c8fb5b-c54b-4697-8332-44b2b7e8aee6)

### Cabin Form
![image](https://github.com/user-attachments/assets/032f038c-1f62-41f0-b0ab-eacdfcfdb29d)

---

## 🧾 Features

- 📊 Dashboard to view key booking metrics  
- 🏡 Manage cabins with full CRUD operations  
- 📅 Manage bookings and guest information  
- 📈 Dynamic charts and insights  
- 🔐 Secure authentication (SupaBase)
- 💡 Optimistic UI and server actions with App Router  

---

## 🛠️ Tech Stack

- **Frontend:** React Js (React Router)
- **UI Framework:** Tailwind CSS, React Icons  
- **State Management:** React Query + Context API
- **Authentication:** SupaBase
- **API Handling:**  React Query
- **Database ORM:** Prisma  
- **Database:** PostgreSQL (via Supabase )  
- **Deployment:** Vercel  

---

## ⚙️ Getting Started

### 1. Clone the Repo & Install Dependencies

```bash
git clone https://github.com/Sparsh12321/Wild_Oasis.git
cd Wild_Oasis
npm install
```

### 2. Set Environment Variables

Create a `.env.local` file in the root with the following keys:

```env
DATABASE_URL=your_database_url
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
NEXTAUTH_SECRET=some_random_secret
```
> _You may use Supabase  for the database._

### 3. Run the App Locally

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

---

## 🧩 Folder Structure

```vbnet
📦 Wild_Oasis
 ┣ 📂 app
 ┃ ┣ 📂 _components      → Shared layout and UI components
 ┃ ┣ 📂 cabins           → Cabin CRUD functionality
 ┃ ┣ 📂 bookings         → Booking management UI
 ┃ ┣ 📂 dashboard        → Dashboard stats and analytics
 ┃ ┣ layout.jsx          → Root layout
 ┃ ┣ page.jsx            → Dashboard homepage
 ┣ 📂 public             → Static assets (e.g., images)
 ┣ 📜 next.config.js
 ┣ 📜 tailwind.config.js
 ┣ 📜 README.md
```

---

## ✨ Future Improvements

- Role-based access control (Admin, Staff)  
- Add notification/email triggers for new bookings  
- Generate downloadable reports (PDF, CSV)  
- Real-time updates using WebSockets or polling  

---

## 🙌 Acknowledgements

- Based on concepts from Jonas Schmedtmann’s Next.js course  
- Powered by **Prisma**, **NextAuth**, and **Vercel**  

---

## 🪪 License

This project is licensed under the [MIT License](./LICENSE).

---

## 👤 Author

**Sparsh Jain**  
🔗 [LinkedIn](https://www.linkedin.com/in/sparshjain21)  
📬 sparshjain0001@gmail.com
